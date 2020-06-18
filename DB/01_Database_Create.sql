-- Database: epidemicdata

-- DROP DATABASE epidemicdata;

CREATE DATABASE epidemicdata
  WITH OWNER = postgres
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'Chinese (Simplified)_China.936'
       LC_CTYPE = 'Chinese (Simplified)_China.936'
       CONNECTION LIMIT = -1;

ALTER DATABASE epidemicdata
  SET search_path = "$user", public, sde;

ALTER DEFAULT PRIVILEGES 
    GRANT SELECT, REFERENCES ON TABLES
    TO public;

ALTER DEFAULT PRIVILEGES 
    GRANT INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON TABLES
    TO postgres;

