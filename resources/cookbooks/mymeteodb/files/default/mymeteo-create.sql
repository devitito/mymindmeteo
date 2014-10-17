/**
 * @author : 
 *
**/


/* A table for mymeteo minds */

CREATE TABLE mymeteo.minds(
 id varchar(32) COLLATE utf8_unicode_ci NOT NULL,
 PRIMARY KEY(id),
 name VARCHAR(64) NOT NULL,
 email VARCHAR(128) NOT NULL,
 password VARCHAR(128) NOT NULL,
 joindate DATETIME NOT NULL,
 timezone VARCHAR(64) NOT NULL,
 locale VARCHAR(32) NOT NULL,
 role VARCHAR(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE mymeteo.sensors (
  id INT NOT NULL AUTO_INCREMENT,
  label varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  img varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  topic varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  meteologist varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE mymeteo.samples (
  id varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  sensor_id INT NOT NULL,
  label varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  img varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  topic varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  value int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY IDX_19925777A247991F (sensor_id),
  CONSTRAINT FK_19925777A247991F FOREIGN KEY (sensor_id) REFERENCES sensors (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE mymeteo.records (
  id varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  mind_id varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  sensor_id int(11) NOT NULL,
  sample_id varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  date datetime NOT NULL,
  PRIMARY KEY (id),
  KEY UNIQ_9C9D584653B01993 (mind_id),
  KEY UNIQ_9C9D5846A247991F (sensor_id),
  KEY UNIQ_9C9D58461B1FEA20 (sample_id),
  CONSTRAINT FK_9C9D58461B1FEA20 FOREIGN KEY (sample_id) REFERENCES samples (id),
  CONSTRAINT FK_9C9D584653B01993 FOREIGN KEY (mind_id) REFERENCES minds (id),
  CONSTRAINT FK_9C9D5846A247991F FOREIGN KEY (sensor_id) REFERENCES sensors (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO mymeteo.minds ( id, name, email, password, joindate, timezone, locale, role ) VALUES ( '1', 'demo', 'demo@mindmeteo.com', '$2y$10$yPTMpSdcK5kdJqV1aHUpCej1gaGB81iwc8hKfXNOTLHuvS/xvdaGi', CURDATE(), 'Europe/Paris', 'fr_FR', 'demo');
INSERT INTO mymeteo.minds ( id, name, email, password, joindate, timezone, locale, role ) VALUES ( '2', 'admin', 'admin@mindmeteo.com', '$2y$10$8i.02hK7esoy9lD/dSZsHuXeF.jB.PzLP1wyhRLFpxjWnXH5AIzkO', CURDATE(), 'Europe/Paris', 'fr_FR', 'admin');

INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (1,'Did you wash your teeth this morning?',NULL,'love','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (2,'Did you eat garlig today?',NULL,'love','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (3,'Did you run out of toilet paper today?',NULL,'health','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (4,'Did you find a car/bike park immediatly?',NULL,'health','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (5,'Did you have an hangover yesterday?',NULL,'money','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (6,'Do you have an hangover today?',NULL,'health','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (7,'Did you win at the lotery?',NULL,'money','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (8,'Did you blow some red spot on your face today?',NULL,'love','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (9,'Did you forget your girlfriend birthday today?',NULL,'love','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (10,'Is it your birthday today?',NULL,'health','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (11,'How was your caca today?',NULL,'health','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (12,'Did you give to the beggars today?',NULL,'money','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (13,'Did you see a beautiful stranger smiling at you today?',NULL,'health','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (14,'Did you see a beautiful stranger today?',NULL,'health','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (15,'Is it raining today and you forgot to waterproof your shoes?',NULL,'health','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (16,'Did you say no to your boss today?',NULL,'health','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (17,'Is there a new tigger shop near your job/appartement?',NULL,'money','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (18,'Are you going somewhere this weekend?',NULL,'money','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (19,'Did you change your underwears this morning?',NULL,'love','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (20,'Which one do you prefer:',NULL,'money','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (21,'Did you score yesterday?',NULL,'health','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (22,'What\'s your plans tonight?',NULL,'money','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (23,'What do you need the most:',NULL,'money','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (24,'Did you leave your sit in the bus/tram/metro for a granny/pregnant woman?',NULL,'health','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (25,'Did you step into dog poo before a job interview?',NULL,'money','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (26,'Did you meet your neighboor lately?',NULL,'money','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (27,'Did you find a white hair in your head today?',NULL,'money','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (28,'Did you fart in the bed while your partner was \"sleeping\"? ',NULL,'love','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (29,'Did you pee outside the bowl this morning?',NULL,'love','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (30,'Did you take the trashbag to the container this morning?',NULL,'love','Mind Meteo');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist) VALUES (31,'Is it a \"good hair\" day?',NULL,'love','Mind Meteo');

INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353cacaf2aa',1,'Yes',NULL,'love',0);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353cacaf337',1,'No',NULL,'love',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353cc690402',2,'Yes',NULL,'love',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353cc69048f',2,'No',NULL,'love',0);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353d35dbf12',3,'Yes',NULL,'health',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353d35dbf9f',3,'No',NULL,'health',0);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353d7e0e378',4,'No',NULL,'health',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353d7e0e404',4,'Yes',NULL,'health',5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353da6d5b73',5,'Yes',NULL,'money',-6);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353da6d5bff',5,'No',NULL,'money',0);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353dc6698ca',6,'Yes',NULL,'health',-6);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353dc669954',6,'No',NULL,'health',0);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353de177f64',7,'Yes',NULL,'money',10);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353de177ff0',7,'No',NULL,'money',0);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353e1b60e7e',8,'Yes',NULL,'love',-2);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353e1b60f08',8,'No',NULL,'love',0);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353e4067385',9,'Yes',NULL,'love',-10);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353e4067411',9,'No',NULL,'love',5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353e5ee0579',10,'Yes',NULL,'health',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353e5ee0607',10,'No',NULL,'health',0);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353e8ea0538',11,'Soft and good',NULL,'health',3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353e8ea05c5',11,'Hard or liquid',NULL,'health',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353ea94cb90',12,'Yes',NULL,'money',-1);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353ea94cc24',12,'No',NULL,'money',0);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353ed5e4e39',13,'Yes',NULL,'health',5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353ed5e4ec6',13,'No',NULL,'health',-1);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353f03cff1b',14,'Yes',NULL,'health',2);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353f03cffa9',14,'No',NULL,'health',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353f3f3fd2a',15,'Yes',NULL,'health',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353f3f3fdb4',15,'No',NULL,'health',3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353f65a14f8',16,'Yes',NULL,'health',10);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353f65a1588',16,'No',NULL,'health',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353fc080854',17,'Yes',NULL,'money',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353fc0808e1',17,'No',NULL,'money',5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('543540318251b',18,'Yes',NULL,'money',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54354031825a6',18,'No',NULL,'money',2);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5437c0365d65a',19,'Yes',NULL,'love',0);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5437c0365d6ea',19,'No',NULL,'love',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5437c05f0c0b8',20,'Cat',NULL,'money',3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5437c05f0c147',20,'Dog',NULL,'money',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5437c08d1b5bf',21,'Big time!',NULL,'health',10);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5437c08d1b64e',21,'Nop...',NULL,'health',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5437c0c545603',22,'Bar',NULL,'money',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5437c0c5456d8',22,'Exercice',NULL,'money',5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5437c0f7045b1',23,'A new pair of socks',NULL,'money',-1);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5437c0f704647',23,'A new trowser',NULL,'money',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5437c12a92160',24,'Yes',NULL,'health',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5437c12a921f1',24,'No',NULL,'health',3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('543d141bb0ec1',25,'Yes',NULL,'money',-1);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('543d141bb0f45',25,'No',NULL,'money',1);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('543d14cd0aa1b',26,'On your way back from the pub',NULL,'money',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('543d14cd0aaa3',26,'After running an hour',NULL,'money',5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('543f90402ac15',27,'Yes',NULL,'money',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('543f90402ad2b',27,'No',NULL,'money',3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('543f912a7be95',28,'Oups... Yes :)',NULL,'love',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('543f912a7bf51',28,'Nooo!',NULL,'love',5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('543fbe3aeafb5',29,'Yes sorry...',NULL,'love',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('543fbe3aeb047',29,'Pfff! No! I aimed in target!',NULL,'love',1);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('543fbe6adf2e3',30,'Of course!',NULL,'love',3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('543fbe6adf369',30,'Oups... I was in a hurry!',NULL,'love',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('544104a9595cb',31,'Definit-ly!',NULL,'love',2);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('544104a959de0',31,'I want to be bold!',NULL,'love',-3);

INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543542433bb5d','1',2,'54353cc69048f','2014-10-08 13:55:15');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5435424787f05','1',1,'54353cacaf337','2014-10-08 13:55:19');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5435424b14f00','1',1,'54353cacaf337','2014-10-08 13:55:23');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5435424ebdaf1','1',10,'54353e5ee0607','2014-10-08 13:55:26');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5435425250234','1',9,'54353e4067411','2014-10-08 13:55:30');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5435425891da6','1',16,'54353f65a14f8','2014-10-08 13:55:36');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5435425df3d3e','1',11,'54353e8ea05c5','2014-10-08 13:55:42');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5435426263d22','1',13,'54353ed5e4ec6','2014-10-08 13:55:46');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543542669df4c','1',3,'54353d35dbf9f','2014-10-08 13:55:50');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5435426b71fb9','1',18,'543540318251b','2014-10-08 13:55:55');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54354271852e1','1',4,'54353d7e0e378','2014-10-08 13:56:01');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5435427514a59','1',4,'54353d7e0e404','2014-10-08 13:56:05');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5435427972246','1',6,'54353dc669954','2014-10-08 13:56:09');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5435427fbccf5','1',10,'54353e5ee0607','2014-10-08 13:56:15');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543542858a5e3','1',15,'54353f3f3fdb4','2014-10-08 13:56:21');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5436635815a4d','1',7,'54353de177ff0','2014-10-09 10:28:40');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5436647ce343f','1',5,'54353da6d5bff','2014-10-09 10:33:32');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5436648631185','1',10,'54353e5ee0607','2014-10-09 10:33:42');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5436648b3df97','1',2,'54353cc69048f','2014-10-09 10:33:47');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54368c7c5f955','1',1,'54353cacaf337','2014-10-09 13:24:12');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54368c9d232bf','1',11,'54353e8ea0538','2014-10-09 13:24:45');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54368d2fa65a6','1',4,'54353d7e0e404','2014-10-09 13:27:11');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54368d3b8b88b','1',4,'54353d7e0e404','2014-10-09 13:27:23');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54368d45e4f82','1',4,'54353d7e0e404','2014-10-09 13:27:33');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54368dab021f6','1',4,'54353d7e0e404','2014-10-09 13:29:15');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54368dc7700af','1',4,'54353d7e0e404','2014-10-09 13:29:43');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54368ddc88cc8','1',4,'54353d7e0e404','2014-10-09 13:30:04');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54368e7ee98cf','1',4,'54353d7e0e404','2014-10-09 13:32:46');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54368eaa955db','1',4,'54353d7e0e404','2014-10-09 13:33:30');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54368ee0e6b9a','1',4,'54353d7e0e404','2014-10-09 13:34:24');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54368f2a42f02','1',4,'54353d7e0e404','2014-10-09 13:35:38');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54368f5f4302c','1',4,'54353d7e0e404','2014-10-09 13:36:31');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54368f97865ff','1',4,'54353d7e0e404','2014-10-09 13:37:27');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54368faf27dae','1',4,'54353d7e0e404','2014-10-09 13:37:51');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54368fcc7e130','1',4,'54353d7e0e404','2014-10-09 13:38:20');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54368fec0f6f5','1',13,'54353ed5e4ec6','2014-10-09 13:38:52');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54368ff2aae8f','1',15,'54353f3f3fdb4','2014-10-09 13:38:58');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54368ffa527ab','1',17,'54353fc0808e1','2014-10-09 13:39:06');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543697ebf33f7','1',4,'54353d7e0e404','2014-10-09 14:13:00');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543697f31fe96','1',13,'54353ed5e4ec6','2014-10-09 14:13:07');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543697f72d06e','1',9,'54353e4067411','2014-10-09 14:13:11');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5437bc437a0fd','1',7,'54353de177ff0','2014-10-10 11:00:19');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5437bc4a5737a','1',8,'54353e1b60e7e','2014-10-10 11:00:26');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5437bc4f82db5','1',18,'543540318251b','2014-10-10 11:00:31');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5437bc5417eac','1',5,'54353da6d5bff','2014-10-10 11:00:36');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5437bc587f60c','1',15,'54353f3f3fdb4','2014-10-10 11:00:40');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5437bc5d6fcf2','1',12,'54353ea94cc24','2014-10-10 11:00:45');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5437bc61660ce','1',5,'54353da6d5bff','2014-10-10 11:00:49');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5437bc64a4e8b','1',10,'54353e5ee0607','2014-10-10 11:00:52');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5437bc6b3b872','1',16,'54353f65a1588','2014-10-10 11:00:59');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5437bd704e722','1',14,'54353f03cffa9','2014-10-10 11:05:20');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5437bd889a4c2','1',18,'543540318251b','2014-10-10 11:05:44');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5437bfad2fef5','1',10,'54353e5ee0607','2014-10-10 11:14:53');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5437c2785a290','1',10,'54353e5ee0607','2014-10-10 11:26:48');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5437c27fc3358','1',4,'54353d7e0e404','2014-10-10 11:26:55');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5437c285b9452','1',18,'543540318251b','2014-10-10 11:27:01');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5437c28ada83e','1',10,'54353e5ee0607','2014-10-10 11:27:06');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5437c291c5557','1',10,'54353e5ee0607','2014-10-10 11:27:13');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5437c29763256','1',21,'5437c08d1b64e','2014-10-10 11:27:19');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5437c29b35026','1',12,'54353ea94cc24','2014-10-10 11:27:23');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543b9b17c807b','1',3,'54353d35dbf9f','2014-10-13 09:27:51');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543b9b1c8fc01','1',4,'54353d7e0e404','2014-10-13 09:27:56');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543b9b1f06a28','1',9,'54353e4067411','2014-10-13 09:27:59');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543b9b216c824','1',7,'54353de177ff0','2014-10-13 09:28:01');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543b9b246fcc5','1',12,'54353ea94cc24','2014-10-13 09:28:04');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543b9b263d0ad','1',10,'54353e5ee0607','2014-10-13 09:28:06');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543b9b28e3890','1',21,'5437c08d1b5bf','2014-10-13 09:28:08');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543b9b2bb1b34','1',14,'54353f03cff1b','2014-10-13 09:28:11');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba188404e6','1',2,'54353cc69048f','2014-10-13 09:55:20');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba18b76559','1',10,'54353e5ee0607','2014-10-13 09:55:23');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba1911005f','1',16,'54353f65a1588','2014-10-13 09:55:29');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba195a0be2','1',19,'5437c0365d65a','2014-10-13 09:55:33');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba19a60fe7','1',11,'54353e8ea05c5','2014-10-13 09:55:38');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba19ed8c5f','1',14,'54353f03cff1b','2014-10-13 09:55:42');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba1f2293a4','1',19,'5437c0365d65a','2014-10-13 09:57:06');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba1f57cf4c','1',19,'5437c0365d65a','2014-10-13 09:57:09');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba1fb81106','1',24,'5437c12a921f1','2014-10-13 09:57:15');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba1fec8eea','1',4,'54353d7e0e404','2014-10-13 09:57:18');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba2020b9b1','1',3,'54353d35dbf9f','2014-10-13 09:57:22');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba20641a7e','1',23,'5437c0f704647','2014-10-13 09:57:26');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba209bc0c6','1',6,'54353dc669954','2014-10-13 09:57:29');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba20e2b54c','1',8,'54353e1b60f08','2014-10-13 09:57:34');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba2125969f','1',17,'54353fc0808e1','2014-10-13 09:57:38');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba21613e79','1',4,'54353d7e0e404','2014-10-13 09:57:42');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba21b87839','1',16,'54353f65a1588','2014-10-13 09:57:47');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba21fe5987','1',18,'543540318251b','2014-10-13 09:57:51');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba2243e640','1',22,'5437c0c5456d8','2014-10-13 09:57:56');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba22967e19','1',1,'54353cacaf337','2014-10-13 09:58:01');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba2ac56822','1',4,'54353d7e0e404','2014-10-13 10:00:12');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba3f9c7fde','1',18,'543540318251b','2014-10-13 10:05:45');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba531bd932','1',16,'54353f65a1588','2014-10-13 10:10:57');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba6198a547','1',15,'54353f3f3fdb4','2014-10-13 10:14:49');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba6768aaae','1',14,'54353f03cff1b','2014-10-13 10:16:22');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba680cae71','1',6,'54353dc669954','2014-10-13 10:16:32');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba68a69e8e','1',4,'54353d7e0e404','2014-10-13 10:16:42');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba68ec3fd3','1',24,'5437c12a921f1','2014-10-13 10:16:46');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba693276b9','1',22,'5437c0c545603','2014-10-13 10:16:51');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba69756912','1',23,'5437c0f704647','2014-10-13 10:16:55');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba69baf786','1',22,'5437c0c545603','2014-10-13 10:16:59');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba6a096ae5','1',13,'54353ed5e4ec6','2014-10-13 10:17:04');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba7f7e43bf','1',4,'54353d7e0e404','2014-10-13 10:22:47');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba7fc2b69f','1',3,'54353d35dbf9f','2014-10-13 10:22:52');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba7ff3f213','1',12,'54353ea94cc24','2014-10-13 10:22:55');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba804085f3','1',13,'54353ed5e4ec6','2014-10-13 10:23:00');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba82cbd08e','1',12,'54353ea94cc24','2014-10-13 10:23:40');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba8311a869','1',24,'5437c12a921f1','2014-10-13 10:23:45');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba8345f1d5','1',5,'54353da6d5bff','2014-10-13 10:23:48');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba838ea13c','1',8,'54353e1b60f08','2014-10-13 10:23:52');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ba83d26616','1',23,'5437c0f704647','2014-10-13 10:23:57');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543bb0182443b','1',17,'54353fc0808e1','2014-10-13 10:57:28');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543bb256e133b','1',21,'5437c08d1b5bf','2014-10-13 11:07:02');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543bb2be96c93','1',2,'54353cc69048f','2014-10-13 11:08:46');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543bb32c21309','1',10,'54353e5ee0607','2014-10-13 11:10:36');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543bd105207da','1',17,'54353fc0808e1','2014-10-13 13:17:57');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543bd45f5c03f','1',1,'54353cacaf337','2014-10-13 13:32:15');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543bd4b399280','1',12,'54353ea94cc24','2014-10-13 13:33:39');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543bd4c28d0cc','1',2,'54353cc69048f','2014-10-13 13:33:54');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543bd55dc7978','1',8,'54353e1b60f08','2014-10-13 13:36:29');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543bd5dbe706d','1',14,'54353f03cff1b','2014-10-13 13:38:35');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543bd6aedf6e2','1',19,'5437c0365d65a','2014-10-13 13:42:06');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543bd6c2ceffd','1',22,'5437c0c545603','2014-10-13 13:42:26');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543bd93b9c4eb','1',4,'54353d7e0e404','2014-10-13 13:52:59');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543bf453ee3f2','1',9,'54353e4067411','2014-10-13 15:48:36');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ccea057a51','1',9,'54353e4067411','2014-10-14 07:20:00');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ccea3a9c45','1',24,'5437c12a921f1','2014-10-14 07:20:03');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ccea6b071e','1',4,'54353d7e0e404','2014-10-14 07:20:06');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ccea8bb5db','1',9,'54353e4067411','2014-10-14 07:20:08');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543cceac6feac','1',20,'5437c05f0c147','2014-10-14 07:20:12');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543cceaeb5468','1',19,'5437c0365d65a','2014-10-14 07:20:14');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543cceb128265','1',23,'5437c0f704647','2014-10-14 07:20:17');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543cceb42a1f7','1',5,'54353da6d5bff','2014-10-14 07:20:20');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543cceb61c673','1',10,'54353e5ee0607','2014-10-14 07:20:22');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543cceb8bb521','1',9,'54353e4067411','2014-10-14 07:20:24');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ccebe04556','1',22,'5437c0c5456d8','2014-10-14 07:20:30');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ccec104128','1',20,'5437c05f0c147','2014-10-14 07:20:33');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543ccec313aa0','1',14,'54353f03cffa9','2014-10-14 07:20:35');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543e3b1d05128','1',12,'54353ea94cc24','2014-10-15 09:15:09');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543e3b1f7a245','1',5,'54353da6d5bff','2014-10-15 09:15:11');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543e3b25ecd51','1',26,'543d14cd0aaa3','2014-10-15 09:15:18');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543e3b289b3db','1',6,'54353dc669954','2014-10-15 09:15:20');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543e3b2c2e4ea','1',21,'5437c08d1b5bf','2014-10-15 09:15:24');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543e3b2fb033a','1',17,'54353fc0808e1','2014-10-15 09:15:27');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543e3fb59367d','1',3,'54353d35dbf9f','2014-10-15 09:34:45');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543e3fba05bbc','1',10,'54353e5ee0607','2014-10-15 09:34:50');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543e3fbeac1a2','1',12,'54353ea94cc24','2014-10-15 09:34:54');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543e3fc2a5e74','1',6,'54353dc669954','2014-10-15 09:34:58');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543e3fc739534','1',22,'5437c0c545603','2014-10-15 09:35:03');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543e3fca279a8','1',19,'5437c0365d65a','2014-10-15 09:35:06');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543e40f8cfd3c','1',18,'543540318251b','2014-10-15 09:40:08');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543e40fc6b1aa','1',13,'54353ed5e4ec6','2014-10-15 09:40:12');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543e410fbd4ec','1',1,'54353cacaf337','2014-10-15 09:40:31');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543f904d4c30c','1',10,'54353e5ee0607','2014-10-16 09:30:53');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543f905165420','1',22,'5437c0c545603','2014-10-16 09:30:57');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543f905c6fdb5','1',1,'54353cacaf2aa','2014-10-16 09:31:08');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543f90643e975','1',18,'543540318251b','2014-10-16 09:31:16');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543f907eed246','1',27,'543f90402ad2b','2014-10-16 09:31:42');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543f913b4dc8c','1',28,'543f912a7bf51','2014-10-16 09:34:51');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543f92e2afe05','1',12,'54353ea94cc24','2014-10-16 09:41:54');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543f92e58c58c','1',11,'54353e8ea0538','2014-10-16 09:41:57');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543f92ead3a39','1',3,'54353d35dbf9f','2014-10-16 09:42:02');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543f92ed7dd7a','1',2,'54353cc69048f','2014-10-16 09:42:05');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543f92efc3f12','1',5,'54353da6d5bff','2014-10-16 09:42:07');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543f92f200879','1',14,'54353f03cffa9','2014-10-16 09:42:10');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543fbe89a030d','1',19,'5437c0365d65a','2014-10-16 12:48:09');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543fbe8dbc16f','1',28,'543f912a7bf51','2014-10-16 12:48:13');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543fbe9154c1d','1',8,'54353e1b60f08','2014-10-16 12:48:17');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543fbe93aacb4','1',2,'54353cc69048f','2014-10-16 12:48:19');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543fbe9b36d75','1',30,'543fbe6adf369','2014-10-16 12:48:27');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543fbe9dd2588','1',5,'54353da6d5bff','2014-10-16 12:48:29');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543fbea9028eb','1',26,'543d14cd0aaa3','2014-10-16 12:48:41');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('543fbeb679caf','1',23,'5437c0f704647','2014-10-16 12:48:54');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5440da331ed6c','1',5,'54353da6d5bff','2014-10-17 08:58:29');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5440da45207b1','1',21,'5437c08d1b5bf','2014-10-17 08:58:45');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5440da4816053','1',23,'5437c0f704647','2014-10-17 08:58:48');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5440da4a63b3d','1',18,'543540318251b','2014-10-17 08:58:50');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5440da56cb2f9','1',3,'54353d35dbf9f','2014-10-17 08:59:02');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5440da5d5db9d','1',7,'54353de177ff0','2014-10-17 08:59:09');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5440da65e62e7','1',30,'543fbe6adf369','2014-10-17 08:59:17');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5440da694ed11','1',28,'543f912a7bf51','2014-10-17 08:59:21');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5440da748acb9','1',13,'54353ed5e4ec6','2014-10-17 08:59:32');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5440da795a392','1',8,'54353e1b60f08','2014-10-17 08:59:37');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('544104d8685d7','1',27,'543f90402ad2b','2014-10-17 12:00:24');