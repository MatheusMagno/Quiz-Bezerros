fetch("./questions.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    startGame();
  })
  .catch((error) => console.error("Error loading questions:", error));

const questionContainer = document.getElementById("question");
const answersContainer = document.getElementById("answers-container");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion(questions[currentQuestionIndex]);
}

function resetState() {
  nextButton.style.display = "none";
  while (answersContainer.firstChild) {
    answersContainer.removeChild(answersContainer.firstChild);
  }
}

function showQuestion(question) {
  resetState();
  let questionNumb = currentQuestionIndex + 1;
  questionContainer.innerHTML = questionNumb + ". " + question.question;

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("answer");
    button.dataset.id = answer.id;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(e) {
  answers = questions[currentQuestionIndex].answers;
  const correctAnswer = answers.filter((answer) => answer.correct == true)[0];

  const selectAnswer = e.target;
  const isCorrect = selectAnswer.dataset.id == correctAnswer.id;
  if (isCorrect) {
    selectAnswer.classList.add("correct");
    score++;
  } else {
    selectAnswer.classList.add("incorrect");
  }
  Array.from(answersContainer.children).forEach((button) => {
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionContainer.innerHTML = `Você Acertou ${score} de ${questions.length}!`;
  nextButton.style.display = "none";
}

function showScore() {
  resetState();
  questionContainer.innerHTML = `Você Acertou ${score} de ${questions.length}!`;
  nextButton.innerHTML = "Jogar Novamente";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startGame();
  }
});

startGame();
