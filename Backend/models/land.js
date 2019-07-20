'use strict';

module.exports = function(sequelize, DataTypes) {
	var Land = sequelize.define('land', {
		id: { 
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
		},
		area: {
			type: DataTypes.STRING,
			allowNull: false
        },
        price: {
			type: DataTypes.FLOAT,
			allowNull: true
        },
        latitude: {
			type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        },
        longitude: {
			type: DataTypes.FLOAT,
            allowNull: true,
            defaultValueL: 0
        },
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		pictureUrl: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: "n"
		},
        addedBy : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
	}, {
		timestamp: true
	});

	Land.associate = function(models) {
	}  
	
	return Land;
};