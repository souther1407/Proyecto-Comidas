
import {
    FILTER_BY_NAME,
    FILTER_BY_SCORE,
    GET_RECIPES,
    GET_RECIPES_BY_NAME,
    GET_RECIPE_DETAIL,GET_DIET_TYPES,
    LOADING_RECIPIES,
    NEXT_PAGE,
    ANT_PAGE,
    GET_TOTAL_PAGES,
    FILTER_BY_DIET_TYPE,
    SWITCH_FILTERS,
    LOADING_DETAIL_RECIPE} from '../actions/actionsNames'



const initState ={
    recipes:[], 
    dietTypes:[],
    detailRecipe:{},
    loadedRecipies:false,
    loadedDetailRecipe:false,
    currentPage:1,
    totalPages:0,
    pageRecipies:[],
    filteredRecipies:[],
    filtersActivated:false,
}


const contiene = (dietas,dietasPayload)=>{
    
    if(dietasPayload.length === 0) return true
    if(dietas.length === 0 && dietasPayload.length !== 0) return false

    for(let dieta of dietasPayload){
        if(!dietas.includes(dieta)) return false
    }
    return true
}


export default function rootReducer(state = initState,action){

    switch(action.type){
        case GET_RECIPE_DETAIL:
            return {
                ...state,
                detailRecipe:action.payload,
                loadedRecipies:true,
                loadedDetailRecipe:true,
            }
        case GET_RECIPES:
            return {
                ...state,
                recipes:action.payload,
                filteredRecipies:action.payload,
                loadedRecipies:true,
                currentPage:1,
            }
        case GET_RECIPES_BY_NAME:
            return {
                ...state,
                recipes:action.payload,
                filteredRecipies:action.payload,
                loadedRecipies:true,
                currentPage:1,
            }
        case GET_DIET_TYPES:
            return {
                ...state,
                dietTypes:action.payload
            }

        case LOADING_RECIPIES:
            return {
                ...state,
                loadedRecipies:false
            }
        case NEXT_PAGE:
            return {
                ...state,
                currentPage: state.currentPage + 1
            }
        case ANT_PAGE:
            return {
                ...state,
                currentPage: state.currentPage - 1
            }
        case GET_TOTAL_PAGES:{
            return {
                ...state,
                totalPages: Math.ceil(action.payload.length / 9)
            }
        }
        case FILTER_BY_DIET_TYPE:
            const filtradas = state.recipes.filter(r=>contiene(r.dietas,action.payload))
            return {
                ...state,
                filteredRecipies: filtradas,
                currentPage:1,
                totalPages: Math.ceil(filtradas.length / 9)
            }
        case SWITCH_FILTERS:{
            return {
                ...state,
                filtersActivated:action.payload
            }
        }
        case FILTER_BY_NAME:{
            
            const ordAsc=(r1,r2)=>{
                if(r1.nombre < r2.nombre)return -1
                else if(r1.nombre > r2.nombre) return 1
                else return 0
            }

            const ordDesc = (r1,r2)=>{
                if(r1.nombre < r2.nombre)return 1
                else if(r1.nombre > r2.nombre) return -1
                else return 0
            }

            const filtrados = action.payload === "asc" ?
             state.filteredRecipies.sort(ordAsc) :
             state.filteredRecipies.sort(ordDesc)

            return {
                ...state,
                filteredRecipies: [...filtrados],
                filtersActivated:true,

            }
        }
        case FILTER_BY_SCORE:{
            
            const ordAsc=(r1,r2)=>{
                if(r1.puntaje < r2.puntaje)return -1
                else if(r1.puntaje > r2.puntaje) return 1
                else return 0
            }

            const ordDesc = (r1,r2)=>{
                if(r1.puntaje < r2.puntaje)return 1
                else if(r1.puntaje > r2.puntaje) return -1
                else return 0
            }

            const filtrados = action.payload === "asc" ?
             state.filteredRecipies.sort(ordAsc) :
             state.filteredRecipies.sort(ordDesc)

            return {
                ...state,
                filteredRecipies: [...filtrados],
                filtersActivated:true,

            }
         }
         case LOADING_DETAIL_RECIPE:
             return {
                 ...state,
                 loadedDetailRecipe:false
             }          
         default:
             return state   
    }

}