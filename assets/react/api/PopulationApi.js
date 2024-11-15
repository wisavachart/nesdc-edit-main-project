import axios from "axios";

export default class PopulationApi {
    static async getYear() {
        try {
            return await axios.get('/api/population/get-year', {
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
            return await axios.get('/api/population/get-provinces', {
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
            return await axios.post('/api/population/mass-upload',
                data,
                {
                    headers: {
                        'Accept': 'application/json', 'Content-Type': 'multipart/form-data',
                    }
                });
        } catch (e) {
            return e;
        }
    }

    static async search(data) {
        try {
            return await axios.post('/api/population/search',
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
            return await axios.post('/api/population/is-enabled',
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
            return await axios.post('/api/population/update',
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

    static async create(data) {
        try {
            return await axios.post('/api/population/create',
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