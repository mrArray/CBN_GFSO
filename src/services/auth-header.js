export default function authHeader() {

  const username = 'noura.dahiru'
  const password = 'a12345678'
  const mytoken = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

  //Parse the data with JSON.parse(), and the data becomes a JavaScript object ,which is user
    const user = JSON.parse(localStorage.getItem('user'));
    
  
    if (user && user.token) {
      return { 'Authorization': `Basic ${mytoken}`   + user.token }
    } else {
      return {};
    }
  }

  // // auth-header() is used by user.service  helper function to add JWT to HTTP header.
  // // auth-header() returns an object containing the JWT of the currently logged in user from Local Storage.
  // //let username = 'noura.dahiru';
  // let password = 'a12345678';
  // const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')