const env = process.env.NODE_ENV || 'development';

const models = require('../models');
var Sequelize = require('sequelize');

module.exports = {
    getAllLands: function() {
        return new Promise((resolve, reject) => {
            models.land.findAll().then(lands => {
                if(lands) {
                    resolve(lands);
                }else {
                    reject("no lands");
                }
            }).catch(err => {
                reject("Server error" + err);
            })     
        });
    },
    addLand: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.area || !params.address) {
                reject('Missing params');
            } else {
                models.land.create(params).then(land => {
                    resolve(land.dataValues);
                }).catch((err) => {
                    console.error('Error occured while creating land:', err);
                    reject('Server side error' + err);
                });                  
            }
        });
    },
    getOne: function(params) {
        return new Promise((resolve, reject) => {
            if(!params.landId){
                reject("params Missing")
            }
            models.land.findOne({ where : {
                id : params.landId
            }}).then(land => {
                if (land) {
                    resolve(land.dataValues);
                }else {
                    reject("No Such Land");
                }
            }).catch(err => {
                reject("Server side error");
            })     
        });
    },
    getByPrice: function() {
        console.log("called again")
        return new Promise((resolve, reject) => {
            models.land.findAll({ 
                order: Sequelize.col('price')
            }).then(land => {
                if (land) {
                    resolve(land);
                }else {
                    reject("No Such Land" );
                }
            }).catch(err => {
                reject("Server side error" + err);
            })     
        });
    },
    getByArea: function() {
        return new Promise((resolve, reject) => {
            models.land.findAll({ 
                order: Sequelize.col('area')
            }).then(land => {
                if (land) {
                    resolve(land);
                }else {
                    reject("No Such Land" );
                }
            }).catch(err => {
                reject("Server side error" + err);
            })     
        });
    },
    getPriceBtwn: function(params) {
        const Op = Sequelize.Op;
        return new Promise((resolve, reject) => {
            models.land.findAll({ 
                where: {
                   price :{
                        [Op.lt]: params.maxPrice
                   }
                }
            }).then(land => {
                if (land) {
                    resolve(land);
                }else {
                    reject("No Such Land" );
                }
            }).catch(err => {
                reject("Server side error" + err);
            })     
        });
    },
    getAreaBtwn: function(params) {
        const Op = Sequelize.Op;
        return new Promise((resolve, reject) => {
            models.land.findAll({ 
                where: {
                   area :{
                        [Op.lt]: params.maxArea
                   }
                },
                order: Sequelize.col('area')

            }).then(land => {
                if (land) {
                    resolve(land);
                }else {
                    reject("No Such Land" );
                }
            }).catch(err => {
                reject("Server side error" + err);
            })     
        });
    },
    getPricesAll: function(params) {
        return new Promise((resolve, reject) => {
            models.land.findAll({ 
                attributes: ['price']
            }).then(land => {
                if (land) {
                    resolve(land);
                }else {
                    reject("No Such Land" );
                }
            }).catch(err => {
                reject("Server side error" + err);
            })     
        });
    },

    getAllLocation: function() {
        return new Promise((resolve, reject) => {
            models.land.findAll({ 
                attributes: ['latitude' , 'longitude']
            }).then(land => {
                if (land) {
                    resolve(land);
                }else {
                    reject("No Such Land" );
                }
            }).catch(err => {
                reject("Server side error" + err);
            })     
        });
    },
    updatePictureUrl: function(params) {
        return new Promise((resolve, reject) => {
            if(!params.landId || !params.filename){
                reject("params Missing")
            }
            models.land.FindOne({ where : {
                id : params.landId  
            }}).then(land => {
                if (land) {
                    land.updateAttributes({picture_url: params.filename})
                    .then(land => {
                        resolve(land);
                    }).catch(err => {
                        console.error('Error occured at saveUser', err);
                        reject('Server side error');
                    });
                }else {
                    reject("No Such Land");
                }
            }).catch(err => {
                reject("Server side error" + err);
            })     
        });
    },
    deleteOne: function(params) {
        return new Promise((resolve, reject) => {
            if(!params.landId ){
                reject("params Missing")
            }
            models.land.destroy({ where : {
                id : params.landId,
                addedBy: params.addedBy 
            }}).then(ok => {
                resolve(ok)
            }).catch(err => {
                reject("Server side error" + err);
            })     
        });
    },
};