import axios from 'axios'

class LoginDataService {

    login(logindata) {
        return axios.get('http://localhost:8080/utilizator/' + logindata.username + '/' + logindata.password);
        //console.log(logindata);
    }
}
export default new LoginDataService()