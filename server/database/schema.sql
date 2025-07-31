CREATE TABLE user (
id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(50) NOT NULL,
birthdate DATE DEFAULT NULL,
profile_picture VARCHAR(500) DEFAULT NULL,
email VARCHAR(60) NOT NULL UNIQUE,
password VARCHAR(200) NOT NULL,
status ENUM('artist', 'concert_place', 'user', 'admin') NOT NULL,
signup_date DATE NOT NULL,
last_signin_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO user
(username, birthdate, profile_picture, email, password, status, signup_date)
VALUES
('Benji', '1989-07-16', 'https://randomuser.me/api/portraits/men/75.jpg', 'benjamin.rambrant@gmail.com', '$argon2id$v=19$m=16,t=2,p=1$S3ZSTW95YUNHdHFOdVI5Nw$j2Iamkw4GqOH/YPN70XtAw', 'artist', '2025-06-20'), 
('Tristan', '2000-07-24', 'https://randomuser.me/api/portraits/men/73.jpg', 'tristan.zubiarrain@gmail.com', '$argon2id$v=19$m=16,t=2,p=1$M09nRnRNTTl4ZnJ3VlMzVQ$8z2YrHdnjz0QwUxk1baSJQ', 'concert_place', '2025-06-21'),
('Guillaume', '1975-05-12', 'http://localhost:3310/assets/images/concert-place-profile-picture/improfilguillaume.png', 'guillaume-et-fils@gmail.fr', '$argon2id$v=19$m=16,t=2,p=1$WHZnZm5MajU3dGxPTDhOYQ$HH/o0irIqZLdhW1cmm7xNw', 'concert_place', '2025-06-21'), 
('Weber', '1992-04-18', 'http://localhost:3310/assets/images/concert-place-profile-picture/improfileweber.png', 'weber@gmail.fr', '$argon2id$v=19$m=16,t=2,p=1$WHZnZm5MajU3dGxPTDhOYQ$HH/o0irIqZLdhW1cmm7xNw', 'concert_place', '2025-06-21'),
('Maillot', '1983-12-20', 'http://localhost:3310/assets/images/concert-place-profile-picture/improfilmaillot.png', 'maillot@gmail.fr', '$argon2id$v=19$m=16,t=2,p=1$WHZnZm5MajU3dGxPTDhOYQ$HH/o0irIqZLdhW1cmm7xNw', 'concert_place', '2025-06-22'),
('Toussaint', '1976-02-14', 'http://localhost:3310/assets/images/concert-place-profile-picture/improfiltoussaint.png', 'toussaint@gmail.fr', '$argon2id$v=19$m=16,t=2,p=1$WHZnZm5MajU3dGxPTDhOYQ$HH/o0irIqZLdhW1cmm7xNw', 'concert_place', '2025-06-22'), 
('ElectroNova', '1998-08-02', "http://localhost:3310/assets/images/artist-profile-picture/ElectroNova.png", 'electronova@gmail.fr', '$argon2id$v=19$m=16,t=2,p=1$WHZnZm5MajU3dGxPTDhOYQ$HH/o0irIqZLdhW1cmm7xNw', 'artist', '2025-06-22'),
('SoulMates', '1997-09-16', "http://localhost:3310/assets/images/artist-profile-picture/SoulMate.png", 'soulmate@gmail.fr', '$argon2id$v=19$m=16,t=2,p=1$WHZnZm5MajU3dGxPTDhOYQ$HH/o0irIqZLdhW1cmm7xNw', 'artist', '2025-06-22'),
('The Jazz Bros', '1988-09-06', "http://localhost:3310/assets/images/artist-profile-picture/The-Jazz-Bros.png", 'jazz-bros@gmail.fr', '$argon2id$v=19$m=16,t=2,p=1$WHZnZm5MajU3dGxPTDhOYQ$HH/o0irIqZLdhW1cmm7xNw', 'artist', '2025-06-23'),
('Urban Poets', '1987-04-16', "http://localhost:3310/assets/images/artist-profile-picture/Urban-Poets.png", 'urban-poets@gmail.fr', '$argon2id$v=19$m=16,t=2,p=1$WHZnZm5MajU3dGxPTDhOYQ$HH/o0irIqZLdhW1cmm7xNw', 'artist', '2025-06-23')
;

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

INSERT INTO artist
(user_id, name, description, demo, web_site, profile_picture, instagram_link, facebook_link, x_link, spotify_link, deezer_link, youtube_link)
VALUES 
(1, 'Funkologie', 'Salut à tous ! 

Nous sommes *Funkology*, et on est là pour vous faire bouger et vibrer au rythme de notre mélange explosif de funk, pop, jazz et soul. 

Imaginez des basses qui groovent, des cuivres qui swinguent et des mélodies qui vous collent à la peau. Chaque concert est une fête où on vous invite à danser, chanter et partager notre énergie avec vous, alors venez nous rejoindre pour une soirée inoubliable. 

Préparez-vous à vivre la musique comme jamais auparavant. On se voit bientôt ! 🎶🔥', 'http://localhost:3310/assets/audios/demo/1funkologie.mp3', 'https://www.funkologie.fr', 'http://localhost:3310/assets/images/artist-profile-picture/IMG_20250514_103311.jpg', 'https://www.instagram.com/', '', '', '', '', ''),
(7, 'ElectroNova', 'ElectroNova vous plonge dans un univers électro cosmique où rythmes puissants et visuels immersifs s’entremêlent. \n\nUn voyage musical qui secoue les sens.', 'http://localhost:3310/assets/audios/demo/ElectroNova.mp3', 'https://electronova.com', 'http://localhost:3310/assets/images/artist-profile-picture/ElectroNova.png', "https://www.instagram.com", "https://www.facebook.com", "https://www.twitter.com", "https://www.spotify.com", "https://www.deezer.com", '' ),
(8, 'SoulMates', 'Un duo qui revisite les classiques de la soul avec modernité et émotion. \n\nDes voix chaleureuses, une guitare envoûtante et une présence scénique inoubliable.', 'http://localhost:3310/assets/audios/demo/SoulMates.mp3', 'https://soulmates.com', 'http://localhost:3310/assets/images/artist-profile-picture/SoulMates.png', "https://www.instagram.com", "", "https://www.twitter.com", "", "", 'https://www.youtube.com'),
(9, "The Jazz Bros", 'The Jazz Bros, c’est un cocktail de jazz classique et de groove contemporain. \n\nSaxophone, contrebasse et batterie en parfaite harmonie pour vous faire swinguer.', 'http://localhost:3310/assets/audios/demo/JazzBros.mp3', 'https://the-jazz-bros.com', 'http://localhost:3310/assets/images/artist-profile-picture/The-Jazz-Bros.png', "https://www.instagram.com", "https://www.facebook.com", "", "", "", 'https://www.youtube.com'),
(10, "Urban Poets", 'Collectif de hip-hop et slam engagé, Urban Poets mêle poésie urbaine et beats percutants pour éveiller les consciences et secouer les scènes.', 'http://localhost:3310/assets/audios/demo/UrbanPoets.mp3', 'https://urban-poets.com', 'http://localhost:3310/assets/images/artist-profile-picture/Urban-Poets.png', "https://www.instagram.com", "https://www.facebook.com", "https://www.twitter.com", "https://www.spotify.com", "https://www.deezer.com", 'https://www.youtube.com')
;

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

INSERT INTO artist_photo
(image, date, artist_id)
VALUES 
('http://localhost:3310/assets/images/artist-photo/pexels-edwardeyer-811838.png', '2025-06-20', 1),
('http://localhost:3310/assets/images/artist-photo/pexels-hendrikbgr-744318.png', '2025-06-20', 1),
('http://localhost:3310/assets/images/artist-photo/pexels-meline-waxx-44315-165971.png', '2025-06-20', 1),
('http://localhost:3310/assets/images/artist-photo/electronova1.jpg', '2025-06-22', 7),
('http://localhost:3310/assets/images/artist-photo/electronova2.jpg', '2025-06-22', 7),
('http://localhost:3310/assets/images/artist-photo/electronova3.jpg', '2025-06-22', 7),
('http://localhost:3310/assets/images/artist-photo/soulmates1.jpg', '2025-06-22', 8),
('http://localhost:3310/assets/images/artist-photo/soulmates2.jpg', '2025-06-22', 8),
('http://localhost:3310/assets/images/artist-photo/soulmates3.jpg', '2025-06-22', 8),
('http://localhost:3310/assets/images/artist-photo/jazzbros1.jpg', '2025-06-23', 9),
('http://localhost:3310/assets/images/artist-photo/jazzbros2.jpg', '2025-06-23', 9),
('http://localhost:3310/assets/images/artist-photo/jazzbros3.jpg', '2025-06-23', 9),
('http://localhost:3310/assets/images/artist-photo/urban-poets1.jpg', '2025-06-23', 10),
('http://localhost:3310/assets/images/artist-photo/urban-poets2.jpg', '2025-06-23', 10),
('http://localhost:3310/assets/images/artist-photo/urban-poets3.jpg', '2025-06-23', 10)
;

CREATE TABLE music_style (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO music_style (name)
VALUES
('Classique'), 
('Rock'), 
('Jazz'), 
('Pop'), 
('Électronique'), 
('Hip-hop'), 
('R&B'), 
('Blues'), 
('Country'), 
('Métal'), 
('Reggae'), 
('Folk'), 
('Soul'), 
('Funk'), 
('Disco'), 
('Musique du monde');


CREATE TABLE artist_music_style (
artist_id INT NOT NULL,
music_style_id INT NOT NULL,
PRIMARY KEY (artist_id, music_style_id),
CONSTRAINT fk_artist_music_style_artist
FOREIGN KEY (artist_id) REFERENCES artist(user_id),
CONSTRAINT fk_artist_music_style_music_style
FOREIGN KEY (music_style_id) REFERENCES music_style(id)
); 

INSERT INTO artist_music_style
(artist_id, music_style_id)
VALUES
(1, 4),
(1, 2),
(1, 13),
(1, 14), 
(1, 16), 
(7, 5),
(7, 7), 
(8, 3),
(8, 8), 
(8, 13),
(9, 2),
(9, 3),
(9, 8), 
(10, 8),
(10, 9)
;

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
address VARCHAR(200) NOT NULL,
CONSTRAINT fk_concert_place_user_id
FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE 
);

INSERT INTO concert_place
(user_id, name, description, web_site, profile_picture, facebook_link, instagram_link, x_link, menu, address) 
VALUES
(2, "Vent Débarasse", "Vent Débarasse vous invite à savourer des plats faits maison, principalements maritimes, au rythme de la musique live. \n\nChaque soir, des artistes montent sur scène pour accompagner votre repas de notes jazz, soul ou pop ! 🍹 🪇 🎵", "http://www.vent-debarasse.fr", "http://localhost:3310/assets/images/concert-place-profile-picture/vent-debarasse.jpg", "https://www.facebook.com", "https://www.instagram.com", "https://www.twitter.com", "http://localhost:3310/assets/menus/vent-debarasse.pdf", '3 rue Erik Satie\n44400 Rezé'), 
(3, "Guillaume et Fils", "Chez Guillaume et Fils, dégustez une cuisine locale raffinée au son d’ensembles jazz intimistes. \n\nCe lieu chaleureux mêle élégance et convivialité, parfait pour une soirée entre amis ou un dîner romantique. \n\nLes chefs travaillent des produits frais du marché tandis que des musiciens talentueux vous enveloppent de leurs mélodies feutrées.", "https://www.guillaume-et-fils.fr", 'http://localhost:3310/assets/images/concert-place-profile-picture/improfilguillaume.png', "https://www.facebook.com", "https://www.instagram.com", '', 'http://localhost:3310/assets/menus/menu2guillaumeetfils.pdf', '62, chemin Bernadette Couturier, 44800 Saint-Herblain' ), 
(4,  "Weber", "Le Weber est le repaire incontournable des fans de rock indépendant. \n\nTous les jeudis, des scènes ouvertes enflamment l’endroit, attirant musiciens locaux et passionnés de riffs bruts. \n\nLe lieu propose une carte riche en bières artisanales et burgers maison dans une ambiance industrielle et chaleureuse, fidèle à l’esprit underground.", 
"https://www.weber.fr", "http://localhost:3310/assets/images/concert-place-profile-picture/improfilweber.png", "https://www.facebook.com", "https://www.instagram.com", "https://www.twitter.com", 'http://localhost:3310/assets/menus/menu1weber.pdf', '12, rue Jérôme Guillou, 44380 Saint-Nazaire' ), 
(5, "Maillot", "Chez Maillot, les saveurs des îles rencontrent les rythmes afro-caraïbéens dans un décor haut en couleurs. \n\nTapas épicées, rhums arrangés, concerts live de percussions et guitares créoles animent vos soirées. \n\nTous les week-ends, la piste s’anime et invite à la danse dans une ambiance conviviale et festive.", "https://www.maillot.fr", "http://localhost:3310/assets/images/concert-place-profile-picture/improfilmaillot.png", "", "https://www.instagram.com", '', 'http://localhost:3310/assets/menus/menu1maillot.pdf', '32, rue de Michaud, 44100 Nantes'), 
(6, 'Toussaint', "Le piano-bar Toussaint séduit par son atmosphère feutrée, ses banquettes en velours et ses lumières tamisées. \n\nDes artistes soul, jazz ou chanson française s’y produisent chaque soir. \n\nParfait pour une soirée posée autour d’un bon vin ou d’un cocktail signature, ce lieu invite à la détente et à la contemplation musicale.", "https://www.toussaint.fr", "http://localhost:3310/assets/images/concert-place-profile-picture/improfiltoussaint.png", "https://www.facebook.com", "https://www.instagram.com", "https://www.twitter.com", 'http://localhost:3310/assets/menus/menu1toussaint.pdf', '1, avenue Colas, 44200 Rezé');

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

INSERT INTO opening_hour
(concert_place_id, week_day, opening_hour_noon, closing_hour_noon, opening_hour_evening, closing_hour_evening) 
VALUES 
(2, "Lundi", "", "", "", ""),
(2, "Mardi", "12:00", "14:30", "19:00", "22:30"),
(2, "Mercredi", "12:00", "14:30", "19:00", "22:30"),
(2, "Jeudi", "12:00", "14:30", "19:00", "22:30"),
(2, "Vendredi", "12:00", "14:30", "19:00", "23:30"),
(2, "Samedi", "12:00", "15:30", "19:00", "23:30"),
(2, "Dimanche", "", "", "", ""),
(3, "Lundi", "", "", "", ""),
(3, "Mardi", "", "", "19:00", "22:30"),
(3, "Mercredi", "12:00", "14:30", "", ""),
(3, "Jeudi", "12:00", "14:30", "", ""),
(3, "Vendredi", "", "", "19:00", "22:00"),
(3, "Samedi", "12:00", "14:30", "19:00", "22:00"),
(4, "Dimanche", "", "", "", ""), 
(4, "Lundi", "", "", "", ""),
(4, "Mardi", "", "", "17:00", "00:30"),
(4, "Mercredi", "", "", "17:00", "00:30"),
(4, "Jeudi", "", "", "17:00", "01:00"),
(4, "Vendredi", "", "", "16:00", "01:00"),
(4, "Samedi", "", "", "17:00", "01:00"),
(4, "Dimanche", "", "", "", ""), 
(5, "Lundi", "", "", "", ""),
(5, "Mardi", "11:30", "13:30", "20:00", "23:30"),
(5, "Mercredi", "11:30", "13:30", "19:00", "22:30"),
(5, "Jeudi", "", "", "", ""),
(5, "Vendredi", "12:00", "14:30", "20:00", "23:30"),
(5, "Samedi", "11:30", "13:30", "19:00", "22:30"),
(5, "Dimanche", "", "", "", ""), 
(6, "Lundi", "", "", "", ""),
(6, "Mardi", "", "", "17:00", "00:30"),
(6, "Mercredi", "", "", "17:00", "00:30"),
(6, "Jeudi", "", "", "17:00", "01:00"),
(6, "Vendredi", "", "", "16:00", "01:00"),
(6, "Samedi", "", "", "17:00", "01:00"),
(6, "Dimanche", "", "", "", "");

CREATE TABLE concert_place_photo (
id INT PRIMARY KEY AUTO_INCREMENT,
image VARCHAR(500) NOT NULL,
date DATE NOT NULL,
concert_place_id INT NOT NULL,
CONSTRAINT fk_concert_place_photo_concert_place_id
FOREIGN KEY (concert_place_id) REFERENCES concert_place(user_id)
);

INSERT INTO concert_place_photo
(image, date, concert_place_id)
VALUES
('http://localhost:3310/assets/images/concert-place-photo/vent-debarasse-fishNchips.jpeg', '2025-06-21', 2),
('http://localhost:3310/assets/images/concert-place-photo/vent-debarasse-moules.jpeg', '2025-06-21', 2),
('http://localhost:3310/assets/images/concert-place-photo/vent-debarasse-saumon.jpg', '2025-06-21', 2),
('http://localhost:3310/assets/images/concert-place-photo/vent-debarasse-saumon2.jpeg', '2025-06-21', 2), 
('http://localhost:3310/assets/images/concert-place-photo/imguillaumeun.png', '2025-06-21', 3), 
('http://localhost:3310/assets/images/concert-place-photo/imguillaumedeux.png', '2025-06-21', 3), 
('http://localhost:3310/assets/images/concert-place-photo/imguillaumetrois.png', '2025-06-21', 3),
('http://localhost:3310/assets/images/concert-place-photo/imweberun.png', '2025-06-21', 4),
('http://localhost:3310/assets/images/concert-place-photo/imweberdeux.png', '2025-06-21', 4),
('http://localhost:3310/assets/images/concert-place-photo/imwebertrois.png', '2025-06-21', 4),
('http://localhost:3310/assets/images/concert-place-photo/immaillotun.png', '2025-06-21', 5),
('http://localhost:3310/assets/images/concert-place-photo/immaillotdeux.png', '2025-06-21', 5),
('http://localhost:3310/assets/images/concert-place-photo/immaillottrois.png', '2025-06-21', 5),
('http://localhost:3310/assets/images/concert-place-photo/imtoussaintun.png', '2025-06-21', 6),
('http://localhost:3310/assets/images/concert-place-photo/imtoussaintdeux.png', '2025-06-21', 6),
('http://localhost:3310/assets/images/concert-place-photo/imtoussainttrois.png', '2025-06-21', 6);

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

INSERT INTO concert_place_type
(concert_place_id, type_id)
VALUES
(2, 1),
(3, 1), 
(4, 2), 
(5, 1),
(6, 2);

CREATE TABLE event (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
date DATE NOT NULL,
hour TIME NOT NULL,
image VARCHAR(500),
description VARCHAR(500),
is_validated BOOLEAN DEFAULT NULL,
concert_place_id INT NOT NULL,
CONSTRAINT fk_event_concert_place_id
FOREIGN KEY (concert_place_id) REFERENCES concert_place(user_id),
CONSTRAINT uq_event_datetime_place
UNIQUE (date, hour, concert_place_id)
);

INSERT INTO event (name, date, hour, image, is_validated, concert_place_id, description)
VALUES (
  'Soirée Rock & Chill', '2025-07-31', '20:00', 'http://localhost:3310/assets/images/artist-photo/pexels-meline-waxx-44315-165971.png', 1, 2, 'Une soirée inoubliable de rock avec des artistes locaux et de la bonne ambiance.'),
  ("Festival Rock 2025", "2025-07-31", "20:00",'http://localhost:3310/assets/images/event/rock_festival_2025.png', 1, 4, "Un festival de rock incontournable rassemblant des groupes légendaires et de jeunes talents. \n\nLes scènes en salle accueilleront des performances explosives du début de soirée jusqu'à minuit. Des food trucks et stands de merchandising seront à disposition du public. \n\nUne ambiance festive et électrique garantie pour tous les amateurs de rock."),
  ("Soirée Jazz", "2025-07-31","19:30","http://localhost:3310/assets/images/event/jazz_parc_2025.png", 1, 6, "Une soirée magique dédiée au jazz, sous les étoiles dans un parc paisible. \n\nDes musiciens de renom se succéderont sur scène pour interpréter des classiques et des compositions originales. \n\nL'atmosphère chaleureuse sera parfaite pour une sortie entre amis ou en couple. Des boissons et en-cas raffinés seront proposés sur place. Apportez votre plaid pour profiter confortablement de la soirée."), 
  ("Nuit Électro", "2025-07-31", "22:00", "http://localhost:3310/assets/images/event/nuit_electro_2025.png", 1, 5, "Vibrez toute la nuit au rythme de l’électro avec les meilleurs DJ du moment. \n\nUn show lumière impressionnant accompagnera chaque performance. Les basses feront vibrer le sol dans une ambiance euphorique. \n\nLe dress code fluo est encouragé pour s’immerger totalement dans l’univers du festival. Des zones chill-out et boissons énergisantes seront à disposition."), 
  ("Festival Indie Pop", "2025-08-01", "17:00", "http://localhost:3310/assets/images/event/indie_pop_festival.png", 1, 2, "Trois jours de musique indie pop avec une programmation variée et éclectique. Le festival mettra en avant des artistes émergents et confirmés dans un cadre verdoyant. Des ateliers artistiques et expositions compléteront l'expérience musicale. Le public pourra profiter d’un camping aménagé sur place. Un rendez-vous annuel à ne pas manquer pour les fans de pop alternative."), 
  ("Live Acoustique Intimiste", "2025-08-01", "19:00", "http://localhost:3310/assets/images/event/live_acoustique.png", 1, 3, "Un concert intimiste pour découvrir des artistes en version acoustique. Dans une ambiance feutrée, les musiciens partageront leurs compositions les plus personnelles. \n\nLe lieu, petit et chaleureux, favorisera une vraie proximité avec le public. \n\nDes boissons chaudes et desserts maison seront proposés. Une expérience douce et sincère pour les amateurs de musique authentique.")
  ;


CREATE TABLE event_artist (
event_id INT NOT NULL,
artist_id INT NOT NULL,
artist_presence INT DEFAULT NULL,
PRIMARY KEY (event_id, artist_id), 
CONSTRAINT fk_event_validation_event_id
FOREIGN KEY (event_id) REFERENCES event(id),
CONSTRAINT fk_event_validation_artist_id
FOREIGN KEY (artist_id) REFERENCES artist(user_id)
);

INSERT INTO event_artist (event_id, artist_id, artist_presence)
VALUES (1, 1, 1),
(2, 8, 1),
(2, 9, 1),
(3, 1, 1), 
(4, 7, 1), 
(5, 1, 1), 
(6, 8, 1)
;

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