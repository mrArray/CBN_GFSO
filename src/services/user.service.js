import axios from 'axios';
import authHeader from './auth-header';



class UserService {

  //this get public content
  getPublicContent() {
    return axios.get( 'https://cavti.kedco.ng/centrak/api/v2/captures-statistics/');
  }

  //this get Ict Officer all Captures
  getUserBoard() {
    
    return axios.get('https://cavti.kedco.ng/centrak/api/v2/meter-audits/', { headers: authHeader() });
  }

  //this get Regional  content
  getModeratorBoard() {

    return axios.get('https://cavti.kedco.ng/meter-audit/api/v1/rms/', { headers: authHeader() });
  }

    //this get Enumerators content

  getAdminBoard() {
    return axios.get('https://cavti.kedco.ng/meter-audit/api/v1/enumerators-performance/', { headers: authHeader() });
  }
}

export default new UserService();


// this  class defines a service for accessing data :





// {
//   "name": "Suleiman M Ahmad",
//   "phone_number": "08036627976",
//   "csp_name": "CHIRANCHI",
//   "user_type": "staff",
//   "todays_captures": 0,
//   "captures_thismonth": 72,
//   "target_color": "red",
//   "percentage_in_target": 7.199999999999999,
//   "captures_total": 13099
