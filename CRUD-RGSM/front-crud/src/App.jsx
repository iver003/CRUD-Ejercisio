import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { ALL_PERSONS } from "./querys/graphql-querys";
import { cleanSatetPerson } from "./utils/statesInit";
import ListPerson from "./componets/ListPerson";
import Formulario from "./componets/Formulario";

const App = () => {
	const [person, setPerson] = useState(cleanSatetPerson);
	const [persons, setPersons] = useState([]);
	const [updatedList, setUpdatedList] = useState(false);
	const [idUpdate, setIdUpdate] = useState("");

	const [getAllPersons, { loading, error }] = useLazyQuery(ALL_PERSONS, {
		fetchPolicy: "cache-and-network",
		onError: (error) => {
			alert(error.message);
		},
		onCompleted: ({ getPersons }) => {
			if (getPersons) {
				setPersons(getPersons);
			} else {
				alert("No hay valores");
			}
		},
	});

	useEffect(() => {
		getAllPersons();
	}, []);

	return (
		<>
			<div className="bg-dark py-4 mb-4 text-white">
				<div className="container text-center text-info">
					<h1>CRUD PERSONAS REACT/GRAPHQL</h1>
				</div>
			</div>
			<div className="container">
				<div className="row">
					{persons.length > 0 ? (
						<div className="col-7">
							<ListPerson persons={persons} setPerson={setPerson} setIdUpdate={setIdUpdate} />
						</div>
					) : (
						""
					)}
					<div className="col-5 mx-auto">
						<Formulario person={person} setPerson={setPerson} idUpdate={idUpdate} setIdUpdate={setIdUpdate} />
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
