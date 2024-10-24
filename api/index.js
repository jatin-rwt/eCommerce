const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

const mongoose = require("mongoose");
//connect to db
mongoose.connect(process.env.MONGOOSE_URL).then(() => {
    console.log("db connected");
}).then((err) => {
   err;
    
})




const databaseSeeder = require("./databaseSeeder");

//database seeder routes
app.use("/api/seed", databaseSeeder)


app.listen(PORT || 9000, () => {
    console.log(`server started on port: ${PORT}`);
})





//rawatjatin0206
//7u98yI0rDwsQuOeo
//mongodb+srv://rawatjatin0206:<db_password>@cluster0.0bakv.mongodb.net/
