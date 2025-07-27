USE sinferno;

-- SELECT * FROM user_profile;
-- -- SELECT * FROM sports_entity
-- SELECT * FROM sports_event;
-- SELECT * FROM sports_match_soccer;

SELECT sev2.event_name, sev1.event_name, se1.entity_name, se2.entity_name,
	case WHEN result = 'FIRST' THEN se1.entity_name
     WHEN result = 'SECOND' THEN se2.entity_name
	 ELSE '-Drawn-' END AS 'Winner',
	CASE WHEN result_stage = 'PENALTY' THEN 
		concat(
            penalty_first, ' - ', penalty_second,
			' [', overtime_first + regular_time_first, ' - ',  overtime_second + regular_time_second, '] '
			' (', regular_time_first, ' - ', regular_time_second, ')')
		WHEN result_stage = 'OVERTIME' THEN 
		concat(overtime_first + regular_time_first, ' - ',  overtime_second + regular_time_second, 
			' (', regular_time_first, ' - ', regular_time_second, ')')
		ELSE
			concat(regular_time_first, ' - ', regular_time_second)
	END AS 'Score',
	CASE WHEN home_team = 'FIRST' THEN se1.entity_name
		WHEN home_team = 'SECOND' THEN se2.entity_name
		ELSE ''
	END AS 'Home Team'
-- sms.*  (Use sms.regular to get overtime penalties, etc.)
FROM sports_match_soccer sms
LEFT OUTER JOIN sports_entity se1 ON sms.first_team_id = se1.sports_entity_id
LEFT OUTER JOIN sports_entity se2 ON sms.second_team_id = se2.sports_entity_id
LEFT OUTER JOIN sports_event sev1 ON sms.event_id = sev1.event_id
LEFT OUTER JOIN sports_event sev2 ON sev1.parent_id = sev2.event_id;

SELECT sev.event_name AS 'Group', se.entity_name,
	played, won, drew, lost, goals_for, goals_against, goals_for - goals_against AS goal_diff, points, qualified
FROM sports_group_soccer sgs
LEFT OUTER JOIN sports_entity se ON se.sports_entity_id = sgs.team_id
LEFT OUTER JOIN sports_event sev ON sev.event_id = sgs.event_id
-- ORDER BY points DESC, goal_diff DESC 
;
-- Validations
SELECT * FROM sports_group_soccer 
WHERE played <> 3
OR (won + drew + lost <> 3)
OR (won * 3 + drew <> points)

;

SELECT event_id, sum(won), sum(lost), sum(drew), sum(goals_for), sum(goals_against)
FROM sports_group_soccer
GROUP BY event_id
;

SELECT * FROM sports_match_soccer;


SELECT sports_entity_id, entity_name FROM sports_entity
WHERE abbreviation in ('BRA', 'NED', 'COL', 'CRC', 'FRA','GER', 'ARG', 'BEL');


