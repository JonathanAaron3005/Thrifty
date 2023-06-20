const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const Store = require('../models/store');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const { cloudinary } = require("../cloudinary");

router.get('/', async (req, res) => {
    const items = await Item.find({});
    res.render('items/view', { items });
})

router.get('/new', async (req, res) => {
    res.render('items/new');
})

router.post('/', upload.array('image'), async (req, res) => {
    if (req.body.price < 0) {
        req.flash('error', 'price cannot be below 0!');
        res.redirect(`/item/new`);
    } else if (req.body.stock < 0) {
        req.flash('error', 'stock cannot be below 0!');
        res.redirect(`/item/new`);
    } else {
        const currentUser = req.user._id;
        const store = await Store.findOne({ user: currentUser })
        const item = new Item(req.body);
        item.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
        item.user = currentUser;
        store.items.push(item);

        await item.save();
        await store.save();

        req.flash('success', 'item added!');
        res.redirect(`/item/${item._id}`);
    }
})

router.get('/search', async (req, res) => {
    const { query } = req.query;
    const items = await Item.find({ name: { $regex: query, $options: 'i' } })
    res.render('items/view', { query, items });
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'user'
        }
    }).populate('user');
    if (!item) {
        req.flash('error', 'Cannot find that item!');
        return res.redirect('/homepage');
    }
    const store = await Store.findOne({ items: { $elemMatch: { $eq: id } } });

    res.render('items/detail', { item, store });
})

router.put('/:id', upload.array('image'), async (req, res) => {
    const { id } = req.params;
    if (req.body.price < 0) {
        req.flash('error', 'price cannot be below 0!');
        res.redirect(`/item/${id}/edit`);
    } else if (req.body.stock < 0) {
        req.flash('error', 'stock cannot be below 0!');
        res.redirect(`/item/${id}/edit`);
    } else {
        const item = await Item.findByIdAndUpdate(id, req.body);
        if (req.files) {
            const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
            item.images.push(...imgs);
        }
        await item.save();
        if (req.body.deleteImages) {
            for (let filename of req.body.deleteImages) {
                await cloudinary.uploader.destroy(filename);
            }
            await item.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
        }
        req.flash('success', 'Successfully updated item!');
        res.redirect(`/item/${item._id}`)
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted item')
    res.redirect('/item');
})

router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) {
        req.flash('error', 'Cannot find that item!');
        return res.redirect('/item');
    }

    res.render('items/edit', { item });
})


module.exports = router;