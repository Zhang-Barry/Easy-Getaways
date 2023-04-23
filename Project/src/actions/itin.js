import {REACT_APP_API_URL} from '@env'
import { fetchData } from "./fetchDataUtil";

export const getMyItinsFromServer = (jwt, uid) => {
    return async (dispatch) => {

        const body = {
            "jwt":jwt,
            "uid":uid,
        }
                
        const fetchResult = await fetchData(`${REACT_APP_API_URL}/itineraries/get_all_user_itin/`, 'POST', body);    
    
        if (!fetchResult[0]) {
            // error...
            if ("Error" in fetchResult[1]) {alert( `Error: ${fetchResult[1]["Error"]}` ); return;}
            alert(JSON.stringify(fetchResult[1]));
            return;
        }

        dispatch (
            {
                type: "GET_FROM_SERVER",
                data: fetchResult[1],
            }    
        )

    }
}