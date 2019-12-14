# Hackatons

A REST API written in NodeJS with the Express framework that exposes endpoints to create an manage hackatons. This was used to host internal hackatons. Admins are eligible to create, start and delete hackatons. Participants can view active hackatons and submit their solutions. The hackatons are persisted in MongoDB and solutions are stored in Google Storage.

## Usage

Clone the repository. Add the `gcloud_keys.json` and the `.env` to the root folder and install dependencies with `npm i`. In development the server can be started with `npm run start-dev`. To run the server in production without `nodemon`, use `npm start`.

## API

### General

*Success Response*

```json
{
  "ok": true,
  "code": 200,
  "payload": {}
}
```

*Error Response*

```json
{
  "ok": false,
  "code": 400,
  "message": ""
}
```

### Authentication

#### `POST` `/login`

*Example Request*

```json
{
	"username": "admin",
	"password": "secret"
}
```

### Hackaton

#### `GET` `/hackaton/:id`

Returns the hackaton with the given ID. Requires authentication.

*Example Response*

```json
{
  "ok": true,
  "code": 200,
  "payload": {
    "status": "created",
    "_id": "5df3b1146aa2d20f4a7c6f93",
    "name": "Test Hackaton",
    "textBlocks": [
      {
        "images": [],
        "title": "Task 1",
        "text": "Instructions"
      }
    ],
    "participants": [],
    "createdAt": "2019-12-13T15:41:08.653Z",
    "updatedAt": "2019-12-13T15:41:08.653Z",
    "__v": 0
  }
}
```

### `GET` `public/hackaton/:id`

Returns the hackaton with the given ID, if its status is `active`.

*Example Response*

```json
{
  "ok": true,
  "code": 200,
  "payload": {
    "status": "active",
    "_id": "5df3b1146aa2d20f4a7c6f93",
    "name": "Test Hackaton",
    "textBlocks": [
      {
        "images": [],
        "title": "Task 1",
        "text": "Instructions"
      }
    ],
    "participants": [],
    "createdAt": "2019-12-13T15:41:08.653Z",
    "updatedAt": "2019-12-13T15:46:19.298Z",
    "__v": 0
  }
}
```

### `GET` `/hackaton/all`

Returns all hackatons. Requires authentication.

*Example Response*

```json
{
  "ok": true,
  "code": 200,
  "payload": {
    "hackatons": [
      {
        "status": "created",
        "_id": "5df3c3639a6a2016d3062a7f",
        "name": "Test Hackaton",
        "textBlocks": [
          {
            "images": [],
            "title": "Task 1",
            "text": "Instructions"
          }
        ],
        "participants": [],
        "createdAt": "2019-12-13T16:59:15.327Z",
        "updatedAt": "2019-12-13T16:59:15.327Z",
        "__v": 0
      }
    ]
  }
}
```

### `POST` `/hackaton`

Creates a new hackaton. The default status is `created`. The properties `name` and `textBlocks` are required. The hackaton needs to contain at least one text block as shown below. Requires authentication.

*Example Request*

```json
{
	"name": "Test Hackaton",
	"textBlocks": [
		{
			"title": "Task 1",
			"text": "Instructions",
			"images": []
		}
	]
}
```

### `POST` `/hackaton/solution/:id`

Accepts `multipart/form-data` requests, to upload solutions for a hackaton.

### `PUT` `/hackaton/:id`

Changes the status of a hackaton. Requires authentication.

*Example Request*

```json
{
	"status": "active"
}
```

### `DELETE` `/hackaton/:id`

Deletes a hackaton. Requires authentication.
