const API = {

    baseURL: 'https://local.freeday',
    tenant: null,
    token: null,

    async call({ method, route, body }) {
        const url = `${API.baseURL}${route}`;
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };
        if (API.tenant) {
            headers['X-Tenant'] = API.tenant;
        }
        if (API.token) {
            headers.Authorization = API.token;
        }
        const data = {
            method,
            headers
        };
        if (body) {
            data.body = JSON.stringify(body);
        }
        const response = await fetch(url, data);
        const json = await response.json();
        return json;
    }

};

export default API;
