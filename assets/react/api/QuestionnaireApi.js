import axios from "axios";

export default class QuestionnaireApi {


    static async upsertQuestionnaire(data) {
        try {
            return await axios.post('/api/master/update/template',data, {
                headers: {
                    'Authorization':`Bearer ` + localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async getQuestionnaire(id) {
        try {
            return await axios.get('/api/master/template/' + id, {
                headers: {
                    'Authorization':`Bearer ` + localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async deleteSection(id) {
        try {
            return await axios.delete('/api/master/section/' + id, {
                headers: {
                    'Authorization':`Bearer ` + localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async deleteChoice(id) {
        try {
            return await axios.delete('/api/master/choice/' + id, {
                headers: {
                    'Authorization':`Bearer ` + localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async deleteChoiceInformation(id) {
        try {
            return await axios.delete('/api/master/choice-information/' + id, {
                headers: {
                    'Authorization':`Bearer ` + localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async deleteQuestion(id) {
        try {
            return await axios.delete('/api/master/question/' + id, {
                headers: {
                    'Authorization':`Bearer ` + localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async getQuestionType() {
        try {
            return await axios.get('/api/master/questionType', {
                headers: {
                    'Authorization':`Bearer ` + localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async getVariousQuestion() {
        try {
            return await axios.get('/api/master/questionaire', {
                headers: {
                    'Authorization':`Bearer ` + localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async postVariousQuestion(data) {
        try {
            return await axios.post('/api/master/questionaire',
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

    static async deleteVariousQuestion(id) {
        try {
            return await axios.delete(
                '/api/master/questionaire/'+id,
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

    static async filterVariousQuestion(data) {
        try {
            return await axios.post('/api/master/questionaire/filter',
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

    static async putVariousQuestion(data) {
        try {
            return await axios.put('/api/master/questionaire',
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

    static async export(data) {
        const auth = localStorage.getItem('token').replaceAll('"','');
        try {
            return await axios.post(
                '/api/questionaire/export',
                {
                    id: data.id,
                },
                {headers: {
                        'Authorization':`Bearer ${auth}`,
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }, responseType: 'arraybuffer'}
            );
        } catch (e) {
            alert(e.response.data)
            return e;
        }
    }
}