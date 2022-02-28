//Conexion con la Base de Datos.
import Sequelize from "sequelize";

const sequelize = new Sequelize("crud_person", "root", "", {
	//Datos para conectarte a la Bd
	host: "localhost",
	dialect: "mysql",
	define: {
		timestamps: false, //Para que no considere createdAt y updatedAt en las Tabla
	},
});

const models = {
	person: sequelize.import("./person"),
};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
