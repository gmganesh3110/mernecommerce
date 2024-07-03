const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51PYP6pEaFYx8wMOxfu6jlnt4hfwibZW4oSPf4Tcpa5ia0a99VV92Lv3kFCxObyVZQXvZvSqUNh799rXM4MnXFXL800CCGsVYkm');
const Order=require('../models/orderModel');
router.post('/', async (req, res) => {
    try {
        const { token, cartItems, currentUser, subtotal } = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        const idempotencyKey = uuidv4();

        const payment = await stripe.charges.create({
            amount: subtotal * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: currentUser.email,
            description: `Purchase from Foodmine`,
        }, {
            idempotencyKey: idempotencyKey,
        });

        if (payment.status === 'succeeded') {
            const order=new Order({
                userId:currentUser._id,
                name:currentUser.name,
                email:currentUser.email,
                orderItems:cartItems,
                shippingAddress:{
                    address:token.card.address_line1,
                    city:token.card.address_city,
                    country:token.card.address_country,
                    postalCode:token.card.address_zip,
                },
                orderAmount:subtotal,
                transactionId:payment.source.id,
                isDelivered:false
            })
            await order.save()
            res.send("Payment successfull")
        } else {
            return res.status(400).json("Payment failed");
        }
    } catch (err) {
        return res.status(400).json(err);
    }
});
router.get("/:id",async(req,res)=>{
    try {
        const userid=req.params.id;
        const orders=await Order.find({
            userId:userid
        })
        res.status(200).json(orders)
    } catch (err) {
        return res.status(400).json(err);
    }
})
router.get("/getsingleorder/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const orders=await Order.find({
            _id:id
        })
        res.status(200).json(orders)
    } catch (err) {
        return res.status(400).json(err);
    }
})

module.exports = router;
