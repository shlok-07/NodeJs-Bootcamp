const mongoose=require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/KanbanBoard')
.then(()=>{
    console.log("Database Created Successfully");
})
.catch((e)=>{
    console.log(`Error is ${e} which occured in Creation of Database`)
})