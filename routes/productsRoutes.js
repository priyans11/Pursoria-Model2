const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('products route is working!');
});

module.exports = router;