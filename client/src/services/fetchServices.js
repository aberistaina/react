export const fetchServices = async (url, method, token=null, body ) => {
    try {
        const myHeaders = new Headers({"Content-Type": "application/json"});
        
        if(token){
            myHeaders.append("Authorization", `bearer ${token}`);
            console.log(token);
            const requestOptions = {
                method,
                headers: myHeaders,
                body: body ? JSON.stringify(body) : null
                };

            const response = await fetch(url, requestOptions)
            const data = await response.json()
            return data

        }else{
            const requestOptions = {
                method,
                headers: myHeaders,
                body: body ? JSON.stringify(body) : null
            };

            const response = await fetch(url, requestOptions)
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error);
    }
};
