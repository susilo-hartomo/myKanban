# kanban
Creating fancy kanban app, using express, jquery, ajax.\
My assets in App is an application to manage your assets.\
Deploy Server with Heroku and Client with Firebase
This app has :
* RESTful endpoint for asset's CRUD operation
* JSON formatted response
* https://kanban-project-1588929950262.web.app/
<br></br>
--------------------------
## RESTful endpoints
* Route kanban
* Route User
<br></br>
-------------------------
# Route todos
### GET / kanban
> Get all tasks list in kanban
>
*Request Header*
```
{
  "access_token": "<your access token>"
}
```
*Request Body*
```
not needed
```
*Respons (200)*
```
[
  {
    "id": 1,
    "category": "<asset category>",
    "title": "<asset title>",
    "description": "<asset description>",
    "tag": "<asset tag>",
    "due_date": "<asset due_date>",
    "task_priority": "<asset task_priority>",
    "UserId": "<asset user id>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "category": "<asset category>",
    "title": "<asset title>",
    "description": "<asset description>",
    "tag": "<asset tag>",
    "due_date": "<asset due_date>",
    "task_priority": "<asset task_priority>",
    "UserId": "<asset user id>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```
*Responses Error(404-bad request)*
```
{
  "message": "<returned error message>"
}
```
*Responses Error(500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>
### POST / kanban
> Create task
>
*Request Header*
```
{
  "access_token": "<your access token>"
}
```
*Request Body*
```
{
    "category": "<asset category>",
    "title": "<asset title>",
    "description": "<asset description>",
    "tag": "<asset tag>",
    "due_date": "<asset due_date>",
    "task_priority": "<asset task_priority>",
}
```
*Respons (201)*
```
{
  "message": "<returned success message>"
}
```
*Respons (400-Error validate)*
```
{
  "message": "<returned error message>"
}
```
*Respons (500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>
### GET / kanban/:id
> Get todo with id with authorization
>
*Request Header*
```
{
  "access_token": "<your access token>"
}
```
*Request Params*
```
{
    "id": "<asset params id>",
}
```
*Respons (200)*
Get todo with id = 2 with access token

```
{
    "id": 2,
    "category": "<asset category>",
    "title": "<asset title>",
    "description": "<asset description>",
    "tag": "<asset tag>",
    "due_date": "<asset due_date>",
    "task_priority": "<asset task_priority>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}

```
*Respons (404- bad request)*
```
{
  "message": "<returned error message>"
}
```
*Respons (500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>
### PUT / kanban/:id
> Update task with id params
>
*Request Header*
```
{
  "access_token": "<your access token>"
}
```
*Request Params*
```
{
    "id": "<asset params id>",
}
```
*Request Body*
```
{
   "category": "<asset category>",
    "title": "<asset title>",
    "description": "<asset description>",
    "tag": "<asset tag>",
    "due_date": "<asset due_date>",
    "task_priority": "<asset task_priority>",
}
```
*Respons (200)*
```
  "message": "<returned success message>"
```
*Respons (404- bad request)*
```
{
  "message": "<returned error message>"
}
```
*Respons (400-error validation)*
```
{
  "message": "<returned error message>"
}
```
*Respons (500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>
### DELETE / kanban/:id
> Delete task with id params
>
*Request Header*
```
{
  "access_token": "<your access token>"
}
```
*Request Params*
```
{
    "id": "<asset params id>",
}
```
*Respons (200)*
```
  "message": "<returned success message>"
```
*Respons (404- bad request)*
```
{
  "message": "<returned error message>"
}
```
*Respons (500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>

------------------------------------
# Route Users
### POST /users/register
> Create user
>
*Request Body*
```
{
    "username": "<asset username>",
    "email": "<asset email>",
    "password": "<asset password>"
}
```
*Respons (201)*
```
  "message": "<returned success message>"
```
*Respons (400-error validation)*
```
{
  "message": "<returned error message>"
}
```
*Respons (500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>
### POST /users/login
> Enter account user
>
*Request Body*
```
{
    "email": "<asset email>",
    "password": "<asset password>"
}
```
*Respons (200)*
```
  "akses_token": "<returned akses_token>"
```
*Respons (400-bad request)*
```
{
  "message": "<returned error message>"
}
```
*Respons (500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>
### POST /users/login/google
> Have google account
>
*Request Body*
Get token id from Oaut2 from google
```
{
    "id_tokon": "<asset id_token>",
}
```
*Respons (200)*
```
  "akses_token": "<returned akses_token>"
```
*Respons (400-bad request)*
```
{
  "message": "<returned error message>"
}
```
*Respons (500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>
