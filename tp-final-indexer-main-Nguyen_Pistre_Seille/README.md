# Membres du groupe : 

- NGUYEN Ngoc Dang
- SEILLÉ Nicolas
- PISTRE Enzo

# Architecture :

- mainwindow : Vous y trouverez l'UI.
- MyThread : Thread avec l'indexer.
- FSM : Contient l'architecture de la classe FSM

# Fonctionnement :

-Après avoir exécuter le programme, appuyer sur le bouton indexer afin d'indexer tout les fichiers du disque dur.
Le nom des fichiers, leur PATH, leur date de création, leur dernière modification, l'extention ainsi que leur taille seront stockés dans la base de données. Tant que les fichiers n'ont pas été indexé, le bouton indexer reste grisé.

-Tout cela s'effectue dans un Thread afin que l'UI soit toujours la plus intéractive possible
 
-Vous pourrez entrer une commande sur la ligne réservée à cet effet.
La FSM vérifira si la commande entrez est bien valide et l'exécutera si c'est le cas. Les commandes que vous pouvez entrer sont :   
- GET suivit des options WHITELIST ou BLACKLIST pour récupérer les informations sur les dossiers et SKIPPED FILTERS ou FILTERS pour les fichiers. Pour ensuite les afficher sur l'UI.
- ADD avec les options WHITELIST, BLACKLIST, FILTERS ou SKIPPED_FILTERS suivit du PATH ou du type de dossier/fichier attendue (.jpg, .txt, .exe, ...)
- CLEAR avec les options WHITELIST, BLACKLIST, FILTERS ou SKIPPED_FILTERS pour supprimer le dossier/fichier souhaités 
- SEARCH suivit du nom du fichier que l'on souhaite trouver avec les options LAST_MODIFIED (pour connaitre a quand date la dernière modification), CREATED (pour la date de création), MAX_SIZE ou MIN_SIZE (pour connaitre la taille minimum ou maximum),  SIZE (la taille du fichier), EXT ((l'extention) et TYPE (pour le type de fichier).


# Commentaire :

-L'indexeur de fichiers, les threads et l'UI ont été implémentés
-Les commandes GET, ADD et CLEAR avec leurs options sont reconnues par la FSM et sont exécutées.
-Les résultats sont affichés sur l'UI.

-La factory, la gestion des commandes PUSH et SEARCH, et l'architecture client/serveur n'ont pas pu être réalisé.

