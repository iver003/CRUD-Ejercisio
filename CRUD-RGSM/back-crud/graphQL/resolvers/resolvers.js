const resolvers = {
	Query: {
		async getPersons(root, args, { models }) {
			return await models.person.findAll();
		},
		async getPerson(root, args, { models }) {
			return await models.person.findByPk(args.person_id);
		},
	},
	Mutation: {
		/* async newPerson(root, { person_name, person_age, person_single }, { models }) {
			return await models.person.create({ person_name, person_age, person_single });
		}, */

		newPerson: async (root, { person_name, person_age, person_single }, { models }) => {
			try {
				return await models.person.create({ person_name, person_age, person_single });
			} catch (error) {
				console.log(error);
			}
		},

		updatePerson: async (root, { person_id, person_name, person_age, person_single }, { models }) => {
			try {
				return await models.person
					.update({ person_name, person_age, person_single }, { returning: true, where: { person_id: person_id } })
					.then(() => models.person.findByPk(person_id))
					.then((user) => user.dataValues)
					.catch((err) => {
						request.server.log(["error"], err.stack);
					});
			} catch (error) {
				console.log(error);
			}
		},

		async deletePerson(root, { person_id }, { models }) {
			return await models.person.destroy({ where: { person_id: person_id } });
		},
	},
};

module.exports = resolvers;
