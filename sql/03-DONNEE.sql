-- Insertion des valeurs --

-- Insertion des Categorie --
-- Permet de créer des donnée  en partant de l'id 1
ALTER SEQUENCE category_id_category_seq RESTART WITH 1;
INSERT INTO category (name)
VALUES
('IPA'),          -- India Pale Ale
('Stout'),        -- Bières noires, riches et intenses
('Lager'),        -- Bières légères et rafraîchissantes
('Pale Ale'),     -- Bières claires et équilibrées
('Porter'),       -- Bières maltées, souvent avec des saveurs de café ou de chocolat
('Wheat Beer'),   -- Bières de blé légères
('Saison'),       -- Bières épicées et complexes
('Amber Ale'),    -- Bières ambrées avec des notes de caramel
('Barleywine'),   -- Bières fortes et riches
('Pilsner'),      -- Lagers dorées et croustillantes
('Dubbel'),       -- Bières belges foncées avec des saveurs de fruits secs
('Tripel'),       -- Bières belges blondes, fortes et épicées
('Quadrupel'),    -- Bières belges très fortes et riches
('Fruit Beer'),   -- Bières aux fruits
('Spiced Beer');  -- Bières épicées ou saisonnières

-- Insérer des utilisateurs --
ALTER SEQUENCE users_id_user_seq RESTART WITH 1;
INSERT INTO users (first_name, last_name, description, color, email, password)
VALUES
('Alice', 'Brewster', 'Amatrice de bières artisanales.', 'blue', 'alice.brewster@example.com', 'password1'),
('Bob', 'Hopkins', 'Collectionneur de houblons rares.', 'green', 'bob.hopkins@example.com', 'password2'),
('Charlie', 'Maltman', 'Passionné de malts doux.', 'yellow', 'charlie.maltman@example.com', 'password3'),
('Diana', 'Ferment', 'Exploratrice de saveurs fermentées.', 'red', 'diana.ferment@example.com', 'password4'),
('Eve', 'Lager', 'Spécialiste des lagers légères.', 'purple', 'eve.lager@example.com', 'password5'),
('Frank', 'Porter', 'Connaisseur des porters riches.', 'brown', 'frank.porter@example.com', 'password6'),
('Grace', 'Pint', 'Aime partager des pintes.', 'orange', 'grace.pint@example.com', 'password7'),
('Hank', 'Barley', 'Fanatique du goût d’orge.', 'pink', 'hank.barley@example.com', 'password8'),
('Ivy', 'Yeast', 'Experte en levures aromatiques.', 'teal', 'ivy.yeast@example.com', 'password9'),
('Jack', 'Stout', 'Inconditionnel des stouts intenses.', 'black', 'jack.stout@example.com', 'password10');

-- Insérer des brasseries --
ALTER SEQUENCE brewerie_id_brewerie_seq RESTART WITH 1;
INSERT INTO brewerie (name, country)
VALUES
('Aurora Brewing Co.', 'USA'),
('Midnight Barrels', 'Belgium'),
('Golden Horizon', 'Germany'),
('Hoppy Valley', 'France'),
('Barrel & Co.', 'Canada');

-- Inserer la photo --
ALTER SEQUENCE picture_id_picture_seq RESTART WITH 1;
INSERT INTO picture (path)
VALUES
('./img/bier.png');

-- Insérer des bières --
ALTER SEQUENCE beer_id_beer_seq RESTART WITH 1;
INSERT INTO beer (id_brewerie, id_category, id_picture, name, description, abv, color, price)
VALUES
(1, 5, 1, 'Sunrise Amber', 'Une bière ambrée douce avec des notes de caramel.', 5.5, 'Amber', 4.5),
(1, 5, 1, 'Twilight IPA', 'Une IPA aux houblons tropicaux et finale amère.', 6.7, 'Golden', 5.0),
(1, 5, 1, 'Aurora Boreale', 'Un stout intense avec des saveurs de café et chocolat.', 8.0, 'Dark', 6.5),
(1, 5, 1, 'Citrus Blast', 'Une pale ale fraîche avec une touche d’agrume.', 5.0, 'Golden', 4.0),
(1, 5, 1, 'Maple Porter', 'Un porter riche adouci avec du sirop d’érable.', 6.2, 'Brown', 5.5),
(2, 7, 1,'Nocturne Noir', 'Une bière noire belge avec des épices subtiles.', 7.5, 'Black', 6.0),
(2, 7, 1,'Midnight Wheat', 'Une bière de blé légèrement sucrée.', 5.2, 'Golden', 4.8),
(2, 7, 1,'Shadow Saison', 'Une saison complexe avec des notes poivrées.', 6.4, 'Amber', 5.3),
(2, 7, 1,'Mystic Dubbel', 'Un dubbel belge traditionnel aux fruits secs.', 7.8, 'Brown', 6.2),
(2, 7, 1,'Golden Abbey', 'Une bière d’abbaye avec une finale douce.', 8.0, 'Golden', 7.0),
(3, 2, 1,'Lagerfest', 'Une lager allemande classique, croustillante et sèche.', 4.8, 'Golden', 3.8),
(3, 2, 1,'Barley Crown', 'Une bière riche en malts avec une touche fumée.', 6.5, 'Amber', 5.4),
(3, 2, 1,'Hopfen Blitz', 'Une IPA allemande aux arômes d’agrumes et de pin.', 6.9, 'Golden', 5.8),
(3, 2, 1,'Dunkel King', 'Un dunkel malté avec des notes de cacao.', 5.4, 'Brown', 5.0),
(3, 2, 1,'Weizen Dream', 'Une hefeweizen légère et rafraîchissante.', 5.2, 'Golden', 4.3),
(4, 4, 1,'Valley Saison', 'Une saison française florale et épicée.', 6.2, 'Amber', 5.7),
(4, 4, 1,'Hoppy Fields', 'Une pale ale houblonnée avec une finition sèche.', 5.8, 'Golden', 5.2),
(4, 4, 1,'Blonde Horizon', 'Une blonde douce avec des notes de miel.', 4.5, 'Golden', 4.5),
(4, 4, 1,'Cherry Oak', 'Une bière vieillie en fût de chêne avec des cerises.', 7.2, 'Red', 6.8),
(4, 4, 1,'Barrique Rouge', 'Une bière rouge complexe avec des fruits rouges.', 6.0, 'Red', 5.9),
(5, 8, 1,'Maple Stout', 'Un stout onctueux avec une touche de sirop d’érable.', 8.2, 'Dark', 7.5),
(5, 8, 1,'Canadian Cream Ale', 'Une ale crémeuse avec des saveurs de vanille.', 5.0, 'Golden', 4.6),
(5, 8, 1,'Northern Pale', 'Une pale ale équilibrée avec des houblons nordiques.', 5.5, 'Golden', 5.0),
(5, 8, 1,'Winter Warmer', 'Une bière d’hiver épicée avec des notes de cannelle.', 7.0, 'Amber', 6.5),
(5, 8, 1,'Frosty Ale', 'Une ale légère parfaite pour les soirées glaciales.', 4.2, 'Golden', 3.9),
(5, 1, 1,'Barrel Bliss', 'Vieillie en fûts pour des arômes profonds.', 9.0, 'Dark', 8.0);


-- Insérer des avis (reviews) --
ALTER SEQUENCE review_id_review_seq RESTART WITH 1;
INSERT INTO review (id_user, id_beer, rating, comment)
VALUES
(1, 1, 5, 'Un goût exceptionnel, parfaitement équilibré.'),
(2, 3, 4, 'Très bon stout, mais un peu trop amer à mon goût.'),
(3, 2, 3, 'Correct, mais manque un peu de profondeur.'),
(4, 5, 5, 'Un porter vraiment délicieux, je recommande.'),
(5, 7, 4, 'Une saison intéressante avec des notes florales.'),
(6, 10, 5, 'Une bière belge impressionnante, riche en saveurs.'),
(7, 15, 4, 'Très agréable, parfaite pour une soirée détendue.'),
(8, 20, 3, 'Bonne bière, mais pas mémorable.'),
(9, 25, 5, 'Lager classique mais très bien exécutée.'),
(10, 26, 4, 'J’ai adoré les arômes subtils de cette bière.');

-- Insérer des favoris (favorites) --
ALTER SEQUENCE favorite_id_favorite_seq RESTART WITH 1;
INSERT INTO favorite (id_user, id_beer)
VALUES
(1, 1),
(1, 3),
(2, 3),
(3, 2),
(3, 6),
(3, 5),
(4, 7),
(5, 10),
(5, 1),
(6, 15),
(7, 20),
(8, 25),
(9, 26),
(10, 1);

-- Insérer des ingrédients --
ALTER SEQUENCE ingredient_id_ingredient_seq RESTART WITH 1;
INSERT INTO ingredient (name, description, type)
VALUES
('Houblon Cascade', 'Aromatique avec des notes d’agrumes.', 'Houblon'),
('Houblon Citra', 'Saveur tropicale et d’agrumes.', 'Houblon'),
('Malt Pilsner', 'Base légère et croustillante.', 'Malt'),
('Malt Munich', 'Apporte une riche saveur maltée.', 'Malt'),
('Levure Ale', 'Fermentation haute pour des saveurs riches.', 'Levure'),
('Levure Lager', 'Fermentation basse pour une finition propre.', 'Levure'),
('Eau pure', 'Ingrédient de base.', 'Autre'),
('Cannelle', 'Épice pour bières d’hiver.', 'Épice'),
('Cerises', 'Ajout fruité pour une bière rouge.', 'Fruit'),
('Vanille', 'Ajout doux et sucré.', 'Épice');

-- Insérer des associations bière-ingrédient --
ALTER SEQUENCE beer_ingredient_id_beer_ingredient_seq RESTART WITH 1;
INSERT INTO beer_ingredient (id_beer, id_ingredient)
VALUES
(1, 1), (1, 3), (1, 7),
(2, 2), (2, 4), (2, 7),
(3, 1), (3, 5), (3, 7),
(4, 2), (4, 3), (4, 7),
(5, 4), (5, 8), (5, 7),
(6, 1), (6, 3), (6, 9),
(7, 2), (7, 5), (7, 9),
(8, 3), (8, 6), (8, 7),
(9, 4), (9, 5), (9, 8),
(10, 1), (10, 2), (10, 10),
(11, 3), (11, 5), (11, 9),
(12, 2), (12, 6), (12, 10),
(13, 1), (13, 3), (13, 8),
(14, 2), (14, 5), (14, 9),
(15, 4), (15, 6), (15, 7),
(16, 1), (16, 2), (16, 7),
(17, 3), (17, 5), (17, 9),
(18, 4), (18, 6), (18, 10),
(19, 1), (19, 2), (19, 8),
(20, 3), (20, 5), (20, 7),
(21, 2), (21, 6), (21, 9),
(22, 4), (22, 5), (22, 7),
(23, 1), (23, 2), (23, 10),
(24, 3), (24, 4), (24, 9),
(25, 2), (25, 6), (25, 8),
(26, 1), (26, 3), (26, 7);