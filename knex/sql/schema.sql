
-- Drop Tables
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS user_data;

-- Create Tables
CREATE TABLE user_data (
	user_id uuid NOT NULL,
	first_name varchar(50) NULL,
	last_name varchar(50) NULL,
	email varchar(40) NULL,
	telephone varchar(13) NULL,
	CONSTRAINT user_data_pkey PRIMARY KEY (user_id)
);

CREATE TABLE user_account (
	user_id uuid NULL,
	username varchar(50) NULL,
	password varchar(100) NULL,
	CONSTRAINT user_account_username_unique UNIQUE (username),
	CONSTRAINT user_account_user_id_foreign FOREIGN KEY (user_id) REFERENCES user_data(user_id)
);
