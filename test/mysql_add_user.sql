CREATE USER 'mymeteo_app'@'%' IDENTIFIED BY 'supersecret';
GRANT ALL PRIVILEGES ON *.* TO 'mymeteo_app'@'%' WITH GRANT OPTION;

CREATE TABLE mymeteo_test.minds (
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

INSERT INTO mymeteo_test.minds ( id, name, email, password, joindate, timezone, locale, role ) VALUES ( '1', 'demo', 'demo@mindmeteo.com', '$2a$10$TLlpkWTS.7g8drPVwJMNeeLJ.sMIGJEbobkGi7lMM018awn7N2Z7O', '2015-01-12T00:00:00.000Z', 'Europe/Paris', 'fr_FR', 'demo');
INSERT INTO mymeteo_test.minds ( id, name, email, password, joindate, timezone, locale, role ) VALUES ( '2', 'admin', 'admin@mindmeteo.com', '$2a$10$OXxj/V2urwpGMr6KeeNzI..pyCKTC8MxKu/XgnB4GEA13wpN3eOva', '2015-01-12T00:00:00.000Z', 'Europe/Paris', 'fr_FR', 'admin');
