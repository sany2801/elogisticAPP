import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import MediaWrapper from './adaptive/MediaWrapper';
import { ModalProvider } from './context/ModalContext/ModalContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId='40272035318-ngeunnhripj20u8pjsu35in7p928ol0i.apps.googleusercontent.com'>
    <ModalProvider>
      <BrowserRouter>
        <MediaWrapper>
          <Provider store={store}>
            <App />
          </Provider>
        </MediaWrapper>
      </BrowserRouter>
    </ModalProvider>
  </GoogleOAuthProvider>
);


