CREATE TABLE mymeteo_test.minds (
  id varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  name varchar(64) COLLATE utf8_unicode_ci NOT NULL,
	picture longtext COLLATE utf8_unicode_ci,
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

CREATE TABLE mymeteo_test.sensors (
  id INT NOT NULL AUTO_INCREMENT,
  label varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  img varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  topic varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  meteologist varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  status varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (id),
	UNIQUE KEY label (label)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE mymeteo_test.samples (
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


INSERT INTO mymeteo_test.minds ( id, name, picture, email, password, joindate, timezone, locale, role ) VALUES ( '1', 'demo', NULL, 'demo@mindmeteo.com', '$2a$10$TLlpkWTS.7g8drPVwJMNeeLJ.sMIGJEbobkGi7lMM018awn7N2Z7O', '2015-01-12T00:00:00.000Z', 'Europe/Paris', 'fr_FR', 'demo');
INSERT INTO mymeteo_test.minds ( id, name, picture, email, password, joindate, timezone, locale, role ) VALUES ( '2', 'admin', NULL, 'admin@mindmeteo.com', '$2a$10$OXxj/V2urwpGMr6KeeNzI..pyCKTC8MxKu/XgnB4GEA13wpN3eOva', '2015-01-12T00:00:00.000Z', 'Europe/Paris', 'fr_FR', 'admin');

INSERT INTO mymeteo_test.sensors (id,label,img,topic,meteologist,status) VALUES (1,'Did you wash your teeth this morning?',NULL,'love','Mind Meteo','');

INSERT INTO mymeteo_test.samples (id,label,img,topic,value,report_format,sensor_id) VALUES ('54353cacaf2aa','Yes',NULL,'love',0,'I like to be clean, that\'s why I cleaned my teeth in the morning.',1);
INSERT INTO mymeteo_test.samples (id,label,img,topic,value,report_format,sensor_id) VALUES ('54353cacaf337','No',NULL,'love',-3,'Do you think cleaning my teeth is my priority? No! I have other things to do in life!',1);
