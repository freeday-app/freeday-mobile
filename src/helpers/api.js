class FetchError extends Error {
    constructor(json) {
        super(json.error);
        this.status = json.code;
        this.data = json.data || null;
    }
}

const API = {

    tenant: null,
    token: null,

    async call({
        method,
        route,
        body,
        tenant,
        token
    }) {
        const url = API.buildUrl(tenant, route);
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };
        if (tenant) {
            headers['X-Tenant'] = tenant;
        } else if (API.tenant) {
            headers['X-Tenant'] = API.tenant;
        }
        if (token) {
            headers.Authorization = token;
        } else if (API.token) {
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
        if (response.ok) {
            return response.json();
        }
        const json = await response.json();
        throw new FetchError(json);
    },

    buildUrl(tenant, route) {
        const urlTenant = tenant || API.tenant;
        if (!urlTenant) {
            throw new Error('Missing tenant while calling API');
        }
        // return `https://${API.tenant}.freeday-app.com${route}`;
        return `https://${urlTenant}.freeday.coddity.com${route}`;
    }

};

export default API;
