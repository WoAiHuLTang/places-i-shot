ALTER TABLE cities
  ADD COLUMN IF NOT EXISTS adcode VARCHAR(16) NOT NULL DEFAULT '' AFTER province,
  MODIFY coord_x DECIMAL(10,6) NOT NULL,
  MODIFY coord_y DECIMAL(10,6) NOT NULL;

ALTER TABLE photos
  ADD COLUMN district_code VARCHAR(32) NULL AFTER location_name,
  ADD COLUMN district_name VARCHAR(120) NULL AFTER district_code,
  ADD COLUMN street_name VARCHAR(255) NULL AFTER district_name,
  ADD COLUMN longitude DECIMAL(10,6) NULL AFTER street_name,
  ADD COLUMN latitude DECIMAL(10,6) NULL AFTER longitude;
