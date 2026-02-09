/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.sql(`
CREATE TABLE Profile(
id SERIAL PRIMARY KEY,
login VARCHAR(50) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
username VARCHAR(50) NOT NULL,
created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
updated_at  TIMESTAMPTZ,
deleted_at TIMESTAMPTZ
);

CREATE TABLE Comment(
id SERIAL PRIMARY KEY,
content TEXT NOT NULL,
id_profile INTEGER NOT NULL REFERENCES Profile(id),
type_entity VARCHAR(50) NOT NULL,
id_entity INTEGER NOT NULL,
created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
updated_at  TIMESTAMPTZ,
deleted_at TIMESTAMPTZ
);

CREATE TABLE Article_Status(
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL
);

CREATE TABLE Article(
id SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description VARCHAR(255) NOT NULL,
content JSONB NOT NULL,
id_article_status INTEGER NOT NULL REFERENCES Article_Status(id),
id_profile INTEGER NOT NULL REFERENCES Profile(id),
created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
updated_at  TIMESTAMPTZ,
deleted_at TIMESTAMPTZ
);

CREATE TABLE Reaction(
id SERIAL PRIMARY KEY,
content TEXT NOT NULL,
id_profile INTEGER NOT NULL REFERENCES Profile(id),
type_entity VARCHAR(50) NOT NULL,
id_entity INTEGER NOT NULL,
created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Profile_settings (
id SERIAL PRIMARY KEY,
is_visible_articles BOOLEAN NOT NULL DEFAULT TRUE,
is_visible_comments BOOLEAN NOT NULL DEFAULT TRUE,
is_visible_reactions BOOLEAN NOT NULL DEFAULT TRUE,
id_profile INTEGER UNIQUE NOT NULL REFERENCES Profile(id)
);

CREATE TABLE Sessions (
id SERIAL PRIMARY KEY,
profile_id INTEGER REFERENCES profile(id) ON DELETE CASCADE,
refresh_token VARCHAR(500) NOT NULL,
user_agent TEXT,
ip_address VARCHAR(45),
expires_at TIMESTAMP NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`
DROP TABLE Article;
DROP TABLE Article_Status;
DROP TABLE Comment;
DROP TABLE Reaction;
DROP TABLE Sessions;
DROP TABLE Profile_settings;
DROP TABLE Profile;`);
};
