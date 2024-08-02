-- 2 projets, chacun 1 sprint et 1 user story. Le 1er sprint contient 1 ensemble et 1 US. Le 2e sprint contient 1 ensemble, 1 ensemble enfant et 1 US imbriqué.
INSERT INTO project (id, name, description, child_number) VALUES (1, 'Project 1', 'Description for Project 1', 2);
INSERT INTO project (id, name, description, child_number) VALUES (2, 'Project 2', 'Description for Project 2', 2);

insert into sprint (commentaires,description,name,parent_item_id,project_id,effective_date_from,effective_date_to,state,id, type) values ('Commentaires for Sprint 1','Description for Sprint 1','Sprint 1',null,1,'2024-07-01','2024-07-30',2,3, 2);
insert into project_children (project_id,children_id) values (1,3);

insert into sprint (commentaires,description,name,parent_item_id,project_id,effective_date_from,effective_date_to,state,id, type) values ('Commentaires for Sprint 2','Description for Sprint 2','Sprint 2',null,2,'2024-07-01','2024-07-30',2,4, 2);
insert into project_children (project_id,children_id) values (2,4);

insert into user_story (commentaires,description,name,parent_item_id,project_id,effective_date_from,effective_date_to,estimation,priority,state,version,id, type) values ('Commentaires for US 1','Description for US 1','US 1',3,1,'2024-07-01','2024-07-07',10,1,2,1,5, 0);
insert into sprint_children (sprint_id,children_id) values (3,5);

insert into user_story (commentaires,description,name,parent_item_id,project_id,effective_date_from,effective_date_to,estimation,priority,state,version,id, type) values ('Commentaires for US 2','Description for US 2','US 2',3,1,'2024-07-03','2024-07-10',15,1,2,1,6, 0);
insert into sprint_children (sprint_id,children_id) values (3,6);

insert into user_story (commentaires,description,name,parent_item_id,project_id,effective_date_from,effective_date_to,estimation,priority,state,version,id, type) values ('Commentaires for US 3','Description for US 3','US 3',3,1,'2024-07-05','2024-07-11',20,1,2,1,7, 0);
insert into sprint_children (sprint_id,children_id) values (3,7);

insert into user_story (commentaires,description,name,parent_item_id,project_id,effective_date_from,effective_date_to,estimation,priority,state,version,id, type) values ('Commentaires for US 4','Description for US 4','US 4',3,1,'2024-07-08','2024-07-15',5,1,2,1,8, 0);
insert into sprint_children (sprint_id,children_id) values (3,8);

insert into user_story (commentaires,description,name,parent_item_id,project_id,effective_date_from,effective_date_to,estimation,priority,state,version,id, type) values ('Commentaires for US 5','Description for US 5','US 5',3,1,'2024-07-14','2024-07-19',25,1,2,1,9, 0);
insert into sprint_children (sprint_id,children_id) values (3,9);

insert into user_story (commentaires,description,name,parent_item_id,project_id,effective_date_from,effective_date_to,estimation,priority,state,version,id, type) values ('Commentaires for US 6','Description for US 6','US 6',3,1,'2024-07-17','2024-07-22',10,1,2,1,10, 0);
insert into sprint_children (sprint_id,children_id) values (3,10);

insert into user_story (commentaires,description,name,parent_item_id,project_id,effective_date_from,effective_date_to,estimation,priority,state,version,id, type) values ('Commentaires for US 7','Description for US 7','US 7',3,1,'2024-07-20','2024-07-24',15,1,2,1,11, 0);
insert into sprint_children (sprint_id,children_id) values (3,11);

insert into ensemble (commentaires,description,name,parent_item_id,project_id,id, type) values ('Commentaires for Ensemble 1','Description for Ensemble 1','Ensemble 1',3,1,12, 1);
insert into sprint_children (sprint_id,children_id) values (3,12);

insert into user_story (commentaires,description,name,parent_item_id,project_id,effective_date_from,effective_date_to,estimation,priority,state,version,id, type) values ('Commentaires for US 8','Description for US 8','US 8',6,2,'2024-07-25','2024-07-29',20,1,2,1,13, 0);
insert into ensemble_children (ensemble_id,children_id) values (12,13);

insert into user_story (commentaires,description,name,parent_item_id,project_id,effective_date_from,effective_date_to,estimation,priority,state,version,id, type) values ('Commentaires for US 9','Description for US 9','US 9',4,1,'2024-07-01','2024-07-30',15,1,2,1,14, 0);
insert into sprint_children (sprint_id,children_id) values (4,14);



