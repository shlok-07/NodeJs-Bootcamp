const express = require('express');
const app = express();
const Router=require('./Routers/routes')
const port = process.env.PORT || 5000;


require('./db/connection');

app.use(Router);


app.listen(port, () => {
    console.log(`Listening to port : ${port}`);
})