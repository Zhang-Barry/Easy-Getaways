import {GOOGLE_PLACES_API_KEY} from '@env';
import { getMyItinsFromServer } from "./itin";
import { fetchData } from "./fetchDataUtil";
import GOOGLE_API_KEY from './GOOGLE_API_KEY';

export const searchNearby = (lat, lng, radius, type) => {
    return async (dispatch) => {
        
        
        const google_places_api = `
            https://maps.googleapis.com/maps/api/place/nearbysearch/json
                &location=${lat}%2C${lng}
                &radius=${radius}
                &type=${type}
                &key=${GOOGLE_API_KEY}
         `
                
        const fetchResult = await fetchData(google_places_api, body);    
        
        // handle error
        if (!fetchResult[0]) {
            alert(fetchResult[1]);
            return;
        }

        return fetchResult[1];
    }
}