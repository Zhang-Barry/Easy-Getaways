import {REACT_APP_API_URL} from '@env'
import { fetchData } from "./fetchDataUtil";

export const getMyPlacesFromServer = (jwt, uid) => {
    return async (dispatch) => {

        const body = {
            "jwt":jwt,
            "uid":uid,
        }
                
        const fetchResult = await fetchData(`${REACT_APP_API_URL}/itineraries/get_my_places/`, 'POST', body);    
    
        if (!fetchResult[0]) {
            // error...
            // if ("Error" in fetchResult[1]) {alert( `Error: ${fetchResult[1]["Error"]}` ); return;}
            alert(JSON.stringify(fetchResult[1]));
            return;
        }

        dispatch (
            {
                type: "GET_PLACES_FROM_SERVER",
                data: fetchResult[1],
            }    
        )

    }
}

export const insertNewPlace = (jwt, uid, places_json) => {
    return async (dispatch) => {
        const body = {
            "jwt":jwt,
            "uid":uid,
            "places_json": places_json,
        }
                
        const fetchResult = await fetchData(`${REACT_APP_API_URL}/itineraries/insert_place/`, 'POST', body);    
    
        if (!fetchResult[0]) {
            // error...
            // if ("Error" in fetchResult[1]) {alert( `Error: ${fetchResult[1]["Error"]}` ); return;}
            alert(JSON.stringify(fetchResult[1]));
            return;
        }

        alert("Itinerary saved successfully.");

        getMyItinsFromServer(jwt, uid);
    }
}


export const deletePlace = (jwt, uid, place_id) => {
    return async (dispatch) => {

        const body = {
            "jwt":jwt,
            "uid":uid,
            "place_id": place_id,
        }
                
        const fetchResult = await fetchData(`${REACT_APP_API_URL}/itineraries/delete_place/`, 'POST', body);    
    
        if (!fetchResult[0]) {
            alert(JSON.stringify(fetchResult[1]));
            return;
        }
    }
}



export const editItin = (tid, jwt, uid, title, city, state, country, description, itinerary) => {
    return async (dispatch) => {

        if (title == "" || title == null) title = "Untitiled Itinerary"
        if (description == "" || description == null) description = " "
        if (city == null) city = "NULL"
        if (country == null) country = "NULL"
        if (state == null) state = "NULL"
        if (itinerary == null) itinerary = {}

        const body = {
            "tid": tid,
            "jwt":jwt,
            "uid":uid,
            "title": title,
            "city": city,
            "state": state,
            "country": country,
            "description": description,
            "itinerary": itinerary,

            "private": false,
            "est_budget_up": 0,
            "est_budget_down": 0,
            "archived": false,
            "private": false,
        }
                
        const fetchResult = await fetchData(`${REACT_APP_API_URL}/itineraries/edit_itin/`, 'POST', body);    
    
        if (!fetchResult[0]) {
            // error...
            // if ("Error" in fetchResult[1]) {alert( `Error: ${fetchResult[1]["Error"]}` ); return;}
            alert(JSON.stringify(fetchResult[1]));
            return;
        }

        alert("Itinerary saved successfully.");

        getMyItinsFromServer(jwt, uid);
    }
}