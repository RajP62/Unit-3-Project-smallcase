const express = require("express");

const router = express.Router();

router.get("", async(req,res) => {
    return res.render("login", {

    })
})

module.exports = router;