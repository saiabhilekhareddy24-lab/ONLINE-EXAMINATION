# Online Examination System

## Introduction

The Online Examination System is a web-based application developed using
HTML, CSS, and JavaScript.

The application allows students to enter their name, answer multiple-choice
questions, view a countdown timer, and receive their examination score
automatically.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Visual Studio Code
- GitHub

## Features

- Student name input
- Multiple-choice questions
- Interactive answer selection
- Countdown timer
- Automatic score calculation
- Percentage calculation
- Result display
- Restart examination option
- Responsive user interface

## Project Structure
```text
online-examination/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── test-cases.md
Great — A: HTML + CSS + JavaScript. For a web project, the “testbench” is better represented by test cases/testing steps, and the “simulation output” can be represented by the expected browser output/screenshots/results.

Below is a complete beginner-friendly Online Examination System you can upload to GitHub.

Project structure
online-examination/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── test-cases.md

1. index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Examination System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header>
        <h1>Online Examination System</h1>
        <p>Test your knowledge online</p>
    </header>

    <main class="container">

        <section id="startScreen" class="card">
            <h2>Welcome to the Online Examination</h2>
            <p>Enter your name to start the examination.</p>

            <input type="text" id="studentName" placeholder="Enter your name">

            <button onclick="startExam()">Start Exam</button>
        </section>

        <section id="examScreen" class="card hidden">
            <div class="exam-header">
                <h2>Online Examination</h2>
                <div id="timer">Time: 05:00</div>
            </div>

            <h3 id="questionNumber"></h3>
            <p id="question"></p>

            <div id="options"></div>

            <button onclick="nextQuestion()">Next</button>
        </section>

        <section id="resultScreen" class="card hidden">
            <h2>Examination Result</h2>

            <p id="resultMessage"></p>
            <p id="score"></p>
            <p id="percentage"></p>

            <button onclick="restartExam()">Take Exam Again</button>
        </section>

    </main>

    <footer>
        <p>© 2026 Online Examination System</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>

2. style.css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #667eea, #764ba2);
    min-height: 100vh;
    color: #333;
}

header {
    background: #222;
    color: white;
    text-align: center;
    padding: 25px;
}

header h1 {
    margin-bottom: 8px;
}

.container {
    width: 90%;
    max-width: 800px;
    margin: 40px auto;
}

.card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.card h2 {
    color: #4b3ca7;
    margin-bottom: 20px;
}

.card p {
    margin-bottom: 20px;
}

input[type="text"] {
    width: 100%;
    padding: 12px;
    margin: 15px 0;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
}

button {
    background: #4b3ca7;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 15px;
}

button:hover {
    background: #35298a;
}

.exam-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

#timer {
    background: #e74c3c;
    color: white;
    padding: 10px 15px;
    border-radius: 6px;
    font-weight: bold;
}

#question {
    font-size: 20px;
    font-weight: bold;
    margin: 20px 0;
}

.option {
    display: block;
    background: #f2f2f2;
    padding: 14px;
    margin: 10px 0;
    border-radius: 6px;
    cursor: pointer;
    border: 2px solid transparent;
}

.option:hover {
    background: #e5e1ff;
}

.option.selected {
    border-color: #4b3ca7;
    background: #ddd8ff;
}

.hidden {
    display: none;
}

#resultScreen {
    text-align: center;
}

#score {
    font-size: 28px;
    font-weight: bold;
    color: #4b3ca7;
}

#percentage {
    font-size: 22px;
    color: #27ae60;
}

footer {
    text-align: center;
    color: white;
    padding: 20px;
}

@media (max-width: 600px) {
    .container {
        width: 95%;
    }

    .exam-header {
        flex-direction: column;
        gap: 15px;
    }

    #question {
        font-size: 18px;
    }
}

3. script.js
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

4. Testbench / test cases

Since this is a web application, use these as your testbench/test cases rather than a Verilog-style testbench.

Test Case	Input/Action	Expected Output
TC01	Open index.html	Login/start screen appears
TC02	Click Start without entering name	"Please enter your name" appears
TC03	Enter student name	Examination starts
TC04	Select correct answer	Answer is highlighted
TC05	Click Next without selecting answer	Warning appears
TC06	Select correct answers	Score increases
TC07	Complete all questions	Result screen appears
TC08	Complete exam with all correct answers	5/5 and 100%
TC09	Click Take Exam Again	Exam resets
TC10	Wait until timer reaches 00:00	Examination automatically ends
5. Expected simulation/output

For example, if the student enters Rahul and answers all five questions correctly:

========================================
       ONLINE EXAMINATION SYSTEM
========================================

Student Name: Rahul

Question 1 of 5
What does HTML stand for?
> Hyper Text Markup Language

Question 2 of 5
Which language is used to style a web page?
> CSS

Question 3 of 5
Which language is mainly used to add
interactivity to web pages?
> JavaScript

Question 4 of 5
Which HTML tag is used to create a hyperlink?
> <a>

Question 5 of 5
Which symbol is used for an ID selector in CSS?
> #

========================================
             EXAM RESULT
========================================

Well done, Rahul!

Score: 5 / 5
Percentage: 100%

========================================


If the student gets 3 answers correct:

========================================
             EXAM RESULT
========================================

Well done, Rahul!

Score: 3 / 5
Percentage: 60%

========================================

6. README.md
# Online Examination System

## Introduction

The Online Examination System is a web-based application developed using
HTML, CSS, and JavaScript.

The application allows students to enter their name, answer multiple-choice
questions, view a countdown timer, and receive their examination score
automatically.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Visual Studio Code
- GitHub

## Features

- Student name input
- Multiple-choice questions
- Interactive answer selection
- Countdown timer
- Automatic score calculation
- Percentage calculation
- Result display
- Restart examination option
- Responsive user interface

## Project Structure

```text
online-examination/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── test-cases.md

How to Run
Download or clone the project.
Open the project folder.
Open index.html in a web browser.
Enter the student's name.
Click "Start Exam".
Answer each question.
Click "Next" after each answer.
View the final score.
Examination Details
Number of questions: 5
Question type: Multiple Choice Questions
Time limit: 5 minutes
Score: 1 mark for every correct answer
Negative marking: No
Testing

The application was tested for:

Empty student name
Question navigation
Answer selection
Correct answer calculation
Incorrect answer calculation
Timer functionality
Result generation
Exam restart functionality
Responsive layout
Expected Result

The system should allow the student to complete the examination and
automatically display the total marks and percentage.

Future Enhancements
User login and registration
Database integration
Admin dashboard
Random question generation
More subjects
Negative marking
Student result history
Online certificate generation
Author

Student Project - Online Examination
