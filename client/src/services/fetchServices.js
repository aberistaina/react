export const fetchServices = async (url, method, body, token=null) => {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : null,
        });
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.log(error);
    }
};
