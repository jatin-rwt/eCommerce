const express = require("express");
const orderRoute = express.Router();
const protect = require("../middleware/Auth")
const asyncHandler = require("express-async-handler")


orderRoute.post("/", protect, asyncHandler( async(req, res) => {
    const {orderItems, shippingAddress, paymentMethod, shipppingPrice, taxPrice, totalPrice, price} = req.body;

    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error("no order items found");
    } else {
        const order = new Order({
            orderItems, shippingAddress, paymentMethod, shipppingPrice, taxPrice, totalPrice, price,
            user : req.user._id
        })

        const createOrder = await order.save();
        res.status(201).json(createdOrder);
    }
}))


//order payment route
orderRoute.put("/:id/payment", protect, asyncHandler( async(req, res) => {
    const order = await Order.findById(req.params.id);

    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            updated_time : req.body.updated_time,
            email_address : req.body.email_address
        }
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);

    }else{
        res.status(404);
        throw new Error("Order not found")
    }
}))

//get all orders
orderRoute.get("/", protect, asyncHandler( async(req, res) => {
    const orders = await Order.find({user:req.user._id}).sort({_id:-1});

    if(order){
        res.status(200).json(order);
    }else{
        res.status(404);
        throw new Error("Orders Not Found");
    }
}))


//get order by id
orderRoute.get("/:id", protect, asyncHandler( async(req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "email");
    if(order){
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error("No Order Found");
    }
}))

module.exports = orderRoute;