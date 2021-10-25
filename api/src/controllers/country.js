const { Country, Activity } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');


async function getCountries(req, res, next) {
    try {
        const { name } = req.query;
        if (!name) {

            const api = await axios.get('https://restcountries.com/v3/all');

            const oldCountries = await Country.findAll({
                include: { model: Activity,
                           attributes: ['name', 'difficulty', 'duration', 'season'],
                           through: {
                              attributes: [] }
                         }
        });

            if (oldCountries.length) return res.status(200).send(oldCountries);

            await api.data.forEach((c) => Country.Create({
                    id: c.idd.root && c.idd.suffixes ? c.idd.root + c.idd.suffixes?.map(s => s) : '+001',
                    name: c.name.common,
                    flagImg: c.flags[1], 
                    capital: c.capital ? c.capital[0] : null,
                    continent: c.region, 
                    subRegion: c.subregion,
                    area: c.area,
                }));

            const countries = await Country.findAll({
                    include: { model: Activity,
                               attributes: ['name', 'difficulty', 'duration', 'season'],
                               through: {
                                  attributes: [] }
                             }
            });
           
            return res.status(200).send(countries)
        }

        else {

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
    }

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
