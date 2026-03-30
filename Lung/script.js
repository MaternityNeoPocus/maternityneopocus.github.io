// Import only what you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  get,
  child
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDedyEFJmI0_LCUU3uFO1NdJwdY41wrXus",
  authDomain: "chatroom-bcd09.firebaseapp.com",
  databaseURL: "https://chatroom-bcd09-default-rtdb.firebaseio.com",
  projectId: "chatroom-bcd09",
  storageBucket: "chatroom-bcd09.firebasestorage.app",
  messagingSenderId: "891406162202",
  appId: "1:891406162202:web:58d71f5c6e68ecccf174a3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const loader = document.getElementById("loader");
const submitBtn = document.getElementById("submit");

document.getElementById("submit").addEventListener("click", async () => {

  // 🔄 show loader + disable button
  loader.style.display = "flex";
  submitBtn.disabled = true;

  const doctorId = document.getElementById("doctorid").value.trim();
  const nameOfBaby = document.getElementById("babyname").value.trim();
  const fileNumberId = document.getElementById("fileNumberId").value;
  const gestationalAge = document.getElementById("gestationalAge").value;
  const siteOfBaby = document.getElementById("siteOfBaby").options[
    document.getElementById("siteOfBaby").selectedIndex
  ].text;
  const indicationOfscan = document.getElementById("indicationOfscan").value;
  const findings = document.getElementById("findings").value;
  const notes = document.getElementById("notes").value;
  const dateOfscan = document.getElementById("dateOfscan").value;

  if (!doctorId || !nameOfBaby) {
    alert("Please fill both Doctor ID and Baby Name");
    loader.style.display = "none";
    submitBtn.disabled = false;
    return;
  }

  try {
    // 🔍 Check if doctor exists
    const dbRef = ref(db);
    const doctorSnapshot = await get(child(dbRef, `Doctors/${doctorId}`));

    if (!doctorSnapshot.exists()) {
      alert("❌ Doctor ID not found");
      loader.style.display = "none";
      submitBtn.disabled = false;
      return;
    }

    // ✅ Doctor exists → add baby
    const babyRef = ref(db, `Doctors/${doctorId}/Babies`);
    const newBabyRef = push(babyRef);
const now = new Date();

const formattedDateTime = `${now.getDate().toString().padStart(2, "0")}/${
  (now.getMonth() + 1).toString().padStart(2, "0")
}/${now.getFullYear()} - ${now
  .getHours()
  .toString()
  .padStart(2, "0")}:${now
  .getMinutes()
  .toString()
  .padStart(2, "0")}:${now
  .getSeconds()
  .toString()
  .padStart(2, "0")}`;

    await set(newBabyRef, {
      name: nameOfBaby,
      fileNumberId,
      gestationalAge,
      siteOfBaby,
      indicationOfscan,
      findings,
      notes,
      dateOfscan,
      
  createdAt: formattedDateTime,
    });

    alert("✅ Baby saved under Doctor " + doctorId);
    document.getElementById("form").reset();

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong");
  }

  // 🔚 hide loader + enable button
  loader.style.display = "none";
  submitBtn.disabled = false;
});
