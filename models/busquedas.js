const axios  = require('axios');
require('dotenv').config();


class Busquedas {
    historial = ['buenos aires','madrid']

    constructor(){

    }


    get paramMapbox(){
        return {
            'access_token':process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        };
    }

    paramClima(lat,log){
        
        return {
            'lat':lat,
            'lon':log,
            'appid':process.env.OPENWEATHER_KEY,
            'units':'metric',
            'lang':'es'
        };
    }


    
    async ciudad (lugar=''){

        try {
            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params:this.paramMapbox
            });

            const resp =  await instance.get();
            const {data} = resp;
            return data.features.map( x => ({
                id:x.id,
                nombre:x.place_name,
                lng:x.center[0],
                lat:x.center[1]
            }));
            
        } catch (error) {
            return [];    
        }
    };

    

    async climaLugar(lat,log){
        try{
            
           const instances  =  axios.create({
                baseURL:'https://api.openweathermap.org/data/2.5/weather',
                params:this.paramClima(lat,log)
           })

           const {data} = await instances.get();
           return {
               clima:data.weather[0].description,
               min:data.main.temp_min,
               max:data.main.temp_max
           }
          
        }catch (error){
            console.log(error);
        }
    }

}

module.exports = Busquedas;