// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC6toyds2tLzyfiINLUXgPeEgSDU2WhwkI",
    authDomain: "worksheet-9f4d8.firebaseapp.com",
    databaseURL: "https://worksheet-9f4d8-default-rtdb.firebaseio.com",
    projectId: "worksheet-9f4d8",
    storageBucket: "worksheet-9f4d8.appspot.com",
    messagingSenderId: "223669808651",
    appId: "1:223669808651:web:7faa06a79f4a187262210e"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the database service
  const database = firebase.database();
  
  // Define the data to be written to the tree
  const quizData = {
    question1: {
      text: "What is a fracture?",
      choices: {
        a: "Inflammation of a joint",
        b: "Any type of break in the bone",
        c: "Repeated movements of wrists",
        d: "Inherited disorder in which skeletal muscle fibers are progressively destroyed",
      },
    },
    question2: {
      text: "What is a dislocation?",
      choices: {
        a: "Bone slips out of place",
        b: "Sharp blow to a joint",
        c: "Painful swelling of the bursae",
        d: "Inflammation of a joint",
      },
    },
    // ... (remaining questions)
  };
  
  
  
  
  // Create buttons for each variable in the treeData object
  const treeDiv = document.getElementById("treeDiv");
  
  function createButton(key, value, path) {
    const div = document.createElement("div");
    const span = document.createElement("span");
    const button = document.createElement("button");
    span.textContent = key;
    button.textContent = value;
    button.addEventListener("click", () => {
      const updatedValue = `updated_${value}`;
      database.ref(path).set(updatedValue);
      button.textContent = updatedValue;
      button.classList.add("updated");
    });
    div.appendChild(span);
    div.appendChild(button);
    treeDiv.appendChild(div);
  }
  
  function createButtons(data, path) {
    for (const key in data) {
      const value = data[key];
      const currentPath = `${path}/${key}`;
      if (typeof value === "object") {
        createButton(key, " ", currentPath);
        createButtons(value, currentPath);
      } else {
        createButton(key, value, currentPath);
      }
    }
  }
  
  createButtons(treeData, "tree");
  // Write the data to the database
database.ref("tree").set(treeData);