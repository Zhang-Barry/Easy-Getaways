export async function fetchData(url, method, body) 
{
    try {
        // console.log(url, body)
        let response = await fetch(
            url, {
                method: method,
                body: JSON.stringify(body),
                headers: {
                    Accept: 'application/json',
                    'Content-Type':'application/json',
                }
            }
          )
        if (!response.ok) {
            if (response.status == 500) {
                return [false, {"Error": "Internal server error."}]
            }
            const data = JSON.parse(JSON.stringify(await response.json()));
            return [false, data];
        } else {
            console.log("hello")
            const data = JSON.parse(JSON.stringify(await response.json()));
            return [true, data];
        }
    } catch (error) {
        console.log(error);
        return [false, {"network_error": "Network request failed."}];
    }
}
