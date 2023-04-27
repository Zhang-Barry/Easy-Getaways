import {GOOGLE_PLACES_API_KEY} from '@env';
import { getMyItinsFromServer } from "./itin";
import { fetchData } from "./fetchDataUtil";

export const search = (keyword, location, radius, type) => {
    return async (dispatch) => {
        
        const google_places_api = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword"
        const body = {
            "keyword": keyword,
            "location": location,
            "radius" : radius,
            "type" : type,
            "key" : GOOGLE_PLACES_API_KEY
        }
                
        const fetchResult = await fetchData('${google_places_api}', body);    
    
        if (!fetchResult[0]) {
            // error...
            // if ("password" in fetchResult[0]) {alert( `Password: ${fetchResult[1]["password"]}` ); return;}
            // if ("username" in fetchResult[1]) {alert( `Username: ${fetchResult[1]["username"]}` ); return;}
            // if ("non_field_errors" in fetchResult[1]) {alert(fetchResult[1]["non_field_errors"]); return;}
            // if ("network_error" in fetchResult[1]) {alert(fetchResult[1]["network_error"]); return;}
            // alert(JSON.stringify(fetchResult[1]));
            return;
        }

        dispatch (
            {
                type: "LOGIN_SUCCESS",
                data: fetchResult[1],
            }    
        )
        
        const jwt = fetchResult[1]["access_token"]
        const uid = fetchResult[1]["user"]["pk"]
        // load itineraries once logged in.
        await getMyItinsFromServer(jwt, uid)(dispatch);
    }
}


export const register = (username, email, password, re_password) => {
    return async dispatch => {
        const body = {
            "username": username,
            "email": email,
            "password1": password,
            "password2": re_password,
        }
        
        const fetchResult = await fetchData(`${REACT_APP_API_URL}/dj-rest-auth/registration/`, 'POST', body);    
    
        if (!fetchResult[0]) {
            // error...
            if ("password1" in fetchResult[1]) {alert( `Password: ${fetchResult[1]["password1"]}` ); return;}
            if ("password2" in fetchResult[1]) {alert( `Password: ${fetchResult[1]["password2"]}` ); return;}
            if ("username" in fetchResult[1]) {alert( `Username: ${fetchResult[1]["username"]}` ); return;}
            if ("email" in fetchResult[1]) {alert( `Email: ${fetchResult[1]["email"]}` ); return;}
            if ("non_field_errors" in fetchResult[1]) {alert(fetchResult[1]["non_field_errors"]); return;}
            if ("network_error" in fetchResult[1]) {alert(fetchResult[1]["network_error"]); return;}
            alert(JSON.stringify(fetchResult[1]));
            return;
        }

        dispatch( 
            {
                type: "LOGIN_SUCCESS",
                data: fetchResult[1],
            }
        )
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch(
            {
                type: "LOGOUT"
            }
        )

        dispatch(
            {
                type:"PURGE_ALL_LOCAL_ITIN"
            }
        )
    }
}