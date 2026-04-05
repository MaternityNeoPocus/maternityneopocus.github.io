
  // 🔥 Firebase imports
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

  // 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyANWMmuA3cIFuMyWXiUBrskNh4-fER29RE",
  authDomain: "hiapp-b24ae.firebaseapp.com",
  databaseURL: "https://hiapp-b24ae-default-rtdb.firebaseio.com",
  projectId: "hiapp-b24ae",
  storageBucket: "hiapp-b24ae.firebasestorage.app",
  messagingSenderId: "188593583447",
  appId: "1:188593583447:web:b833268ffae4784fa53a12",
  measurementId: "G-94RVD594KC"
};

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  // 🔍 Search function
  window.searchDoctor = async function () {
    const doctor = document.getElementById("doctorName").value.trim();
    const result = document.getElementById("result");
    result.innerHTML = "";

    if (doctor === "") {
      result.innerHTML = "❌ Please enter doctor name";
      return;
    }

    const babiesRef = ref(db, `Doctors/${doctor}/Babies`);
    const snapshot = await get(babiesRef);

    if (!snapshot.exists()) {
      result.innerHTML = "❌ Doctor not found or no babies";
      return;
    }

    const babies = snapshot.val();

    for (const id in babies) {
      const b = babies[id];
      result.innerHTML += `
        <div class="card">
          <p><b>Baby Name:</b> ${b.name}</p>
          <p><b>Date of scan:</b> ${b.dateOfscan}</p>
          <p><b>File Number:</b> ${b.fileNumberId}</p>
          <p><b>Gestational Age:</b> ${b.gestationalAge}</p>
          <p><b>Site Of Baby:</b> ${b.siteOfBaby}</p>
          <p><b>Indication:</b> ${b.indicationOfscan}</p>
          <p><b>Findings:</b> ${b.findings}</p>
          <p><b>Notes:</b> ${b.notes}</p>
        </div>
      `;
    }
  }