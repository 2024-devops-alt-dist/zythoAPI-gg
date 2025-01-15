-- Table users --
CREATE TABLE users
(
    id_user SERIAL PRIMARY KEY,
    first_name VARCHAR(45) NOT NULL,
    description TEXT,
    last_name VARCHAR(45) NOT NULL,
    color VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Table ingredient --
CREATE TABLE ingredient
(
    id_ingredient SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    description TEXT,
    type VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Table category --
CREATE TABLE category
(
    id_category SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Table picture --
CREATE TABLE picture
(
    id_picture SERIAL PRIMARY KEY,
    path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Table brewerie --
CREATE TABLE brewerie
(
    id_brewerie SERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    country VARCHAR(45) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Table beer --
CREATE TABLE beer
(
    id_beer SERIAL PRIMARY KEY,
    id_brewerie INT REFERENCES brewerie(id_brewerie) ON DELETE CASCADE,
    id_category INT REFERENCES category(id_category) ON DELETE CASCADE,
    id_picture INT REFERENCES picture(id_picture) ON DELETE CASCADE,
    name VARCHAR(45) NOT NULL,
    description TEXT,
    abv FLOAT NOT NULL,
    color VARCHAR(20) NOT NULL,
    price FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Table favorite --
CREATE TABLE favorite
(
    id_favorite SERIAL PRIMARY KEY,
    id_beer INT REFERENCES beer(id_beer) ON DELETE CASCADE,
    id_user INT REFERENCES users(id_user) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Table beer_ingredient --
CREATE TABLE beer_ingredient
(
    id_beer_ingredient SERIAL PRIMARY KEY,
    id_beer INT REFERENCES beer(id_beer) ON DELETE CASCADE,
    id_ingredient INT REFERENCES ingredient(id_ingredient) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Table review --
CREATE TABLE review
(
    id_review SERIAL PRIMARY KEY,
    id_user INT REFERENCES users(id_user) ON DELETE CASCADE,
    id_beer INT REFERENCES beer(id_beer) ON DELETE CASCADE,
    rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);