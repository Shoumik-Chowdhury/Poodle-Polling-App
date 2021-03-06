DROP TABLE IF EXISTS option_results CASCADE;

CREATE TABLE option_results (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  option_name VARCHAR(255),
  option_value INTEGER NOT NULL,
  option_description VARCHAR(255)
);
