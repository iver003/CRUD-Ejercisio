import { TiEdit, TiTrash } from "react-icons/ti";
import { apiDeletePerson, apiGetPerson } from "../utils/httpClient.js";

const ListPerson = ({ persons, setUpdatedList, setIdUpdate, setPerson }) => {
	const handleDelete = (id) => {
		apiDeletePerson(id).then((data) => {
			setUpdatedList(true);
			setIdUpdate("");
			setPerson({
				person_name: "",
				person_age: "",
				person_gender: "",
			});
		});
	};

	const handleUpdate = (id) => {
		apiGetPerson(id).then((data) => {
			setPerson(data[0]);
			setIdUpdate(id);
		});
	};

	return (
		<>
			{persons.length === 0 ? (
				""
			) : (
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
									<th>SEXO</th>
									<th> </th>
								</tr>
							</thead>
							<tbody>
								{persons.map((person) => (
									<tr key={person.person_id}>
										<td>{person.person_id}</td>
										<td>{person.person_name}</td>
										<td>{person.person_age}</td>
										<td>{person.person_gender}</td>
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
			)}
		</>
	);
};

export default ListPerson;
