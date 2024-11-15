import axios from "axios";

export default class TemplateTypeApi {
    static async getData(auth) {
        try {
            return await axios.get('/api/master/type', {
                headers: {
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            // await localStorage.setItem('token', JSON.stringify(null))
            // setAuth(null)
            return e;
        }
    }

    static async insertData(auth,data) {
        try {
            return await axios.post(
                '/api/master/type',
                data,
                {headers: {
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }}
            );
        } catch (e) {
            // await localStorage.setItem('token', JSON.stringify(null))
            // setAuth(null)
            return e;
        }
    }

    static async updateData(auth,data) {
        try {
            return await axios.put(
                '/api/master/type',
                data,
                {headers: {
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }}
            );
        } catch (e) {
            // await localStorage.setItem('token', JSON.stringify(null))
            // setAuth(null)
            return e;
        }
    }

    static async deleteData(id) {
        try {
            return await axios.delete(
                '/api/master/type/'+id,
                {headers: {
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }}
            );
        } catch (e) {
            // await localStorage.setItem('token', JSON.stringify(null))
            // setAuth(null)
            return e;
        }
    }
}