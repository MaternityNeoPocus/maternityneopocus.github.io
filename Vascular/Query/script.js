
  // 🔥 Firebase imports
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

  // 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC1PrSk6ANrnPgTIDAd8TVStHQ7IWwS0Hs",
  authDomain: "my-videocalling-app-cd593.firebaseapp.com",
  databaseURL: "https://my-videocalling-app-cd593-default-rtdb.firebaseio.com",
  projectId: "my-videocalling-app-cd593",
  storageBucket: "my-videocalling-app-cd593.firebasestorage.app",
  messagingSenderId: "883990918776",
  appId: "1:883990918776:web:9a7b9f543c551bfb179f8d",
  measurementId: "G-9WTXJ1TJRP"
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