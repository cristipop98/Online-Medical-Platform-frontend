import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    utilizator: '/utilizator',
};

function getUtilizatori(callback) {
    let request = new Request(HOST.backend_api + endpoint.utilizator, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getUtilizatori
};