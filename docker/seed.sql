CREATE DATABASE zero_postgres;

\c zero_postgres;

-- Create schemas
CREATE SCHEMA IF NOT EXISTS "app-1";
CREATE SCHEMA IF NOT EXISTS "app-2";

-- Seed data into the user table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO users (id, name) VALUES
('user-1', 'Alice'),
('user-2', 'Bob'),
('user-3', 'Charlie');

-- Seed data into the app-1.tasks table
CREATE TABLE IF NOT EXISTS "app-1".tasks (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL
);

INSERT INTO "app-1".tasks (id, title, completed) VALUES
('task-1', 'Buy groceries', false),
('task-2', 'Walk the dog', true),
('task-3', 'Do laundry', false);
    
-- Seed data into the app-2.posts table
CREATE TABLE IF NOT EXISTS "app-2".posts (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);

INSERT INTO "app-2".posts (id, title) VALUES
('post-1', 'First post'),
('post-2', 'Second post'),
('post-3', 'Third post');

CREATE PUBLICATION zero_data FOR TABLES IN SCHEMA "app-1", TABLES IN SCHEMA "app-2", TABLES IN SCHEMA "public";