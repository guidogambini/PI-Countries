const { Activity } = require('../db');


async function createActivity(req, res, next) {
    try {

        const newActivity = await Activity.create(req.body); 
        res.send(newActivity);
        
    } catch (error) {
        
        next(error);
    }
};


module.exports = {
    createActivity,
};
