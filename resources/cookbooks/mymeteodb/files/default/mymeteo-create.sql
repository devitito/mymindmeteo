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
 locale VARCHAR(32) NOT NULL
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

INSERT INTO mymeteo.minds ( id, name, email, password, joindate, timezone, locale ) VALUES ( '1', 'demo', 'demo@mindmeteo.com', '$2y$10$yPTMpSdcK5kdJqV1aHUpCej1gaGB81iwc8hKfXNOTLHuvS/xvdaGi', CURDATE(), 'Europe/Paris', 'fr_FR');

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