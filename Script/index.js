const loadClasses = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((json) => displayLessons(json.data));
};
const loadWords = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => displayWords(json.data));
};

const displayWords = (words) => {
  const wordsContainer = document.getElementById("word-container");
  wordsContainer.innerHTML = "";
  for (const word of words) {
    // console.log(word);
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
            <div class="rounded-xl text-center py-10 px-5 bg-amber-900">
                <h2>${word.word}</h2>
                <p>${word.pronunciation}</p>
                <div>
                    ${word.meaning}
                </div>
            </div>
        `;
    wordsContainer.appendChild(wordDiv);
  }
};

const displayLessons = (lessons) => {
  const buttonsLevel = document.getElementById("buttons-level");
  buttonsLevel.innerHTML = "";
  for (const lesson of lessons) {
    const buttonDiv = document.createElement("button");
    buttonDiv.innerHTML = `
        <button onClick="loadWords(${lesson.level_no})" class="btn btn-outline btn-primary rounded-1"><i
            class="fa-solid fa-book"></i>Lesson-${lesson.level_no}</button>
            `;
    buttonsLevel.appendChild(buttonDiv);
  }
};
loadWords();
loadClasses();
