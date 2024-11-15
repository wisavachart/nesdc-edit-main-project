import axios from "axios";

export default class ResultApi {
    static async saveResult(data) {
        try {
            return await axios.post('/open-api/master/result/update-create', data, {
                headers: {
                    // 'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }


}