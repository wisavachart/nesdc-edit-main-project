import axios from "axios";

export default class LoginApi {
    static async login(data) {
        try {
            return await axios.post('/api/login_check',
                data,{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        } catch (e) {
          console.log(e)
            alert(e.response.data.message)
            return e;
        }
    }
    static async getProfile() {
        try {
            return await axios.get('/api/getProfile',
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    },
                });
                
        } catch (e) {
            console.log(e)
            alert(e.response.data.message)
            return e;
        }
    }


}