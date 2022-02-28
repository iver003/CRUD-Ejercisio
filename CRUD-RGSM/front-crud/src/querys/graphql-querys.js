import { gql } from "@apollo/client";

export const ALL_PERSONS = gql`
	query {
		getPersons {
			person_id
			person_name
			person_age
			person_single
		}
	}
`;

export const GET_PERSON_BY_ID = gql`
	query getPersonById($person_id: Int!) {
		getPerson(person_id: $person_id) {
			person_id
			person_name
			person_age
			person_single
		}
	}
`;

export const DELETE_PERSON_BY_ID = gql`
	mutation deletePersonById($person_id: Int!) {
		deletePerson(person_id: $person_id)
	}
`;

export const NEW_PERSON = gql`
	mutation createPerson($person_name: String!, $person_age: Int!, $person_single: Boolean!) {
		newPerson(person_name: $person_name, person_age: $person_age, person_single: $person_single) {
			person_id
		}
	}
`;

export const UPDATE_PERSON = gql`
	mutation updatePerson($person_id: Int!, $person_name: String!, $person_age: Int!, $person_single: Boolean!) {
		updatePerson(person_id: $person_id, person_name: $person_name, person_age: $person_age, person_single: $person_single) {
			person_id
			person_name
			person_age
			person_single
		}
	}
`;
