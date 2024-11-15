import axios from "axios";

export default class KuPovertyRatioApi {
    static async getDataByProvinceAndYear(data) {
        try {
            return await axios.post('/poverty-ratio/get-data',
            data,
            {
                headers: {
                    // 'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async getDataFromList(data) {
        try {
            return await axios.post('/poverty-ratio/get-data-list',
            data,
            {
                headers: {
                    // 'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async getMaster(data) {
        try {
            return await axios.post('/poverty-ratio/get-master',
            data,
            {
                headers: {
                    // 'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async importPoverty(data) {
        try {
            return await axios.post('/poverty-ratio/mass-upload',
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

    static async disableData(data) {
        try {
            return await axios.post(
                '/api/poverty-ratio/disabled',
                data,
                {
                    headers: {
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }
                }
            );
        } catch (e) {
            return e;
        }
    }

    static async enableData(data) {
        try {
            return await axios.post(
                '/api/poverty-ratio/enabled',
                data,
                {
                    headers: {
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }
                }
            );
        } catch (e) {
            return e;
        }
    }

    static async updateInsert(data) {
        try {
            return await axios.post(
                '/api/poverty-ratio/update-insert-data',
                data,
                {
                    headers: {
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }
                }
            );
        } catch (e) {
            return e;
        }
    }

    static async updateCoefficient(data) {
        try {
            return await axios.post(
                '/api/coefficient/update-data',
                data,
                {
                    headers: {
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }
                }
            );
        } catch (e) {
            return e;
        }
    }

    static async getDataGraph(data) {
        try {
            return await axios.post(
                '/api/master/get-data-graph',
                data,
                {
                    headers: {
                        // 'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }
                }
            );
        } catch (e) {
            return e;
        }
    }

    static async getDataGraph10(data) {
        try {
            return await axios.post(
                '/api/master/get-data-graph-10',
                data,
                {
                    headers: {
                        // 'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }
                }
            );
        } catch (e) {
            return e;
        }
    }

    static async getDataProvince1011(data) {
        try {
            return await axios.post(
                '/api/master/get-data-graph-11-province',
                data,
                {
                    headers: {
                        // 'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }
                }
            );
        } catch (e) {
            return e;
        }
    }

    static async getFactor(data) {
        try {
            return await axios.get(
                '/api/master/factor',
                data,
                {
                    headers: {
                        // 'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }
                }
            );
        } catch (e) {
            return e;
        }
    }

}