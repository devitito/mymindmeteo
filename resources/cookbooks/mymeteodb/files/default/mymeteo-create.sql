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