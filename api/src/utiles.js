require('dotenv').config();

const urlGeneral = `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=10&apiKey=${process.env.API_KEY}`
const urlId = `https://api.spoonacular.com/recipes/{id}/information?apiKey=${process.env.API_KEY}`

const dietTypes = ["gluten free","ketogenic","vegetarian","lacto ovo vegetarian","vegan","dairy free","pescatarian","primal","fodmap friendly","paleolithic","whole 30"]




function formatRecipeApi(recipes){
   
    return recipes.map(r=>{
        return {
            id:r.id,
            nombre:r.title,
            imagen:r.image,
            dietas:r.diets,
            puntaje:r.spoonacularScore
        }
    })
}

function formatRecipeBBDD(bdRecipes){
  
    const formatedResults = []

    if(bdRecipes.length === 0) return formatedResults
    
    let indiceActual = bdRecipes[0].id

    let arr = bdRecipes.filter(r=>r.id === indiceActual)

    while(arr.length > 0){
        const dietas = arr.map(r=>r['diets.name'])
        formatedResults.push({
            id:"$"+indiceActual,
            nombre:arr[0].name,
            puntaje:arr[0].score,
            imagen:arr[0].image,
            dietas:dietas
        })
        indiceActual++
        arr = bdRecipes.filter(r=>r.id === indiceActual)
    }
    

    return formatedResults
    
  
}

function formatDetailDbRecipe(recipe){
    return {
        id:recipe.virtualId,
        name:recipe.name,
        image:recipe.image,
        healthScore:recipe.healthScore,
        score:recipe.score,
        summary:recipe.summary,
        diets:recipe.diets.map(d=>d.name),
        steps:recipe.steps
    }
}

function formatDetailApiRecipe(recipe){
    console.log(recipe)
    return {
        id:recipe.id,
        name:recipe.title,
        image:recipe.image,
        healthScore:recipe.healthScore,
        score:recipe.spoonacularScore,
        summary:recipe.summary,
        diets:recipe.diets,
        steps:recipe.analyzedInstructions.length > 0 ? recipe.analyzedInstructions[0].steps : []
    }
}

module.exports ={
    urlGeneral,
    urlId,
    formatRecipeApi,
    formatRecipeBBDD,
    dietTypes,
    formatDetailApiRecipe,
    formatDetailDbRecipe
}


