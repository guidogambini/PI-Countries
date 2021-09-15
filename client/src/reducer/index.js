const initialState = {
    countriesLoaded: [],
    allCountries: [],
    activities: [],
    countryDetail: []
}

export default function rootReducer(state = initialState, action) {
    
    switch (action.type) {

        case 'GET_COUNTRIES':
            return {
                ...state,
                countriesLoaded: action.payload,
                allCountries: action.payload
            };

        case 'GET_COUNTRY_NAME':
            
            if (action.payload) {
                return {
                    ...state,
                    countriesLoaded: action.payload
                }
            }
            else alert('No matched countries');

        break;

        case 'GET_COUNTRY_DETAIL':
            
                return {
                    ...state,
                    countryDetail: action.payload
                }
            

        case 'FILTER_COUNTRIES':
            
            const allCountries = state.allCountries;
            
            if (action.payload.filterType === 'continent') {
                return {
                    ...state,
                    countriesLoaded: allCountries.filter(c => c.continent === action.payload.selected)
                }
            }

            else if (action.payload.filterType === 'activity') {
                
                let activityCountries = [];

                for (let i = 0; i < allCountries.length; i++) {
                    allCountries[i].activities.map(a => {
                        if (a.name.toLowerCase().includes(action.payload.selected.toLowerCase())) {
                            return activityCountries.push(allCountries[i])
                        }
                        return null;
                    })
                }

                if (activityCountries.length) {

                    return {
                        ...state,
                        countriesLoaded: activityCountries
                    }
                }
                else alert('No country has that activity');
                
            };
        
        break;

        case 'ORDER_COUNTRIES': 
            
            if (action.payload.orderType === 'alph') {

                const sortedAlph = action.payload.order === 'alphAsc'? 
                    state.countriesLoaded.sort((a, b) => {
                        if (a.name > b.name) {return 1}
                        else if (b.name > a.name) {return -1}
                        else return 0;
                    }) :

                    state.countriesLoaded.sort((a, b) => {
                        if (a.name > b.name) {return -1}
                        else if (b.name > a.name) {return 1}
                        else return 0;
                    })

                    return {
                        ...state,
                        countriesLoaded: sortedAlph
                    }
            }

            else if (action.payload.orderType === 'pop') {

                const sortedPop = action.payload.order === 'popAsc'? 
                    state.countriesLoaded.sort((a, b) => {
                        if (a.poblation > b.poblation) {return 1}
                        else if (b.poblation > a.poblation) {return -1}
                        else return 0;
                    }) :

                    state.countriesLoaded.sort((a, b) => {
                        if (a.poblation > b.poblation) {return -1}
                        else if (b.poblation > a.poblation) {return 1}
                        else return 0;
                    })

                    return {
                        ...state,
                        countriesLoaded: sortedPop
                    }
            }

        break;

        case 'CREATE_ACTIVITY':
            
            return {
                ...state,
                activities: [...state.activities, action.payload]
            };
        
        case 'CHANGE_DETAIL':

            return {
                ...state,
                countryDetail: []
            }

        default: return state;
    }
}