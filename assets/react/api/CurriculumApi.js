import axios from "axios";

export default class CurriculumApi {

    static async getData() {
        try {
            return await axios.get('/open-api/master/curriculum', {
                headers: {
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async getDataByFacultyId(id,dropdown = false) {
        var str = dropdown ? '?dropdown=1':'';
        try {
            if(id) {
                return await axios.get('/open-api/master/curriculum/'+id+str, {
                    headers: {
                        // 'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }
                });
            } else {
                return await axios.get('/open-api/master/curriculum', {
                    headers: {
                        // 'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }
                });
            }
        } catch (e) {
            return e;
        }
    }

    static async insertData(data) {
        try {
            return await axios.post(
                '/api/master/curriculum',
                data,
                {headers: {
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }}
            );
        } catch (e) {
            return e;
        }
    }

    static async updateData(data) {
        try {
            return await axios.put(
                '/api/master/curriculum',
                data,
                {headers: {
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }}
            );
        } catch (e) {
            return e;
        }
    }

    static async deleteData(id) {
        try {
            return await axios.delete(
                '/api/master/curriculum/'+id,
                {headers: {
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }}
            );
        } catch (e) {
            return e;
        }
    }

    static async getDegree() {
        try {
            return await axios.get('/api/master/degree', {
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