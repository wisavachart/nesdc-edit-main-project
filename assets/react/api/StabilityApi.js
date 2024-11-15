import axios from "axios";

export default class StabilityApi {
    static async getYear() {
        try {
            return await axios.get('/api/stability/get-year', {
                headers: {
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }
    static async getProvince() {
        try {
            return await axios.get('/api/stability/get-provinces', {
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
            return await axios.get('/api/stability/get-factor', {
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
            return await axios.post('/api/stability/mass-upload',
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
    static async search(data) {
        try {
            return await axios.post('/api/stability/search',
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
            return await axios.post('/api/stability/update',
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
    static async setIsEnabled(data) {
        try {
            return await axios.post('/api/stability/is-enabled',
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