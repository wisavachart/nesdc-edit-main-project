import axios from "axios";

export default class QuestionnaireTemplateApi {

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

    static async find(data) {
        try {
            return await axios.post('/api/master/template/filter',data, {
                headers: {
                    'Authorization':`Bearer ` + localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async findType(data) {
        try {
            return await axios.post('/api/master/questionaire/filter',data, {
                headers: {
                    'Authorization':`Bearer ` + localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async get() {
        try {
            return await axios.get('/api/master/template', {
                headers: {
                    'Authorization':`Bearer ` + localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async getTemplate() {
        try {
            const response = await axios.get('/api/master/questionaire/filter', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token").replaceAll("\"","")}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    }


    static async getTpId(id) {
        try {
            return await axios.get('/api/master/template-type/'+id, {
                headers: {
                    'Authorization':`Bearer ` + localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async deleteData(id) {
        try {
            return await axios.delete(
                '/api/master/template/'+id,
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