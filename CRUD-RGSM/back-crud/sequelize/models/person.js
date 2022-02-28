module.exports = (sequelize, DataTypes) => {
	const Person = sequelize.define(
		"persons",
		{
			person_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			person_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			person_age: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			person_single: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{}
	);
	return Person;
};
