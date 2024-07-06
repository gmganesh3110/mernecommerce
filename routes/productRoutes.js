const express = require("express");
const Product = require("../models/productModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const prodcuts = await Product.find({});
    return res.status(200).json(prodcuts);
  } catch (err) {
    return res.status(400).json(err);
  }
});
router.post("/:id", async (req, res) => {
  try {
    const prodcut = await Product.findById(req.params.id);
    return res.status(200).json(prodcut);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post('/revie', async (req, res) => {
  try {
      const { review, productid, currentUser } = req.body;
      const id= new ObjectId(productid)
      const product = await Product.findById(productid);
      const userreview = {
          name: currentUser.name,
          userid: mongoose.Types.ObjectId(currentUser._id),
          rating: review.rating,
          comment: review.comment,
      };

      product.reviews.push(userreview);
      await product.save();

      return res.status(200).json('Product Review Saved Successfully');
  } catch (err) {
      console.error(err);  // Log the error for debugging purposes
      return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
