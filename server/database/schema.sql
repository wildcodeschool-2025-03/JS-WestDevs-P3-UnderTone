CREATE TABLE user (
id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(50) NOT NULL UNIQUE,
birthdate DATE DEFAULT NULL,
profile_picture VARCHAR(500) DEFAULT NULL,
email VARCHAR(60) NOT NULL UNIQUE,
identifier VARCHAR(25) NOT NULL,
password VARCHAR(200) NOT NULL,
status ENUM('artist', 'concert_place', 'user', 'admin') NOT NULL,
signup_date DATE NOT NULL,
last_signin_date DATE DEFAULT NULL
);

CREATE TABLE artist (
user_id INT PRIMARY KEY NOT NULL,
name VARCHAR(150) NOT NULL,
description VARCHAR(1500) DEFAULT NULL, 
demo VARCHAR(500) DEFAULT NULL,
web_site VARCHAR(250) DEFAULT NULL,
profile_picture VARCHAR(500) DEFAULT NULL,
facebook_link VARCHAR(200) DEFAULT NULL, 
instagram_link VARCHAR(200) DEFAULT NULL,
x_link VARCHAR(200) DEFAULT NULL,
deezer_link VARCHAR(200) DEFAULT NULL,
spotify_link VARCHAR(200) DEFAULT NULL,
youtube_link VARCHAR(200) DEFAULT NULL,
CONSTRAINT fk_artist_user_id
FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE 
);

CREATE TABLE favorite_artist (
user_id INT NOT NULL,
artist_id INT NOT NULL,
date DATE NOT NULL,
PRIMARY KEY (user_id, artist_id),
CONSTRAINT fk_favorite_artist_user_id
FOREIGN KEY (user_id) REFERENCES user(id),
CONSTRAINT fk_favorite_artist_artist_id
FOREIGN KEY (artist_id) REFERENCES artist(user_id)
);

CREATE TABLE artist_photo (
id INT PRIMARY KEY AUTO_INCREMENT,
image VARCHAR(500) NOT NULL,
date DATE NOT NULL,
artist_id INT NOT NULL,
CONSTRAINT fk_artist_photo_artist_id
FOREIGN KEY (artist_id) REFERENCES artist(user_id)
);

CREATE TABLE music_style (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(50) NOT NULL
);

INSERT INTO music_style (name)
VALUES
('Classique'), ('Rock'), ('Jazz'), ('Pop'), ('Électronique'), ('Hip-hop'), ('R&B'), ('Blues'), ('Country'), ('Métal'), ('Reggae'), ('Folk'), ('Soul'), ('Funk'), ('Disco'), ('Musique du monde');


CREATE TABLE artist_music_style (
artist_id INT NOT NULL,
music_style_id INT NOT NULL,
PRIMARY KEY (artist_id, music_style_id),
CONSTRAINT fk_artist_music_style_artist
FOREIGN KEY (artist_id) REFERENCES artist(user_id),
CONSTRAINT fk_artist_music_style_music_style
FOREIGN KEY (music_style_id) REFERENCES music_style(id)
); 

CREATE TABLE concert_place (
user_id INT PRIMARY KEY NOT NULL,
name VARCHAR(150) NOT NULL,
description VARCHAR(1500) DEFAULT NULL, 
web_site VARCHAR(250) DEFAULT NULL,
profile_picture VARCHAR(500) DEFAULT NULL,
facebook_link VARCHAR(200) DEFAULT NULL, 
instagram_link VARCHAR(200) DEFAULT NULL,
x_link VARCHAR(200) DEFAULT NULL,
menu VARCHAR(500) DEFAULT NULL,
CONSTRAINT fk_concert_place_user_id
FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE 
);

CREATE TABLE favorite_concert_place (
user_id INT NOT NULL,
concert_place_id INT NOT NULL,
date DATE NOT NULL,
PRIMARY KEY (user_id, concert_place_id),
CONSTRAINT fk_favorite_concert_place_user_id
FOREIGN KEY (user_id) REFERENCES user(id),
CONSTRAINT fk_favorite_concert_place_concert_place_id
FOREIGN KEY (concert_place_id) REFERENCES concert_place(user_id)
); 

CREATE TABLE opening_hour (
  id INT PRIMARY KEY AUTO_INCREMENT,
  concert_place_id INT NOT NULL,
  week_day ENUM('Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche') NOT NULL,
  opening_hour_noon TIME DEFAULT NULL,
  closing_hour_noon TIME DEFAULT NULL,
  opening_hour_evening TIME DEFAULT NULL,
  closing_hour_evening TIME DEFAULT NULL,
  CONSTRAINT fk_opening_hour_concert_place
  FOREIGN KEY (concert_place_id) REFERENCES concert_place(user_id) ON DELETE CASCADE
);

CREATE TABLE concert_place_photo (
id INT PRIMARY KEY AUTO_INCREMENT,
image VARCHAR(500) NOT NULL,
date DATE NOT NULL,
concert_place_id INT NOT NULL,
CONSTRAINT fk_concert_place_photo_concert_place_id
FOREIGN KEY (concert_place_id) REFERENCES concert_place(user_id)
);

CREATE TABLE type (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(30) NOT NULL
);

INSERT INTO type (name)
VALUES
('Restaurant'), ('Bar'), ('Café Concert');

CREATE TABLE concert_place_type (
concert_place_id INT NOT NULL,
type_id INT NOT NULL,
PRIMARY KEY (concert_place_id, type_id),
CONSTRAINT fk_concert_place_type_concert_place
FOREIGN KEY (concert_place_id) REFERENCES concert_place(user_id),
CONSTRAINT fk_concert_place_type_type
FOREIGN KEY (type_id) REFERENCES type(id)
); 

CREATE TABLE event (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
date_hour DATETIME NOT NULL,
image VARCHAR(500),
is_validated BOOLEAN NOT NULL,
concert_place_id INT NOT NULL,
CONSTRAINT fk_event_concert_place_id
FOREIGN KEY (concert_place_id) REFERENCES concert_place(user_id)
);

CREATE TABLE event_validation (
event_id INT NOT NULL,
artist_id INT NOT NULL,
PRIMARY KEY (event_id, artist_id), 
CONSTRAINT fk_event_validation_event_id
FOREIGN KEY (event_id) REFERENCES event(id),
CONSTRAINT fk_event_validation_artist_id
FOREIGN KEY (artist_id) REFERENCES artist(user_id)
);

CREATE TABLE favorite_event (
user_id INT NOT NULL,
event_id INT NOT NULL,
date DATE NOT NULL,
PRIMARY KEY (user_id, event_id),
CONSTRAINT fk_favorite_event_user_id
FOREIGN KEY (user_id) REFERENCES user(id),
CONSTRAINT fk_favorite_event_event_id
FOREIGN KEY (event_id) REFERENCES event(id)
); 

CREATE TABLE comment (
id INT PRIMARY KEY AUTO_INCREMENT,
comment VARCHAR(1500) NOT NULL,
date_hour DATETIME NOT NULL,
event_id INT NOT NULL,
user_id INT NOT NULL,
CONSTRAINT fk_comment_event_id
FOREIGN KEY (event_id) REFERENCES event(id),
CONSTRAINT fk_comment_user_id
FOREIGN KEY (user_id) REFERENCES user(id)
);