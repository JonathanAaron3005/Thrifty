const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
    //logic database gw search user berdaskan id
    res.render('product/new');
})

router.post('/', (req, res) => {
    res.send('test')
})

module.exports = router;