const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Mark Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used to style a web page?",
        options: [
            "HTML",
            "CSS",
            "Python",
            "SQL"
        ],
        answer: 1
    },
    {
        question: "Which language is mainly used to add interactivity to web pages?",
        options: [
            "CSS",
            "HTML",
            "JavaScript",
            "XML"
        ],
        answer: 2
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        answer: 1
    },
    {
        question: "Which symbol is used for an ID selector in CSS?",
        options: [
            ".",
            "#",
            "*",
            "@"
        ],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let student = "";
let timeLeft = 300;
let timerInterval;

function startExam() {
    student = document.getElementById("studentName").value.trim();

    if (student === "") {
        alert("Please enter your name.");
        return;
    }

    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("examScreen").classList.remove("hidden");

    currentQuestion = 0;
    score = 0;
    timeLeft = 300;

    showQuestion();
    startTimer();
}

function showQuestion() {
    const q = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        "Question " + (currentQuestion + 1) + " of " + questions.length;

    document.getElementById("question").textContent = q.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    selectedAnswer = null;

    q.options.forEach((option, index) => {
        const div = document.createElement("div");

        div.className = "option";
        div.textContent = option;

        div.onclick = function () {
            selectOption(index, div);
        };

        optionsContainer.appendChild(div);
    });
}

function selectOption(index, element) {
    selectedAnswer = index;

    document.querySelectorAll(".option").forEach(option => {
        option.classList.remove("selected");
    });

    element.classList.add("selected");
}

function nextQuestion() {
    if (selectedAnswer === null) {
        alert("Please select an answer.");
        return;
    }

    if (selectedAnswer === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        finishExam();
    }
}

function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        document.getElementById("timer").textContent =
            "Time: " +
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishExam();
        }
    }, 1000);
}

function finishExam() {
    clearInterval(timerInterval);

    document.getElementById("examScreen").classList.add("hidden");
    document.getElementById("resultScreen").classList.remove("hidden");

    const percentage = (score / questions.length) * 100;

    document.getElementById("resultMessage").textContent =
        "Well done, " + student + "!";

    document.getElementById("score").textContent =
        "Score: " + score + " / " + questions.length;

    document.getElementById("percentage").textContent =
        "Percentage: " + percentage + "%";
}

function restartExam() {
    clearInterval(timerInterval);

    document.getElementById("resultScreen").classList.add("hidden");
    document.getElementById("startScreen").classList.remove("hidden");

    document.getElementById("studentName").value = "";
}
