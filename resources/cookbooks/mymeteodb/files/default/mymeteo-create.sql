/**
 * @author : 
 *
**/


/* A table for mymeteo minds */

CREATE TABLE mymeteo.minds (
  id varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  name varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  email varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  password varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  joindate datetime NOT NULL,
  timezone varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  locale varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  role varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY name (name),
  UNIQUE KEY email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE mymeteo.sensors (
  id INT NOT NULL AUTO_INCREMENT,
  label varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  img varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  topic varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  meteologist varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  status varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (id),
	UNIQUE KEY label (label)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE mymeteo.samples (
  id varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  sensor_id INT(11) NOT NULL,
  label varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  img varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  topic varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  value int(11) NOT NULL,
	report_format varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id),
  KEY FK_19925777A247991F_idx (sensor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE mymeteo.records (
  id varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  mind_id varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  sensor_id int(11) NOT NULL,
  sample_id varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  date datetime NOT NULL,
  PRIMARY KEY (id),
  KEY UNIQ_9C9D584653B01993 (mind_id),
  KEY UNIQ_9C9D5846A247991F (sensor_id),
  KEY UNIQ_9C9D58461B1FEA20 (sample_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE mymeteo.reports (
  title varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  template longtext COLLATE utf8_unicode_ci NOT NULL,
  category varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `range` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  status varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  meteologist varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  id int(11) NOT NULL AUTO_INCREMENT,
  createdAt datetime DEFAULT NULL,
  updatedAt datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE mymeteo.statements (
  body longtext COLLATE utf8_unicode_ci NOT NULL,
  notread varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  mind varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  report int(11) NOT NULL,
  id int(11) NOT NULL AUTO_INCREMENT,
  createdAt datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



INSERT INTO mymeteo.minds ( id, name, email, password, joindate, timezone, locale, role ) VALUES ( '1', 'demo', 'demo@mindmeteo.net', '$2a$10$TLlpkWTS.7g8drPVwJMNeeLJ.sMIGJEbobkGi7lMM018awn7N2Z7O', '2015-01-12T00:00:00.000Z', 'Europe/Paris', 'fr_FR', 'demo');
INSERT INTO mymeteo.minds ( id, name, email, password, joindate, timezone, locale, role ) VALUES ( '2', 'admin', 'admin@mindmeteo.net', '$2a$10$OXxj/V2urwpGMr6KeeNzI..pyCKTC8MxKu/XgnB4GEA13wpN3eOva', '2015-01-12T00:00:00.000Z', 'Europe/Paris', 'fr_FR', 'admin');
INSERT INTO mymeteo.minds ( id, name, email, password, joindate, timezone, locale, role ) VALUES ( '3', 'MindMeteo', 'mindmeteo@mindmeteo.net', '$2a$10$OXxj/V2urwpGMr6KeeNzI..pyCKTC8MxKu/XgnB4GEA13wpN3eOva', '2015-01-12T00:00:00.000Z', 'Europe/Paris', 'fr_FR', 'meteologist');

INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (1,'Did you wash your teeth this morning?',NULL,'love','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (2,'Did you eat garlig today?',NULL,'love','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (3,'Did you run out of toilet paper today?',NULL,'health','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (4,'Did you find a car/bike park immediatly?',NULL,'health','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (5,'Did you have an hangover yesterday?',NULL,'money','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (6,'Do you have an hangover today?',NULL,'health','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (7,'Did you take a lotery ticket yesterday?',NULL,'money','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (8,'Did you blow some red spot on your face today?',NULL,'love','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (9,'Did you forget your partner\'s birthday today?',NULL,'love','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (10,'Is it your birthday today?',NULL,'health','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (11,'How was your poo today?',NULL,'health','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (12,'Did you give to the beggars today?',NULL,'money','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (13,'Did you see a beautiful stranger smiling at you today?',NULL,'health','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (14,'Did you see a beautiful stranger today?',NULL,'health','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (15,'Is it raining today and you forgot to waterproof your shoes?',NULL,'health','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (16,'Did you say no to your boss today?',NULL,'health','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (17,'Is there a new tigger shop near your job/appartement?',NULL,'money','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (18,'Are you going somewhere this weekend?',NULL,'money','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (19,'Did you change your underwears this morning?',NULL,'love','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (20,'Which one do you prefer:',NULL,'money','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (21,'Did you score yesterday?',NULL,'health','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (22,'What\'s your plans tonight?',NULL,'money','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (23,'What do you need the most:',NULL,'money','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (24,'Did you leave your sit in the bus/tram/metro for a granny/pregnant woman?',NULL,'health','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (25,'Did you step into dog poo today?',NULL,'money','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (26,'Did you meet your neighboor lately?',NULL,'money','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (27,'Did you find a white hair in your head today?',NULL,'money','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (28,'Did you fart in the bed while your partner was \"sleeping\"? ',NULL,'love','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (29,'Did you pee outside the bowl this morning?',NULL,'love','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (30,'Did you take the trashbag to the container this morning?',NULL,'love','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (31,'Is it a \"good hair\" day?',NULL,'love','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (32,'Did you smoke yesterday?',NULL,'health','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (33,'Did you quit your job today?',NULL,'health','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (34,'What did you eat for dinner yesterday?',NULL,'health','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (35,'Did you loose your job today?',NULL,'money','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (36,'Did you go to the hairdresser lately?',NULL,'love','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (37,'Are you still angry at your parents because the didn\'t let you watch TV when you were kid?',NULL,'love','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (38,'Did you remember to collect your compost?',NULL,'health','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (39,'Did you remember to water your green plant?',NULL,'love','Mind Meteo','');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (40,'Did you leave a tip somewhere today?',NULL,'money','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (41,'Did you spend some time in the traffic jam yesterday?',NULL,'health','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (42,'Did you walk at least 30 minutes yesterday?',NULL,'health','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (43,'Have you been acting like a cop with your partner yesterday?',NULL,'love','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (44,'Did you take a coffee break today?',NULL,'health','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (45,'Did you see a good movie yesterday?',NULL,'health','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (46,'Did you listen to a song you like today?',NULL,'health','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (47,'Did you drop the toilet paper roll in the bowl full of crap?',NULL,'money','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (48,'Did you clean your bathroom lately?',NULL,'love','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (49,'Did you change the sheets of your bed lately?',NULL,'love','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (50,'Did you eat your 5 vegetables yesterday?',NULL,'health','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (51,'Did you try to \"help\" your Baybay yesterday?',NULL,'love','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (52,'Your Baybay tried to \"help\" you yesterday?',NULL,'love','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (53,'Did you say no to your Baby yesterday?',NULL,'love','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (54,'Did you make a new friend yesterday?',NULL,'love','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (55,'Do you have your doggy bag for lunch today?',NULL,'money','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (56,'Did you take your car to go to work this morning?',NULL,'money','Mind Meteo','approved');
INSERT INTO mymeteo.sensors (id,label,img,topic,meteologist,status) VALUES (57,'Did you recycle the garbage yesterday?',NULL,'health','Mind Meteo','approved');

/*
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353cacaf2aa',1,'Yes',NULL,'love',0);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353cacaf337',1,'No',NULL,'love',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353cc690402',2,'Yes',NULL,'love',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353cc69048f',2,'No',NULL,'love',0);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353d35dbf12',3,'Yes',NULL,'health',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353d35dbf9f',3,'No',NULL,'health',0);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353d7e0e378',4,'F***k you! No!',NULL,'health',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353d7e0e404',4,'Yes what a luck!',NULL,'health',7);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353da6d5b73',5,'Yes',NULL,'money',-6);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353da6d5bff',5,'No',NULL,'money',0);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353dc6698ca',6,'Yes',NULL,'health',-6);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353dc669954',6,'No',NULL,'health',0);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353de177f64',7,'Yes',NULL,'money',-1);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353de177ff0',7,'No',NULL,'money',2);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353e1b60e7e',8,'Yes',NULL,'love',-2);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353e1b60f08',8,'No',NULL,'love',0);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353e4067385',9,'Yes',NULL,'love',-10);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353e4067411',9,'No',NULL,'love',5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353e5ee0579',10,'Yes',NULL,'health',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353e5ee0607',10,'No',NULL,'health',0);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353e8ea0538',11,'Soft and good',NULL,'health',5);
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
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353fc080854',17,'Yes I have to go there!',NULL,'money',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54353fc0808e1',17,'Nothing new for a while',NULL,'money',5);
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
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5453b54e8b7f6',32,'Yeah! Like a fireman doc!',NULL,'health',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5453b54e8b854',32,'Uh Uh no mama!',NULL,'health',5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5453b60fe4807',33,'Yes! I\'m free man',NULL,'health',5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5453b60fe4863',33,'I can\'t! I\'ve to pay the bills!',NULL,'health',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5453b64cc791b',34,'Kebab/Hamburger/pizza',NULL,'health',-7);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5453b64cc7975',34,'Salad',NULL,'health',7);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5453b67a11912',35,'I was fired... OMG!',NULL,'money',-10);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5453b67a1196b',35,'Not this time!',NULL,'money',3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54577b0e6007a',36,'Yes! A year ago!',NULL,'love',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54577b0e600fd',36,'Less than a week ago!',NULL,'love',3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54577b601df2d',37,'They made the looser that I am!',NULL,'love',-6);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54577b601dfb1',37,'Not at all! This is the past!',NULL,'love',8);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54577b9bf296f',38,'Every day dear!',NULL,'health',3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54577b9bf2a61',38,'What\'s compost? Is it eatable?',NULL,'health',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54577becc5a82',39,'She is green like the amazonian!',NULL,'love',5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('54577becc5f10',39,'Oh! That\'s why it\'s all yellow!',NULL,'love',-7);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459eb5f8a4be',40,'I always do!',NULL,'money',-2);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459eb5f8a543',40,'No! A penny is a penny!',NULL,'money',1);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459ebc40bbde',41,'Not more than 5 minutes',NULL,'health',5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459ebc40bcd4',41,'I wasted too much time there...',NULL,'health',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459ec0ff24cb',42,'I have 2 legs to use them! ',NULL,'health',7);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459ec0ff25d7',42,'I\'ve a car to use it! You fart!',NULL,'health',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459ece28489e',43,'I needed to know...',NULL,'love',-9);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459ece284923',43,'No! We are in harmony!',NULL,'love',10);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459ed2511db0',44,'More than one!',NULL,'health',3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459ed2511e43',44,'No time!',NULL,'health',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459ed5fdf779',45,'Yes!',NULL,'health',3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459ed5fdf7fe',45,'No, it was crap!',NULL,'health',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459eda7cdc25',46,'Yeah! I was dancing :)',NULL,'health',6);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459eda7cdcdd',46,'Only crap...',NULL,'health',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459f6b3e73a5',47,'I\'m preoccupied you know...',NULL,'money',-2);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459f6b3e74ac',47,'Com\'on! I\'m sharp like brus Lee!',NULL,'money',2);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459f7a645724',48,'Yes! My Baby can take a shower!',NULL,'love',5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459f7a6457a6',48,'What for?',NULL,'love',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459f7e7c406e',49,'Yes! My Baby can jump in!',NULL,'love',7);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('5459f7e7c4164',49,'What for?',NULL,'love',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('545b89031b877',50,'Yes and even more!!',NULL,'health',5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('545b89031b8fd',50,'I\'m carnivore!',NULL,'health',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('545b895955868',51,'Yes, for our own sake',NULL,'love',-10);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('545b8959558f1',51,'I accept the differences',NULL,'love',10);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('545b89be0bf6e',52,'Yes, again...',NULL,'love',-5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('545b89be0bff0',52,'My baybay accepts me like I am!',NULL,'love',10);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('545b8a289f511',53,'Yes. I was fair but firm',NULL,'love',5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('545b8a289f5bd',53,'I do what I\'m asked...',NULL,'love',-10);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('545b9890df424',54,'hum... Actually yes!',NULL,'love',10);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('545b9890df52d',54,'Not that I know of...',NULL,'love',-1);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('545cc3f76bd9b',55,'Yeap! Cooked it yesterday!',NULL,'money',5);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('545cc3f76be1e',55,'I\'ll go to the restaurant!',NULL,'money',-3);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('545cc43c08da7',56,'I cannot do without!',NULL,'money',-7);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('545cc43c08e1f',56,'No car for me today!',NULL,'money',4);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('545cc4fb53874',57,'I always do',NULL,'health',2);
INSERT INTO mymeteo.samples (id,sensor_id,label,img,topic,value) VALUES ('545cc4fb538f9',57,'I put everything in the same bag',NULL,'health',-3);*/

INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353cacaf2aa','Yes',NULL,'love',0,'I like to be clean, that\'s why I cleaned my teeth in the morning.',1);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353cacaf337','No',NULL,'love',-3,'Do you think cleaning my teeth is my priority? No! I have other things to do in life!',1);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353cc690402','Yes',NULL,'love',-5,'Despite all the bad press around it garlig is healthy and I like it, so I ate some lately',2);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353cc69048f','No','','love',0,'Nothing is more precious to me than my fresh breath. No garlig for me!',2);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353d35dbf12','Yes',NULL,'health',-3,'Unfortunatly I ran out of toilet paper... But no panic I always have a 5€ bank not for that case',3);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353d35dbf9f','No',NULL,'health',0,'I\'m causious, as you know, I always check the toilet paper before taking a grap. I never ran out of it!',3);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353d7e0e378','F***k you! No!',NULL,'health',-5,'God damn. I wasted I don\'t know how many hours to find a parking spot!',4);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353d7e0e404','Yes what a luck!','','health',7,'I was so lucky thansks god, I found a parking spot immediately',4);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353da6d5b73','Yes',NULL,'money',-6,'Again I was recovering from an hangover the day before ...',5);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353da6d5bff','No','','money',0,'For a change I didn\'t have an hangover the day before',5);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353dc6698ca','Yes',NULL,'health',-6,'That day I had a terrible hangover',6);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353dc669954','No','','health',0,'That day I didn\'t have an hangover',6);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353de177f64','Yes',NULL,'money',-1,'That day I took a lotery ticket.',7);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353de177ff0','No','','money',2,'That day I didn\'t take a lotery ticket',7);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353e1b60e7e','Yes',NULL,'love',-2,'That day I blow some red spot on my face. The mirrow was full of white spot',8);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353e1b60f08','No','','love',0,'That day my face was clean and the mirror too!',8);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353e4067385','Yes',NULL,'love',-10,'Terrible things happend to me, I forget my Baby\'s birthday. I had to be nice ofr an hour to be forgiven...',9);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353e4067411','No','','love',5,'Obviously I didn\'t forget the birthday of my dear Baby! I have a calendar to use it!',9);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353e5ee0579','Yes',NULL,'health',-5,'I was my birthday! weither or not I celebrated it, it is always unhealthy',10);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353e5ee0607','No','','health',0,'It was not my birthday, so nothing special...',10);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353e8ea0538','Soft and good',NULL,'health',5,'My poo is perfect. I\'m in good condition',11);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353e8ea05c5','Hard or liquid','','health',-5,'I\'m not feeling too good. My poo is not nice to see...',11);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353ea94cb90','Yes',NULL,'money',-1,'I had a weakness for a beggar and I gave 20 cents. ',12);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353ea94cc24','No','','money',0,'They can show me their little pupy or kids I don\'t give to beggars',12);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353ed5e4e39','Yes',NULL,'health',5,'It is nice because a beautifull stranger smilled at me that day.',13);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353ed5e4ec6','No','','health',-1,'That was not a good day because no beautifull stranger smiled at me.',13);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353f03cff1b','Yes',NULL,'health',2,'I saw a very beautifull stranger. It is always good for the hope!',14);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353f03cffa9','No','','health',-3,'I only see ugly people.',14);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353f3f3fd2a','Yes',NULL,'health',-5,'It was raining and I forgot my water proof shoes. Shity life!',15);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353f3f3fdb4','No','','health',3,'Nothing can surprise me, even less the rain! I always have waterproof shoes on me!',15);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353f65a14f8','Yes',NULL,'health',10,'What a feeling! I said no to my boss!',16);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353f65a1588','No','','health',-3,'I couldn\'t say no to my boss and I felt terrible',16);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353fc080854','Yes I have to go there!',NULL,'money',-5,'It is bad for my wallet: a new tigger shop openned near by...',17);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54353fc0808e1','Nothing new for a while','','money',5,'At least my wallet is not threatned by a tigger shop near by!',17);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('543540318251b','Yes',NULL,'money',-3,'An other weekend away is terrible for my wallet',18);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54354031825a6','No','','money',2,'A weekend home is not bad for my wallet point of view.',18);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5437c0365d65a','Yes',NULL,'love',0,'It is normal for me to change my underwear in the morning, and my Baybay appreciate it!',19);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5437c0365d6ea','No','','love',-5,'I didn\'t change my underwear everyday... Will I go to hell for that?',19);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5437c05f0c0b8','Cat','','money',3,'I prefer cat, they cost less.',20);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5437c05f0c147','Dog','','money',-3,'I prefer dog. I\'m rich enough!',20);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5437c08d1b5bf','Big time!',NULL,'health',10,'I scored yesterday! And I didn\'t pay a penny!',21);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5437c08d1b64e','Nop...','','health',-5,'I didn\'t score but I didn\'t spend a penny either...',21);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5437c0c545603','Bar',NULL,'money',-5,'I\'m planning to go to bars. I give you money, you give me heaven!',22);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5437c0c5456d8','Exercice','','money',5,'I\'m planning to exercice a bit. I have nothing to add!',22);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5437c0f7045b1','A new pair of socks',NULL,'money',-1,'I only need a new pair of socks',23);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5437c0f704647','A new trowser','','money',-5,'I really need a new trouser. It will cost me all my economies',23);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5437c12a92160','Yes',NULL,'health',-3,'I\'m tired because I let my seat to a pregnant woman',24);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5437c12a921f1','No','','health',3,'I feel terrific, I\'m rested and my back don\'t hurt. I did well not to let my seat to that granny!',24);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('543d141bb0ec1','Yes',NULL,'money',-1,'They say it is good luck, but I lost money somehow because I step into a dog poo',25);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('543d141bb0f45','No','','money',1,'Thanks lord I didn\'t step into dog poo and I didn\'t waste time=money to clean my shoes!',25);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('543d14cd0aa1b','On your way back from the pub',NULL,'money',-5,'I met my neighboor after an evening at the pub. Their eyes were guns!',26);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('543d14cd0aaa3','After running an hour','','money',5,'My neighboor are lucky to have me. I\'m the perfect neighboor.',26);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('543f90402ac15','Yes',NULL,'money',-3,'Nooo! I found a grey hair in my hairs today! I\'ll have to cover it and it will cost me a lot!',27);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('543f90402ad2b','No','','money',3,'Luckily I don\'t have to spend a fortune to cover my white hair yet!',27);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('543f912a7be95','Oups... Yes :)',NULL,'love',-5,'Don\'t repeat but I farted in bed. ',28);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('543f912a7bf51','Nooo!','','love',5,'I\'m proud to say that I didn\'t fart in bed.',28);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('543fbe3aeafb5','Yes sorry...',NULL,'love',-3,'Sorry but I pee outside the bowl sometimes. Nobody is perfect!',29);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('543fbe3aeb047','Pfff! No! I aimed in target!','','love',1,'Something no one can reproach me is to pee outside the bowl!',29);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('543fbe6adf2e3','Of course!','','love',3,'Of course I take the garbage to the container. I help at home!',30);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('543fbe6adf369','Oups... I was in a hurry!','','love',-3,'I have no time to take the garbage to the container. I am a busy person. Sorry!',30);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('544104a9595cb','Definit-ly!',NULL,'love',2,'I was a wonderfull day for my hair. They obey!',31);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('544104a959de0','I want to be bold!',NULL,'love',-3,'I wished I was bold. My hair were having a revolution... ',31);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5453b54e8b7f6','Yeah! Like a fireman doc!',NULL,'health',-5,'I smoked like a fireman.',32);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5453b54e8b854','Uh Uh no mama!',NULL,'health',5,'I didn\'t smoke.',32);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5453b60fe4807','Yes! I\'m free man',NULL,'health',5,'I feel lighter! I quit my job!',33);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5453b60fe4863','I can\'t! I\'ve to pay the bills!','','health',-5,'I would feel better if I could quit my job but I have to pay the bills...',33);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5453b64cc791b','Kebab/Hamburger/pizza',NULL,'health',-7,'I ate lots of fat and salt lately and that\'s the way I like it!',34);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5453b64cc7975','Salad','','health',7,'I eat green and I feel good!',34);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5453b67a11912','I was fired... OMG!','','money',-10,'OMG! I was fired! Me! Fired! I\'m supposed to be the best! Mum did you lie to me?',35);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5453b67a1196b','Not this time!','','money',3,'I should play lotery because I was not fired yet.',35);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54577b0e6007a','Yes! A year ago!',NULL,'love',-3,'last time I was at the hairdresser was a year ago!',36);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54577b0e600fd','Less than a week ago!',NULL,'love',3,'I cut my hair and I look better!',36);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54577b601df2d','They made the looser that I am!',NULL,'love',-6,'If I\'m not well in my skin it is because my parents didn\'t let me watch tv when I was younger',37);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54577b601dfb1','Not at all! This is the past!',NULL,'love',8,'Despite the fact that my parents didn\'t let me watch tv when I was kid, I\'m a fine adult now!',37);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54577b9bf296f','Every day dear!',NULL,'health',3,'as usual my compost basket is smelly and the meeting point of all the flies in the neigborhood.',38);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54577b9bf2a61','What\'s compost? Is it eatable?',NULL,'health',-3,'somebody well informed told me about compost today. I\'ll think about it next time.',38);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54577becc5a82','She is green like the amazonian!',NULL,'love',5,'I take care of everything. My plant is green like the amazonian forest',39);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('54577becc5f10','Oh! That\'s why it\'s all yellow!',NULL,'love',-7,'I can\'t even take care of my green plant. It is all dry and yellow...',39);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459eb5f8a4be','I always do!',NULL,'money',-2,'I always leave a tip',40);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459eb5f8a543','No! A penny is a penny!','','money',1,'I never leave a tip',40);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459ebc40bbde','Not more than 5 minutes',NULL,'health',5,'I\'m zen, I didn( spend much time in traffic',41);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459ebc40bcd4','I wasted too much time there...',NULL,'health',-3,'If I would count the amount of time I spend in traffic I would faint',41);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459ec0ff24cb','I have 2 legs to use them! ',NULL,'health',7,'since I have 2 legs I walked my 30 minutes a day',42);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459ec0ff25d7','I\'ve a car to use it! You fart!',NULL,'health',-5,'since I have a car I used it instead of my 2 legs',42);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459ece28489e','I needed to know...',NULL,'love',-9,'If I acted like a cop it was because I needed to know. ',43);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459ece284923','No! We are in harmony!','','love',10,'We are in harmony. No need to play cops (or only in bed) with my Baby!',43);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459ed2511db0','More than one!',NULL,'health',3,'I had several coffee breaks. It is important to slow down!',44);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459ed2511e43','No time!',NULL,'health',-3,'I had no time to take a coffee break. I\'m very stressed!',44);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459ed5fdf779','Yes!',NULL,'health',3,'I say a good movie. It changed my mind set. I forgot my worries',45);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459ed5fdf7fe','No, it was crap!','','health',-3,'If only I could see a good movie to think about something else time to times!',45);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459eda7cdc25','Yeah! I was dancing :)',NULL,'health',6,'I was dancing on one of my favorite song',46);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459eda7cdcdd','Only crap...',NULL,'health',-3,'I hear only crapy songs.',46);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459f6b3e73a5','I\'m preoccupied you know...',NULL,'money',-2,'One more time I throw a roll of toilet paper in the bowl full of crap... I had to take it back. Beurk!',47);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459f6b3e74ac','Com\'on! I\'m sharp like brus Lee!',NULL,'money',2,'I\'m not the kind of person to drop a roll of toilet paper in a bowl full of crap!',47);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459f7a645724','Yes! My Baby can take a shower!',NULL,'love',5,'I cleaned the bathroom and the shower. No mushroom farm there! It is shining and fresh!',48);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459f7a6457a6','What for?',NULL,'love',-5,'I like my bathroom with mushrom.',48);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459f7e7c406e','Yes! My Baby can jump in!',NULL,'love',7,'I changed my bed sheets. It smells so good!',49);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('5459f7e7c4164','What for?',NULL,'love',-5,'I was thinking to change my bed sheets but then I thought: why would I do that?!',49);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('545b89031b877','Yes and even more!!',NULL,'health',5,'I\'m eating well, I ate my 5 vegetables a day, and they were not even in can!',50);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('545b89031b8fd','I\'m carnivore!',NULL,'health',-3,'Screw what they say on tv. I won\'t eat 5 vegetables a day. I like meat and basta!',50);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('545b895955868','Yes, for our own sake',NULL,'love',-10,'For the sake of our relationship I tried to help my Baybay. Things has to change!',51);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('545b8959558f1','I accept the differences','','love',10,'I love my Baybay\'s way to handle things even if I wouldn\'t do it like that!',51);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('545b89be0bf6e','Yes, again...','','love',-5,'I start to feel like at school, my baybay tried to help me again... I\'m not handicaped',52);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('545b89be0bff0','My baybay accepts me like I am!','','love',10,'My baybay let me do my way. I love it!',52);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('545b8a289f511','Yes. I was fair but firm',NULL,'love',5,'I had to say no to my Baby. I was firm but fair as usual.',53);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('545b8a289f5bd','I do what I\'m asked...',NULL,'love',-10,'My Baybay ask me to jump the bridge I jump the bridge! I\'m in love you know...',53);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('545b9890df424','hum... Actually yes!',NULL,'love',10,'I made a new friend!',54);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('545b9890df52d','Not that I know of...',NULL,'love',-1,'No new friend on sight. Still hanging with the same old gang',54);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('545cc3f76bd9b','Yeap! Cooked it yesterday!',NULL,'money',5,'I had my lunch box today. I saved lots of cash!',55);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('545cc3f76be1e','I\'ll go to the restaurant!',NULL,'money',-3,'I didn\'t have my lunch box so I had to spend half of my salary in the restaurant',55);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('545cc43c08da7','I cannot do without!',NULL,'money',-7,'All my money goes to the gazoline...',56);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('545cc43c08e1f','No car for me today!','','money',4,'I spare lot\'s of money because I don\'t take a car to go to work!',56);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('545cc4fb53874','I always do',NULL,'health',2,'I\'m an educated and reponsible person so I think of the future. I sort my garbage.',57);
INSERT INTO `mymeteo.samples` (`id`,`label`,`img`,`topic`,`value`,`report_format`,`sensor_id`) VALUES ('545cc4fb538f9','I put everything in the same bag','','health',-3,'Hell after me. I put all my garbage in the same bag!',57);

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
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5453b8d344f5a','1',14,'54353f03cff1b','2014-10-31 16:29:07');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5453b8ddc8346','1',17,'54353fc0808e1','2014-10-31 16:29:17');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5453b8e4a7c8f','1',6,'54353dc669954','2014-10-31 16:29:24');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5453b8e6cbfdb','1',23,'5437c0f704647','2014-10-31 16:29:26');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5453b8ed03939','1',2,'54353cc69048f','2014-10-31 16:29:33');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5453b8f0c8d23','1',28,'543f912a7bf51','2014-10-31 16:29:36');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5453b8f512415','1',10,'54353e5ee0607','2014-10-31 16:29:41');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5453b8f89b498','1',35,'5453b67a1196b','2014-10-31 16:29:44');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5453b8fe49595','1',19,'5437c0365d65a','2014-10-31 16:29:50');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5453b9014b722','1',1,'54353cacaf2aa','2014-10-31 16:29:53');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5453b9045b870','1',30,'543fbe6adf369','2014-10-31 16:29:56');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5453b90fb2a49','1',34,'5453b64cc791b','2014-10-31 16:30:07');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5453b912a0118','1',32,'5453b54e8b854','2014-10-31 16:30:10');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54577c01dc12b','1',36,'54577b0e6007a','2014-11-03 12:58:41');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54577c061a886','1',22,'5437c0c5456d8','2014-11-03 12:58:46');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54577c09efa10','1',13,'54353ed5e4ec6','2014-11-03 12:58:49');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54577c14dc8ec','1',15,'54353f3f3fdb4','2014-11-03 12:59:00');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54577c17779a9','1',5,'54353da6d5bff','2014-11-03 12:59:03');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54577c19ed4d2','1',12,'54353ea94cc24','2014-11-03 12:59:05');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54577c1e226b5','1',31,'544104a959de0','2014-11-03 12:59:10');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54577c22c5600','1',28,'543f912a7bf51','2014-11-03 12:59:14');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54577c27c6216','1',21,'5437c08d1b64e','2014-11-03 12:59:19');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54577c2d1139f','1',1,'54353cacaf337','2014-11-03 12:59:25');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54577c3257210','1',38,'54577b9bf2a61','2014-11-03 12:59:30');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54577c35e783b','1',10,'54353e5ee0607','2014-11-03 12:59:33');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54577c403a3ba','1',27,'543f90402ad2b','2014-11-03 12:59:44');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('54577c42d9bad','1',11,'54353e8ea0538','2014-11-03 12:59:46');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b535487af','1',19,'5437c0365d6ea','2014-11-04 11:15:01');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b53916a9c','1',21,'5437c08d1b64e','2014-11-04 11:15:05');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b53d9348e','1',38,'54577b9bf2a61','2014-11-04 11:15:09');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b5413accb','1',34,'5453b64cc7975','2014-11-04 11:15:13');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b5445ce1c','1',2,'54353cc69048f','2014-11-04 11:15:16');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b5486012a','1',20,'5437c05f0c147','2014-11-04 11:15:20');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b54b0d840','1',3,'54353d35dbf9f','2014-11-04 11:15:23');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b55111f79','1',30,'543fbe6adf369','2014-11-04 11:15:29');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b5544d4ed','1',1,'54353cacaf337','2014-11-04 11:15:32');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b5619f913','1',17,'54353fc0808e1','2014-11-04 11:15:45');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b580f0bd3','1',36,'54577b0e6007a','2014-11-04 11:16:17');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b58b82854','1',7,'54353de177ff0','2014-11-04 11:16:27');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b594ecd48','1',26,'543d14cd0aa1b','2014-11-04 11:16:36');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b59eded2d','1',18,'543540318251b','2014-11-04 11:16:46');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b5aa0f43a','1',8,'54353e1b60f08','2014-11-04 11:16:58');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b5adace8d','1',35,'5453b67a1196b','2014-11-04 11:17:01');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b5afa85ec','1',10,'54353e5ee0607','2014-11-04 11:17:03');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b5b20a95a','1',6,'54353dc669954','2014-11-04 11:17:06');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b5b6219f8','1',15,'54353f3f3fdb4','2014-11-04 11:17:10');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5458b5b85129e','1',27,'543f90402ad2b','2014-11-04 11:17:12');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459ee82bc38c','1',23,'5437c0f704647','2014-11-05 09:31:46');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459ee8bf3e9d','1',25,'543d141bb0f45','2014-11-05 09:31:56');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459ee9164400','1',15,'54353f3f3fdb4','2014-11-05 09:32:01');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459ee991a527','1',34,'5453b64cc7975','2014-11-05 09:32:09');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459ee9eeb300','1',13,'54353ed5e4ec6','2014-11-05 09:32:14');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459eea35c612','1',28,'543f912a7bf51','2014-11-05 09:32:19');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459eea7db59b','1',3,'54353d35dbf9f','2014-11-05 09:32:23');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459eeaf6a274','1',36,'54577b0e6007a','2014-11-05 09:32:31');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459eebe171ad','1',46,'5459eda7cdcdd','2014-11-05 09:32:46');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459eec0e398d','1',14,'54353f03cffa9','2014-11-05 09:32:48');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459eec79ade1','1',31,'544104a9595cb','2014-11-05 09:32:55');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459eecc1c883','1',43,'5459ece28489e','2014-11-05 09:33:00');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459eed33f1fe','1',20,'5437c05f0c147','2014-11-05 09:33:07');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459eed753f15','1',6,'54353dc669954','2014-11-05 09:33:11');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459eedc33836','1',2,'54353cc69048f','2014-11-05 09:33:16');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459eee1e79a1','1',22,'5437c0c5456d8','2014-11-05 09:33:21');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459eeef59bec','1',12,'54353ea94cc24','2014-11-05 09:33:35');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459eef37b26f','1',13,'54353ed5e4ec6','2014-11-05 09:33:39');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459eef6d96ed','1',38,'54577b9bf2a61','2014-11-05 09:33:42');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459eefde1062','1',8,'54353e1b60f08','2014-11-05 09:33:49');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459ef0797e04','1',37,'54577b601dfb1','2014-11-05 09:33:59');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459ef0cb017d','1',39,'54577becc5a82','2014-11-05 09:34:04');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('5459ef1064322','1',44,'5459ed2511db0','2014-11-05 09:34:08');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545a53c720c66','1',29,'543fbe3aeb047','2014-11-05 16:43:51');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545b8a320b5e7','1',8,'54353e1b60f08','2014-11-06 14:48:18');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545b8a3807844','1',34,'5453b64cc791b','2014-11-06 14:48:24');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545b8a3adef2e','1',39,'54577becc5a82','2014-11-06 14:48:26');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545b8a3d888c9','1',31,'544104a9595cb','2014-11-06 14:48:29');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545b8a4123d8f','1',12,'54353ea94cc24','2014-11-06 14:48:33');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545b8a4cab831','1',44,'5459ed2511e43','2014-11-06 14:48:44');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545b8a51182e8','1',30,'543fbe6adf369','2014-11-06 14:48:49');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545b8a5b885ea','1',42,'5459ec0ff24cb','2014-11-06 14:48:59');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545b8a62bcd3a','1',7,'54353de177ff0','2014-11-06 14:49:06');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545b8a6bbbe8d','1',47,'5459f6b3e74ac','2014-11-06 14:49:15');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545b8a6f173e6','1',27,'543f90402ad2b','2014-11-06 14:49:19');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545b8a7334fdf','1',10,'54353e5ee0607','2014-11-06 14:49:23');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545b8a797d3c8','1',37,'54577b601dfb1','2014-11-06 14:49:29');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545b8a7ea605a','1',26,'543d14cd0aaa3','2014-11-06 14:49:34');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545b8a871251d','1',5,'54353da6d5bff','2014-11-06 14:49:43');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545b8a8a7b08f','1',35,'5453b67a1196b','2014-11-06 14:49:46');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545cc4486ab1b','1',23,'5437c0f704647','2014-11-07 13:08:24');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545cc44d9e4c1','1',46,'5459eda7cdcdd','2014-11-07 13:08:29');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545cc4594a084','1',53,'545b8a289f5bd','2014-11-07 13:08:41');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545cc4627f0cb','1',29,'543fbe3aeafb5','2014-11-07 13:08:50');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545cc4656981d','1',6,'54353dc669954','2014-11-07 13:08:53');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545cc468c93ff','1',32,'5453b54e8b7f6','2014-11-07 13:08:56');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545cc46c573b2','1',13,'54353ed5e4ec6','2014-11-07 13:09:00');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545cc46f35ccc','1',6,'54353dc669954','2014-11-07 13:09:03');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545cc4756e2f2','1',50,'545b89031b877','2014-11-07 13:09:09');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545cc4848fb17','1',41,'5459ebc40bbde','2014-11-07 13:09:24');
INSERT INTO mymeteo.records (id,mind_id,sensor_id,sample_id,date) VALUES ('545cc48c63666','1',38,'54577b9bf2a61','2014-11-07 13:09:32');

INSERT INTO mymeteo.reports (title,template,category,`range`,status,meteologist,id,createdAt,updatedAt) VALUES ('About my salary raise','Give me i\'m low','pro','low','approved','3',1,'2015-02-09 14:48:24','2015-02-09 14:48:24');
INSERT INTO mymeteo.reports (title,template,category,`range`,status,meteologist,id,createdAt,updatedAt) VALUES ('Hello!','hello!','friends','zero','approved','3',2,'2015-02-09 14:51:48','2015-02-09 14:51:48');
INSERT INTO mymeteo.reports (title,template,category,`range`,status,meteologist,id,createdAt,updatedAt) VALUES ('Here are the news flash you are all waiting for','bonjour','family','zero','approved','3',3,'2015-02-09 14:52:12','2015-02-09 14:52:12');
INSERT INTO mymeteo.reports (title,template,category,`range`,status,meteologist,id,createdAt,updatedAt) VALUES ('Mimimi','mimimimim','lover','zero','approved','3',4,'2015-02-09 14:52:33','2015-02-09 14:52:33');
INSERT INTO mymeteo.reports (title,template,category,`range`,status,meteologist,id,createdAt,updatedAt) VALUES ('Holiday request','holiday','pro','low','approved','3',5,'2015-02-09 14:53:05','2015-02-09 14:53:05');
INSERT INTO mymeteo.reports (title,template,category,`range`,status,meteologist,id,createdAt,updatedAt) VALUES ('High five dude!','high','friends','hight','approved','3',7,'2015-02-09 14:53:34','2015-02-09 14:53:34');
INSERT INTO mymeteo.reports (title,template,category,`range`,status,meteologist,id,createdAt,updatedAt) VALUES ('I can\'t come for the next family meeting','no','family','zero','approved','3',8,'2015-02-09 14:53:57','2015-02-09 14:53:57');
INSERT INTO mymeteo.reports (title,template,category,`range`,status,meteologist,id,createdAt,updatedAt) VALUES ('Baybay! You are ying I am yang','yingyang','lover','zero','approved','3',9,'2015-02-09 14:54:21','2015-02-09 14:54:21');
