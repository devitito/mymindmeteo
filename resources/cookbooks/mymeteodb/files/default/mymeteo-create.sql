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

