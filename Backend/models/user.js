'use strict';

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('user', {
		id: { 
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		mobile: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		deactivated: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
		},
		role: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		timestamp: true
	});

	User.associate = function(models) {
	}  
	
	return User;
};