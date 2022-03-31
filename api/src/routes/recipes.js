require('dotenv').config();
const {Router} = require("express");
const router = Router()
const axios = require("axios")
const {conn,Recipe,Diet,Step} = require("../db")

const {formatRecipeApi,formatRecipeBBDD,formatDetailApiRecipe,formatDetailDbRecipe} = require("../utiles");
const { Op } = require('sequelize');

let recetas = []


router.get("/",async (req,res)=>{
    const {name} = req.query

    let dbRecipes = await conn.models.Recipe.findAll({raw:true,where:{
        name:{
            [Op.like]: name !== undefined ? `%${name}%` : "%%"
        }
    },include:Diet})

    const r = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${process.env.API_KEY}`)
    if(name) r.data.results = r.data.results.filter(recipe=>recipe.title.includes(name))
    recetas = [...r.data.results]
    const totalRecetasDb =formatRecipeBBDD(dbRecipes)
    const totalRecetasApi = formatRecipeApi(r.data.results)

    if(dbRecipes.length === 0 && recetas.length === 0) return res.json({resultados:[...totalRecetasDb,...totalRecetasApi],cantidad_resultados:dbRecipes.length + recetas.length,msg:"no se encontraron recetas"})
    

    res.json({
        resultados:[...totalRecetasDb,...totalRecetasApi],
        cantidad_resultados:totalRecetasDb.length + totalRecetasApi.length,
    })
     
})


router.get("/:id",async (req,res)=>{
    const {id} = req.params
    if(!id.includes("$")){
        const recipeDetails = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`)
        console.log(recipeDetails.data)
        res.json(formatDetailApiRecipe(recipeDetails.data))
    }else{
        
      try {
          
          const recipe = await conn.models.Recipe.findByPk(Number(id.slice(1)),{include:[Step,Diet],})
          
          res.json(formatDetailDbRecipe(recipe))
      } catch (error) {
          res.json({success:false,error:"No existe la receta dada",id:id})
      }
    }
    
})

module.exports = router