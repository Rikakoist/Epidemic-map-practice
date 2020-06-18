-- Table: public.detailbyregion

-- DROP TABLE public.detailbyregion;

CREATE TABLE public.detailbyregion
(
  "日付" character varying(255),
  "都道府県名" character varying(255),
  "患者数" character varying(255),
  "入院中" character varying(255),
  "退院者" character varying(255),
  "死亡者" character varying(255)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.detailbyregion
  OWNER TO postgres;
GRANT SELECT, REFERENCES ON TABLE public.detailbyregion TO public;
GRANT ALL ON TABLE public.detailbyregion TO postgres;
