import axios from "axios";

export default class EnvironmentApi {
    static async getYear() {
        try {
            return await axios.get('/api/environment/get-year', {
                headers: {
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }
    static async getFactor() {
        try {
            return await axios.get('/api/environment/get-factor', {
                headers: {
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }
    static async search(data) {
        try {
            return await axios.post('/api/environment/search',
                data,
                {
                    headers: {
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }
                });
        } catch (e) {
            return e;
        }
    }
    static async import(data) {
        try {
            return await axios.post('/api/environment/mass-upload',
                data,
                {
                    headers: {
                        'Accept': 'application/json', 'Content-Type': 'multipart/form-data',
                    },
                });
        } catch (e) {
            return e;
        }
    }
    static async setIsEnabled(data) {
        try {
            return await axios.post('/api/environment/is-enabled',
                data,
                {
                    headers: {
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }
                });
        } catch (e) {
            return e;
        }
    }
    static async update(data) {
        try {
            return await axios.post('/api/environment/update',
                data,
                {
                    headers: {
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }
                });
        } catch (e) {
            return e;
        }
    }

}