/**
 * @author : 
 *
**/


/* A table for mymeteo minds */

CREATE TABLE mymeteo.minds(
 id CHAR (32) NOT NULL,
 PRIMARY KEY(id),
 name VARCHAR(64),
 email VARCHAR(128),
 password VARCHAR(128)
);

INSERT INTO mymeteo.minds ( id, name, email, password ) VALUES ( '541953917c568', 'demo', 'demo@mindmeteo.com', '$2y$10$yPTMpSdcK5kdJqV1aHUpCej1gaGB81iwc8hKfXNOTLHuvS/xvdaGi');

