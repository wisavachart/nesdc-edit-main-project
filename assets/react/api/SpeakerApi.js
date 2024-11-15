import axios from "axios";

export default class SpeakerApi {
    static async getData() {
        try {
            return await axios.get('/api/master/speaker', {
                headers: {
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async insertData(data) {
        try {
            return await axios.post(
                '/api/master/speaker',
                data,
                {headers: {
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }}
            );
        } catch (e) {
            alert(e.response.data)
            return e;
        }
    }

    static async updateData(data) {
        try {
            return await axios.put(
                '/api/master/speaker',
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
                '/api/master/speaker/'+id,
                {headers: {
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }}
            );
        } catch (e) {
            return e;
        }
    }

}