CREATE TABLE public."regioninfo"
(
   "CName" text NOT NULL, 
   "NName" text, 
   "SName" text, 
   "RType" text, 
   CONSTRAINT "CnamePri" PRIMARY KEY ("CName") USING INDEX TABLESPACE pg_default
) 
WITH (
  OIDS = TRUE
)

TABLESPACE pg_default;
ALTER TABLE public."regioninfo"
  OWNER TO postgres;
GRANT SELECT, REFERENCES ON TABLE public.regioninfo TO public;
COMMENT ON COLUMN public."regioninfo"."CName" IS 'English name.';
COMMENT ON COLUMN public."regioninfo"."NName" IS 'Japanese name.';
COMMENT ON COLUMN public."regioninfo"."SName" IS 'Short name.';
COMMENT ON COLUMN public."regioninfo"."RType" IS 'Region type.';
COMMENT ON TABLE public."regioninfo" IS 'Region info and other informations.';
