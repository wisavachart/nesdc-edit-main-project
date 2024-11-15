import axios from "axios";

export default class OrganizationAwardApi {
    static async getData(auth) {
        try {
            return await axios.get('/api/master/organizationaward', {
                headers: {
                    'Authorization':`Bearer ${auth}`,
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async insertData(auth,data) {
        try {
            return await axios.post(
                '/api/master/organizationaward',
                data,
                {headers: {
                        'Authorization':`Bearer ${auth}`,
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }}
            );
        } catch (e) {
            alert(e.response.data)
            return e;
        }
    }

    static async updateData(auth,data) {
        try {
            return await axios.put(
                '/api/master/organizationaward',
                data,
                {headers: {
                        'Authorization':`Bearer ${auth}`,
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
                '/api/master/organizationaward/'+id,
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