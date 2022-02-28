import { useMutation } from "@apollo/client";
import { TiCancel, TiTick, TiUserAdd } from "react-icons/ti";
import { cleanSatetPerson } from "../utils/statesInit";
import { msgOk, msgError } from "../utils/msjAlert";

import { NEW_PERSON, UPDATE_PERSON, ALL_PERSONS } from "../querys/graphql-querys.js";

const Formulario = ({ person, setPerson, idUpdate, setIdUpdate }) => {
	const { person_name, person_age, person_single } = person;

	const [newPerson] = useMutation(NEW_PERSON, {
		refetchQueries: [{ query: ALL_PERSONS }],
	});

	/* const [updatePerson] = useMutation(UPDATE_PERSON, {
		refetchQueries: [{ query: ALL_PERSONS }],
	}); */

	const [updatePerson] = useMutation(UPDATE_PERSON, {
		refetchQueries: [{ query: ALL_PERSONS }],
	});

	let titulo = idUpdate == "" ? "Agregar Persona" : "Editar Persona";
	let color = idUpdate == "" ? "success" : "info";

	const handleCancel = (e) => {
		e.preventDefault();
		setIdUpdate("");
		setPerson(cleanSatetPerson);
	};

	const handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.type == "checkbox" ? e.target.checked : e.target.value;
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

		if (idUpdate == "") {
			//INSERTAR
			newPerson({
				variables: {
					person_name: person.person_name,
					person_age: parseInt(person.person_age),
					person_single: person.person_single,
				},
			}).then((resp) => {
				msgOk("Se guardo la información");
			});
		} else {
			//ACTUALIZAR
			updatePerson({
				variables: {
					person_id: idUpdate,
					person_name: person.person_name,
					person_age: parseInt(person.person_age),
					person_single: person.person_single,
				},
			}).then((resp) => {
				setIdUpdate("");
				msgOk("Se actualizo la información");
			});
		}

		setPerson(cleanSatetPerson); //Limpiar state Person
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
							<div className="form-check">
								<input name="person_single" checked={person_single} onChange={handleChange} className="form-check-input" type="checkbox" id="person_single" />
								<label className="form-check-label" htmlFor="person_single">
									¿Soltero?
								</label>
							</div>
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
