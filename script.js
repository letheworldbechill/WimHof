const instructions = [
    { text: "Tief Einatmen", duration: 4000 },
    { text: "Loslassen", duration: 4000 },
];

const holdBreath = { text: "Luft anhalten", duration: 30000 };
const recoveryBreath = { text: "Tief einatmen & halten", duration: 15000 };

const cycles = 3;
const breathsPerCycle = 30;

let currentCycle = 0;
let currentBreath = 0;
let interval;
const instruction = document.getElementById("instruction");
const breathCycle = document.getElementById("breathCycle");
const startButton = document.getElementById("startButton");

function startBreathing() {
    startButton.disabled = true;
    currentCycle = 0;
    runCycle();
}

function runCycle() {
    if (currentCycle >= cycles) {
        instruction.textContent = "Fertig! Gut gemacht!";
        startButton.disabled = false;
        return;
    }
    currentBreath = 0;
    instruction.textContent = `Zyklus ${currentCycle + 1}`;
    runBreaths();
}

function runBreaths() {
    if (currentBreath >= breathsPerCycle) {
        instruction.textContent = holdBreath.text;
        breathCycle.textContent = "";
        setTimeout(() => {
            instruction.textContent = recoveryBreath.text;
            setTimeout(() => {
                currentCycle++;
                runCycle();
            }, recoveryBreath.duration);
        }, holdBreath.duration);
        return;
    }

    let i = 0;
    function nextBreath() {
        if (i >= instructions.length) {
            currentBreath++;
            runBreaths();
            return;
        }
        breathCycle.textContent = instructions[i].text;
        setTimeout(() => {
            i++;
            nextBreath();
        }, instructions[i].duration);
    }
    nextBreath();
}

startButton.addEventListener("click", startBreathing);
