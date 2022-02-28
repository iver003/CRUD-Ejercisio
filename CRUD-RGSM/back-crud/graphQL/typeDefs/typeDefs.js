const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type Person {
		person_id: Int
		person_name: String!
		person_age: Int!
		person_single: Boolean!
	}

	type Query {
		getPersons: [Person]
		getPerson(person_id: Int!): Person
	}

	type Mutation {
		newPerson(person_name: String!, person_age: Int!, person_single: Boolean!): Person!
		updatePerson(person_id: Int!, person_name: String!, person_age: Int!, person_single: Boolean!): Person
		deletePerson(person_id: Int!): Int!
	}
`;
module.exports = typeDefs;
