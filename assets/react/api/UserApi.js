import axios from "axios";

export default class UserApi {
    /*static async getData() {
        try {
            return await axios.get('/api/master/users', {
                headers: {
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }*/

    static async getData() {
        try {
            return await axios.get('/api/user/get-data', {
                headers: {
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async getDataByFacultyId(id) {
        try {
            return await axios.get('/api/master/users/'+id, {
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
                '/api/user/update-insert',
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
            return await axios.post(
                '/api/user/update-insert',
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

    static async disableData(id) {
        try {
            return await axios.post(
                '/api/user/disabled/'+id,
                {headers: {
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }}
            );
        } catch (e) {
            return e;
        }
    }

    static async enableData(id) {
        try {
            return await axios.post(
                '/api/user/enabled/'+id,
                {headers: {
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }}
            );
        } catch (e) {
            return e;
        }
    }

    static async findByFaculty(id) {
        try {
            return await axios.get(
                '/api/master/users/faculty/'+id,
                {headers: {
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }}
            );
        } catch (e) {
            return e;
        }
    }

    static async findByRoles(id) {
        try {
            return await axios.get(
                '/api/master/users/roles/'+id,
                {headers: {
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }}
            );
        } catch (e) {
            return e;
        }
    }

    static async resetPass(data) {
        try {
            return await axios.post(
                '/api/user/reset-pass',
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

}