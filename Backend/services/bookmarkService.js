const env = process.env.NODE_ENV || 'development';
const models = require('../models');

module.exports = {
    getAllBookmarks: function(params) {
        return new Promise((resolve, reject) => {
            models.bookmark.findAll({
                where: {
                    addedBy : params.addedBy
                }
            }).then(bookmark => {
                if (bookmark) {
                    resolve(bookmark);
                }else {
                    reject("no Bookmarks");
                }
            }).catch(err => {
                reject("Server error");
            })     
        });
    },
    addBookmark: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.addedBy || !params.landId) {
                reject('Missing params');
            } else {
                models.bookmark.create(params).then(bookmark => {
                    resolve(bookmark.dataValues);
                }).catch((err) => {
                    console.error('Error occured while creating bookmarks:', err);
                    reject('Server side error');
                });                  
            }
        });
    },
    // getOne: function(params) {
    //     return new Promise((resolve, reject) => {
    //         if(!params.id){
    //             reject("params Missing")
    //         }
    //         models.land.FindOne({ where : {
    //             id : params.id
    //         }}).then(land => {
    //             if (land) {
    //                 resolve(land.dataValues);
    //             }else {
    //                 reject("No Such Land");
    //             }
    //         }).catch(err => {
    //             reject("Server side error");
    //         })     
    //     });
    // },
};