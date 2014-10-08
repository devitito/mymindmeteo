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
 timezone VARCHAR(64) NOT NULL
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

INSERT INTO mymeteo.minds ( id, name, email, password, joindate, timezone ) VALUES ( '1', 'demo', 'demo@mindmeteo.com', '$2y$10$yPTMpSdcK5kdJqV1aHUpCej1gaGB81iwc8hKfXNOTLHuvS/xvdaGi', CURDATE(), 'Europe/Paris');

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