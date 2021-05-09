import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    medicationPlan: '/medicationPlan'
};

function getMedicationPlan(callback) {
    let request = new Request(HOST.backend_api + endpoint.medicationPlan, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postMedicationPlan(user, callback){
    let request = new Request(HOST.backend_api + endpoint.medicationPlan , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}
export {
    getMedicationPlan,
    postMedicationPlan

};