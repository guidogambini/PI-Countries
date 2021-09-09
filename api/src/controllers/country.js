const { Country, Activity } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');


async function getCountries(req, res, next) {
    try {
        const { name } = req.query;
        if (!name) {
            const api = await axios.get('https://restcountries.eu/rest/v2/all');
            await api.data.map((c) => Country.findOrCreate({
                where: {
                    id: c.alpha3Code
                },
                defaults: {
                    name: c.name, 
                    id: c.alpha3Code,
                    flagImg: c.flag, 
                    capital: c.capital,
                    continent: c.region, 
                    subRegion: c.subregion,
                    area: c.area, 
                    poblation: c.population
                }
                }));
            const countries = await Country.findAll({
                    include: { model: Activity,
                               attributes: ['name', 'difficulty', 'duration', 'season'],
                               through: {
                                  attributes: [] }
                             }
            });
            return res.status(200).send(countries);
        };

        const nameCountries = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });
        nameCountries.length ?
        res.status(200).send(nameCountries) :
        res.status(404).json({error: 'Country not found'});

    } catch (error) {
        next(error);
    }
};




async function getCountryById(req, res, next) {
    try {
        const { id } = req.params;
        const myCountry = await Country.findAll({
            where: { id: id },
            include: { model: Activity, 
                       attributes: ['name', 'difficulty', 'duration', 'season'],
                       through: {
                        attributes: []
                       } 
                     }
        });
        myCountry.length ?
        res.status(200).send(myCountry) :
        res.status(404).json({error: `id ${id} not found`});

    } catch (error) {
        next(error);
    }
};


module.exports = {
    getCountries,
    getCountryById,
};
