const loadClasses = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((json) => displayLessons(json.data));
};
const removeActiveClass = () => {
  const buttons = document.querySelectorAll(".lessons-button");
  buttons.forEach((button) => button.classList.remove("active"));
};
const loadWords = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      removeActiveClass();

      const clickedBtn = document.getElementById(`lesson-btn-${id}`);
      clickedBtn.classList.add("active");
      displayWords(json.data);
    });
};

const loadWordDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => displayWordDetails(json.data));
};

const displayWordDetails = (word) => {
  const wordDetailsContainer = document.getElementById("details-container");
  wordDetailsContainer.innerHTML = `
    <div class="  rounded-xl text-center py-10 px-5 bg-[#ffffff] space-y-5">
        <h2 class="text-xl font-bold font-bangla text-left">${word.word}</h2>
        <p class="text-sm font-medium text-black text-left">Meaning</p>
        <p class="text-md font-medium font-bangla text-gray-500 text-left">${word.meaning}</p>
        <p class="text-sm font-medium text-black text-left">Example</p>
        <p class="text-md font-medium font-bangla text-gray-500 text-left">${word.example}</p>
        <p class="text-sm font-bold text-black text-left">সমার্থক শব্দ গুলো</p>
        <div class="text-md font-bold text-gray-500 font-bangla">
           
        
        </div>
        <button class="btn  rounded-1 ">Complete Learning</button>
    </div>
  `;
  document.getElementById("my_modal_5").showModal();
};

const displayWords = (words) => {
  const wordsContainer = document.getElementById("word-container");
  wordsContainer.innerHTML = "";
  if (words.length === 0) {
    wordsContainer.innerHTML = `
        <div class="rounded-2xl bg-sky-100 text-center col-span-full space-y-5 p-5 ">
        <img class="w-40 mx-auto" src="./assets/alert-error.png" alt="Empty">
            <p class="font-bangla text-[13.38px] font-regular text-[#79716b]">
                এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <p class="font-bangla text-[34.38px] font-medium text-[#292524]">
                নেক্সট Lesson এ যান
            </p>
        </div>
        `;
    return;
  }
  for (const word of words) {
    // console.log(word);
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
            <div class="rounded-xl text-center py-10 px-5 bg-[#ffffff] space-y-5">
                <h2 class="text-xl font-bold font-bangla">${word.word}</h2>
                <p class="text-sm font-medium text-gray-500">Meaning / Pronunciation</p>
                <div class="text-md font-bold text-gray-500 font-bangla">
                   "${word.meaning}/${word.pronunciation}"
                </div>
                <div class="flex justify-center items-center w-11/12 mx-auto gap-70">
                    <button onclick="loadWordDetails(${word.id})" class="btn  rounded-1"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn  rounded-1"><i class="fa-solid fa-volume-up"></i></button>
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
        <button id="lesson-btn-${lesson.level_no}" onClick="loadWords(${lesson.level_no})" class="btn btn-outline btn-primary rounded-1 lessons-button"><i
            class="fa-solid fa-book"></i>Lesson-${lesson.level_no}</button>
            `;
    buttonsLevel.appendChild(buttonDiv);
  }
};
// loadWords();
loadClasses();
