/**
 * @author : 
 *
**/


/* A table for mymeteo minds */

CREATE TABLE mymeteo.minds(
 id CHAR (32) NOT NULL,
 PRIMARY KEY(id),
 name VARCHAR(64) NOT NULL,
 email VARCHAR(128) NOT NULL,
 password VARCHAR(128) NOT NULL,
 joindate DATETIME NOT NULL,
 timezone VARCHAR(64) NOT NULL
);

CREATE TABLE mymeteo.sensors (
  id varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  label varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  img varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  topic varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  meteologist varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


INSERT INTO mymeteo.minds ( id, name, email, password, joindate, timezone ) VALUES ( '541953917c568', 'demo', 'demo@mindmeteo.com', '$2y$10$yPTMpSdcK5kdJqV1aHUpCej1gaGB81iwc8hKfXNOTLHuvS/xvdaGi', CURDATE(), 'Europe/Paris');

