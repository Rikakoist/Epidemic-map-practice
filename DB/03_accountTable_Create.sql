-- Table: accounts

-- DROP TABLE accounts;

CREATE TABLE accounts
(
  username character varying(24),
  password character varying(255)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE accounts
  OWNER TO postgres;
