<h1 align="center">
  <br>
  <a href="http://www.amitmerchant.com/electron-markdownify"><img src="https://raw.githubusercontent.com/amitmerchant1990/electron-markdownify/master/app/img/markdownify.png" alt="Markdownify" width="200"></a>
  <br>
  M'ARTIST API
  <br>
</h1>

<h4 align="center">Une API REST construite sur <a href="https://expressjs.com/fr/" target="_blank">ExpressJS</a>.</h4>

## Comment utiliser

Pour cloner et exécuter cette API REST, vous aurez besoin de [Git](https://git-scm.com) et [Node.js](https://nodejs.org/en/download/) (fourni avec [npm](http://npmjs.com)) installés sur votre ordinateur. Depuis votre ligne de commande :

```bash
# Clone 
$ git clone https://github.com/maxousql/lyltsign

# Aller dans le répertoire 
$ cd lyltsign/back

# Installer les dépendances
$ npm install

# Lancer l'application
$ node server.js
# Ou
$ npm start
```

> **Note**
> Vous n'aurez pas besoin de base de donnée prédéfinie, Sequelize s'occupe de synchroniser les tables dont il aura besoin. Veuillez uniquement compléter les informations du fichier .env pour correspondre avec votre environnemnt.

## Fichier .env
```
SERVER_PORT=1409

DB_HOST=localhost
DB_PORT=3306
DB_NAME=top_artists_spotify
DB_USER=root
DB_PASS=

BCRYPT_SALT_ROUND=10

KEY_JWT=UON7y4g9dD3nx54z26YYdquzzZ8vSTdd
TIME_JWT=1 hour
```

## Table des matières
- [Connexion](#connexion)
  - [1. Se connecter](#1-se-connecter)
- [Utilisateurs](#utilisateurs)
  - [1. Créer un nouvel utilisateur](#1-créer-un-nouvel-utilisateur)
  - [2. Récupérer un utilisateur par son identifiant](#2-récupérer-un-utilisateur-par-son-identifiant)
  - [3. Récupérer tous les utilisateurs](#3-récupérer-tous-les-utilisateurs)
  - [4. Mettre à jour un utilisateur](#4-mettre-à-jour-un-utilisateur)
  - [5. SoftDelete](#5-softdelete)
  - [6. Restore utiliasteur SoftDelete](#6-restore-utiliasteur-softdelete)
  - [7. Delete](#7-delete)
- [Artistes](#artistes)
  - [1. Créer un nouvel artiste](#1-créer-un-nouvel-artiste)
  - [2. Récupérer un artiste par son identifiant](#2-récupérer-un-artiste-par-son-identifiant)
  - [3. Récupérer tous les artistes](#3-récupérer-tous-les-artistes)
  - [4. Mettre à jour un utilisateur](#4-mettre-à-jour-un-utilisateur-1)
  - [5. SoftDelete](#5-softdelete-1)
  - [6. Restore utiliasteur SoftDelete](#6-restore-utiliasteur-softdelete-1)
  - [7. Delete](#7-delete-1)

# Connexion

## 1. Se connecter

  - **URL**: `POST /auth/login`
  - **Description**: Cette route permet à un utilisateur de se connecter et d'obtenir un token d'authentification.
  - **Authentification requise**: Non
  - **Paramètres**:

    | Nom         | Type     | Description           |
    | ----------- | -------- | --------------------- |
    | `username`  | string   | Nom d'utilisateur     |
    | `password`  | string   | Mot de passe          |

  - **Exemple de requête**:

    ```http
    POST /api/users/login
    Content-Type: application/json

    {
      "email": "ilias@outlook.fr",
      "password": "12345"
    }
    ```

  - **Réponse réussie**:

    ```
    {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJpbGlhcyIsImVtYWlsIjoiaWxpYXNAb3V0bG9vay5mciIsImlhdCI6MTY5MTE3NDE5OCwiZXhwIjoxNjkxMTc3Nzk4fQ.UbB88DVm7zu9GHt2Jg-g-0cG-FqQ2mOY3oodMsCumP4"
    }
    ```

  - **Réponse d'erreur**:

    - Statut 500 Database Error : Si erreur sequelize
    - Statut 400 Missing data : Si un paramètre est manquant ou invalide

# Utilisateurs

## 1. Créer un nouvel utilisateur

- **URL**: `PUT /users/`
- **Description**: Cette route permet de créer un nouvel utilisateur.
- **Authentification requise**: Oui (token valide requis)
- **Paramètres**:

  | Nom         | Type     | Description           |
  | ----------- | -------- | --------------------- |
  | `username`  | string   | Nom d'utilisateur unique |
  | `email`     | string   | Adresse e-mail de l'utilisateur |
  | `password`  | string   | Mot de passe de l'utilisateur |

- **Exemple de requête**:

  ```http
  PUT /users/
  Content-Type: application/json
  Authorization: Bearer <votre-token>

  {
    "username": "maxousql",
    "email": "maxlaiyio@outlook.com",
    "password": "123456"
  }

- **Réponse réussie**:

    ```

    {
    "message": "User created",
    "data": {
        "id": 1,
        "email": "maxlaiyio@outlook.fr",
        "username": "maxousql",
        "password": "$2b$10$HdYvHs8tqGLOwA9z2UIgj.JTxeOjVOPlIzXtj5Jyvagna7brR6/2C",
        "updatedAt": "2023-08-04T18:28:40.890Z",
        "createdAt": "2023-08-04T18:28:40.890Z"
    }
    }
    ```

  - **Réponse d'erreur**:

    - Statut 500 Database Error : Si erreur sequelize
    - Statut 400 Missing data : Si un paramètre est manquant ou invalide

## 2. Récupérer un utilisateur par son identifiant

  - **URL**: `GET /users/:id`
  - **Description**: Cette route permet de récupérer les informations d'un utilisateur en fonction de son identifiant.
  - **Authentification requise**: Oui (token valide requis)
  - **Paramètres**:

    | Nom      | Type  | Description           |
    | -------- | ----- | --------------------- |
    | `id`     | int   | Identifiant de l'utilisateur à récupérer |

  - **Exemple de requête**:

    ```http
    GET /users/1
    Authorization: Bearer <votre-token>
    ```

  - **Réponse réussie**:

    ```
    {
    "data": {
        "id": 1,
        "email": "maxlaiyio@outlook.fr",
        "username": "maxousql",
        "password": "$2b$10$HdYvHs8tqGLOwA9z2UIgj.JTxeOjVOPlIzXtj5Jyvagna7brR6/2C",
        "createdAt": "2023-08-04T18:28:40.000Z",
        "updatedAt": "2023-08-04T18:28:40.000Z",
        "deletedAt": null
    }
    }
    ```

  - **Réponse d'erreur**:

    - Statut 500 Database Error : Si erreur sequelize
    - Statut 400 Missing data : Si un paramètre est manquant ou invalide

## 3. Récupérer tous les utilisateurs

  - **URL**: `GET /users/`
  - **Description**: Cette route permet de récupérer la liste de tous les utilisateurs.
  - **Authentification requise**: Oui (token valide requis)

  - **Exemple de requête**:

    ```http
    GET /users/
    Authorization: Bearer <votre-token>
    ```

  - **Réponse réussie**:

    ```
    {
    "data": [
        {
            "id": 1,
            "email": "maxlaiyio@outlook.fr",
            "username": "maxousql",
            "password": "$2b$10$HdYvHs8tqGLOwA9z2UIgj.JTxeOjVOPlIzXtj5Jyvagna7brR6/2C",
            "createdAt": "2023-08-04T18:28:40.000Z",
            "updatedAt": "2023-08-04T18:28:40.000Z",
            "deletedAt": null
        },
        {
            "id": 2,
            "email": "ilias@outlook.fr",
            "username": "ilias",
            "password": "$2b$10$NKsQmiv6cDvGnPtKtSH3be28cYyfLBb/ECtnzjvOeu/Ow32sva0CW",
            "createdAt": "2023-08-04T18:33:13.000Z",
            "updatedAt": "2023-08-04T18:33:13.000Z",
            "deletedAt": null
        }
    ]
    }
    ```

  - **Réponse d'erreur**:

    - Statut 500 Database Error : Si erreur sequelize
    - Statut 400 Missing data : Si un paramètre est manquant ou invalide

## 4. Mettre à jour un utilisateur

  - **URL**: `PATCH /users/:id`
  - **Description**: Cette route permet de mettre à jour les informations d'un utilisateur.
  - **Authentification requise**: Oui (token valide requis)

  - **Exemple de requête**:

    ```http
    PATCH /users/:id
    Authorization: Bearer <votre-token>
    ```

  - **Réponse réussie**:

    ```
    {
    "message": "User updated"
    }
    ```

  - **Réponse d'erreur**:

    - Statut 500 Database Error : Si erreur sequelize
    - Statut 400 Missing data : Si un paramètre est manquant ou invalide

## 5. SoftDelete

  - **URL**: `DELETE /trash/:id`
  - **Description**: Cette route permet de soft delete un utilisateur.
  - **Authentification requise**: Oui (token valide requis)

  - **Exemple de requête**:

    ```http
    PATCH /trash/:id
    Authorization: Bearer <votre-token>
    ```

  - **Réponse réussie**:

    ```
    Aucune réponse
    ```

  - **Réponse d'erreur**:

    - Statut 500 Database Error : Si erreur sequelize
    - Statut 400 Missing data : Si un paramètre est manquant ou invalide

## 6. Restore utiliasteur SoftDelete

  - **URL**: `DELETE /untrash/:id`
  - **Description**: Cette route permet de restore un utilisateur qui a été soft delete.
  - **Authentification requise**: Oui (token valide requis)

  - **Exemple de requête**:

    ```http
    POST /untrash/:id
    Authorization: Bearer <votre-token>
    ```

  - **Réponse réussie**:

    ```
    Aucune réponse
    ```

  - **Réponse d'erreur**:

    - Statut 500 Database Error : Si erreur sequelize
    - Statut 400 Missing data : Si un paramètre est manquant ou invalide

## 7. Delete

  - **URL**: `DELETE /users/:id`
  - **Description**: Cette route permet supprimer complétement un utilisateur.
  - **Authentification requise**: Oui (token valide requis)

  - **Exemple de requête**:

    ```http
    DELETE /users/:id
    Authorization: Bearer <votre-token>
    ```

  - **Réponse réussie**:

    ```
    Aucune réponse
    ```

  - **Réponse d'erreur**:

    - Statut 500 Database Error : Si erreur sequelize
    - Statut 400 Missing data : Si un paramètre est manquant ou invalide

# Artistes

## 1. Créer un nouvel artiste

- **URL**: `PUT /artist/`
- **Description**: Cette route permet de créer un nouvel artiste.
- **Authentification requise**: Oui (token valide requis)
- **Paramètres**:

  | Nom         | Type     | Description           |
  | ----------- | -------- | --------------------- |
  | `name`  | string   | Nom d'utilisateur unique |
  | `streams`     | integer   | Nombre de streams |
  | `daily`  | integer   | Nombre de streams journalier |
  | `as_lead`  | integer   | Top lead |
  | `solo`  | integer   | Streams solo |
  | `as_feature`  | integer   | Streams feat |

- **Exemple de requête**:

  ```http
  PUT /artists/
  Content-Type: application/json
  Authorization: Bearer <votre-token>

  {
    "name": "Ninho",
    "streams": "16464",
    "daily": "123",
    "as_lead": "1",
    "solo": "231312",
    "as_feature": "12347"
  }

- **Réponse réussie**:

    ```
    {
    "message": "Artist created",
    "data": {
        "id": 2,
        "name": "Ninho",
        "streams": "16464",
        "daily": "123",
        "as_lead": "1",
        "solo": "231312",
        "as_feature": "12347",
        "updatedAt": "2023-08-04T18:49:21.535Z",
        "createdAt": "2023-08-04T18:49:21.535Z"
    }
    }
    ```

  - **Réponse d'erreur**:

    - Statut 500 Database Error : Si erreur sequelize
    - Statut 400 Missing data : Si un paramètre est manquant ou invalide

## 2. Récupérer un artiste par son identifiant

  - **URL**: `GET /artists/:id`
  - **Description**: Cette route permet de récupérer les informations d'un artiste en fonction de son identifiant.
  - **Authentification requise**: Non
  - **Paramètres**:

    | Nom      | Type  | Description           |
    | -------- | ----- | --------------------- |
    | `id`     | int   | Identifiant de l'utilisateur à récupérer |

  - **Exemple de requête**:

    ```http
    GET /users/1
    ```

  - **Réponse réussie**:

    ```
    {
    "data": {
        "id": 1,
        "name": "Drake",
        "streams": 10152944,
        "daily": 90000,
        "as_lead": 12,
        "solo": 50000,
        "as_feature": 25000,
        "createdAt": "2023-08-04T18:06:15.000Z",
        "updatedAt": "2023-08-04T18:06:15.000Z",
        "deletedAt": null
    }
    }
    ```

  - **Réponse d'erreur**:

    - Statut 500 Database Error : Si erreur sequelize
    - Statut 400 Missing data : Si un paramètre est manquant ou invalide

## 3. Récupérer tous les artistes

  - **URL**: `GET /artists/`
  - **Description**: Cette route permet de récupérer la liste de tous les artistes.
  - **Authentification requise**: Non

  - **Exemple de requête**:

    ```http
    GET /artists/
    ```

  - **Réponse réussie**:

    ```
    {
    "data": [
        {
            "id": 1,
            "name": "Drake",
            "streams": 10152944,
            "daily": 90000,
            "as_lead": 12,
            "solo": 50000,
            "as_feature": 25000,
            "createdAt": "2023-08-04T18:06:15.000Z",
            "updatedAt": "2023-08-04T18:06:15.000Z",
            "deletedAt": null
        },
        {
            "id": 2,
            "name": "Ninho",
            "streams": 16464,
            "daily": 123,
            "as_lead": 1,
            "solo": 231312,
            "as_feature": 12347,
            "createdAt": "2023-08-04T18:49:21.000Z",
            "updatedAt": "2023-08-04T18:49:21.000Z",
            "deletedAt": null
        }
    ]
    }
    ```

  - **Réponse d'erreur**:

    - Statut 500 Database Error : Si erreur sequelize
    - Statut 400 Missing data : Si un paramètre est manquant ou invalide

## 4. Mettre à jour un utilisateur

  - **URL**: `PATCH /artists/:id`
  - **Description**: Cette route permet de mettre à jour les informations d'un artiste.
  - **Authentification requise**: Oui (token valide requis)

  - **Exemple de requête**:

    ```http
    PATCH /artists/:id
    Authorization: Bearer <votre-token>
    ```

  - **Réponse réussie**:

    ```
    {
    "message": "Artist updated"
    }
    ```

  - **Réponse d'erreur**:

    - Statut 500 Database Error : Si erreur sequelize
    - Statut 400 Missing data : Si un paramètre est manquant ou invalide

## 5. SoftDelete

  - **URL**: `DELETE /trash/:id`
  - **Description**: Cette route permet de soft delete un artiste.
  - **Authentification requise**: Oui (token valide requis)

  - **Exemple de requête**:

    ```http
    PATCH /trash/:id
    Authorization: Bearer <votre-token>
    ```

  - **Réponse réussie**:

    ```
    Aucune réponse
    ```

  - **Réponse d'erreur**:

    - Statut 500 Database Error : Si erreur sequelize
    - Statut 400 Missing data : Si un paramètre est manquant ou invalide

## 6. Restore utiliasteur SoftDelete

  - **URL**: `DELETE /untrash/:id`
  - **Description**: Cette route permet de restore un artiste qui a été soft delete.
  - **Authentification requise**: Oui (token valide requis)

  - **Exemple de requête**:

    ```http
    POST /untrash/:id
    Authorization: Bearer <votre-token>
    ```

  - **Réponse réussie**:

    ```
    Aucune réponse
    ```

  - **Réponse d'erreur**:

    - Statut 500 Database Error : Si erreur sequelize
    - Statut 400 Missing data : Si un paramètre est manquant ou invalide

## 7. Delete

  - **URL**: `DELETE /users/:id`
  - **Description**: Cette route permet supprimer complétement un artiste.
  - **Authentification requise**: Oui (token valide requis)

  - **Exemple de requête**:

    ```http
    DELETE /users/:id
    Authorization: Bearer <votre-token>
    ```

  - **Réponse réussie**:

    ```
    Aucune réponse
    ```

  - **Réponse d'erreur**:

    - Statut 500 Database Error : Si erreur sequelize
    - Statut 400 Missing data : Si un paramètre est manquant ou invalide