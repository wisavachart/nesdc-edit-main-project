import axios from "axios";

export default class DownloadExcelApi{
    static async DownloadExcel(data){
        try {
            return await axios.post('/api/download-excel-skill-award',data,
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

    static async DownloadExcelInnovationStudentAward(data){
        try {
            return await axios.post('/api/download-excel-student-report',data,
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

    static async DownloadExcelInnovationTeacherAward(data){
        try {
            return await axios.post('/api/download-excel-teacher-report',data,
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

    static async DownloadExcelOrganizationAward(data){
        try {
            return await axios.post('/api/download-excel-organization-report',data,
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

    static async DownloadExcelCommunityAward(data){
        try {
            return await axios.post('/api/download-excel-community-report',data,
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

    static async DownloadExcelPublication(data){
        try {
            return await axios.post('/api/download-excel-publication-report',data,
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

    static async DownloadExcelSpeaker(data){
        try {
            return await axios.post('/api/download-excel-speaker-report',data,
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

    static async DownloadExcelTrain(data){
        try {
            return await axios.post('/api/download-excel-train-report',data,
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