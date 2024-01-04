const questions = [
  {
    question: "What does HTML stand for?",
    answer: [
      { text: "Hyperlink and Text Markup Language", correct: false },
      { text: "Hyper Transfer Markup Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High-Level Text Markup Language", correct: false },
    ],
  },
  {
    question:
      "Which CSS property is used to change the text color of an element?",
    answer: [
      { text: "text-style", correct: false },
      { text: "font-color", correct: false },
      { text: "color", correct: true },
      { text: "text-color", correct: false },
    ],
  },
  {
    question: "What is the purpose of the var keyword in JavaScript?",
    answer: [
      { text: "Declaring a variable", correct: true },
      { text: "Defining a function", correct: false },
      { text: "Importing a library", correct: false },
      { text: "Displaying an alert", correct: false },
    ],
  },
  {
    question: "Which HTML tag is used to create an unordered list?",
    answer: [
      { text: "&lt;ul&gt;", correct: true },
      { text: "&lt;ol&gt;", correct: false },
      { text: "&lt;li&gt;", correct: false },
      { text: "&lt;list&gt;", correct: false },
    ],
  },
  {
    question: "What is the default position property value in CSS?",
    answer: [
      { text: "relative", correct: false },
      { text: "fixed", correct: false },
      { text: "absolute", correct: false },
      { text: "static", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
};

const showQuestion = () => {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtns.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
};

const resetState = () => {
  nextBtn.style.display = "none";
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
};

const selectAnswer = (e) => {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerBtns.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
};

const showScore = () => {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
};

const handleNextButton = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
