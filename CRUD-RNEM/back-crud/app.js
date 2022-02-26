const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3050;

const app = express();

app.use(cors());
app.use(bodyParser.json());

//Configuracion Mysql
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "crud_person",
});

//RUTAS
app.get("/", (req, res) => {
	res.send("Bienvenido");
});

//Listar todos
app.get("/persons", (req, res) => {
	const sql = "SELECT * FROM persons";
	connection.query(sql, (error, results) => {
		if (error) throw error;
		if (results.length > 0) {
			console.log(results);
			res.json(results);
		} else {
			res.json("No hay resultados");
		}
	});
});

//Opten una persona
app.get("/person/:id", (req, res) => {
	const { id } = req.params;

	const sql = `SELECT * FROM persons WHERE person_id=${id}`;

	connection.query(sql, (error, result) => {
		if (error) throw error;
		if (result.length > 0) {
			res.json(result);
		} else {
			res.json(`No existe este id (${id})`);
		}
	});
});

//Nueva persona
app.post("/person", (req, res) => {
	const sql = "INSERT INTO persons SET ? ";
	connection.query(sql, req.body, (error) => {
		if (error) throw error;
		res.json("Persona creada");
	});
});

//Actualizar persona
app.put("/person/:id", (req, res) => {
	const { id } = req.params;

	const sql = `UPDATE persons SET ? WHERE person_id=${id}`;

	connection.query(sql, req.body, (error) => {
		if (error) throw error;
		res.json("Persona actualizada");
	});
});

//Eliminar persona
app.delete("/person/:id", (req, res) => {
	const { id } = req.params;

	const sql = `DELETE FROM persons WHERE person_id=${id}`;

	connection.query(sql, (error) => {
		if (error) throw error;
		res.json("Persona eliminada");
	});
});

//Verifica Conexion
connection.connect((error) => {
	if (error) throw error;
	console.log("Se conecto correctamente!!");
});

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
