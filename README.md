
# Bank of Dreams

  
## Summary
 

This is a project to manage all the logic which allows you to connect your client application as you prefer.

  

## Run

In order to run de project your should type the following command in your preferred command line `npm start`.

These are the end points:

**Create user**

Url: http://localhost:8080/auth/register

Method: POST

Payload:
```
{
	"userId":yourid,
	"password":your password
}

```

**Generate Token**

Url: http://localhost:8080/auth/login

Method: POST

Payload:
```
{
	"userId":yourid,
	"password":your password
}
```

**Create new account**

Url: http://localhost:8080/accounts

Method: POST

Headers: 
```
x-access-token: your token
```
Payload:
```
{
	"account":"my new account"
}

```

**Get list of  accounts**

Url: http://localhost:8080/accounts

Method: GET

Headers: 
```
x-access-token: your token
```

**Create new transaction**

Url: http://localhost:8080/accounts/{your accountId}

Method: POST

Headers: 
```
x-access-token: your token
```
Payload:
```
{
	"description":"my description",
	"spend":12312
}

```

**Get list of  transactions**

Url: http://localhost:8080/accounts/{your accountId}

Method: GET

Headers: 
```
x-access-token: your token
```

**Get account average**

Url: http://localhost:8080/accounts/{your accountId}/transactions?startDate={startDate}&endDate={endDate}

Method: GET

Headers: 
```
x-access-token: your token
```

## DataBase Design

  

### User

  

| Column | Type | Constraints |
| ------------- |:-------------:| -----:|
| id | int | Primary Key <br/> Not Null |
| password | varchar | Not Null |

  

### Account

  

| Column | Type | Constraints |
| ------------- |:-------------:| -----:|
| id | int | Primary Key <br/> Not Null |
| account | varchar | Not Null |
| userId | int | Foreign Key <br/> Not Null |

  

### Transaction

  

| Column | Type | Constraints |
| ------------- |:-------------:| -----:|
| id | int | Primary Key <br/> Not Null |
| description | varchar | Not Null |
| spend | int | Not Null |
| accountId | int | Foreign Key <br/> Not Null |