const questions = [
  {
    question: "PIM ย่อมาจากอะไร ?",
    answers: [
      { text: "พีไอเอ็ม", correct: true },
      { text: "ปิ๋ม", correct: false },
      { text: "พิม", correct: false },
      { text: "ภีม", correct: false },
    ],
  },
  {
    question: "NPRU ตั้งมากี่ปีแล้ว ?",
    answers: [
      { text: "50", correct: false },
      { text: "66", correct: false },
      { text: "87", correct: false },
      { text: "88", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let point = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  point = 0;
  nextButton.innerHTML = "Next";
  displayQuestion();
}

function displayQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  const result = document.getElementById("result");
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    point++;
    result.textContent = "คุณตอบถูกต้อง";
    console.log("point = " + point);
  } else {
    selectedBtn.classList.add("incorrect");
    result.textContent = "คุณตอบผิด";
  }

  Array.from(answerButton.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `คุณได้คะแนน ${point} จาก ${questions.length}`;
  result.style.display = "none";
  nextButton.innerHTML = "Play Again!!";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();

// function checkAnswer(answer) {
//   const result = document.getElementById("result");
//   if (answer === "a") {
//     result.textContent = "ถูกต้อง PIM ย่อมาจาก PIM";
//     result.style.color = "green";
//   } else {
//     result.textContent = "Incorrect! Try again.";
//     result.style.color = "red";
//   }
// }
