import axios from "axios";

export default class ReportApi {
    static async skillPdfDownload(data){
        try {
            return await axios.post('/api/reportSkillAwardPdf',data, {
                headers:{
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, responseType: 'arraybuffer'
            });
        }catch (e){
            return e;
        }
    }
    static async innovationStudentPdfDownload(data){
        try {
            return await axios.post('/api/reportInnovationStudentPdf',data, {
                headers:{
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, responseType: 'arraybuffer'
            });
        }catch (e){
            return e;
        }
    }
    static async innovationTeacherPdfDownload(data){
        try {
            return await axios.post('/api/reportInnovationTeacherPdf',data, {
                headers:{
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, responseType: 'arraybuffer'
            });
        }catch (e){
            return e;
        }
    }
    static async organizationPdfDownload(data){
        try {
            return await axios.post('/api/reportOrganizationAwardPdf',data, {
                headers:{
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, responseType: 'arraybuffer'
            });
        }catch (e){
            return e;
        }
    }
    static async communityPdfDownload(data){
        try {
            return await axios.post('/api/reportCommunityAwardPdf',data, {
                headers:{
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, responseType: 'arraybuffer'
            });
        }catch (e){
            return e;
        }
    }
    static async publicationPdfDownload(data){
        try {
            return await axios.post('/api/reportPublicationPdf',data, {
                headers:{
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, responseType: 'arraybuffer'
            });
        }catch (e){
            return e;
        }
    }
    static async speakerPdfDownload(data){
        try {
            return await axios.post('/api/reportSpeakerPdf',data, {
                headers:{
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, responseType: 'arraybuffer'
            });
        }catch (e){
            return e;
        }
    }
    static async trainPdfDownload(data){
        try {
            return await axios.post('/api/reportTrainPdf',data, {
                headers:{
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, responseType: 'arraybuffer'
            });
        }catch (e){
            return e;
        }
    }
    static async employmentStatusGraduates(data){
        try {
            return await axios.post('/api/employment_status_graduates',data, {
                headers:{
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, responseType: 'arraybuffer'
            });
        }catch (e){
            return e;
        }
    }
    static async satisfactionSurvey(data){
        try {
            return await axios.post('/api/satisfaction_survey',data, {
                headers:{
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, responseType: 'arraybuffer'
            });
        }catch (e){
            return e;
        }
    }
    static async surveyReport(data){
        try {
            return await axios.post('/api/survey_report',data, {
                headers:{
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, responseType: 'arraybuffer'
            });
        }catch (e){
            return e;
        }
    }
    static async getQuestionById(data, check = 0) {
        try {
            var  noAll = ''
            if (check === 1){
                noAll = '?no-all=1'
            }
            return await axios.post('/api/get-questionaire-by-template'+ noAll,data, {
                headers: {
                    'Authorization':`Bearer ` + localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }
    static async getQuestionByType(data, check = 0) {
        try {
            var  noAll = ''
            if (check === 1){
                noAll = '?no-all=1'
            }
            return await axios.post('/api/get-questionaire-by-type'+ noAll,data, {
                headers: {
                    'Authorization':`Bearer ` + localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            return e;
        }
    }
    static async DownloadExcelSurvey(data){
        try {
            return await axios.post('/api/downloadExcelSurvey',data,
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
    static async DownloadExcelStudentSurveyExcel(data){
        try {
            return await axios.post('/api/studentSurveyExcel',data,
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
    static async DownloadExcelParentSurveyExcel(data){
        try {
            return await axios.post('/api/parentSurveyExcel',data,
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
    static async DownloadExcelEntrepreneurSurveyExcelExcel(data){
        try {
            return await axios.post('/api/entrepreneurSurveyExcel',data,
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
    static async DownloadEmploymentGraduatesExcel(data){
        try {
            return await axios.post('/api/downloadEmploymentGraduatesExcel',data,
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
    static async SurveyOpinionAnalysisReport(data){
        try {
            return await axios.post('/api/surveyOpinionAnalysisReport',data, {
                headers:{
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, responseType: 'arraybuffer'
            });
        }catch (e){
            return e;
        }
    }
    static async SurveyOpinionAnalysisExcel(data){
        try {
            return await axios.post('/api/surveyOpinionAnalysisExcel',data, {
                headers:{
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, responseType: 'arraybuffer'
            });
        }catch (e){
            return e;
        }
    }
    static async IndicatorReport(data){
        try {
            return await axios.post('/api/indicatorReport',data, {
                headers:{
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, responseType: 'arraybuffer'
            });
        }catch (e){
            return e;
        }
    }
    static async IndicatorExcel(data){
        try {
            return await axios.post('/api/indicatorExcel',data, {
                headers:{
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, responseType: 'arraybuffer'
            });
        }catch (e){
            return e;
        }
    }
    static async IndicatorAnalysisReport(data){
        try {
            return await axios.post('/api/indicatorAnalysisReport',data, {
                headers:{
                    'Authorization':`Bearer `+localStorage.getItem("token").replaceAll("\"",""),
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, responseType: 'arraybuffer'
            });
        }catch (e){
            return e;
        }
    }
    static async IndicatorAnalysisExcel(data){
        try {
            return await axios.post('/api/indicatorAnalysisExcel',data, {
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