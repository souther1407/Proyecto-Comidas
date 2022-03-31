const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    summary: {
      type:DataTypes.STRING,
      allowNull:false
    },
    score: {
      type:DataTypes.DOUBLE
    },
    healthScore: {
      type: DataTypes.DOUBLE
    },
    virtualId:{
      type:DataTypes.VIRTUAL,
      get(){
        return `$${this.id}`
      },
      set(value){
        throw new Error("no se puede setear el virtual id")
      }
    },
    image:{
      type:DataTypes.STRING,
      allowNull:true,
      validate:{
        isUrl:true
      }
    }
    /* steps: {
      type:DataTypes.ARRAY(DataTypes.STRING(1024)), //TODO: Podria ser otra tabla
    } */
  },{timestamps:false});
};
