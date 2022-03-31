//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { cookie } = require('express/lib/response');
const { Op } = require('sequelize');
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {dietTypes} = require("./src/utiles")


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    
    //Precargo las dietas
    await Promise.all(dietTypes.map(d=>conn.models.Diet.create({name:d})))


    //TEST:precargo resetas de prueba
    const reseta1=await conn.models.Recipe.create({
      name:"Asadito",
      summary:"Una receta proveniente de Argentina :p",
      score:95,
      healthScore:80,
      image:"https://www.cocina-chilena.com/base/stock/Recipe/584-image/584-image_web.jpg"
    })

    const dietas = ["vegan","gluten free"]
    const pasos = [{number:1,step:"poner la carne a la parrilla"},{number:2,step:"esperar a que se cocine :p"}]
    const reseta1Pasos = await Promise.all(pasos.map(p=>conn.models.Step.create(p)))

    const reseta1Diets = await conn.models.Diet.findAll({
        where:{
          name:{
            [Op.in]:dietas
         },
        }
      })

      await reseta1.addSteps(reseta1Pasos)
      await reseta1.addDiets(reseta1Diets)

    });
});
