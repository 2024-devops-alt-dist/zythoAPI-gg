-- CREATE OR REPLACE PROCEDURE Créer ou remplacer une procédure 
-- rating_beer est le nom de la procédure
-- Les parametre
-- user_id INT l'id de l'utilisateur lors de l'appelle de la procédure
-- beer_id INT l'Id de la bière pour ajouter ou mettre a jour la note
-- user_rating INT la nouvelle note
CREATE OR REPLACE PROCEDURE rating_beer(user_id INT, beer_id INT, user_rating INT)
-- language utiliser
LANGUAGE plpgsql
-- AS $$ ... $$ Encadre le corps de la procédure
AS $$
-- BEGIN début du bloc logique
BEGIN
    -- Vérifier si la note existe déjà
    IF EXISTS (
		-- Recherche dans la table review si il existe 1 note pour cet utilisateur et cette bière
        SELECT 1 
        FROM review
		-- Filtre les résultat
        WHERE user_id = id_user AND beer_id = id_beer
	-- Si cette condition est remplie
    ) THEN
        -- Mettre à jour la note dans la table review
        UPDATE review
		-- Mise à jour de la note
        SET rating = user_rating
		-- Met à jour uniquement la note qui correspond à l'utilisateur et à la bière
        WHERE user_id = id_user AND beer_id = id_beer;
        -- RAISE NOTICE permet d'afficher un message d'information
        RAISE NOTICE 'Note mise à jour par l''utilisateur % sur la bière % avec la note %', user_id, beer_id, user_rating;
	ELSE
        -- Ajouter une nouvelle note
        INSERT INTO review (id_user, id_beer, rating)
        VALUES (user_id, beer_id, user_rating);
        
        RAISE NOTICE 'Nouvelle note ajoutée par l''utilisateur % sur la bière % avec la note %', user_id, beer_id, user_rating;
	-- Marque la fin du bloc de la condition IF
    END IF;
-- Marque la fin du bloc principal
END;
$$;