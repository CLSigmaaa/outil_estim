-- 2 projets, chacun 1 sprint et 1 user story. Le 1er sprint contient 1 ensemble et 1 US. Le 2e sprint contient 1 ensemble, 1 ensemble enfant et 1 US imbriqué.
INSERT INTO project (id, name, description, child_number) VALUES (1, 'Project 1', 'Description for Project 1', 2);
INSERT INTO project (id, name, description, child_number) VALUES (2, 'Project 2', 'Description for Project 2', 2);

insert into sprint (commentaires,description,name,parent_item_id,project_id,type,effective_date_from,effective_date_to,state,id) values ('Commentaires for Sprint 1','Description for Sprint 1','Sprint 1',null,1,2,null,null,0,3);
insert into project_children (project_id,children_id) values (1,3);

insert into sprint (commentaires,description,name,parent_item_id,project_id,type,effective_date_from,effective_date_to,state,id) values ('Commentaires for Sprint 2','Description for Sprint 2','Sprint 2',null,2,2,null,null,0,4);
insert into project_children (project_id,children_id) values (2,4);

insert into user_story (commentaires,description,name,parent_item_id,project_id,type,effective_date_from,effective_date_to,estimation,priority,state,version,id) values ('Commentaires for US 1','Description for US 1','US 1',3,1,0,null,null,1,1,0,1,5);
insert into sprint_children (sprint_id,children_id) values (3,5);

insert into ensemble (commentaires,description,name,parent_item_id,project_id,type,id) values ('Commentaires for Ensemble 1','Description for Ensemble 1','Ensemble 1',3,1,1,6);
insert into sprint_children (sprint_id,children_id) values (3,6);

insert into user_story (commentaires,description,name,parent_item_id,project_id,type,effective_date_from,effective_date_to,estimation,priority,state,version,id) values ('Commentaires for US 2','Description for US 2','US 2',4,1,0,null,null,1,1,0,1,7);
insert into sprint_children (sprint_id,children_id) values (4,7);

insert into user_story (commentaires,description,name,parent_item_id,project_id,type,effective_date_from,effective_date_to,estimation,priority,state,version,id) values ('Commentaires for US 3','Description for US 3','US 3',6,2,0,null,null,1,1,0,1,8);
insert into ensemble_children (ensemble_id,children_id) values (6,8);

