import { useEffect, useState } from "react";
import { apiGetAllPerson } from "./utils/httpClient.js";
import ListPerson from "./componets/ListPerson";
import Formulario from "./componets/Formulario";

const App = () => {
	const [person, setPerson] = useState({
		person_name: "",
		person_age: "",
		person_gender: "",
	});
	const [persons, setPersons] = useState([]);
	const [updatedList, setUpdatedList] = useState(false);
	const [idUpdate, setIdUpdate] = useState("");

	useEffect(() => {
		apiGetAllPerson().then((data) => {
			if (data !== "No hay resultados") {
				setPersons(data);
			} else {
				setPersons([]);
			}
		});
		setUpdatedList(false);
	}, [updatedList]);

	return (
		<>
			<div className="bg-primary py-4 mb-4 text-white">
				<div className="container text-center">
					<h1>CRUD PERSONAS</h1>
				</div>
			</div>
			<div className="container">
				<div className="row">
					{persons.length > 0 && (
						<div className="col-7">
							<ListPerson persons={persons} setPerson={setPerson} setUpdatedList={setUpdatedList} setIdUpdate={setIdUpdate} />
						</div>
					)}
					<div className="col-5 m-auto">
						<Formulario person={person} setPerson={setPerson} setUpdatedList={setUpdatedList} idUpdate={idUpdate} setIdUpdate={setIdUpdate} />
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
