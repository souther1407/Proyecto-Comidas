require('dotenv').config();
const {Router} = require("express");
const router = Router()

const {conn,Recipe,Step,Diet} = require("../db");
const { Op } = require('sequelize');


router.post("/",async (req,res)=>{
   
    const {name,summary,score,healthScore,steps,diets,image} = req.body;
    try {
        const newRecipe = await Recipe.create({
            name,
            summary,
            score,
            image: image ? image : "https://cdn-icons-png.flaticon.com/512/287/287000.png",
            healthScore
        })
        const resultsDiets = await conn.models.Diet.findAll({
            where:{
                name:{
                    [Op.in]:diets
                }
            }
        })
        const newSteps = await Promise.all(steps.map(s=>Step.create({number:s.number,step:s.step})))
        await newRecipe.addSteps(newSteps)
        await newRecipe.addDiets(resultsDiets)
        res.status(201).json({success:true})
    } catch (error) {
        res.status(400).json({success:false,error})
    }
    
})


module.exports = router