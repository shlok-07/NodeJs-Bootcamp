NodeJsBootcamp

# Project 1

Connected to Database Server and to PORT: 5000
![](Project/demo%20Images/p1.png)

Add new data with post in POSTMAN
![](Project/demo%20Images/p1Post.png)
also add some more Data

The first created item have an id of 1, the second one, 2,and so on.
![](Project/demo%20Images/p1mongodb.png)

Now Update the ID:1 
![](Project/demo%20Images/p1put.png)

Therefore the Updated Database will be like
![](Project/demo%20Images/p1put2.png)


If the stage value passed is not 1,2, or 3, return the status code 400 with no requirement on the response body.
![](Project/demo%20Images/p1putError.png)


#Project2

The top value is 5 so return the names of the top 5 articles based on the number of comments at the Page no. 2.

node fetch.js {Top} {page}
![](Project/demo%20Images/fetch2.png)

Those top articles are:
![](Project/demo%20Images/fetch.png)


LOGIN/SIGNUP Authentication using JWT
First Page
asking for a login or Register
![](Project/demo%20Images/loginSignup.png)

Register:
![](Project/demo%20Images/register.png)

if Password and confirm password does not matched then it will Show
![](Project/demo%20Images/registerError2.png)

else
Database will be Created
![](Project/demo%20Images/terminal.png)

and store in MongoDb with the generated  #TOKEN
![](Project/demo%20Images/token.png)


LOGIN Page
![](Project/demo%20Images/login.png)

if user enter wrong credentials then it will Show
![](Project/demo%20Images/loginerror.png)

if enter correctly then it will give its JWT for verification
![](Project/demo%20Images/loginToken.png)
