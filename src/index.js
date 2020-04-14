import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// URL for token server
// Example token server: https://github.com/paboustead/vxAuthServer
const getTokenURL = 'https://*****ADD_YOUR_TOKEN_SERVER_URL_HERE*****:3000/auth/token';
function startCall()
{
    // Get token to join call
    let request = new XMLHttpRequest();
    request.open('GET',getTokenURL,true);
    request.send();
    request.onload = () => {
        if (request.status === 200){
          var obj=JSON.parse(request.response);
          window.token = obj.access_token;
	  // Join call
          ReactDOM.render(
              <React.StrictMode>
              <App />
              </React.StrictMode>,
              document.getElementById('root')
          );
        } else {
          console.log(`error ${request.status} ${request.statusText}`);
        }
    }
}

startCall();
serviceWorker.unregister();
