import { TiCancel, TiTick, TiUserAdd } from "react-icons/ti";
import { apiSetPerson, apiUpdatePerson } from "../utils/httpClient.js";

const Formulario = ({ person, setPerson, setUpdatedList, idUpdate, setIdUpdate }) => {
	const { person_name, person_age, person_gender } = person;

	let titulo = idUpdate == "" ? "Agregar Persona" : "Editar Persona";
	let color = idUpdate == "" ? "success" : "info";

	const handleCancel = (e) => {
		e.preventDefault();
		setIdUpdate("");
		setPerson({
			person_name: "",
			person_age: "",
			person_gender: "",
		});
	};

	const handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setPerson((old) => ({ ...old, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!person_name.trim()) {
			e.target.elements.person_name.focus();
			msgError("No puede estar el nombre vacio");
			return;
		}

		if (person_age <= 0) {
			e.target.elements.person_age.focus();
			msgError("Debes capturar una edad valida");
			return;
		} else if (person_age >= 100) {
			e.target.elements.person_age.focus();
			msgError("La edad debe ser menor a 100");
			return;
		}

		if (!person_gender.trim()) {
			e.target.elements.person_gender.focus();
			msgError("No puede estar el sexo vacio");
			return;
		}

		if (idUpdate == "") {
			apiSetPerson(person).then((data) => {
				setUpdatedList(true);
				setPerson({
					person_name: "",
					person_age: "",
					person_gender: "",
				});
			});
			msgOk("Se guardo la información");
		} else {
			apiUpdatePerson(idUpdate, person).then((data) => {
				setIdUpdate("");
				setUpdatedList(true);
				setPerson({
					person_name: "",
					person_age: "",
					person_gender: "",
				});
			});
			msgOk("Se actualizo la información");
		}
	};

	const msgOk = (msg) => {
		Swal.fire({
			title: "Exito!",
			text: msg,
			icon: "success",
			confirmButtonText: "Ok",
		});
	};

	const msgError = (msg) => {
		Swal.fire({
			title: "Error!",
			text: msg,
			icon: "error",
			confirmButtonText: "Ok",
		});
	};

	return (
		<>
			<div className="card m-auto" style={{ width: "18rem" }}>
				<div className={`card-header bg-${color} text-white`}>
					<h3>{titulo}</h3>
				</div>
				<div className="card-body">
					<form onSubmit={handleSubmit} className="mb-3">
						<div className="mb-3">
							<label htmlFor="person_name" className="form-label">
								Nombre
							</label>
							<input type="text" className="form-control" name="person_name" id="person_name" placeholder="Escribe el nombre" value={person_name} onChange={handleChange} />
						</div>
						<div className="mb-3">
							<label htmlFor="person_age" className="form-label">
								Edad
							</label>
							<input type="number" className="form-control" name="person_age" id="person_age" placeholder="Captura edad" value={person_age} onChange={handleChange} />
						</div>
						<div className="mb-3">
							<label htmlFor="person_gender" className="form-label">
								Sexo
							</label>
							<select name="person_gender" className="form-select mb-2" value={person_gender} onChange={handleChange}>
								<option value="">Elige uno</option>
								<option value="F">Femenino</option>
								<option value="M">Masculino</option>
							</select>
						</div>
						{idUpdate == "" ? (
							<button type="submit" className={`btn btn-${color}`}>
								<TiUserAdd /> Guardar nuevo
							</button>
						) : (
							<div>
								<button type="submit" className={`btn btn-${color} text-white me-2`}>
									<TiTick /> Actualizar
								</button>
								<button type="button" className="btn btn-secondary text-white" onClick={handleCancel}>
									<TiCancel /> Cancelar
								</button>
							</div>
						)}
					</form>
				</div>
			</div>
		</>
	);
};

export default Formulario;
