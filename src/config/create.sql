-- Delete tables
DROP TABLE IF EXISTS notification;
DROP TABLE IF EXISTS reaction_comment_article;
DROP TABLE IF EXISTS reaction_comment_post;
DROP TABLE IF EXISTS comment_article;
DROP TABLE IF EXISTS comment_post;
DROP TABLE IF EXISTS reaction_post;
DROP TABLE IF EXISTS reaction_article;
DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS subscription;
DROP TABLE IF EXISTS "user";

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create User table
CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    login VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at DATE
);

-- Create Post table
CREATE TABLE post (
    post_id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at DATE,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);

-- Create Comment_Post table
CREATE TABLE comment_post (
    comment_post_id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at DATE,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    parent_comment_post_id INT,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id),
    FOREIGN KEY (post_id) REFERENCES post(post_id),
    FOREIGN KEY (parent_comment_post_id) REFERENCES comment_post(comment_post_id)
);

-- Create Reaction_Post table (named position_post in diagram)
CREATE TABLE reaction_post (
    reaction_post_id SERIAL PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id),
    FOREIGN KEY (post_id) REFERENCES post(post_id)
);

-- Create Reaction_Comment_Post table
CREATE TABLE reaction_comment_post (
    reaction_comment_post_id SERIAL PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    user_id INT NOT NULL,
    comment_post_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id),
    FOREIGN KEY (comment_post_id) REFERENCES comment_post(comment_post_id)
);

-- Create Article table
CREATE TABLE article (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    banner VARCHAR(255), -- Storing file path instead of file type
    content JSONB NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at DATE,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);

-- Create Comment_Article table (implied by reaction_comment_article)
CREATE TABLE comment_article (
    comment_article_id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
	updated_at DATE,
    user_id INT NOT NULL,
    article_id INT NOT NULL,
    parent_comment_article_id INT,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id),
    FOREIGN KEY (article_id) REFERENCES article(article_id),
    FOREIGN KEY (parent_comment_article_id) REFERENCES comment_article(comment_article_id)
);

-- Create Reaction_Article table
CREATE TABLE reaction_article (
    reaction_article_id SERIAL PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    user_id INT NOT NULL,
    article_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id),
    FOREIGN KEY (article_id) REFERENCES article(article_id)
);

-- Create Reaction_Comment_Article table
CREATE TABLE reaction_comment_article (
    reaction_comment_article_id SERIAL PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    user_id INT NOT NULL,
    comment_article_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id),
    FOREIGN KEY (comment_article_id) REFERENCES comment_article(comment_article_id)
);

-- Create Subscription table
CREATE TABLE subscription (
    subscription_id SERIAL PRIMARY KEY,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    follower_id INT NOT NULL,
    followed_id INT NOT NULL,
    FOREIGN KEY (follower_id) REFERENCES "user"(user_id),
    FOREIGN KEY (followed_id) REFERENCES "user"(user_id),
    CONSTRAINT no_self_subscription CHECK (follower_id <> followed_id)
);

-- Create Notification table
CREATE TABLE notification (
    notification_id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    content TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    related_id INT,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);

-- Create indexes for better performance
CREATE INDEX idx_post_user ON post(user_id);
CREATE INDEX idx_comment_post_user ON comment_post(user_id);
CREATE INDEX idx_comment_post_post ON comment_post(post_id);
CREATE INDEX idx_subscription_follower ON subscription(follower_id);
CREATE INDEX idx_subscription_followed ON subscription(followed_id);
CREATE INDEX idx_notification_user ON notification(user_id);