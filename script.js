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
  
  
  

  const db = firebase.database();

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
      button.addEventListener("click", () => {
        const userAnswer = choiceKey === "a" ? 2 : 1;
        db.ref(`userAnswers/${key}`).set(userAnswer);
      });
      choiceDiv.appendChild(span);
      choiceDiv.appendChild(button);
      div.appendChild(choiceDiv);
    }

    return div;
  }

  // Render the quiz questions in the DOM
  for (const questionKey in quizData) {
    const questionDiv = createQuestionElement(questionKey, quizData[questionKey]);
    questionsContainer.appendChild(questionDiv);
  }
  
    
    
 // Get a reference to the quiz data in Firebase
const quizRef = database.ref("quiz");

// Attach a listener to the quiz data to render the questions in the DOM
quizRef.on("value", snapshot => {
  const quizData = snapshot.val();
  for (const questionKey in quizData) {
    const questionObj = quizData[questionKey];
    const questionDiv = createQuestionElement(questionKey, questionObj);
    questionsContainer.appendChild(questionDiv);
  }
});


// Variables for user's name and team color
const userNameInput = document.getElementById("userName");
const teamColorSelect = document.getElementById("teamColor");

// Function to handle quiz submission
function handleSubmitQuiz() {
  const userName = userNameInput.value;
  const teamColor = teamColorSelect.value;
  let score = 0;

  for (const key in quizData) {
    const questionElement = document.getElementById(key);
    const correctChoice = questionElement.getAttribute("data-correct-choice");
    const selectedChoice = questionElement.getAttribute("data-selected-choice");

    if (correctChoice === selectedChoice) {
      score++;
    }
  }

  // Save user's score, name, and team color to the database
  database.ref(`results/${userName}`).set({
    name: userName,
    teamColor: teamColor,
    score: score,
  });

  alert(`Quiz submitted! Your score is: ${score}`);
}

document.getElementById("submitQuiz").addEventListener("click", handleSubmitQuiz);

function createQuestionElement(key, questionObj) {
  // ... (previous code to create question elements)

  for (const choiceKey in questionObj.choices) {
    // ... (previous code to create choice buttons)

    button.addEventListener("click", () => {
      const previousChoice = questionElement.getAttribute("data-selected-choice");
      if (previousChoice) {
        const previousButton = questionElement.querySelector(`button[data-choice='${previousChoice}']`);
        previousButton.classList.remove("selected");
      }

      questionElement.setAttribute("data-selected-choice", choiceKey);
      button.classList.add("selected");
    });

    button.setAttribute("data-choice", choiceKey);
    choiceDiv.appendChild(button);
    div.appendChild(choiceDiv);
  }

  div.setAttribute("data-correct-choice", questionObj.correctChoice);
  div.setAttribute("id", key);
  return div;
}

// ... (remaining code to create question elements and append them to the container)

for (const key in quizData) {
  const questionElement = createQuestionElement(key, quizData[key]);
  questionsContainer.appendChild(questionElement);
}