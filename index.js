import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getDatabase, ref, set, onValue, push } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const questions = [
  {
    question: "What is the smallest particle of matter?",
    correctAnswer: "Atom",
    wordBank: ["Molecule", "Electron", "Proton", "Atom"],
  },
  {
    question: "What is the largest animal in the world?",
    correctAnswer: "Blue Whale",
    wordBank: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
  },
  {
    question: "What planet is known as the Red Planet?",
    correctAnswer: "Mars",
    wordBank: ["Jupiter", "Mars", "Venus", "Mercury"],
  },
];

// Get elements from the DOM
const redTeamButton = document.getElementById("red-team");
const blueTeamButton = document.getElementById("blue-team");
const studentNameSelect = document.getElementById("student-name");
const worksheetDiv = document.getElementById("worksheet");
const submitButton = document.getElementById("submit-button");
const individualScoresElement = document.getElementById("individual-scores");
const redScoreElement = document.getElementById("red-score");
const blueScoreElement = document.getElementById("blue-score");

// Variables to keep track of state
let selectedTeam = null;
let selectedStudent = null;

// Reference to Firebase Database
const selectionRef = ref(db, "selection");
const scoresRef = ref(db, "scores");

// Functions to update student/team selection in Firebase Database
function selectTeam(team) {
  if (selectedStudent) {
    set(ref(db, `students/${selectedStudent}/team`), team)
      .then(() => {
        console.log(`Selected team for ${selectedStudent}: ${team}`);
      })
      .catch((error) => {
        console.error(`Error selecting team for ${selectedStudent}:`, error);
      });
    redTeamButton.classList.toggle("selected", team === "red");
    blueTeamButton.classList.toggle("selected", team === "blue");
    selectedTeam = team;
  }
}

function selectStudent(student) {
  selectedStudent = student;
  onValue(ref(db, `students/${selectedStudent}/team`), (snapshot) => {
    const team = snapshot.val();
    selectedTeam = team;
    redTeamButton.classList.toggle("selected", team === "red");
    blueTeamButton.classList.toggle("selected", team === "blue");
  });
}

// Listen for team selection events
redTeamButton.addEventListener("click", () => {
  selectTeam("red");
});

blueTeamButton.addEventListener("click", () => {
  selectTeam("blue");
});

studentNameSelect.addEventListener("change", (event) => {
  selectStudent(event.target.value);
});

// Render questions on the worksheet
questions.forEach((question, index) => {
  const questionElement = document.createElement("div");
  questionElement.innerHTML = <p>${question.question}</p> <select data-correct-answer="${question.correctAnswer}" data-question-index="${index}"> <option value="">Select answer</option> ${question.wordBank .map( (answer) => <option value="${answer}">${answer}</option> ) .join("")} </select> <button class="answer-button">Submit Answer</button> ;
  worksheetDiv.appendChild(questionElement);
  });
  
  worksheetDiv.addEventListener("click", (event) => {
  if (!event.target.classList.contains("answer-button")) return;
  const selectElement = event.target.previousSibling;
  const correctAnswer = selectElement.dataset.correctAnswer;
  const selectedAnswer = selectElement.value;
  const questionIndex = selectElement.dataset.questionIndex;
  const teamColor = selectedTeam === "red" ? "red" : "blue";
// Check if answer is correct and update scores
if (selectedAnswer === correctAnswer) {
  saveScore(questionIndex);
  event.target.style.backgroundColor = teamColor;
  selectElement.disabled = true;
} else {
  event.target.style.backgroundColor = "grey";
}

// Disable the submit button after clicking
event.target.disabled = true;
event.target.classList.add("answered");
selectElement.disabled = true;

// Highlight the correct and incorrect answers
const options = selectElement.options;
for (let i = 0; i < options.length; i++) {
  const option = options[i];
  if (option.value === correctAnswer) {
    option.classList.add("correct-answer");
  } else if (option.value === selectedAnswer) {
    option.classList.add("wrong-answer");
  }
}
});

// Save score to database
function saveScore(questionIndex) {
if (selectedTeam) {
const scoreRef = push(scoresRef);
set(scoreRef, {
team: selectedTeam,
student: selectedStudent,
question: questionIndex,
timestamp: Date.now()
})
.then(() => {
console.log("Score saved successfully");
})
.catch((error) => {
console.error("Error saving score:", error);
});
}
}

// Display individual and team scores
onValue(scoresRef, (snapshot) => {
const scores = snapshot.val();
const individualScoresElement = document.getElementById("individual-scores");
individualScoresElement.innerHTML = "";
const redScoreElement = document.getElementById("red-score");
const blueScoreElement = document.getElementById("blue-score");
let redScore = 0;
let blueScore = 0;
Object.entries(scores).forEach(([key, value]) => {
  const { team, student, question } = value;
  const questionText = questions[question].question;
  const isCorrect = questions[question].correctAnswer === selectElement.options[selectElement.selectedIndex].value;

  const scoreElement = document.createElement("li");
  scoreElement.innerHTML = `${student}: ${isCorrect ? 1 : 0} point${isCorrect ? "" : "s"} for "${questionText}"`;
  individualScoresElement.appendChild(scoreElement);

  if (team === "red") {
    redScore += isCorrect ? 1 : 0;
  } else if (team === "blue") {
    blueScore += isCorrect ? 1 : 0;
  }
});

redScoreElement.innerText = redScore;
blueScoreElement.innerText = blueScore;
});
</script>

</body