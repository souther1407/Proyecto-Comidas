const {conn,Diet} = require("../db")
const axios = require("axios")
const {Router} = require("express");
const router = Router()


router.get("/",async(req,res)=>{
    res.json(await conn.models.Diet.findAll())
})

module.exports = router
