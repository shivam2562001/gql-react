import * as firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB60SiTuXCPKL9goV7VOX5i5HTTMoEPqA4",
  authDomain: "gqlreactnodejs.firebaseapp.com",
  // databaseURL: "https://gqlreactnodejs.firebaseio.com",
  projectId: "gqlreactnodejs",
  storageBucket: "gqlreactnodejs.appspot.com",
  // messagingSenderId: "133043456951",
  appId: "1:133043456951:web:22f185dbed42dcdc42f632",
  measurementId: "G-QE2KC4WPJL",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();



export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
