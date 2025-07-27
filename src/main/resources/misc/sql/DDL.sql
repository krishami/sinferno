-- DROP DATABASE IF EXISTS sinferno;
CREATE DATABASE IF NOT EXISTS sinferno CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Not using enums because it can backfire
-- 1. When table sizes grow large (many rows), updating table definitions is very costly
-- 2. Mistakes in specifying an enum when inserting puts "" (blank) in DB without warning
-- Rather than throwing an error, mySQL actually does the wrong thing

USE sinferno;

DROP TABLE IF EXISTS sports_match_cricket_rules;
DROP TABLE IF EXISTS sports_match_soccer_rules;

DROP TABLE IF EXISTS sports_event_qualification;

DROP TABLE IF EXISTS sports_group_cricket;
DROP TABLE IF EXISTS sports_match_cricket;

DROP TABLE IF EXISTS sports_group_soccer;
DROP TABLE IF EXISTS sports_match_soccer;

DROP TABLE IF EXISTS person_to_entity_to_event;
DROP TABLE IF EXISTS entity_to_event;
DROP TABLE IF EXISTS person_to_event;
DROP TABLE IF EXISTS person_to_entity;

DROP TABLE IF EXISTS sports_event;
DROP TABLE IF EXISTS sports_venue;
DROP TABLE IF EXISTS sports_entity;

DROP TABLE IF EXISTS sports_person;
DROP TABLE IF EXISTS user_profile;

CREATE TABLE user_profile (
  user_id               BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,

  full_name             VARCHAR(200)    NOT NULL,

  user_login            VARCHAR(50)     NOT NULL DEFAULT '',
  user_password         VARCHAR(200)    NOT NULL DEFAULT '', -- This should be stored as an encrypted value
  salt                  VARCHAR(50)     NOT NULL DEFAULT '',
  is_encrypted          BOOLEAN         NOT NULL DEFAULT TRUE,

  email                 VARCHAR(100)    NOT NULL DEFAULT '', -- required if there is a login
  timezone              VARCHAR(50)     NOT NULL DEFAULT 'Etc/UTC',

  created_date          DATETIME        NOT NULL,
  active_flag           BOOLEAN         NOT NULL DEFAULT TRUE,

  access_token          VARCHAR(100)    NULL,
  token_expiration_time DATETIME        NULL

)
  ENGINE = InnoDB;

CREATE TABLE sports_person (
  sports_person_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  owner_id         BIGINT UNSIGNED NOT NULL,
  login_id         BIGINT UNSIGNED NULL,
  full_name        VARCHAR(200)    NOT NULL,
  gender           VARCHAR(10)     NULL     DEFAULT 'NA', -- "Male", "Female", "Mixed", "N.A."

  created_date     DATETIME        NOT NULL,

  KEY FK_sports_person_login (login_id),
  KEY FK_sports_person_owner (owner_id),

  CONSTRAINT FK_sports_person_login FOREIGN KEY (login_id)
  REFERENCES user_profile (user_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,

  CONSTRAINT FK_sports_person_owner FOREIGN KEY (owner_id)
  REFERENCES user_profile (user_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT

)
  ENGINE = InnoDB;

CREATE TABLE sports_entity (
  sports_entity_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  owner_id         BIGINT UNSIGNED NOT NULL,

  entity_name      VARCHAR(200)    NOT NULL,
  abbreviation     VARCHAR(10)     NOT NULL, -- used for displaying matches
  description      TEXT            NULL,

  KEY FK_sports_entity_user_profile (owner_id),

  CONSTRAINT FK_sports_entity_user_profile FOREIGN KEY (owner_id)
  REFERENCES user_profile (user_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT

)
  ENGINE = InnoDB;

CREATE TABLE sports_venue (
  venue_id     BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  owner_id     BIGINT UNSIGNED NOT NULL,
  venue_name   VARCHAR(100)    NOT NULL,
  description  TEXT            NULL,
  timezone     VARCHAR(50)     NOT NULL DEFAULT 'Etc/UTC',
  address1     VARCHAR(100)    NULL,
  address2     VARCHAR(100)    NULL,
  city         VARCHAR(100)    NULL,
  state        VARCHAR(100)    NULL, -- Can be non-US
  postal_code  VARCHAR(20)     NULL,
  country_code CHAR(3)         NULL, -- Use 'ZZZ' for other (as per ISO standard)

  KEY FK_sports_venue_user_profile (owner_id),

  CONSTRAINT FK_sports_venue_user_profile FOREIGN KEY (owner_id)
  REFERENCES user_profile (user_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT

)
  ENGINE = InnoDB;

CREATE TABLE sports_event (
  event_id        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  owner_id        BIGINT UNSIGNED NOT NULL, -- Links it to the user who is creating this

  venue_id        BIGINT UNSIGNED NULL, -- Provided by the user

  root_id         BIGINT UNSIGNED NULL, -- Null is self, otherwise to root
  parent_id       BIGINT UNSIGNED NULL, -- Who the immediate parent is. Null for root
  left_sibling_id BIGINT UNSIGNED NULL, -- Immediate left sibling is (for ordering). Null for root and for the first child

  event_type      VARCHAR(10)     NOT NULL, -- Round, Match
  treat_as_group  BOOLEAN         NOT NULL DEFAULT FALSE,

  sports_type     VARCHAR(10)     NULL, -- "Cricket", "Soccer" - Use a code for this
  sports_subtype  VARCHAR(30)     NULL, -- "Cricket - Limited Overs", "Soccer" - Use a code for this

  event_name      VARCHAR(100)    NOT NULL, -- Provided by the user. Not necessary if it is just a match
  description     TEXT            NULL, -- Provided by the user
  gender          VARCHAR(10)     NULL, -- Not null for root. "Male", "Female", "Mixed", "N.A."
  -- We are using date and time separately so that we can distinguish date-only values
  -- We are not using a string field for date + time as that means queries cannot be easily run
  -- without doing string manipulation
  -- Looks like Hibernate treats time with zoning information, so we need a scalar to represent time
  start_date      DATE            NULL, -- Date only
  start_time      VARCHAR(5)      NULL, -- Time only (HH:mm)
  end_date        DATE            NULL, -- Date only
  end_time        VARCHAR(5)      NULL, -- Time only (HH:mm)
  timezone_type   VARCHAR(10)     NULL, -- "Owner", "Venue", "GMT", "Other"
  timezone        VARCHAR(50)     NULL, -- If "Other" is used

  KEY FK_sports_event_user_profile (owner_id),
  KEY FK_sports_event_self_root (root_id),
  KEY FK_sports_event_self_parent (parent_id),
  KEY FK_sports_event_self_sibling (left_sibling_id),
  KEY FK_sports_event_venue (venue_id),

  CONSTRAINT FK_sports_event_user_profile FOREIGN KEY (owner_id)
  REFERENCES user_profile (user_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,

  CONSTRAINT FK_sports_event_self_root FOREIGN KEY (root_id)
  REFERENCES sports_event (event_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,

  CONSTRAINT FK_sports_event_self_parent FOREIGN KEY (parent_id)
  REFERENCES sports_event (event_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,

  CONSTRAINT FK_sports_event_self_sibling FOREIGN KEY (left_sibling_id)
  REFERENCES sports_event (event_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,

  CONSTRAINT FK_sports_event_venue FOREIGN KEY (venue_id)
  REFERENCES sports_venue (venue_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT

)
  ENGINE = InnoDB;

-- Which person belongs to which team
CREATE TABLE person_to_entity (
  id                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  person_id         BIGINT UNSIGNED NOT NULL,
  entity_id         BIGINT UNSIGNED NOT NULL,
  relationship_type VARCHAR(25)     NOT NULL,
  attributes_json   VARCHAR(1000)   NULL, -- Put in a check for size validation. If we need more, we may need a custom table
  start_date        DATETIME        NULL,
  end_date          DATETIME        NULL,

  UNIQUE KEY uniquePersonEntityRelation (person_id, entity_id, relationship_type),

  INDEX idxPersonToEntityOnPerson (relationship_type, person_id),
  INDEX idxPersonToEntityOnEntity (relationship_type, entity_id),

  CONSTRAINT FK_person_to_entity_person FOREIGN KEY (person_id)
  REFERENCES sports_person (sports_person_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,

  CONSTRAINT FK_person_to_entity_entity FOREIGN KEY (entity_id)
  REFERENCES sports_entity (sports_entity_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT

)
  ENGINE = InnoDB;

-- Useful for single player sportsEvents
CREATE TABLE person_to_event (
  id                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  person_id         BIGINT UNSIGNED NOT NULL,
  event_id          BIGINT UNSIGNED NOT NULL,
  relationship_type VARCHAR(25)     NOT NULL,
  attributes_json   VARCHAR(1000)   NULL,
  start_date        DATETIME        NULL,
  end_date          DATETIME        NULL,

  UNIQUE KEY uniquePersonEventRelation (person_id, event_id, relationship_type),

  INDEX idxPersonToEventOnPerson (relationship_type, person_id),
  INDEX idxPersonToEventOnEvent  (relationship_type, event_id),

  CONSTRAINT FK_person_to_event_person FOREIGN KEY (person_id)
  REFERENCES sports_person (sports_person_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,

  CONSTRAINT FK_person_to_event_event FOREIGN KEY (event_id)
  REFERENCES sports_event (event_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT

)
  ENGINE = InnoDB;

-- Useful for team sportsEvents
-- Which teams are playing in which sportsEvents
CREATE TABLE entity_to_event (
  id                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  entity_id         BIGINT UNSIGNED NOT NULL,
  event_id          BIGINT UNSIGNED NOT NULL,
  relationship_type VARCHAR(25)     NOT NULL,
  attributes_json   VARCHAR(1000)   NULL,
  start_date        DATETIME        NULL,
  end_date          DATETIME        NULL,

  UNIQUE KEY uniqueEntityEventRelation (entity_id, event_id, relationship_type),

  INDEX idxEntityToEventOnEntity (relationship_type, entity_id),
  INDEX idxEntityToEventOnEvent  (relationship_type, event_id),

  CONSTRAINT FK_entity_to_event_entity FOREIGN KEY (entity_id)
  REFERENCES sports_entity (sports_entity_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,

  CONSTRAINT FK_entity_to_event_event FOREIGN KEY (event_id)
  REFERENCES sports_event (event_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT

)
  ENGINE = InnoDB;

-- Which team member is playing for the team in a particular sportsEvent
-- Note that the sports person belongs to the sportsEntity and the sportsEntity is already part of the sportsEvent
CREATE TABLE person_to_entity_to_event (
  id                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  entity_person_id  BIGINT UNSIGNED NOT NULL,
  entity_event_id   BIGINT UNSIGNED NOT NULL,
  relationship_type VARCHAR(25)     NOT NULL,
  attributes_json   VARCHAR(1000)   NULL,
  start_date        DATETIME        NULL,
  end_date          DATETIME        NULL,

  UNIQUE KEY uniquePersonEntityEventRelation (entity_person_id, entity_event_id, relationship_type),

  INDEX idxPersonToEntityToEventOnEntityPerson (relationship_type, entity_person_id),
  INDEX idxPersonToEntityToEventOnEntityEvent  (relationship_type, entity_event_id),

  CONSTRAINT FK_person_to_entity_to_event_entity_person FOREIGN KEY (entity_person_id)
  REFERENCES person_to_entity (id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,

  CONSTRAINT FK_person_to_entity_to_event_entity_event FOREIGN KEY (entity_event_id)
  REFERENCES entity_to_event (id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT

)
  ENGINE = InnoDB;


CREATE TABLE sports_match_soccer (
  sports_match_soccer_id   BIGINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
  event_id                 BIGINT UNSIGNED                NOT NULL,

  -- Pick the first team directly or from an sportsEvent
  first_team_id            BIGINT UNSIGNED                NULL,
  first_selected_event_id  BIGINT UNSIGNED                NULL,
  first_selected_type      VARCHAR(20)                    NULL, -- Winner, Loser, Position
  first_selected_rank      TINYINT                        NULL,

  second_team_id           BIGINT UNSIGNED                NULL,
  second_selected_event_id BIGINT UNSIGNED                NULL,
  second_selected_type     VARCHAR(20)                    NULL, -- Winner, Loser, Position
  second_selected_rank     TINYINT                        NULL,

  part_of_group_stats      BOOLEAN                        NOT NULL DEFAULT TRUE,

  home_team                VARCHAR(10)                    NOT NULL DEFAULT 'NEUTRAL',

  result                   VARCHAR(15)                    NOT NULL DEFAULT 'SCHEDULED',
  result_stage             VARCHAR(15)                    NULL, -- When the result was achieved
  result_description       TEXT                           NULL,

  regular_time_first       TINYINT                        NOT NULL DEFAULT 0,
  regular_time_second      TINYINT                        NOT NULL DEFAULT 0,

  overtime_first           TINYINT                        NOT NULL DEFAULT 0,
  overtime_second          TINYINT                        NOT NULL DEFAULT 0,

  penalty_first            TINYINT                        NOT NULL DEFAULT 0,
  penalty_second           TINYINT                        NOT NULL DEFAULT 0,

  sudden_death_first       TINYINT                        NOT NULL DEFAULT 0,
  sudden_death_second      TINYINT                        NOT NULL DEFAULT 0,

  KEY FK_sports_match_soccer_sports_event (event_id),
  KEY FK_sports_match_soccer_sports_entity_first (first_team_id),
  KEY FK_sports_match_soccer_sports_entity_second (second_team_id),

  CONSTRAINT FK_sports_match_soccer_sports_event FOREIGN KEY (event_id)
  REFERENCES sports_event (event_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT FK_sports_match_soccer_sports_entity_first FOREIGN KEY (first_team_id)
  REFERENCES sports_entity (sports_entity_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT FK_sports_match_soccer_sports_entity_second FOREIGN KEY (second_team_id)
  REFERENCES sports_entity (sports_entity_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT

)
  ENGINE = InnoDB;

CREATE TABLE sports_group_soccer (
  sports_group_soccer_id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
  event_id               BIGINT UNSIGNED                NOT NULL,

  team_id                BIGINT UNSIGNED                NULL,
  team_selected_event_id BIGINT UNSIGNED                NULL,
  team_selected_type     VARCHAR(20)                    NULL, -- Winner, Loser, Position
  team_selected_rank     TINYINT                        NULL,

  -- the next are all redundant fields
  played                 INT                            NOT NULL DEFAULT 0,
  won                    INT                            NOT NULL DEFAULT 0,
  drew                   INT                            NOT NULL DEFAULT 0,
  abandoned              INT                            NOT NULL DEFAULT 0,
  lost                   INT                            NOT NULL DEFAULT 0,
  goals_for              INT                            NOT NULL DEFAULT 0,
  goals_against          INT                            NOT NULL DEFAULT 0,
  points                 INT                            NOT NULL DEFAULT 0,
  -- this means that the user overrode the automatically calculated values
  -- we have to allow for a checkbox to allow them to do that
  details_override       BOOLEAN                        NOT NULL DEFAULT FALSE,

  qualified              VARCHAR(15)                    NOT NULL DEFAULT 'NO',
  rank                   TINYINT                        NOT NULL DEFAULT 0,
  qualified_override     BOOLEAN                        NOT NULL DEFAULT FALSE,

  KEY FK_sports_group_soccer_sports_event (event_id),
  KEY FK_sports_group_soccer_sports_entity (team_id),

  CONSTRAINT FK_sports_group_soccer_sports_event FOREIGN KEY (event_id)
  REFERENCES sports_event (event_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT FK_sports_group_soccer_sports_entity FOREIGN KEY (team_id)
  REFERENCES sports_entity (sports_entity_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT

)
  ENGINE = InnoDB;


CREATE TABLE sports_match_cricket (
  sports_match_cricket_id  BIGINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
  event_id                 BIGINT UNSIGNED                NOT NULL,

  first_team_id            BIGINT UNSIGNED                NULL,
  first_selected_event_id  BIGINT UNSIGNED                NULL,
  first_selected_type      VARCHAR(20)                    NULL, -- Winner, Loser, Position
  first_selected_rank      TINYINT                        NULL,

  second_team_id           BIGINT UNSIGNED                NULL,
  second_selected_event_id BIGINT UNSIGNED                NULL,
  second_selected_type     VARCHAR(20)                    NULL, -- Winner, Loser, Position
  second_selected_rank     TINYINT                        NULL,

  part_of_group_stats      BOOLEAN                        NOT NULL DEFAULT TRUE,

  home_team                VARCHAR(10)                    NOT NULL DEFAULT 'NEUTRAL',

  toss_status              VARCHAR(20)                    NOT NULL DEFAULT 'UNKNOWN',

  result                   VARCHAR(15)                    NOT NULL DEFAULT 'SCHEDULED',
  result_stage             VARCHAR(25)                    NULL,
  result_description       TEXT                           NULL,

  -- Going to record 2 innings. We may not need the 2nd innings
  -- Original overs are part of the match definition (rules!)
  -- Effective overs will either be original overs or overridden overs (used for NRR calculations)
  inn1_score_A             INT                            NULL,
  inn1_wickets_A           TINYINT                        NULL,
  inn1_overs_A             DECIMAL                        NULL,
  inn1_eff_overs_A         DECIMAL                        NULL, -- Effective number of overs. Use only if overridden

  inn1_score_B             INT                            NULL,
  inn1_wickets_B           TINYINT                        NULL,
  inn1_overs_B             DECIMAL                        NULL,
  inn1_eff_overs_B         DECIMAL                        NULL,

  -- 2nd innings do not need an effective number of overs (Tests)
  inn2_score_A             INT                            NULL,
  inn2_wickets_A           TINYINT                        NULL,
  inn2_overs_A             DECIMAL                        NULL,
  inn2_eff_overs_A         DECIMAL                        NULL,

  inn2_score_B             INT                            NULL,
  inn2_wickets_B           TINYINT                        NULL,
  inn2_overs_B             DECIMAL                        NULL,
  inn2_eff_overs_B         DECIMAL                        NULL,

  -- This applies only for the last innings in case of rain, crowd trouble
  -- You are supposed to take the runs in so many overs
  -- The effective overs would be equivalent to target overs
  revised_target_runs      INT                            NULL,
  revised_target_overs     DECIMAL                        NULL,

  win_innings_margin       TINYINT                        NULL,
  win_runs_margin          INT                            NULL,
  win_wkts_margin          TINYINT                        NULL, -- This would not use the win_innings_margin

  KEY FK_sports_match_cricket_sports_event (event_id),
  KEY FK_sports_match_cricket_sports_entity_first (first_team_id),
  KEY FK_sports_match_cricket_sports_entity_second (second_team_id),

  CONSTRAINT FK_sports_match_cricket_sports_event FOREIGN KEY (event_id)
  REFERENCES sports_event (event_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT FK_sports_match_cricket_sports_entity_first FOREIGN KEY (first_team_id)
  REFERENCES sports_entity (sports_entity_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT FK_sports_match_cricket_sports_entity_second FOREIGN KEY (second_team_id)
  REFERENCES sports_entity (sports_entity_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
)
  ENGINE = InnoDB;

-- Following does not apply to Test matches
CREATE TABLE sports_group_cricket (
  sports_group_cricket_id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
  event_id                BIGINT UNSIGNED                NOT NULL,

  team_id                 BIGINT UNSIGNED                NULL,
  team_selected_event_id  BIGINT UNSIGNED                NULL,
  team_selected_type      VARCHAR(20)                    NULL, -- Winner, Loser, Position
  team_selected_rank      TINYINT                        NULL,

  -- the next are all redundant fields
  played                  INT                            NOT NULL DEFAULT 0,
  won                     INT                            NOT NULL DEFAULT 0,
  drew                    INT                            NOT NULL DEFAULT 0, -- Draw only applies to Tests
  tied                    INT                            NOT NULL DEFAULT 0,
  abandoned               INT                            NOT NULL DEFAULT 0,
  lost                    INT                            NOT NULL DEFAULT 0,

  runs_for                INT                            NOT NULL DEFAULT 0,
  overs_for               DECIMAL                        NOT NULL DEFAULT 0,
  runs_against            INT                            NOT NULL DEFAULT 0,
  overs_against           DECIMAL                        NOT NULL DEFAULT 0,

  points                  INT                            NOT NULL DEFAULT 0,
  details_override        BOOLEAN                        NOT NULL DEFAULT FALSE,

  qualified               VARCHAR(15)                    NOT NULL DEFAULT 'NO',
  rank                    TINYINT                        NOT NULL DEFAULT 0,
  qualified_override      BOOLEAN                        NOT NULL DEFAULT FALSE,

  KEY FK_sports_group_cricket_sports_event (event_id),
  KEY FK_sports_group_cricket_sports_entity (team_id),

  CONSTRAINT FK_sports_group_cricket_sports_event FOREIGN KEY (event_id)
  REFERENCES sports_event (event_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT FK_sports_group_cricket_sports_entity FOREIGN KEY (team_id)
  REFERENCES sports_entity (sports_entity_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
)
  ENGINE = InnoDB;

-- Rules will be consistent for the game, but may not be the same at each level
-- Handle situations like 1986 World Cup (Top 4 of 6 third-place qualifiers as another round - rename appropriately)
CREATE TABLE sports_event_qualification (
  sports_event_qualification_id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
  event_id                      BIGINT UNSIGNED                NOT NULL,
  points_for_win                INT                            NOT NULL,
  points_for_draw               INT                            NOT NULL,
  points_for_loss               INT                            NOT NULL,
  points_for_abandoned          INT                            NOT NULL,

  direct_qualifiers             INT                            NOT NULL, -- Show in GREEN. They move to the next major round
  playoff_qualifiers            INT                            NOT NULL, -- Show in YELLOW. They move to a qualifier round

  points_carryover              VARCHAR(10)                    NOT NULL DEFAULT 'NONE', -- Whether points carry over

  -- we may need points for away and home wins, will wait until we need them

  KEY FK_sports_event_qualification_sports_event (event_id),

  CONSTRAINT FK_sports_event_qualification_sports_event FOREIGN KEY (event_id)
  REFERENCES sports_event (event_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT

)
  ENGINE = InnoDB;

-- These will definitely vary at each round or group (and maybe in some cases, at the match level)
CREATE TABLE sports_match_soccer_rules (
  soccer_rules_id        BIGINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
  event_id               BIGINT UNSIGNED                NOT NULL,

  regular_periods        INT                            NOT NULL DEFAULT 2,
  regular_period_mins    INT                            NOT NULL DEFAULT 45,
  overtime_periods       INT                            NOT NULL DEFAULT 0, -- Normally we don't have overtime or penalties
  overtime_period_mins   INT                            NOT NULL DEFAULT 0,
  regular_penalties      INT                            NOT NULL DEFAULT 0,
  sudden_death_penalties INT                            NOT NULL DEFAULT 0,

  last_result_stage      VARCHAR(15)                    NOT NULL DEFAULT 'REGULAR',

  KEY FK_sports_match_soccer_rules_sports_event (event_id),

  CONSTRAINT FK_sports_match_soccer_rules_sports_event FOREIGN KEY (event_id)
  REFERENCES sports_event (event_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT

)
  ENGINE = InnoDB;

-- Can vary at each level
CREATE TABLE sports_match_cricket_rules (
  cricket_rules_id  BIGINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
  event_id          BIGINT UNSIGNED                NOT NULL,

  innings           INT                            NOT NULL DEFAULT 1,
  overs_per_innings INT                            NOT NULL DEFAULT 50,
  balls_per_over    INT                            NOT NULL DEFAULT 6,

  last_result_stage VARCHAR(15)                    NOT NULL DEFAULT 'REGULAR',

  KEY FK_sports_match_cricket_rules_sports_event (event_id),

  CONSTRAINT FK_sports_match_cricket_rules_sports_event FOREIGN KEY (event_id)
  REFERENCES sports_event (event_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT

)
  ENGINE = InnoDB;
