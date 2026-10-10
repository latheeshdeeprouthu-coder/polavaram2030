// Firebase web app configuration. These values identify your Firebase project.
// IMPORTANT: Add your manually-created admin user's UID to ADMIN_UIDS below.
const firebaseConfig = {
  apiKey: "AIzaSyDrFpljGcN-ZHnXqOoTeWbI0Q-r7dnZjIA",
  authDomain: "polavaram2026.firebaseapp.com",
  projectId: "polavaram2026",
  storageBucket: "polavaram2026.firebasestorage.app",
  messagingSenderId: "1088409098085",
  appId: "1:1088409098085:web:d5579653c673a49fdcf38c",
  measurementId: "G-ZM5XM99Z34"
};

// Paste the UID of each admin account created manually in Firebase Authentication.
// Never identify admins using a public email field or allow users to select their own role.
const ADMIN_UIDS = [
  "REPLACE_WITH_YOUR_ADMIN_UID"
];

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();