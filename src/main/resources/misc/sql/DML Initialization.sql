USE sinferno;

SET SQL_SAFE_UPDATES = 0;

UPDATE sports_event
SET root_id = NULL, parent_id = NULL, left_sibling_id = NULL;

DELETE FROM sports_match_cricket_rules;
DELETE FROM sports_match_soccer_rules;

DELETE FROM sports_event_qualification;

DELETE FROM sports_group_cricket;
DELETE FROM sports_match_cricket;
DELETE FROM sports_match_soccer;
DELETE FROM sports_group_soccer;

DELETE FROM person_to_entity_to_event;
DELETE FROM entity_to_event;
DELETE FROM person_to_event;
DELETE FROM person_to_entity;

DELETE FROM sports_event;
DELETE FROM sports_venue;
DELETE FROM sports_entity;

DELETE FROM sports_person;
DELETE FROM user_profile;

ALTER TABLE sports_person AUTO_INCREMENT = 1;
ALTER TABLE user_profile AUTO_INCREMENT = 1;

ALTER TABLE sports_entity AUTO_INCREMENT = 1;
ALTER TABLE sports_venue AUTO_INCREMENT = 1;
ALTER TABLE sports_event AUTO_INCREMENT = 1;

ALTER TABLE person_to_entity AUTO_INCREMENT = 1;
ALTER TABLE person_to_event AUTO_INCREMENT = 1;
ALTER TABLE entity_to_event AUTO_INCREMENT = 1;
ALTER TABLE person_to_entity_to_event AUTO_INCREMENT = 1;

ALTER TABLE sports_group_soccer AUTO_INCREMENT = 1;
ALTER TABLE sports_match_soccer AUTO_INCREMENT = 1;
ALTER TABLE sports_group_cricket AUTO_INCREMENT = 1;
ALTER TABLE sports_match_cricket AUTO_INCREMENT = 1;

ALTER TABLE sports_event_qualification AUTO_INCREMENT = 1;

ALTER TABLE sports_match_cricket_rules AUTO_INCREMENT = 1;
ALTER TABLE sports_match_soccer_rules AUTO_INCREMENT = 1;

INSERT INTO user_profile (full_name, user_login, user_password, salt, is_encrypted, email, timezone, created_date, active_flag)
VALUES
  ('Sinferno Admin', 'admin', 'password', '', FALSE, 'krishami@gmail.com', 'America/New_York', now(), TRUE),
  ('Nisha Krishna', 'nisha', 'NishaPass', '', FALSE, 'nishakrishna@gmail.com', 'Asia/Calcutta', now(), TRUE);


INSERT INTO sports_entity (owner_id, entity_name, abbreviation, description) VALUES
  (1, 'Brazil', 'BRA', 'Brazil National Team'),
  (1, 'Mexico', 'MEX', 'Mexico National Team'),
  (1, 'Croatia', 'CRO', 'Croatia National Team'),
  (1, 'Cameroon', 'CMR', 'Cameroon National Team'),

  (1, 'Netherlands', 'NED', 'Netherlands National Team'),
  (1, 'Chile', 'CHI', 'Chile National Team'),
  (1, 'Spain', 'ESP', 'Spain National Team'),
  (1, 'Australia', 'AUS', 'Australia National Team'),

  (1, 'Colombia', 'COL', 'Colombia National Team'),
  (1, 'Greece', 'GRE', 'Greece National Team'),
  (1, 'Ivory Coast', 'CIV', 'Ivory Coast National Team'),
  (1, 'Japan', 'JPN', 'Japan National Team'),

  (1, 'Costa Rica', 'CRC', 'Costa Rica National Team'),
  (1, 'Uruguay', 'URU', 'Uruguay National Team'),
  (1, 'Italy', 'ITA', 'Italy National Team'),
  (1, 'England', 'ENG', ' National Team'),

  (1, 'France', 'FRA', 'France National Team'),
  (1, 'Switzerland', 'SUI', 'Switzerland National Team'),
  (1, 'Ecuador', 'ECU', 'Ecuador National Team'),
  (1, 'Honduras', 'HON', 'Honduras National Team'),

  (1, 'Argentina', 'ARG', 'Argentina National Team'),
  (1, 'Nigeria', 'NGA', 'Nigeria National Team'),
  (1, 'Bosnia/Herz', 'BIH', 'Bosnia-Herzegovina National Team'),
  (1, 'Iran', 'IRN', 'Iran National Team'),

  (1, 'Germany', 'GER', 'Germany National Team'),
  (1, 'United States', 'USA', 'USA National Team'),
  (1, 'Portugal', 'POR', 'Portugal National Team'),
  (1, 'Ghana', 'GHA', 'Ghana National Team'),

  (1, 'Belgium', 'BEL', 'Belgium National Team'),
  (1, 'Algeria', 'ALG', 'Algeria National Team'),
  (1, 'Russia', 'RUS', 'Russia National Team'),
  (1, 'South Korea', 'KOR', 'South Korea National Team');
INSERT INTO sports_entity (owner_id, entity_name, abbreviation, description)
VALUES (1, 'FIFA', 'FIFA', 'International Football Federation');

INSERT INTO sports_venue (owner_id, venue_name, timezone, country_code)
VALUES
  (1, 'Brazil', 'America/Sao_Paulo', 'BRA'), -- Will change when we move to individual cities
  (1, 'India', 'Asia/Kolkata', 'IND');


INSERT INTO sports_event (owner_id, root_id, event_name, description,
                          gender, venue_id, sports_type, sports_subtype, event_type, start_date, end_date, timezone_type)
VALUES (1, NULL, 'FIFA World Cup 2014', 'World Cup',
           'MALE', 1, 'SOCCER', 'SOCCER_REGULAR', 'ROUND', '2014-06-10', '2014-07-12', 'VENUE');


INSERT INTO sports_event (owner_id, root_id, parent_id, left_sibling_id, event_name, description,
                          gender, venue_id, sports_type, sports_subtype, event_type, start_date, end_date)
VALUES
  (1, 1, 1, NULL, 'Group Stage', '8 groups with 4 teams each', NULL, NULL, NULL, NULL, 'ROUND', NULL, NULL),
  (1, 1, 1, 2, 'Round of 16', 'Pre-quarterfinals', NULL, NULL, NULL, NULL, 'ROUND', NULL, NULL),
  (1, 1, 1, 3, 'Quarterfinals', 'Quarter Final Stage', NULL, NULL, NULL, NULL, 'ROUND', NULL, NULL),
  (1, 1, 1, 4, 'Semifinals', 'Semi Final Stage', NULL, NULL, NULL, NULL, 'ROUND', NULL, NULL),
  (1, 1, 1, 5, '3rd Place', 'Losers Final', NULL, NULL, NULL, NULL, 'ROUND', NULL, NULL),
  (1, 1, 1, 6, 'Final', 'Championship Final', NULL, NULL, NULL, NULL, 'ROUND', NULL, NULL);

INSERT INTO sports_event (owner_id, root_id, parent_id, left_sibling_id, event_name, description,
                          gender, venue_id, sports_type, sports_subtype, event_type, start_date, end_date, treat_as_group)
VALUES
  (1, 1, 2, NULL, 'Group A', 'Group A', NULL, NULL, NULL, NULL, 'ROUND', NULL, NULL, 1),
  (1, 1, 2, 8, 'Group B', 'Group B', NULL, NULL, NULL, NULL, 'ROUND', NULL, NULL, 1),
  (1, 1, 2, 9, 'Group C', 'Group C', NULL, NULL, NULL, NULL, 'ROUND', NULL, NULL, 1),
  (1, 1, 2, 10, 'Group D', 'Group D', NULL, NULL, NULL, NULL, 'ROUND', NULL, NULL, 1),
  (1, 1, 2, 11, 'Group E', 'Group E', NULL, NULL, NULL, NULL, 'ROUND', NULL, NULL, 1),
  (1, 1, 2, 12, 'Group F', 'Group F', NULL, NULL, NULL, NULL, 'ROUND', NULL, NULL, 1),
  (1, 1, 2, 13, 'Group G', 'Group G', NULL, NULL, NULL, NULL, 'ROUND', NULL, NULL, 1),
  (1, 1, 2, 14, 'Group H', 'Group H', NULL, NULL, NULL, NULL, 'ROUND', NULL, NULL, 1);


INSERT INTO sports_event (owner_id, root_id, parent_id, left_sibling_id, event_name, description,
                          gender, venue_id, sports_type, sports_subtype, event_type, start_date, end_date)
VALUES
  (1, 1, 8, NULL, 'BRA v CRO', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 8, 16, 'MEX v CMR', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 8, 17, 'BRA v MEX', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 8, 18, 'CRO v CMR', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 8, 19, 'BRA v CMR', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 8, 20, 'MEX v CRO', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),

  (1, 1, 9, NULL, 'ESP v NED', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 9, 22, 'CHI v AUS', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 9, 23, 'NED v AUS', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 9, 24, 'ESP v CHI', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 9, 25, 'ESP v AUS', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 9, 26, 'NED v CHI', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),

  (1, 1, 10, NULL, 'COL v GRE', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 10, 28, 'CIV v JPN', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 10, 29, 'COL v CIV', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 10, 30, 'GRE v JPN', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 10, 31, 'COL v JPN', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 10, 32, 'GRE v CIV', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),

  (1, 1, 11, NULL, 'URU v CRC', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 11, 34, 'ENG v ITA', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 11, 35, 'URU v ENG', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 11, 36, 'CRC v ITA', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 11, 37, 'URU v ITA', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 11, 38, 'CRC v ENG', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),

  (1, 1, 12, NULL, 'SUI v ECU', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 12, 40, 'FRA v HON', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 12, 41, 'SUI v FRA', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 12, 42, 'ECU v HON', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 12, 43, 'SUI v HON', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 12, 44, 'ECU v FRA', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),

  (1, 1, 13, NULL, 'ARG v BIH', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 13, 46, 'IRN v NGA', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 13, 47, 'ARG v IRN', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 13, 48, 'BIH v NGA', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 13, 49, 'ARG v NGA', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 13, 50, 'BIH v IRN', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),

  (1, 1, 14, NULL, 'GER v POR', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 14, 52, 'GHA v USA', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 14, 53, 'GER v GHA', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 14, 54, 'POR v USA', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 14, 55, 'GER v USA', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 14, 56, 'POR v GHA', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),

  (1, 1, 15, NULL, 'BEL v ALG', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 15, 58, 'RUS v KOR', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 15, 59, 'BEL v RUS', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 15, 60, 'ALG v KOR', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 15, 61, 'BEL v KOR', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 15, 62, 'ALG v RUS', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),

  (1, 1, 3, NULL, 'BRA v CHI', 'Round of 16 Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 3, 64, 'COL v URU', 'Round of 16 Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 3, 65, 'NED v MEX', 'Round of 16 Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 3, 66, 'CRC v GRE', 'Round of 16 Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 3, 67, 'FRA v NGA', 'Round of 16 Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 3, 68, 'GER v ALG', 'Round of 16 Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 3, 69, 'ARG v SUI', 'Round of 16 Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 3, 70, 'BEL v USA', 'Round of 16 Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),

  (1, 1, 4, NULL, 'FRA v GER', 'Quarter-Final Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 4, 72, 'BRA v COL', 'Quarter-Final Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 4, 73, 'ARG v BEL', 'Quarter-Final Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 4, 74, 'NED v CRC', 'Quarter-Final Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),

  (1, 1, 5, NULL, 'GER v BRA', 'Semi-Final Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),
  (1, 1, 5, 76, 'ARG v NED', 'Semi-Final Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),

  (1, 1, 6, NULL, 'BRA v NED', '3rd Place Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL),

  (1, 1, 7, NULL, 'GER v ARG', 'Final Match', NULL, NULL, NULL, NULL, 'MATCH', NULL, NULL);

INSERT INTO sports_match_soccer (event_id, first_team_id, second_team_id, home_team, result, result_stage,
                                 regular_time_first, regular_time_second) VALUES
  (16, 1, 3, 'FIRST', 'FIRST', 'REGULAR', 3, 1),
  (17, 2, 4, 'NEUTRAL', 'FIRST', 'REGULAR', 1, 0),
  (18, 1, 2, 'FIRST', 'DRAW', 'REGULAR', 0, 0),
  (19, 3, 4, 'NEUTRAL', 'FIRST', 'REGULAR', 4, 0),
  (20, 1, 4, 'FIRST', 'FIRST', 'REGULAR', 4, 1),
  (21, 2, 3, 'NEUTRAL', 'FIRST', 'REGULAR', 3, 1),

  (22, 7, 5, 'NEUTRAL', 'SECOND', 'REGULAR', 1, 5),
  (23, 6, 8, 'NEUTRAL', 'FIRST', 'REGULAR', 3, 1),
  (24, 5, 8, 'NEUTRAL', 'FIRST', 'REGULAR', 3, 2),
  (25, 7, 6, 'NEUTRAL', 'SECOND', 'REGULAR', 0, 2),
  (26, 7, 8, 'NEUTRAL', 'FIRST', 'REGULAR', 3, 0),
  (27, 5, 6, 'NEUTRAL', 'FIRST', 'REGULAR', 2, 0),

  (28, 9, 10, 'NEUTRAL', 'FIRST', 'REGULAR', 3, 0),
  (29, 11, 12, 'NEUTRAL', 'FIRST', 'REGULAR', 2, 1),
  (30, 9, 11, 'NEUTRAL', 'FIRST', 'REGULAR', 2, 1),
  (31, 10, 12, 'NEUTRAL', 'DRAW', 'REGULAR', 0, 0),
  (32, 9, 12, 'NEUTRAL', 'FIRST', 'REGULAR', 4, 1),
  (33, 10, 11, 'NEUTRAL', 'FIRST', 'REGULAR', 2, 1),

  (34, 14, 13, 'NEUTRAL', 'SECOND', 'REGULAR', 1, 3),
  (35, 16, 15, 'NEUTRAL', 'SECOND', 'REGULAR', 1, 2),
  (36, 14, 16, 'NEUTRAL', 'FIRST', 'REGULAR', 2, 1),
  (37, 13, 15, 'NEUTRAL', 'FIRST', 'REGULAR', 1, 0),
  (38, 14, 15, 'NEUTRAL', 'FIRST', 'REGULAR', 1, 0),
  (39, 13, 16, 'NEUTRAL', 'DRAW', 'REGULAR', 0, 0),

  (40, 18, 19, 'NEUTRAL', 'FIRST', 'REGULAR', 2, 1),
  (41, 17, 20, 'NEUTRAL', 'FIRST', 'REGULAR', 3, 0),
  (42, 18, 17, 'NEUTRAL', 'SECOND', 'REGULAR', 2, 5),
  (43, 19, 20, 'NEUTRAL', 'FIRST', 'REGULAR', 2, 1),
  (44, 18, 20, 'NEUTRAL', 'FIRST', 'REGULAR', 3, 0),
  (45, 19, 17, 'NEUTRAL', 'DRAW', 'REGULAR', 0, 0),

  (46, 21, 23, 'NEUTRAL', 'FIRST', 'REGULAR', 2, 1),
  (47, 24, 22, 'NEUTRAL', 'DRAW', 'REGULAR', 0, 0),
  (48, 21, 24, 'NEUTRAL', 'FIRST', 'REGULAR', 1, 0),
  (49, 23, 22, 'NEUTRAL', 'SECOND', 'REGULAR', 0, 1),
  (50, 21, 22, 'NEUTRAL', 'FIRST', 'REGULAR', 3, 2),
  (51, 23, 24, 'NEUTRAL', 'FIRST', 'REGULAR', 3, 1),

  (52, 25, 27, 'NEUTRAL', 'FIRST', 'REGULAR', 4, 0),
  (53, 28, 26, 'NEUTRAL', 'SECOND', 'REGULAR', 1, 2),
  (54, 25, 28, 'NEUTRAL', 'DRAW', 'REGULAR', 2, 2),
  (55, 27, 26, 'NEUTRAL', 'DRAW', 'REGULAR', 2, 2),
  (56, 25, 26, 'NEUTRAL', 'FIRST', 'REGULAR', 1, 0),
  (57, 27, 28, 'NEUTRAL', 'FIRST', 'REGULAR', 2, 1),

  (58, 29, 30, 'NEUTRAL', 'FIRST', 'REGULAR', 2, 1),
  (59, 31, 32, 'NEUTRAL', 'DRAW', 'REGULAR', 1, 1),
  (60, 29, 31, 'NEUTRAL', 'FIRST', 'REGULAR', 1, 0),
  (61, 30, 32, 'NEUTRAL', 'FIRST', 'REGULAR', 4, 2),
  (62, 29, 32, 'NEUTRAL', 'FIRST', 'REGULAR', 1, 0),
  (63, 30, 31, 'NEUTRAL', 'DRAW', 'REGULAR', 1, 1);

INSERT INTO sports_match_soccer (event_id, first_team_id, second_team_id, home_team, result, result_stage,
                                 regular_time_first, regular_time_second, overtime_first, overtime_second, penalty_first, penalty_second)
VALUES
  (64, 1, 6, 'FIRST', 'FIRST', 'PENALTY', 1, 1, 0, 0, 3, 2),
  (65, 9, 14, 'NEUTRAL', 'FIRST', 'REGULAR', 2, 0, 0, 0, 0, 0),
  (66, 5, 2, 'NEUTRAL', 'FIRST', 'REGULAR', 2, 1, 0, 0, 0, 0),
  (67, 13, 10, 'NEUTRAL', 'FIRST', 'PENALTY', 1, 1, 0, 0, 5, 3),

  (68, 17, 22, 'NEUTRAL', 'FIRST', 'REGULAR', 2, 0, 0, 0, 0, 0),
  (69, 25, 30, 'NEUTRAL', 'FIRST', 'OVERTIME', 0, 0, 2, 1, 0, 0),
  (70, 21, 18, 'NEUTRAL', 'FIRST', 'OVERTIME', 0, 0, 1, 0, 0, 0),
  (71, 29, 26, 'NEUTRAL', 'FIRST', 'OVERTIME', 0, 0, 2, 1, 0, 0),

  (72, 17, 25, 'NEUTRAL', 'SECOND', 'REGULAR', 0, 1, 0, 0, 0, 0),
  (73, 1, 9, 'FIRST', 'FIRST', 'REGULAR', 2, 1, 0, 0, 0, 0),
  (74, 21, 29, 'NEUTRAL', 'FIRST', 'REGULAR', 1, 0, 0, 0, 0, 0),
  (75, 5, 13, 'NEUTRAL', 'FIRST', 'PENALTY', 0, 0, 0, 0, 4, 3),

  (76, 25, 1, 'SECOND', 'FIRST', 'REGULAR', 7, 1, 0, 0, 0, 0),
  (77, 21, 5, 'NEUTRAL', 'FIRST', 'PENALTY', 0, 0, 0, 0, 4, 2),

  (78, 1, 5, 'FIRST', 'SECOND', 'REGULAR', 0, 3, 0, 0, 0, 0),

  (79, 25, 21, 'NEUTRAL', 'FIRST', 'OVERTIME', 0, 0, 1, 0, 0, 0);

INSERT INTO sports_group_soccer (event_id, team_id, played, won, drew, lost,
                                 goals_for, goals_against, points, rank, qualified)
VALUES
  (8, 1, 3, 2, 1, 0, 7, 2, 7, 1, 'YES'),
  (8, 2, 3, 2, 1, 0, 4, 1, 7, 2, 'YES'),
  (8, 3, 3, 1, 0, 2, 6, 6, 3, 3, 'ELIMINATED'),
  (8, 4, 3, 0, 0, 3, 1, 9, 0, 4, 'ELIMINATED'),

  (9, 5, 3, 3, 0, 0, 10, 3, 9, 1, 'YES'),
  (9, 6, 3, 2, 0, 1,  5, 3, 6, 2, 'YES'),
  (9, 7, 3, 1, 0, 2,  4, 7, 3, 3, 'ELIMINATED'),
  (9, 8, 3, 0, 0, 3,  3, 9, 0, 4, 'ELIMINATED'),

  (10,  9, 3, 3, 0, 0, 9, 2, 9, 1, 'YES'),
  (10, 10, 3, 1, 1, 1, 2, 4, 4, 2, 'YES'),
  (10, 11, 3, 1, 0, 2, 4, 5, 3, 3, 'ELIMINATED'),
  (10, 12, 3, 0, 1, 2, 2, 6, 1, 4, 'ELIMINATED'),

  (11, 13, 3, 2, 1, 0, 4, 1, 7, 1, 'YES'),
  (11, 14, 3, 2, 0, 1, 4, 4, 6, 2, 'YES'),
  (11, 15, 3, 1, 0, 2, 2, 3, 3, 3, 'ELIMINATED'),
  (11, 16, 3, 0, 1, 2, 2, 4, 1, 4, 'ELIMINATED'),

  (12, 17, 3, 2, 1, 0, 8, 2, 7, 1, 'YES'),
  (12, 18, 3, 2, 0, 1, 7, 6, 6, 2, 'YES'),
  (12, 19, 3, 1, 1, 1, 3, 3, 4, 3, 'ELIMINATED'),
  (12, 20, 3, 0, 0, 3, 1, 8, 0, 4, 'ELIMINATED'),

  (13, 21, 3, 3, 0, 0, 6, 3, 9, 1, 'YES'),
  (13, 22, 3, 1, 1, 1, 3, 3, 4, 2, 'YES'),
  (13, 23, 3, 1, 0, 2, 4, 4, 3, 3, 'ELIMINATED'),
  (13, 24, 3, 0, 1, 2, 1, 4, 1, 4, 'ELIMINATED'),

  (14, 25, 3, 2, 1, 0, 7, 2, 7, 1, 'YES'),
  (14, 26, 3, 1, 1, 1, 4, 4, 4, 2, 'YES'),
  (14, 27, 3, 1, 1, 1, 4, 7, 4, 3, 'ELIMINATED'),
  (14, 28, 3, 0, 1, 2, 4, 6, 1, 4, 'ELIMINATED'),

  (15, 29, 3, 3, 0, 0, 4, 1, 9, 1, 'YES'),
  (15, 30, 3, 1, 1, 1, 6, 5, 4, 2, 'YES'),
  (15, 31, 3, 0, 2, 1, 2, 3, 2, 3, 'ELIMINATED'),
  (15, 32, 3, 0, 1, 2, 3, 6, 1, 4, 'ELIMINATED');

INSERT INTO sports_entity (owner_id, entity_name, abbreviation, description)
VALUES
  (1, 'ICC', 'ICC', 'International Cricket Council'),
  (1, 'BCCI', 'BCCI', 'Board of Cricket India');

INSERT INTO sports_entity (owner_id, entity_name, abbreviation, description) VALUES
  (1, 'India', 'IND', 'Indian National Cricket Team'), -- 36
  (1, 'West Indies', 'WIN', 'West Indies National Cricket Team'), -- 37
  (1, 'South Africa', 'SAF', 'South African National Cricket Team'), -- 38
  (1, 'Sri Lanka', 'SRI', 'Sri Lankan National Team'), -- 39
  (1, 'Zimbabwe', 'ZIM', 'Zimbabwe National Team'); -- 40

INSERT INTO sports_event (owner_id, root_id, event_name, description,
                          gender, venue_id, sports_type, sports_subtype, event_type, start_date, start_time, end_date, timezone_type)
VALUES (1, NULL, 'Hero Cup', 'Cup',
           'MALE', 2, 'CRICKET', 'CRICKET_ODI', 'ROUND', '1993-11-07', '10:00', '1993-11-27', 'VENUE');

INSERT INTO sports_event (owner_id, root_id, parent_id, left_sibling_id, event_name, description,
                          gender, venue_id, sports_type, sports_subtype, event_type, start_date, end_date)
VALUES
  (1, 80, 80, NULL, 'Group Stage', '1 groups with all teams', NULL, NULL, NULL, NULL, 'ROUND', NULL, NULL), -- 81
  (1, 80, 80, 81, 'Semifinals', 'Semi Final Stage', NULL, NULL, NULL, NULL, 'ROUND', NULL, NULL), -- 82
  (1, 80, 80, 82, 'Final', 'Championship Final', NULL, NULL, NULL, NULL, 'ROUND', NULL, NULL); -- 83

INSERT INTO sports_event (owner_id, root_id, parent_id, left_sibling_id, event_name, description,
                          gender, venue_id, sports_type, sports_subtype, event_type, start_date, end_date, treat_as_group)
VALUES
  (1, 80, 81, NULL, 'Round Robin', 'League', NULL, NULL, NULL, NULL, 'ROUND', NULL, NULL, 1); -- 84

INSERT INTO sports_group_cricket (event_id, team_id, played, won, tied, abandoned, lost,
                                  runs_for, overs_for, runs_against, overs_against, points, rank, qualified)
VALUES
  (84, 37, 4, 3, 0, 0, 1, 0, 0, 0, 0, 6, 1, 'YES'), -- +1.055
  (84, 38, 4, 2, 0, 1, 1, 0, 0, 0, 0, 5, 2, 'YES'), -- +0.543
  (84, 36, 4, 2, 1, 0, 1, 0, 0, 0, 0, 5, 3, 'YES'), -- +0.082
  (84, 39, 4, 1, 0, 0, 3, 0, 0, 0, 0, 2, 4, 'YES'), -- −0.478
  (84, 40, 4, 0, 1, 1, 2, 0, 0, 0, 0, 2, 5, 'ELIMINATED'); -- −1.260


INSERT INTO sports_event (owner_id, root_id, parent_id, left_sibling_id, event_name, description,
                          gender, venue_id, sports_type, sports_subtype, event_type, start_date, end_date)
VALUES
  (1, 80, 84, NULL, 'SRI v IND', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', '1993-11-07', NULL),
  (1, 80, 84, 85, 'WIN v SRI', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', '1993-11-09', NULL),
  (1, 80, 84, 86, 'SAF v ZIM', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', '1993-11-10', NULL),
  (1, 80, 84, 87, 'SAF v WIN', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', '1993-11-14', NULL),
  (1, 80, 84, 88, 'SRI v ZIM', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', '1993-11-15', NULL),
  (1, 80, 84, 89, 'WIN v IND', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', '1993-11-16', NULL),
  (1, 80, 84, 90, 'IND v ZIM', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', '1993-11-18', NULL),
  (1, 80, 84, 91, 'SAF v SRI', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', '1993-11-19', NULL),
  (1, 80, 84, 92, 'WIN v ZIM', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', '1993-11-21', NULL),
  (1, 80, 84, 93, 'IND v SAF', 'Group Match', NULL, NULL, NULL, NULL, 'MATCH', '1993-11-22', NULL),

  (1, 80, 82, NULL, 'IND v SAF', 'Semi 1', NULL, NULL, NULL, NULL, 'MATCH', '1993-11-24', NULL),
  (1, 80, 82, 95, 'SRI v WI', 'Semi 2', NULL, NULL, NULL, NULL, 'MATCH', '1993-11-25', NULL),

  (1, 80, 83, NULL, 'IND v WI', 'Final', NULL, NULL, NULL, NULL, 'MATCH', '1993-11-27', NULL);

INSERT INTO sports_match_cricket (event_id, first_team_id, second_team_id, home_team, result, result_stage,
                                  inn1_score_A, inn1_wickets_A, inn1_overs_A, inn1_eff_overs_A,
                                  inn1_score_B, inn1_wickets_B, inn1_overs_B, inn1_eff_overs_B,
                                  revised_target_runs, revised_target_overs,
                                  win_runs_margin, win_wkts_margin)
VALUES
  (85, 39, 36, 'SECOND', 'SECOND', 'REGULAR', 202, 10, 49.4, 50, 205, 3, 44.4, 44.4, NULL, NULL, NULL, 7),
  (86, 37, 39, 'NEUTRAL', 'FIRST', 'REGULAR', 268, 8, 50, NULL, 222, 8, 50, NULL, NULL, NULL, 46, NULL),
  (87, 38, 40, 'NEUTRAL', 'ABANDONED', 'REGULAR', 22, 1, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
  (88, 38, 37, 'NEUTRAL', 'FIRST', 'REGULAR', 180, 5, 40, NULL, 139, 10, 37, 40, NULL, NULL, 41, NULL),
  (89, 39, 40, 'NEUTRAL', 'FIRST', 'REGULAR', 263, 6, 50, NULL, 208, 10, 49, 50, NULL, NULL, 55, NULL),

  (90, 37, 36, 'SECOND', 'FIRST', 'REGULAR', 202, 7, 50, NULL, 100, 10, 28.3, 38, 170, 38, 69, NULL),
  (91, 36, 40, 'FIRST', 'TIE', 'REGULAR', 248, 5, 50, NULL, 248, 10, 50, NULL, NULL, NULL, NULL, NULL),
  (92, 38, 39, 'NEUTRAL', 'FIRST', 'REGULAR', 214, 7, 50, NULL, 136, 10, 40.1, 50, NULL, NULL, 78, NULL),
  (93, 37, 40, 'NEUTRAL', 'FIRST', 'REGULAR', 239, 9, 50, NULL, 99, 10, 36.3, 50, NULL, NULL, 134, NULL),
  (94, 36, 38, 'FIRST', 'FIRST', 'REGULAR', 221, 10, 49.2, 50, 178, 9, 50, NULL, NULL, NULL, 43, NULL),

  (95, 36, 38, 'FIRST', 'FIRST', 'REGULAR', 195, 10, 50, NULL, 193, 9, 50, NULL, NULL, NULL, 2, NULL),
  (96, 39, 37, 'NEUTRAL', 'SECOND', 'REGULAR', 188, 6, 50, NULL, 190, 3, 41.5, NULL, NULL, NULL, NULL, 7),

  (97, 36, 37, 'FIRST', 'FIRST', 'REGULAR', 225, 7, 50, NULL, 123, 10, 40.1, 50, NULL, NULL, 102, 0);


INSERT INTO sports_person (full_name, gender, owner_id, created_date) VALUES
  ('Manuel Neuer', 'MALE', 1, now()),
  ('Kevin Großkreutz', 'MALE', 1, now()),
  ('Matthias Ginter', 'MALE', 1, now()),
  ('Benedikt Höwedes', 'MALE', 1, now()),
  ('Mats Hummels', 'MALE', 1, now()),
  ('Sami Khedira', 'MALE', 1, now()),
  ('Bastian Schweinsteiger', 'MALE', 1, now()),
  ('Mesut Özil', 'MALE', 1, now()),
  ('André Schürrle', 'MALE', 1, now()),
  ('Lukas Podolski', 'MALE', 1, now()),
  ('Miroslav Klose', 'MALE', 1, now()),
  ('Ron-Robert Zieler', 'MALE', 1, now()),
  ('Thomas Müller', 'MALE', 1, now()),
  ('Julian Draxler', 'MALE', 1, now()),
  ('Erik Durm', 'MALE', 1, now()),
  ('Philipp Lahm', 'MALE', 1, now()), -- He is the captain
  ('Per Mertesacker', 'MALE', 1, now()),
  ('Toni Kroos', 'MALE', 1, now()),
  ('Mario Götze', 'MALE', 1, now()),
  ('Jérôme Boateng', 'MALE', 1, now()),
  ('Shkodran Mustafi', 'MALE', 1, now()),
  ('Roman Weidenfeller', 'MALE', 1, now()),
  ('Christoph Kramer', 'MALE', 1, now()),
  ('Pele', 'MALE', 1, now()),
  ('Gary Linekar', 'MALE', 1, now());

-- We need to designate some people as captains, wicket keepers, etc. 
-- How do we do that? 				
-- 			

-- These players belong to GERMANY

INSERT INTO person_to_entity (person_id, entity_id, relationship_type) VALUES
  (1, 25, 'PLAYER'),
  (2, 25, 'PLAYER'),
  (3, 25, 'PLAYER'),
  (4, 25, 'PLAYER'),
  (5, 25, 'PLAYER'),
  (6, 25, 'PLAYER'),
  (7, 25, 'PLAYER'),
  (8, 25, 'PLAYER'),
  (9, 25, 'PLAYER'),
  (10, 25, 'PLAYER'),
  (11, 25, 'PLAYER'),
  (12, 25, 'PLAYER'),
  (13, 25, 'PLAYER'),
  (14, 25, 'PLAYER'),
  (15, 25, 'PLAYER'),
  (16, 25, 'PLAYER'),
  (17, 25, 'PLAYER'),
  (18, 25, 'PLAYER'),
  (19, 25, 'PLAYER'),
  (20, 25, 'PLAYER'),
  (21, 25, 'PLAYER'),
  (22, 25, 'PLAYER'),
  (23, 25, 'PLAYER'),
  (24, 1, 'PLAYER');

-- No person to sportsEvent since cricket and soccer are team sports


-- All these teams took part in the World Cup
INSERT INTO entity_to_event (entity_id, event_id, relationship_type) VALUES
  (1, 1, 'TEAM'),
  (2, 1, 'TEAM'),
  (3, 1, 'TEAM'),
  (4, 1, 'TEAM'),
  (5, 1, 'TEAM'),
  (6, 1, 'TEAM'),
  (7, 1, 'TEAM'),
  (8, 1, 'TEAM'),
  (9, 1, 'TEAM'),
  (10, 1, 'TEAM'),
  (11, 1, 'TEAM'),
  (12, 1, 'TEAM'),
  (13, 1, 'TEAM'),
  (14, 1, 'TEAM'),
  (15, 1, 'TEAM'),
  (16, 1, 'TEAM'),
  (17, 1, 'TEAM'),
  (18, 1, 'TEAM'),
  (19, 1, 'TEAM'),
  (20, 1, 'TEAM'),
  (21, 1, 'TEAM'),
  (22, 1, 'TEAM'),
  (23, 1, 'TEAM'),
  (24, 1, 'TEAM'),
  (25, 1, 'TEAM'),
  (26, 1, 'TEAM'),
  (27, 1, 'TEAM'),
  (28, 1, 'TEAM'),
  (29, 1, 'TEAM'),
  (30, 1, 'TEAM'),
  (31, 1, 'TEAM'),
  (32, 1, 'TEAM');

-- For Hero Cup
INSERT INTO entity_to_event (entity_id, event_id, relationship_type) VALUES
  (36, 80, 'TEAM'),
  (37, 80, 'TEAM'),
  (38, 80, 'TEAM'),
  (39, 80, 'TEAM'),
  (40, 80, 'TEAM');

-- We are linking all these players to [Germany in the World Cup] which is 25 above
INSERT INTO person_to_entity_to_event (entity_person_id, entity_event_id, relationship_type) VALUES
  (1, 25, 'PLAYER'),
  (2, 25, 'PLAYER'),
  (3, 25, 'PLAYER'),
  (4, 25, 'PLAYER'),
  (5, 25, 'PLAYER'),
  (6, 25, 'PLAYER'),
  (7, 25, 'PLAYER'),
  (8, 25, 'PLAYER'),
  (9, 25, 'PLAYER'),
  (10, 25, 'PLAYER'),
  (11, 25, 'PLAYER'),
  (12, 25, 'PLAYER'),
  (13, 25, 'PLAYER'),
  (14, 25, 'PLAYER'),
  (15, 25, 'PLAYER'),
  (16, 25, 'PLAYER'),
  (17, 25, 'PLAYER'),
  (18, 25, 'PLAYER'),
  (19, 25, 'PLAYER'),
  (20, 25, 'PLAYER'),
  (21, 25, 'PLAYER'),
  (22, 25, 'PLAYER'),
  (23, 25, 'PLAYER');

