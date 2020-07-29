const router = require('express').Router()

router.get('/', (req, res)=> {
    res.json({
        id:1,
        firstname : "corama",
        nickname : "icodemaster"
    })
})

module.exports = router;