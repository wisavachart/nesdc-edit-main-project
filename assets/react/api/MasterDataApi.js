import axios from "axios";

export default class MasterDataApi{
    static async getProvince() {
        try {
            return await axios.get('/api/master/get-provinces', {
                headers: {
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async getProvinceByD() {
        try {
            return await axios.get('/api/master/get-provinces-by-d', {
                headers: {
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }

    static async downloadExcel(templateName){
        try {
            return await axios.get('/api/master/download-template?template='+templateName,
                {
                    headers:{
                        'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }, responseType: 'arraybuffer'
                });
        }catch (e){
            return e;
        }
    }

}
