import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCtLC5neiajBKkPMPYbzcNrm3ag5w1K-lU',
  authDomain: 'web-design-life-saver.firebaseapp.com',
  projectId: 'web-design-life-saver',
  storageBucket: 'web-design-life-saver.appspot.com',
  messagingSenderId: '795124124689',
  appId: '1:795124124689:web:0b94798305bd9a8ed375b0',
};

export const firebaseApp = initializeApp(firebaseConfig);
