import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

import axios from 'axios';


const endpoint = {
    patient: '/patient',
};

function getPatients(callback) {
     let request = new Request(HOST.backend_api + endpoint.patient, {
         method: 'GET',
     });
     console.log(request.url);
     RestApiClient.performRequest(request, callback);
}
function postPatient(user, callback){
    let request = new Request(HOST.backend_api + endpoint.patient , {
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

function deletePatient(id, callback){
    let request = new Request(HOST.backend_api + endpoint.patient + '/' + id , {
        method: 'DELETE',

    });
    console.log("URL: " + request.url);

        RestApiClient.performRequest(request, callback);
}

function updatePatient(user, callback){
    let request = new Request(HOST.backend_api + endpoint.patient + '/' + user.id , {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
    console.log("URL: " + request.url);

        RestApiClient.performRequest(request, callback);
}
//function deletePatient(id){

  //  return axios.delete('http://localhost:8080/patient' + '/' + id);

//}


export {
    getPatients,
    postPatient,
    deletePatient,
    updatePatient
};


