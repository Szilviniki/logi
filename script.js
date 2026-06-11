// Kérdések és válaszok
const quizData = [
    {
        question: "Melyik évbe utazik vissza Marty McFly az első filmben?",
        options: ["1985", "1955", "2015", "1885"],
        correctAnswer: "1955"
    },
    {
        question: "Milyen autóból építette Doki az időgépet?",
        options: ["Ford Mustang", "Chevrolet Camaro", "DeLorean", "Pontiac Firebird"],
        correctAnswer: "DeLorean"
    },
    {
        question: "Mennyi energiára van szüksége az időgépnek az utazáshoz?",
        options: ["1.21 Gigawatt", "1000 Megawatt", "500 Kilowatt", "2.5 Gigawatt"],
        correctAnswer: "1.21 Gigawatt"
    }
];

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const quizHeader = document.getElementById("quiz-header");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.style.display = "none";
    quizHeader.style.display = "block";
    optionsContainer.style.display = "block";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = quizData[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", selectAnswer);
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.innerText === quizData[currentQuestionIndex].correctAnswer;

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    Array.from(optionsContainer.children).forEach(button => {
        if (button.innerText === quizData[currentQuestionIndex].correctAnswer) {
            button.classList.add("correct");
        }
        button.disabled = true;
        button.style.cursor = "not-allowed";
    });

    nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizHeader.style.display = "none";
    optionsContainer.style.display = "none";
    nextButton.style.display = "none";
    resultContainer.style.display = "block";
    resultText.innerText = `Eredményed: ${quizData.length} / ${score} pont!`;
}

// Kvíz elindítása betöltéskor
startQuiz();