

interface FlashCard {
  questionText: string;
  questionAnswer: string;
}

class InvalidUserInputError extends Error {
  constructor() {
    super("Invalid user input");
    this.name = "InvalidUserInputError";
  }
}

const currentCards: FlashCard[] = [
  {
    questionText: "Question one",
    questionAnswer: "Answer one",
  },
  {
    questionText: "Question two",
    questionAnswer: "Answer two",
  },
];

let currentCardIndex = currentCards.length - 1;

const flashcard = document.getElementById("flashcard") as HTMLElement;
const deleteButton = document.getElementById("delete-btn") as HTMLButtonElement;
const entryForm = document.getElementById("entry-form") as HTMLFormElement;
const frontText = document.getElementById("front-text") as HTMLTextAreaElement;
const backText = document.getElementById("back-text") as HTMLTextAreaElement;

function renderCard(): void {
  const card = currentCards[currentCardIndex];

  if (!card) {
    flashcard.textContent = "";
    return;
  }

  flashcard.className = "flashcard";

  flashcard.innerHTML = `
    <div>${card.questionText}</div>
    <div>${card.questionAnswer}</div>
  `;
}

flashcard.onclick = function () {
  flashcard.classList.add("flipped");
};

deleteButton.onclick = function () {
  currentCards.pop();
  currentCardIndex = currentCards.length - 1;

  if (currentCardIndex < 0) {
    currentCardIndex = 0;
  }

  renderCard();
};

entryForm.onsubmit = function (event) {
  event.preventDefault();

  const questionText = frontText.value;
  const questionAnswer = backText.value;

  if (questionText === "" || questionAnswer === "") {
    throw new InvalidUserInputError();
  }

  currentCards.push({
    questionText: questionText,
    questionAnswer: questionAnswer,
  });

  currentCardIndex = currentCards.length - 1;

  frontText.value = "";
  backText.value = "";

  renderCard();
};

renderCard();