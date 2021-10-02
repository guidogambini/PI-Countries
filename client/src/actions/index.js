import axios from 'axios';


export const getCountries = (way) => {
    return async function (dispatch) {
        try {
            const countries = await axios.get('/countries');
            return dispatch({
                type: 'GET_COUNTRIES',
                payload: {
                    data: countries.data,
                    way: way ? way : null
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
};


export const getCountryName = (name) => {
    return async function (dispatch) {
        try {
            const country = await axios.get(`/countries?name=${name}`);
            return dispatch({
                type: 'GET_COUNTRY_NAME',
                payload: country.data
            })
        } catch (error) {
            
            return dispatch({
                type: 'GET_COUNTRY_NAME',
                payload: false
            })
        }

    }
};


export const getCountryDetail = (id) => {
    return async function (dispatch) {
        try {
            const country = await axios.get(`/countries/${id}`);
            return dispatch({
                type: "GET_COUNTRY_DETAIL",
                payload: country.data
            })
        } catch (error) {
            console.log(error);
        }

    }
};


export const filterBy = (filterType, selected) => {

    return {
        type: 'FILTER_COUNTRIES',
        payload: {
            filterType,
            selected
        }
    }
};


export const orderBy = (orderType, order) => {
    return {
        type: 'ORDER_COUNTRIES',
        payload: {
            orderType,
            order
        }
    }
};

export const createActivity = (activity) => {
    return async function (dispatch) {
        try {
            await axios({
                method: 'post',
                url: '/activity',
                data: {
                    name: activity.name,
                    difficulty: parseInt(activity.difficulty),
                    duration: activity.duration,
                    season: activity.season,
                    country: activity.country
                }
            });
            return dispatch({
                type: 'CREATE_ACTIVITY',
                payload: activity
            })
        } catch (error) {
            console.log(error);
        }

    }
};

export const changeDetail = () => {
    return {
        type: 'CHANGE_DETAIL'
    }
};