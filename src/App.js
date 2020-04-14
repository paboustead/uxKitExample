import { reducer as voxeetReducer } from '@voxeet/react-components';
import React from 'react'
import thunkMidleware from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { ConferenceRoom, VoxeetProvider } from '@voxeet/react-components'
// Import Style
import '@voxeet/react-components/dist/voxeet-react-components.css';

// URL for refresh token API on your token server
// Example token server: https://github.com/paboustead/vxAuthServer
const refreshTokenURL = 'https://*****ADD_YOUR_TOKEN_SERVER_URL_HERE*****:3000/auth/refresh';


const reducers = combineReducers({
  voxeet: voxeetReducer
});

const configureStore = () => createStore(
  reducers,
  applyMiddleware(thunkMidleware)
)

const nst = {
                name: window.name,
                externalId: "",
                avatarUrl: ""
}

// Setup token refresh Promise
let refresh = new Promise(function(resolve,reject){
    let request = new XMLHttpRequest();
    request.open('GET',refreshTokenURL,true);
    request.send();
    request.onload = () => {
            if (request.status === 200){
                    var obj=JSON.parse(request.response);
                    var token = obj.refresh_token;
                    console.log(`Refresh ${token}`);
                    resolve(token);
            } else {
                    console.log(`error ${request.status} ${request.statusText}`);
                    reject();
            }
    }
})


function App() {
  return (
    <VoxeetProvider store={configureStore()}>
      <ConferenceRoom
        autoJoin
        isWidget={false}
        oauthToken={window.token}
        conferenceAlias={window.conference}
        refreshTokenCallback={refresh}
        userInfo={nst}
      />
    </VoxeetProvider>
  );
}

export default App;
