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
  
  
  
  
  const questionsContainer = document.getElementById("questionsContainer");

function createQuestionElement(key, questionObj) {
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.textContent = questionObj.text;
  div.appendChild(h2);

  for (const choiceKey in questionObj.choices) {
    const choiceDiv = document.createElement("div");
    const span = document.createElement("span");
    const button = document.createElement("button");
    span.textContent = `${choiceKey}: `;
    button.textContent = questionObj.choices[choiceKey];
    choiceDiv.appendChild(span);
    choiceDiv.appendChild(button);
    div.appendChild(choiceDiv);
  }

  return div;
}

for (const key in quizData) {
  const questionElement = createQuestionElement(key, quizData[key]);
  questionsContainer.appendChild(questionElement);
}