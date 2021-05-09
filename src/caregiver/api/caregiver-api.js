import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    caregiver: '/caregiver'
};

function getCaregivers(callback) {
    let request = new Request(HOST.backend_api + endpoint.caregiver, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getCaregiver(id,callback) {
    let request = new Request(HOST.backend_api + endpoint.caregiver + '/' + id ,{
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function postCaregiver(user, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver , {
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

function deleteCaregiver(id, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver + '/' + id , {
        method: 'DELETE',

    });
    console.log("URL: " + request.url);

        RestApiClient.performRequest(request, callback);
}

function updateCaregiver(user, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver + '/' + user.id , {
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

export {
    getCaregivers,
    postCaregiver,
    deleteCaregiver,
    updateCaregiver
};

