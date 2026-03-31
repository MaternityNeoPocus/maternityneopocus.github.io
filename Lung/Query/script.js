
  // 🔥 Firebase imports
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

  // 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDedyEFJmI0_LCUU3uFO1NdJwdY41wrXus",
  authDomain: "chatroom-bcd09.firebaseapp.com",
  databaseURL: "https://chatroom-bcd09-default-rtdb.firebaseio.com",
  projectId: "chatroom-bcd09",
  storageBucket: "chatroom-bcd09.firebasestorage.app",
  messagingSenderId: "891406162202",
  appId: "1:891406162202:web:58d71f5c6e68ecccf174a3"
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