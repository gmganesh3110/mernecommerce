const express=require('express');
const Product = require('../models/productModel');
const router=express.Router()

router.get("/",async(req,res)=>{
    try {
        const prodcuts=await Product.find({})
        return res.status(200).json(prodcuts)
    } catch (err) {
        return res.status(400).json(err)
    }
})
router.post("/:id",async(req,res)=>{
    try {
        const prodcut=await Product.findById(req.params.id)
        return res.status(200).json(prodcut)
    } catch (err) {
        return res.status(400).json(err)
    }
})

module.exports = router;