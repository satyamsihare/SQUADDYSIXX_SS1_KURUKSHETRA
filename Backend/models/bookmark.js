'use strict';

module.exports = function(sequelize, DataTypes) {
	var Bookmark = sequelize.define('bookmark', {
		id: { 
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		landId: {
			type: DataTypes.INTEGER,
			unique: false 
		},
		addedBy: {
			type: DataTypes.INTEGER,
			allowNull: false
        }
	}, {
		timestamp: true
	});

	Bookmark.associate = function(models) {
	}  
	
	return Bookmark;
};