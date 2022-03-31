import {
        FILTER_BY_NAME,
        FILTER_BY_SCORE,
        GET_RECIPES,
        GET_RECIPES_BY_NAME,
        GET_RECIPE_DETAIL,
        GET_DIET_TYPES,
        LOADING_RECIPIES,
        ANT_PAGE,
        NEXT_PAGE,
        GET_TOTAL_PAGES,
        FILTER_BY_DIET_TYPE,
        SWITCH_FILTERS,
        LOADING_DETAIL_RECIPE}
from './actionsNames'



export function getRecipes(){
   return async function(dispatch){
          dispatch({type:LOADING_RECIPIES})
          const r = await fetch("http://localhost:3001/recipes")
          const data = await r.json()
          dispatch({type:GET_RECIPES,payload:data.resultados})
          dispatch({type:GET_TOTAL_PAGES,payload:data.resultados})
   }
   
}

export function getDietTypes(){

    return async dispatch => {
        const r = await fetch("http://localhost:3001/types")
        const data = await r.json()
        dispatch({type:GET_DIET_TYPES,payload:data})

    }
}

export function getRecipeDetail(id){

        return async dispatch => {
                dispatch({type:LOADING_RECIPIES})
                const r = await fetch(`http://localhost:3001/recipes/${id}`)
                const data = await r.json()
                dispatch({type:GET_RECIPE_DETAIL,payload:data})
        
            }
}

export function antPage(){
    return {
        type:ANT_PAGE
    }
}

export function nextPage(){
    return {
        type:NEXT_PAGE
    }
}

export function getRecipesByName(name){

    return dispatch => {
        dispatch({type:LOADING_RECIPIES})
        fetch(`http://localhost:3001/recipes?name=${name}`)
        .then(r=>r.json())
        .then((data)=>{
            dispatch({type:GET_RECIPES_BY_NAME, payload:data.resultados})
            dispatch({type:GET_TOTAL_PAGES,payload:data.resultados})
            
        })
    }
}

export function filterByDietType(diets){
    return {
        type:FILTER_BY_DIET_TYPE,
        payload:diets
    }
}

export function switchFilterActivate(bool){
    return {
        type:SWITCH_FILTERS,
        payload:bool
    }
}

export function filterByName(orden){
    return {
        type:FILTER_BY_NAME,
        payload:orden
    }
}

export function filterByScore(orden){
    return {
        type:FILTER_BY_SCORE,
        payload:orden
    }
}

export function loadingRecipes(){
    return {
        type:LOADING_RECIPIES,
    }
}

export function loadingDetailRecipe(){
    return {
        type:LOADING_DETAIL_RECIPE
    }
}