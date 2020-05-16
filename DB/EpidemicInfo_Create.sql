CREATE TABLE "epidemicinfo"
(
  "CName" text NOT NULL, -- City English name.
  CONSTRAINT "CNamePri" PRIMARY KEY ("CName"),
  CONSTRAINT "CNameForeign" FOREIGN KEY ("CName")
      REFERENCES "regioninfo" ("CName") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=TRUE
);
ALTER TABLE "epidemicinfo"
  OWNER TO postgres;
GRANT SELECT, REFERENCES ON TABLE public.epidemicinfo TO public;
COMMENT ON TABLE "epidemicinfo"
  IS 'Daily epidemic info.';
COMMENT ON COLUMN "epidemicinfo"."CName" IS 'City English name.';