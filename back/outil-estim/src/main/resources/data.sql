--
-- -- Insert 2 projets
INSERT INTO project (id, name, description, child_number) VALUES (1, 'Project 1', 'Description for Project 1', 2);
INSERT INTO project (id, name, description, child_number) VALUES (2, 'Project 2', 'Description for Project 2', 2);
--
-- -- Insert 2 sprints
INSERT INTO sprint (description, name, project_id, effective_date_from, effective_date_to, state, id, type)
VALUES ('Description for Sprint 1', 'Sprint 1', 1, '2024-07-01', '2024-07-30', 1, 1, 1);

INSERT INTO sprint (description, name, project_id, effective_date_from, effective_date_to, state, id, type)
VALUES ('Description for Sprint 2', 'Sprint 2', 1, '2024-08-01', '2024-08-30', 2, 2, 1);

INSERT INTO sprint (description, name, project_id, effective_date_from, effective_date_to, state, id, type)
VALUES ('Description for Sprint 2', 'Sprint 2', 2, '2024-08-01', '2024-08-30', 2, 3, 1);

-- -- insert 4 tasks dans Sprint 1
INSERT INTO task (description, name, parent_sprint_id, project_id, effective_date_from, effective_date_to, priority, state, id, type)
VALUES ('Description for task 1', 'Task 1', 1, 2, '2024-07-01', '2024-07-07', 1, 2, 3, 0);

INSERT INTO task (description, name, parent_sprint_id, project_id, effective_date_from, effective_date_to, priority, state, id, type)
VALUES ('Description for task 2', 'Task 2', 1, 2, '2024-07-03', '2024-07-10', 1, 2, 4, 0);

INSERT INTO task (description, name, parent_sprint_id, project_id, effective_date_from, effective_date_to, priority, state, id, type)
VALUES ('Description for task 3', 'Task 3', 1, 2, '2024-07-05', '2024-07-11', 1, 2, 5, 0);

INSERT INTO task (description, name, parent_sprint_id, project_id, effective_date_from, effective_date_to, priority, state, id, type)
VALUES ('Description for task 4', 'Task 4', 1, 2, '2024-07-08', '2024-07-15', 1, 2, 6, 0);

-- -- add 4 estimations to task 1
INSERT INTO estimation (consommee, date, resteafaire, id, task_id, cause_ecart) VALUES (0, '2024-07-01', 5, 1, 3, 'Cause ecart 1');

INSERT INTO estimation (consommee, date, resteafaire, id, task_id, cause_ecart) VALUES (1, '2024-07-02', 4, 2, 3, 'Cause ecart 2');

INSERT INTO estimation (consommee, date, resteafaire, id, task_id, cause_ecart) VALUES (2, '2024-07-03', 3.5, 3, 3, 'Cause ecart 3');

INSERT INTO estimation (consommee, date, resteafaire, id, task_id, cause_ecart) VALUES (3, '2024-07-04', 3, 4, 3, 'Cause ecart 4');
