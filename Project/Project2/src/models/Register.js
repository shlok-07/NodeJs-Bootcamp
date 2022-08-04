const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

const mongoose = require('mongoose');
const StudentRegister = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true,
    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }]
})


// generating tokens while registering
// we'll only call method when we are working with a instance like in app.js registerEmployee is an instance of the main collection Register
StudentRegister.methods.generateAuthToken=async function(){       //we'll not use fat arrow function bcoz we need to play with .this keyword
    try {
        console.log(this._id);
        const token=jwt.sign({_id:this._id.toString()},"MynameisShlokSinghIamABackendDeveloper");
        this.tokens=this.tokens.concat({token:token});
        await this.save();  //to add into database
        console.log(token);
        return token;
    } catch (error) {
        res.send("error occur in tokens that is "+error);
    }
}


// security  // basically this is your middleware
StudentRegister.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = await bcrypt.hash(this.password, 10); //or else Undefined
        next();
    }
})

const Register = new mongoose.model('Register', StudentRegister);
module.exports = Register;
