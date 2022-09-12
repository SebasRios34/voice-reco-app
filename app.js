//obtain html elements
const button = document.querySelector("#startListeningButton");
const copyButton = document.getElementById("copyTextButton");
const recognizedContent = document.getElementById("recognizedContent");

//obtain timer html elements and initialize properties
const appendTens = document.getElementById("tens");
const appendSeconds = document.getElementById("seconds");
var seconds = 00;
var tens = 00;
var Interval;

//importing SpeechRecognition libraries
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

//function which starts timer
const startTimer = () => {
  tens++;

  if (tens <= 9) {
    appendTens.innerHTML = "0" + tens;
  }

  if (tens > 9) {
    appendTens.innerHTML = tens;
  }

  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }

  if (seconds > 9) {
    appendSeconds.innerHTML = seconds;
  }
};

//obtain and visualize recognized text
recognition.onresult = (event) => {
  const current = event.resultIndex;
  console.log(current);

  const transcript = event.results[current][0].transcript;
  console.log(transcript);

  recognizedContent.textContent = transcript;

  //auto-resizable textarea
  recognizedContent.style.height = "auto";
  recognizedContent.style.height = `${recognizedContent.scrollHeight}px`;

  copyButton.style.display = "inline-block";

  //stops timer
  clearInterval(Interval);
};

//trigger listening event
button.addEventListener("click", () => {
  recognizedContent.textContent = "Listening...";

  //resets timer
  clearInterval(Interval);
  tens = "00";
  seconds = "00";
  appendTens.innerHTML = tens;
  appendSeconds.innerHTML = seconds;

  //starts timer
  clearInterval(Interval);
  Interval = setInterval(startTimer, 10);

  recognition.start();
});

//copy recognized text
copyButton.addEventListener("click", () => {
  console.log(recognizedContent.value);

  navigator.clipboard.writeText(recognizedContent.value);
});

//auto-size textarer
recognizedContent.style.cssText = `height: ${recognizedContent.scrollHeight}px; overflow-y: hidden`;
