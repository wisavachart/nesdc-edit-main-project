import axios from "axios";

export default class QuestionnairetypeApi {
    static async getData() {
        try {
            return await axios.get('/api/master/GetQuestionnaireType', {
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
    
    static async getOpenDataOpenDropDown() {
        try {
            return await axios.get('/open-api/master/facultyDropDown', {
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
                '/api/master/QuestionnaireTypeInsert',
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
                '/api/master/QuestionnaireTypeUpdate',
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
                '/api/master/DelQuestionnaireType/'+id,
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