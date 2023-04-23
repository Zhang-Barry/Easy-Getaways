import {REACT_APP_API_URL} from '@env'

async function fetchData(url, method, body) 
{
  let response = await fetch(
    url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            // "Accept": "application/json",
            "Content-Type":"application/json",
        }
    }
  ).catch( (error) => {
    alert(`The following error occured: ${error}`);
});

  if (!response.ok) {
    const data = await response.json()
    return [false, data];
  } else {
    const data = JSON.parse(JSON.stringify(await response.json()));
    return [true, data];
  }
}

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