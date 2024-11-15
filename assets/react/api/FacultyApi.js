import axios from "axios";

export default class FacultyApi {
    static async getData() {
        try {
            return await axios.get('/api/master/faculty', {
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
    static async getData() {
        try {
            return await axios.get('/api/master/faculty', {
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
    static async getDataDropDown() {
        try {
            return await axios.get('/api/master/facultyDropDown', {
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
    static async getOpenDataOpenDropDown(keepOnlyFaculty=false) {
        try {
            var url = '/open-api/master/facultyDropDown'
            if(keepOnlyFaculty){
                url = url + '?keepOnlyFaculty=1'
            }
            return await axios.get(url, {
                headers: {
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            // await localStorage.setItem('token', JSON.stringify(null))
            // setAuth(null)
            return e;
        }
    }

    static async insertData(data) {
        try {
            return await axios.post(
                '/api/master/faculty',
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

    static async updateData(data) {
        try {
            return await axios.put(
                '/api/master/faculty',
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
                '/api/master/faculty/'+id,
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