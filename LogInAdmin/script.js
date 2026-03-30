  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth,  signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyANWMmuA3cIFuMyWXiUBrskNh4-fER29RE",
    authDomain: "hiapp-b24ae.firebaseapp.com",
    projectId: "hiapp-b24ae",
    storageBucket: "hiapp-b24ae.firebasestorage.app",
    messagingSenderId: "188593583447",
    appId: "1:188593583447:web:b833268ffae4784fa53a12",
    measurementId: "G-94RVD594KC"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();



const submit = document.getElementById('submit');

submit.addEventListener('click', function(event)  {
    event.preventDefault();
    
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    window.location.href = 'admin/admin.html';
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert('Error: ' + errorMessage);
    // ..
  });
})