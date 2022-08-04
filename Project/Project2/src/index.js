const express = require('express');
const app = express();

//establise mongodb Connection
require('./db/conn');
//require a mongodb models
const Register = require('./models/Register');

const path = require('path');

// For login check Security
const bcrypt = require('bcryptjs');

// Handlebars. js is a template engine to make writing html code easier
const hbs = require('hbs');

const port = 3000 || process.env.PORT;

const partials_path = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partials_path);

app.set('view engine', "hbs");
app.use(express.urlencoded({ extended: false }));
const dynamic_path = path.join(__dirname, '../templates/views');
app.set('views', dynamic_path);

app.get('/', (req, res) => {
    res.render("index");
})
app.get("/register", (req, res) => {
    res.render("register");
})
app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;  // this .password should be same as model Schema
        const cpassword = req.body.confirmpassword;
        if (password === cpassword) {
            const registerEmployee = new Register({  // Register iis the collection or Schema
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: password,
                confirmpassword: cpassword
            })
            console.log(`the above code is working see ${registerEmployee}`);
            //before saving into a database we'll hash the password basically security
            //before saving into a database we'll generate token

            const token = await registerEmployee.generateAuthToken();

            const registered = await registerEmployee.save(); // it return promise
            res.status(201).render("index"); //and we will call our index file
        }
        else {
            res.send('<h1>Password not Matched</h1>');
        }
    } catch (e) {
        res.status(400).send(e);
    }
})


app.get('/login', (req, res) => {
    res.render('login');
})
// login check POST
app.post('/login', async (req, res) => {
    try {
        const email = req.body.username;
        const password = req.body.password;
        const idData = await Register.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, idData.password);

        const token = await idData.generateAuthToken();  // as now idData is an instance of Register Collection
        console.log("the token is : " + token);
        if (isMatch) {
            res.status(201).render('index');
        }
        else {
            res.send("<h1>Invalid User Credentials</h1>");
        }
        // console.log(`${email} and password is ${password}`)
    } catch (error) {
        res.status(400).send('Invalid Email');
    }
})

app.listen(port, () => {
    console.log(`Hosting Website at port : ${port}`);
})