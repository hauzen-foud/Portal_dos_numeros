'use strict';

const questions = [
  {
    topic: '🔢 OPERAÇÕES',
    question: 'Quanto é 8 × 7?',
    hint: 'Pense na tabuada do 8.',
    answers: ['54', '56', '64', '48'],
    correct: '56',
    explanation: 'Isso! 8 × 7 = 56. A tabuada é uma ótima aliada!'
  },
  {
    topic: '➕ ADIÇÃO',
    question: 'Qual é o resultado de 245 + 137?',
    hint: 'Some as unidades, dezenas e centenas.',
    answers: ['372', '382', '392', '362'],
    correct: '382',
    explanation: 'Muito bem! 245 + 137 = 382.'
  },
  {
    topic: '🍕 FRAÇÕES',
    question: 'Uma pizza foi dividida em 8 fatias iguais. Você comeu 3. Que fração representa as fatias comidas?',
    hint: 'O número de baixo indica o total de partes iguais.',
    answers: ['3/8', '5/8', '8/3', '3/5'],
    correct: '3/8',
    explanation: 'Acertou! Foram 3 fatias de um total de 8: isso é 3/8.'
  },
  {
    topic: '📏 GEOMETRIA',
    question: 'Quantos lados tem um hexágono?',
    hint: 'O prefixo “hexa” significa seis.',
    answers: ['5 lados', '7 lados', '6 lados', '8 lados'],
    correct: '6 lados',
    explanation: 'Correto! Todo hexágono tem 6 lados.'
  },
  {
    topic: '✖️ MULTIPLICAÇÃO',
    question: 'Uma caixa tem 6 lápis. Quantos lápis há em 4 caixas iguais?',
    hint: 'Você pode somar 6 + 6 + 6 + 6 ou multiplicar.',
    answers: ['20 lápis', '24 lápis', '18 lápis', '26 lápis'],
    correct: '24 lápis',
    explanation: 'Boa! 4 caixas × 6 lápis = 24 lápis.'
  },
  {
    topic: '🔍 DIVISÃO',
    question: 'Quanto é 72 ÷ 9?',
    hint: 'Qual número multiplicado por 9 resulta em 72?',
    answers: ['7', '9', '6', '8'],
    correct: '8',
    explanation: 'Isso mesmo! 72 ÷ 9 = 8, porque 9 × 8 = 72.'
  },
  {
    topic: '💰 NÚMEROS DECIMAIS',
    question: 'Uma borracha custa R$ 2,50. Quanto custam 2 borrachas?',
    hint: 'Some R$ 2,50 duas vezes.',
    answers: ['R$ 4,00', 'R$ 5,00', 'R$ 5,50', 'R$ 3,50'],
    correct: 'R$ 5,00',
    explanation: 'Perfeito! R$ 2,50 + R$ 2,50 = R$ 5,00.'
  },
  {
    topic: '🧩 MÚLTIPLOS',
    question: 'Qual destes números é múltiplo de 5?',
    hint: 'Os múltiplos de 5 terminam em 0 ou 5.',
    answers: ['32', '43', '55', '68'],
    correct: '55',
    explanation: 'Exato! 55 = 5 × 11, então é múltiplo de 5.'
  },
  {
    topic: '📐 PERÍMETRO',
    question: 'Um quadrado tem lados de 4 cm. Qual é seu perímetro?',
    hint: 'Perímetro é a soma das medidas de todos os lados.',
    answers: ['8 cm', '12 cm', '16 cm', '20 cm'],
    correct: '16 cm',
    explanation: 'Muito bem! O quadrado tem 4 lados: 4 + 4 + 4 + 4 = 16 cm.'
  },
  {
    topic: '🧠 RACIOCÍNIO',
    question: 'Qual número completa a sequência: 5, 10, 15, 20, __?',
    hint: 'Observe quanto é acrescentado a cada etapa.',
    answers: ['22', '24', '25', '30'],
    correct: '25',
    explanation: 'Você conseguiu! A sequência aumenta de 5 em 5. O próximo número é 25.'
  }
];

const startScreen = document.querySelector('#start-screen');
const quizScreen = document.querySelector('#quiz-screen');
const resultScreen = document.querySelector('#result-screen');

const startButton = document.querySelector('#start-button');
const quitButton = document.querySelector('#quit-button');
const restartButton = document.querySelector('#restart-button');
const homeButton = document.querySelector('#home-button');

const scoreValue = document.querySelector('#score-value');
const livesElement = document.querySelector('#lives');

const questionCount = document.querySelector('#question-count');
const progressPercent = document.querySelector('#progress-percent');
const progressTrack = document.querySelector('#progress-track');
const progressFill = document.querySelector('#progress-fill');

const topicBadge = document.querySelector('#topic-badge');
const questionTitle = document.querySelector('#question-title');
const questionHint = document.querySelector('#question-hint');

const answersElement = document.querySelector('#answers');
const feedbackElement = document.querySelector('#feedback');
const nextButton = document.querySelector('#next-button');

let currentQuestion = 0;
let score = 0;
let lives = 3;
let correctAnswers = 0;
let answered = false;
let questionsPlayed = 0;
let bestScore = readBestScore();

function readBestScore() {
  try {
    return Number(localStorage.getItem('missaoMatematicaBest') || 0);
  } catch (error) {
    return 0;
  }
}

function saveBestScore(value) {
  try {
    localStorage.setItem('missaoMatematicaBest', String(value));
  } catch (error) {
    // O jogo continua funcionando mesmo quando o navegador bloqueia o armazenamento.
  }
}

function showScreen(screenToShow) {
  [startScreen, quizScreen, resultScreen].forEach((screen) => {
    screen.hidden = screen !== screenToShow;
  });
}

function startGame() {
  currentQuestion = 0;
  score = 0;
  lives = 3;
  correctAnswers = 0;
  questionsPlayed = 0;
  answered = false;

  scoreValue.textContent = '0';

  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  const item = questions[currentQuestion];

  answered = false;

  topicBadge.textContent = item.topic;
  questionTitle.textContent = item.question;
  questionHint.textContent = item.hint;

  questionCount.textContent =
    `DESAFIO ${String(currentQuestion + 1).padStart(2, '0')} / ${questions.length}`;

  progressPercent.textContent =
    `${Math.round((currentQuestion / questions.length) * 100)}%`;

  progressFill.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  progressTrack.setAttribute('aria-valuenow', String(currentQuestion));

  renderLives();

  answersElement.replaceChildren();

  feedbackElement.hidden = true;
  feedbackElement.className = 'feedback';

  nextButton.hidden = true;
  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? 'Ver resultado →'
      : 'Continuar →';

  const shuffledAnswers = [...item.answers].sort(() => Math.random() - 0.5);

  shuffledAnswers.forEach((answer, index) => {
    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'answer-button';

    button.innerHTML = `
      <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
      <span></span>
    `;

    button.querySelector('span:last-child').textContent = answer;

    button.addEventListener('click', () => {
      selectAnswer(button, answer, item);
    });

    answersElement.append(button);
  });
}

function renderLives() {
  const hearts = [...livesElement.children];

  hearts.forEach((heart, index) => {
    heart.classList.toggle('lost', index >= lives);
  });

  livesElement.setAttribute(
    'aria-label',
    `${lives} ${lives === 1 ? 'vida restante' : 'vidas restantes'}`
  );
}

function selectAnswer(selectedButton, answer, item) {
  if (answered) return;

  answered = true;
  questionsPlayed += 1;

  const isCorrect = answer === item.correct;

  [...answersElement.querySelectorAll('button')].forEach((button) => {
    button.disabled = true;

    const label = button.querySelector('span:last-child').textContent;

    if (label === item.correct) {
      button.classList.add('correct');
    }
  });

  if (isCorrect) {
    score += 100;
    correctAnswers += 1;

    scoreValue.textContent = String(score);

    feedbackElement.textContent =
      `✨ ${item.explanation} +100 pontos!`;

    feedbackElement.classList.add('good');
  } else {
    lives = Math.max(0, lives - 1);

    renderLives();

    selectedButton.classList.add('incorrect');

    feedbackElement.textContent =
      `💜 Quase! A resposta certa é “${item.correct}”. ${item.explanation}`;

    feedbackElement.classList.add('bad');
  }

  feedbackElement.hidden = false;

  progressPercent.textContent =
    `${Math.round(((currentQuestion + 1) / questions.length) * 100)}%`;

  progressFill.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  progressTrack.setAttribute(
    'aria-valuenow',
    String(currentQuestion + 1)
  );

  nextButton.textContent =
    lives === 0 || currentQuestion === questions.length - 1
      ? 'Ver resultado →'
      : 'Continuar →';

  nextButton.hidden = false;
  nextButton.focus({ preventScroll: true });
}

function nextQuestion() {
  if (!answered) return;

  if (lives === 0 || currentQuestion >= questions.length - 1) {
    finishGame();
    return;
  }

  currentQuestion += 1;

  renderQuestion();

  questionTitle.focus?.({ preventScroll: true });
}

function finishGame() {
  const accuracy = questionsPlayed
    ? Math.round((correctAnswers / questionsPlayed) * 100)
    : 0;

  const completedAll =
    currentQuestion === questions.length - 1 && lives > 0;

  document.querySelector('#final-score').textContent = String(score);

  document.querySelector('#correct-count').textContent =
    `${correctAnswers}/${questionsPlayed}`;

  document.querySelector('#accuracy-value').textContent =
    `${accuracy}%`;

  document.querySelector('#lives-left').textContent =
    String(lives);

  document.querySelector('#result-emoji').textContent =
    score >= 800 ? '🏆' : score >= 500 ? '🚀' : '🌟';

  document.querySelector('#result-title').textContent =
    score >= 800
      ? 'Você arrasou!'
      : score >= 500
        ? 'Mandou muito bem!'
        : 'Boa tentativa!';

  let message;

  if (completedAll && score >= 800) {
    message =
      'Você completou a missão com uma pontuação incrível. Continue explorando a Matemática!';
  } else if (lives === 0) {
    message =
      'Suas vidas acabaram, mas todo desafio ensina alguma coisa. Tente mais uma vez!';
  } else {
    message =
      'Missão concluída! Pratique mais um pouco e veja sua pontuação crescer.';
  }

  document.querySelector('#result-message').textContent = message;

  if (score > bestScore) {
    bestScore = score;
    saveBestScore(bestScore);
  }

  document.querySelector('#best-score-line').textContent =
    `🏅 Seu melhor resultado: ${bestScore} pontos`;

  showScreen(resultScreen);
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

homeButton.addEventListener('click', () => {
  showScreen(startScreen);
});

quitButton.addEventListener('click', () => {
  showScreen(startScreen);
});

nextButton.addEventListener('click', nextQuestion);
