// IMPORTANT: The way to read this code and instructions/questions is from bottom up.
// So go to the end of the file and start from there

const setupTimerButtonElement = document.querySelector("#setup-timer-button");
const timerImageElement = document.querySelector("#timer-image");
const timerDisplayAreaElement = document.querySelector("#timer-display");

const timerSettingsElements = document.querySelectorAll(
    ".timer__button, .timer__input"
);

const minutesElement = document.querySelector("#minutes");
const secondsElement = document.querySelector("#seconds");

const setTimerButtonTopBarElement = document.querySelector(
    "#set-timer-button-top-bar"
);

const setTimerButtonBottomBarElement = document.querySelector(
    "#set-timer-button-bottom-bar"
);

const setTimerButtonRightBarElement = document.querySelector(
    "#set-timer-button-right-bar"
);

const relaxingMusic = new Audio("assets/timer-sound.mp3");
relaxingMusic.loop = true;

let timerSetTimeoutId;

let musicSetTimeoutId;

const setTimerAsDone = function () {
    timerDisplayAreaElement.textContent = "Done";
    stopTimer();
};

/* 10.

    10.1. Explain the goal of "displayTime" function?


    10.2. What steps is it taking to achieve its goal?

*/
const displayTime = function (remainingMinutes, remainingSeconds) {
    let timeDisplayed = "";

    if (remainingMinutes < 10) {
        timeDisplayed += "0";
    }

    timeDisplayed += `${remainingMinutes}:`;

    // 10.3. Why is this function checking less than 10?
    // is it necessary?
    //
    if (remainingSeconds < 10) {
        timeDisplayed += "0";
    }

    timeDisplayed += remainingSeconds;

    timerDisplayAreaElement.textContent = timeDisplayed;
};

/* 9.

    9.1. Explain "calculateTime" function and the steps it takes to 'calculate time'


    9.2 Why is "calculateTime" function CRUCIALLY IMPORTANT? what is its ultimate goal?

*/
const calculateTime = function (time) {
    if (time === 0) {
        setTimerAsDone();
        clearTimeout(timerSetTimeoutId);
        return;
    }

    // 9.3. What are the next two (84 and 85) lines trying to achieve?
    //
    const remainingMinutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;

    displayTime(remainingMinutes, remainingSeconds);

    time--;

    // 9.4. Why do we need the following line (95) in the code?
    //
    // What will happen if the next line is removed from the code?
    //
    timerSetTimeoutId = setTimeout(calculateTime, 1000, time);
};

const setTimerMusic = function () {
    if (musicSetTimeoutId) {
        relaxingMusic.play();
    } else {
        musicSetTimeoutId = setTimeout(function () {
            relaxingMusic.play();
        }, 1000);
    }
};

/* 8. 

    8.1. Explain switchTimerSettingsTo function

    8.2. What are the steps it takes to 'switchSettings'?

*/
const switchTimerSettingsTo =
    function toggleTimerSettingsBetweenEnableAndDisable(type) {
        // 8.3. Why do we need "type"? are we reusing this function?
        //
        if (!type) {
            throw new Error(
                `Expected string 'enable' or 'disable', got ${typeof type}`
            );
        }

        for (let i = 0; i < timerSettingsElements.length; i++) {
            const timerSettingElement = timerSettingsElements[i];
            if (type === "disable") {
                timerSettingElement.disabled = true;
            }

            if (type === "enable") {
                timerSettingElement.disabled = false;
            }
        }
    };

const getTotalTime = function (minutes, seconds) {
    return minutes * 60 + seconds;
};

/* 7.

  7.1. What are the steps that this function takes to achieve the goal of 'starting the timer'?


  7.2. This  function is important because...

 */
const startTimer = function (minutesInput, secondsInput) {
    // 7.3. What is "valueAsNumber", do all htmlElements objects have this property? Explain.
    //
    const minutes = minutesInput.valueAsNumber;
    const seconds = secondsInput.valueAsNumber;
    const totalTime = getTotalTime(minutes, seconds);

    // 7.4. What the next three lines (160, 161, and 162) are trying to achieve?
    //
    // 7.5. What does rotate to square mean?
    //
    setTimerButtonRightBarElement.classList.add("fade-in");
    setTimerButtonTopBarElement.classList.add("rotate-to-square");
    setTimerButtonBottomBarElement.classList.add("rotate-to-square");

    // 7.6. What specific elements in html are we trying to affect in the next two lines (166 and 167)?
    //
    timerDisplayAreaElement.classList.add("timer-running");
    timerImageElement.classList.add("image-move");

    switchTimerSettingsTo("disable");

    setTimerMusic();

    calculateTime(totalTime);
};

const validateInputs = function validatesTimerInputs(
    minutesInput,
    secondsInput
) {
    const areMinutesValid = minutesInput.checkValidity();
    const areSecondsValid = secondsInput.checkValidity();

    if (!areMinutesValid) {
        minutesInput.reportValidity();
        throw new Error("No valid minutes provided");
    }

    if (!areSecondsValid) {
        secondsInput.reportValidity();
        throw new Error("No valid seconds provided");
    }
};

const isTimerRunning = function () {
    return document.querySelector(".timer-running");
};

/* 6.

  6.1. Describe below the steps this function takes to achieve 'stoping the timer'.


 */
const stopTimer = function () {
    timerDisplayAreaElement.classList.remove("timer-running");
    timerImageElement.classList.remove("image-move");

    clearTimeout(timerSetTimeoutId);

    relaxingMusic.pause();

    // 6.2. What specific elements are being affected when we remove these classes and 'stop' the timer?
    //
    // 6.3. Why are we removing these classes?
    //
    setTimerButtonRightBarElement.classList.remove("fade-in");
    setTimerButtonTopBarElement.classList.remove("rotate-to-square");
    setTimerButtonBottomBarElement.classList.remove("rotate-to-square");

    switchTimerSettingsTo("enable");
};

/* 5.

  5.1. The only job of "setTimer" function is ...


  5.2. "setTimer" function is important because...

 */
const setTimer = function () {
    if (isTimerRunning()) {
        stopTimer();
        return;
    }

    validateInputs(minutesElement, secondsElement);

    startTimer(minutesElement, secondsElement);
};

/* 4.

  4.1. "adjustTimer" function is in charge of...


  4.2. "adjustTimer" function is important because...

 */
const adjustTimer = function (event) {
    const eventId = event.target.id;
    switch (eventId) {
        case "button-minutes-up":
            minutesElement.stepUp();
            break;
        case "button-minutes-down":
            minutesElement.stepDown();
            break;
        case "button-seconds-up":
            secondsElement.stepUp();
            break;
        case "button-seconds-down":
            secondsElement.stepDown();
    }
};

/* 3. 
  3.1. "setEventListeners " function is in charge of...

  3.2. "setEventListeners" function is important because...

 */
const setEventListeners = function () {
    setupTimerButtonElement.addEventListener("click", setTimer);

    // 3.3. In this loop, we are trying to ...
    //
    const timerSettingsElementsLength = timerSettingsElements.length;
    for (let i = 0; i < timerSettingsElementsLength; i++) {
        const settingElement = timerSettingsElements[i];

        // 3.4. What is a tagName?
        //
        const { tagName } = settingElement;

        // 3.5. Do all HTML elements have a tagName property?
        //
        if (tagName === "BUTTON") {
            settingElement.addEventListener("click", adjustTimer);
        }
    }
};

const app = function () {
    setEventListeners();
};

// 1. First get familiar with the SELECTORS of this app and what elements they are selecting before moving on to understand
// what this code is doing.
//
// How many and what elements are we selecting at the top of the file?
//
//
//
//
//
//
// 2. Describe the reason why we are calling this function "app" at the end of the file?
// what is its purpose?
//
app();
