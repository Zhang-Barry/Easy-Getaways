export async function fetchData(url, method, body) 
{
    try {
        console.log(url, body)
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
            const data = await response.json()
            return [false, data];
        } else {
            const data = JSON.parse(JSON.stringify(await response.json()));
            return [true, data];
        }
    } catch (error) {
        console.log(error);
        return [false, {"network_error": "Network request failed."}];
    }
}
