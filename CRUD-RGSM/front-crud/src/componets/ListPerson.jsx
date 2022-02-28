import { TiEdit, TiTrash } from "react-icons/ti";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_PERSON_BY_ID, DELETE_PERSON_BY_ID, ALL_PERSONS } from "../querys/graphql-querys";

import { cleanSatetPerson } from "../utils/statesInit";
import { msgOk, msgError } from "../utils/msjAlert";

const ListPerson = ({ persons, setIdUpdate, setPerson }) => {
	//BUSCAR ID DE LA PERSONA
	const [findPersonById, { loading, error }] = useLazyQuery(GET_PERSON_BY_ID, {
		fetchPolicy: "cache-and-network",
		onError: (error) => {
			msgError(error.message);
		},
		onCompleted: ({ getPerson }) => {
			if (getPerson) {
				setPerson(getPerson);
				setIdUpdate(getPerson.person_id);
			} else {
				msgError("Este ID no fue encontrado");
			}
		},
	});

	//APLICAR MUTATION: DELETE Y HACER REFETCH DE TODAS LAS PERSONAS
	const [deletePersonById] = useMutation(DELETE_PERSON_BY_ID, {
		refetchQueries: [{ query: ALL_PERSONS }],
	});

	const handleDelete = (id) => {
		deletePersonById({ variables: { person_id: id } }).then((resp) => {
			setIdUpdate("");
			setPerson(cleanSatetPerson);
			msgOk("Se elimino persona");
		});
	};

	const handleUpdate = (id) => findPersonById({ variables: { person_id: id } });

	return (
		<>
			{persons.length > 0 ? (
				<div className="card m-auto">
					<div className="card-header bg-secondary text-white">
						<h3>Lista de personas</h3>
					</div>
					<div className="card-body p-0 m-0">
						<table className="table table-hover mb-0">
							<thead className="bg-dark text-white">
								<tr>
									<th>ID</th>
									<th>NOMBRE</th>
									<th>EDAD</th>
									<th>SOLTERO</th>
									<th> </th>
								</tr>
							</thead>
							<tbody>
								{persons.map((person) => (
									<tr key={person.person_id}>
										<td>{person.person_id}</td>
										<td>{person.person_name}</td>
										<td>{person.person_age}</td>
										<td>{person.person_single ? "Si" : "No"}</td>
										<th>
											<div className="text-center">
												<button className="btn btn-sm btn-primary me-2" title="Editar" onClick={() => handleUpdate(person.person_id)}>
													<TiEdit className="fs-5" />
												</button>
												<button className="btn btn-sm btn-danger" title="Eliminar" onClick={() => handleDelete(person.person_id)}>
													<TiTrash className="fs-5" />
												</button>
											</div>
										</th>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			) : (
				<div>Cargando...</div>
			)}
		</>
	);
};

export default ListPerson;
