const express = require('express');
const router = express.Router({ mergeParams: true });
const Review = require('../models/review');
const Item = require('../models/item');

router.post('/', async (req, res) => {
    const item = await Item.findById(req.params.id);
    const review = new Review(req.body);
    review.user = req.user._id;
    item.reviews.push(review);
    await review.save();
    await item.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/item/${item._id}`);
})

router.delete('/:reviewId', async (req, res) => {
    const { id, reviewId } = req.params;
    await Item.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/item/${id}`);

})

module.exports = router;