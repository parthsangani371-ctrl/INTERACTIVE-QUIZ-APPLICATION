// Quiz data: Array of question objects
        const questions = [
            {
                question: "What is the capital of France?",
                options: ["Berlin", "Madrid", "Paris", "Rome"],
                correct: 2, // Index of correct answer
                explanation: "Paris is the capital and most populous city of France."
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Earth", "Mars", "Jupiter", "Venus"],
                correct: 1,
                explanation: "Mars is called the Red Planet due to its reddish appearance."
            },
            {
                question: "What is 2 + 2?",
                options: ["3", "4", "5", "6"],
                correct: 1,
                explanation: "Basic arithmetic: 2 + 2 equals 4."
            },
            {
                question: "Who wrote 'To Kill a Mockingbird'?",
                options: ["Harper Lee", "J.K. Rowling", "Mark Twain", "Ernest Hemingway"],
                correct: 0,
                explanation: "Harper Lee is the author of this classic novel."
            },
            {
                question: "What is the largest ocean on Earth?",
                options: ["Atlantic", "Indian", "Arctic", "Pacific"],
                correct: 3,
                explanation: "The Pacific Ocean is the largest and deepest ocean."
            }
        ];

        let currentQuestionIndex = 0;
        let score = 0;
        let selectedOption = null;
        
        

        const endScreen = document.getElementById('end-screen');
        const questionEl = document.getElementById('question');
        const optionsEl = document.getElementById('options');
        const feedbackEl = document.getElementById('feedback');
        const nextBtn = document.getElementById('next-btn');
        const progressFill = document.getElementById('progress-fill');
        const scoreEl = document.getElementById('score');

        // Start quiz
        document.getElementById('start-btn').addEventListener('click', () => {
            startScreen.classList.add('hidden');
            quizScreen.classList.remove('hidden');
            loadQuestion();
        });

        // Load current question
        function loadQuestion() {
            const q = questions[currentQuestionIndex];
            questionEl.textContent = q.question;
            optionsEl.innerHTML = '';
            feedbackEl.classList.add('hidden');
            nextBtn.classList.add('hidden');
            selectedOption = null;

            q.options.forEach((option, index) => {
                const optionEl = document.createElement('div');
                optionEl.className = 'option';
                optionEl.textContent = option;
                optionEl.setAttribute('data-index', index);
                optionEl.addEventListener('click', () => selectOption(optionEl, index));
                optionsEl.appendChild(optionEl);
            });

            updateProgress();
        }

        // Handle option selection
        function selectOption(optionEl, index) {
            if (selectedOption !== null) return; // Prevent multiple selections
            selectedOption = index;

            // Mark selected
            optionEl.classList.add('selected');

            // Check answer and provide feedback
            const q = questions[currentQuestionIndex];
            const isCorrect = index === q.correct;
            if (isCorrect) {
                score++;
                optionEl.classList.add('correct');
                feedbackEl.textContent = `Correct! ${q.explanation}`;
            } else {
                optionEl.classList.add('incorrect');
                // Highlight correct answer
                document.querySelector(`[data-index="${q.correct}"]`).classList.add('correct');
                feedbackEl.textContent = `Incorrect. ${q.explanation}`;
            }
            feedbackEl.classList.remove('hidden');
            nextBtn.classList.remove('hidden');
        }

        // Next question or end quiz
        nextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                showEndScreen();
            }
        });

        // Update progress bar
        function updateProgress() {
            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            progressFill.style.width = `${progress}%`;
        }

        // Show end screen
        function showEndScreen() {
            quizScreen.classList.add('hidden');
            endScreen.classList.remove('hidden');
            scoreEl.textContent = `Your Score: ${score} / ${questions.length}`;
        }

        // Restart quiz
        document.getElementById('restart-btn').addEventListener('click', () => {
            currentQuestionIndex = 0;
            score = 0;
            endScreen.classList.add('hidden');
            startScreen.classList.remove('hidden');
        });

        document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  const startScreen = document.getElementById('start-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const endScreen = document.getElementById('end-screen');
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const feedbackEl = document.getElementById('feedback');
  const nextBtn = document.getElementById('next-btn');
  const restartBtn = document.getElementById('restart-btn');
  const scoreEl = document.getElementById('score');
  const progressFill = document.getElementById('progress-fill');

  const quiz = [
    { q: "What is 2 + 2?", options: ["3","4","5","6"], answer: 1 },
    { q: "Capital of France?", options: ["Berlin","Rome","Paris","Madrid"], answer: 2 },
    { q: "Which is a JS framework?", options: ["React","Photoshop","Excel","Word"], answer: 0 }
  ];

  let current = 0;
  let score = 0;
  let answered = false;

  function startQuiz() {
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    current = 0;
    score = 0;
    showQuestion();
    updateProgress();
  }

  function showQuestion() {
    const item = quiz[current];
    questionEl.textContent = item.q;
    optionsEl.innerHTML = '';
    feedbackEl.textContent = '';
    nextBtn.classList.add('hidden');
    answered = false;

    item.options.forEach((opt, idx) => {
      const b = document.createElement('button');
      b.className = 'option-btn';
      b.textContent = opt;
      b.dataset.index = idx;
      b.addEventListener('click', onSelect);
      optionsEl.appendChild(b);
    });
  }

  function onSelect(e) {
    if (answered) return;
    answered = true;
    const chosen = Number(e.currentTarget.dataset.index);
    const correct = quiz[current].answer;
    Array.from(optionsEl.children).forEach(btn => btn.disabled = true);

    if (chosen === correct) {
      e.currentTarget.classList.add('correct');
      feedbackEl.textContent = 'Correct!';
      score++;
    } else {
      e.currentTarget.classList.add('wrong');
      feedbackEl.textContent = `Wrong — correct answer: ${quiz[current].options[correct]}`;
      // highlight correct
      const correctBtn = Array.from(optionsEl.children).find(b => Number(b.dataset.index) === correct);
      if (correctBtn) correctBtn.classList.add('correct');
    }

    nextBtn.classList.remove('hidden');
    updateProgress();
  }

  function updateProgress() {
    const percent = Math.round((current / quiz.length) * 100);
    if (progressFill) progressFill.style.width = `${percent}%`;
  }

  function nextQuestion() {
    current++;
    if (current >= quiz.length) {
      endQuiz();
      return;
    }
    showQuestion();
    updateProgress();
  }

  function endQuiz() {
    quizScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    scoreEl.textContent = `You scored ${score} / ${quiz.length}`;
    progressFill.style.width = '100%';
  }

  startBtn.addEventListener('click', startQuiz);
  nextBtn.addEventListener('click', nextQuestion);
  restartBtn.addEventListener('click', startQuiz);
});