const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

const cors = require("cors");

const mongoose = require("mongoose");
//connect to db
mongoose.connect(process.env.MONGOOSE_URL).then(() => {
    console.log("db connected");
}).then((err) => {
   err;
    
})




const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./routes/User");
const productRoute = require("./routes/Product");
const orderRoute = require("./routes/Order");

app.use(express.json());

app.use(cors())

//database seeder routes
app.use("/api/seed", databaseSeeder)


//route for user
app.use("/api/users", userRoute)

//route for products
app.use("/api/products", productRoute)


//route for orders
app.use("/api/orders", orderRoute)

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
app.listen(PORT || 9000, () => {
    console.log(`server started on port: ${PORT}`);
})





//rawatjatin0206
//7u98yI0rDwsQuOeo
//mongodb+srv://rawatjatin0206:<db_password>@cluster0.0bakv.mongodb.net/
