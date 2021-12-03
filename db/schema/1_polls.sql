DROP TABLE IF EXISTS polls CASCADE;

CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  administrative_link VARCHAR(255),
  submission_link VARCHAR(255),
  name_required BOOLEAN DEFAULT 'f'
);
