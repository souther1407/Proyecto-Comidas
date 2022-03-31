const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = require("./recipes")
const dietTypesRouter = require("./types")
const addRecipeRouter = require("./recipe")
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes",recipesRouter)
router.use("/types",dietTypesRouter)
router.use("/recipe",addRecipeRouter)
module.exports = router;
