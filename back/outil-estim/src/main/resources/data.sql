-- Insert 2 estimUser
INSERT INTO estim_user (id, first_name, last_name, email) VALUES (1, 'David', 'Tennant', 'test1@test.fr');
INSERT INTO estim_user (id, first_name, last_name, email) VALUES (2, 'Matt', 'Smith', 'test2@test.fr');

-- -- Insert 2 projets
INSERT INTO project (id, name, description, child_number) VALUES (1, 'Outil Estim', 'Un outil d estimation et de suivi d avancée', 2);
INSERT INTO project (id, name, description, child_number) VALUES (2, 'APACADABRA', 'Une application de suivi d effort physique pour les personnes en situtation de handicap', 2);
--
-- -- Insert 2 sprints
INSERT INTO sprint (description, name, project_id, effective_date_from, effective_date_to, state, id, type)
VALUES ('Back et Front des formulaires de suivi de consommée/reste à faire', 'Sprint 1 Formulaires', 1, '2024-08-01', '2024-08-16', 1, 1, 1);

INSERT INTO sprint (description, name, project_id, effective_date_from, effective_date_to, state, id, type)
VALUES ('Navigation dans l application', 'Sprint 2 Navigation', 1, '2024-08-16', '2024-08-20', 0, 2, 1);

INSERT INTO sprint (description, name, project_id, effective_date_from, effective_date_to, state, id, type)
VALUES ('Création d un plateau de jeu dynamique', 'Sprint 1 Plateau Dynamique', 2, '2024-08-01', '2024-08-16', 0, 3, 1);

-- -- insert 4 tasks dans Sprint 1
INSERT INTO task (description, name, parent_sprint_id, project_id, user_id, effective_date_from, effective_date_to, priority, state, id, type)
VALUES ('Création des entités de données : (projets/sprints/taches/estimations/utilisateurs)', 'Modèles de données 1', 1, 1, 1, '2024-08-01', '2024-08-02', 1, 2, 3, 0);

INSERT INTO task (description, name, parent_sprint_id, project_id, user_id, effective_date_from, effective_date_to, priority, state, id, type)
VALUES ('Création des controller, services et repo pour les éléments du projets', 'Controller, services et repo', 1, 1, 1, '2024-08-02', '2024-08-04', 2, 1, 4, 0);

INSERT INTO task (description, name, parent_sprint_id, project_id, user_id, effective_date_from, effective_date_to, priority, state, id, type)
VALUES ('Création des formulaires dans le front avec validation des saisies', 'Formulaire front et validation', 1, 1, 2, '2024-08-05', '2024-08-08', 0, 2, 5, 0);

INSERT INTO task (description, name, parent_sprint_id, project_id, user_id, effective_date_from, effective_date_to, priority, state, id, type)
VALUES ('Appel des API dans le front et actualisation des données', 'Front: Appel API', 1, 1, 1, '2024-08-09', null, 0, 0, 6, 0);

INSERT INTO task (description, name, parent_sprint_id, project_id, user_id, effective_date_from, effective_date_to, priority, state, id, type)
VALUES ('Réalisation des tests API', 'Test API', 1, 1, null, '2024-08-09', null, 0, 0, 7, 0);

INSERT INTO task (description, name, parent_sprint_id, project_id, user_id, effective_date_from, effective_date_to, priority, state, id, type)
VALUES ('Création de routes permettant d accéder aux différentes interfaces', 'Création routes', 2, 1, 1, null, null, 1, 0, 8, 0);

INSERT INTO task (description, name, parent_sprint_id, project_id, user_id, effective_date_from, effective_date_to, priority, state, id, type)
VALUES ('Implémentation des boutons permettant d acceder aux différentes routes', 'Boutons navigations', 2, 1, null, null, null, 0, 0, 9, 0);

-- Estimations tache 1 (terminée)
INSERT INTO estimation (consommee, date, resteafaire, id, task_id, cause_ecart) VALUES (0, '2024-08-01', 1, 1, 3, '');

INSERT INTO estimation (consommee, date, resteafaire, id, task_id, cause_ecart) VALUES (1, '2024-08-02', 1, 2, 3, 'Complication utilisation classes abstraites');

INSERT INTO estimation (consommee, date, resteafaire, id, task_id, cause_ecart) VALUES (2, '2024-07-03', 0, 3, 3, '');

-- Estimations tache 2 (en cours)
INSERT INTO estimation (consommee, date, resteafaire, id, task_id, cause_ecart) VALUES (0, '2024-08-02', 2, 4, 4, '');

INSERT INTO estimation (consommee, date, resteafaire, id, task_id, cause_ecart) VALUES (1, '2024-08-03', 1, 5, 4, '');

-- Estimations tache 3 (terminée)
INSERT INTO estimation (consommee, date, resteafaire, id, task_id, cause_ecart) VALUES (0, '2024-08-05', 1, 7, 5, '');

INSERT INTO estimation (consommee, date, resteafaire, id, task_id, cause_ecart) VALUES (1, '2024-08-06', 1, 8, 5, 'Prise en main form shadcn et validation zod');

INSERT INTO estimation (consommee, date, resteafaire, id, task_id, cause_ecart) VALUES (2, '2024-08-07', 0, 9, 5, '');

-- Estimations tache 4 (a faire)
INSERT INTO estimation (consommee, date, resteafaire, id, task_id, cause_ecart) VALUES (0, '2024-08-09', 1, 10, 6, '');

