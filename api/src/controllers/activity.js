const { Activity, Country } = require('../db');
const { Op } = require('sequelize');


async function createActivity(req, res, next) {
    try {
        const {name, difficulty, duration, season, country} = req.body;

        const newActivity = await Activity.create({name, difficulty, duration, season});

        const countries = await Country.findAll({
                                            where: {
                                                name: {
                                                    [Op.in]: country
                                                }
                                            }
                                            });

        countries.map((c) => {
            newActivity.addCountry(c)
        });

        res.status(201).send(newActivity);
        
    } catch (error) {
        
        next(error);
    }
};


module.exports = {
    createActivity,
};
