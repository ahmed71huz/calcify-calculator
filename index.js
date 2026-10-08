const theme = document.querySelector("#theme-toggle")
const numberButtons = document.querySelectorAll("[data-number]");
const decimalBtn = document.querySelector('[data-action="decimal"]');
const clearBtn = document.querySelector('[data-action="clear"]');
const deleteBtn = document.querySelector('[data-action="delete"]');
const operatorBtn = document.querySelectorAll("[data-operator]");
const equalsBtn = document.querySelector('[data-action="equals"]');




theme.addEventListener("click", () => {
    document.body.classList.toggle("light");
    theme.setAttribute("aria-pressed", document.body.classList.contains("light"));
});
let current = ""
let previous = ""
let operator = ""
let history = []
let justCalculated = false   // true right after "=", so the next number starts fresh
const historyEl = document.querySelector(".history")
const currentEl = document.querySelector("#current")
const previousEl = document.querySelector("#previous")




function calculate() {
    if (previous === "" || current === "") {
        return;
    }
    const a = Number(previous)
    const b = Number(current)
    let result;
    if (operator === "/" && b === 0) {
        clearAll()
        currentEl.textContent = "Can't divide by 0"
        return;
    }
    switch (operator) {
        case "+":
            result = a + b
            break;
        case "-":
            result = a - b
            break;
        case "*":
            result = a * b
            break;
        case "/":
            result = a / b
            break;
    }
    history.unshift(`${a} ${operator} ${b} = ${result}`);
    history = history.slice(0, 5);
    renderHistory();
    current = String(result)
    previous = ""
    operator = ""
    justCalculated = true
    updateDisplay()
}
function deleteNum() {
    current = current.slice(0, -1)
    updateDisplay()

}

equalsBtn.addEventListener("click", calculate);
clearBtn.addEventListener("click", clearAll);
deleteBtn.addEventListener("click", deleteNum);
decimalBtn.addEventListener("click", addDecimal);

function clearAll() {
    previous = ""
    current = ""
    operator = ""
    justCalculated = false
    updateDisplay()
}
function chooseOperator(op) {
    if (current === "") {
        return;
    }
    if (previous !== "") {
        calculate();
    }
    operator = op
    previous = current
    current = ""
    justCalculated = false
    updateDisplay()
}



function renderHistory(){
    historyEl.innerHTML = ""
    history.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        historyEl.appendChild(li);
    });
}
function updateDisplay() {
    currentEl.textContent = current || "0";
    previousEl.textContent = previous + " " + operator;
}
function appendNumber(num) {
    if (justCalculated) {
        current = ""
        justCalculated = false
    }
    current += num;
    updateDisplay();
}

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        appendNumber(button.dataset.number);
    });
});
function addDecimal() {
        if (justCalculated) {
            current = ""
            justCalculated = false
        }
        if (current.includes(".")) {
            return;

        }
        if (current === "") {
            current = "0."
        }
        else {
            current += "."

        }
        updateDisplay()

}


operatorBtn.forEach((button) => {
    button.addEventListener("click", () => {
        chooseOperator(button.dataset.operator);
    })
})
document.addEventListener("keydown", (event) => {
    if ("0123456789".includes(event.key)){
        event.preventDefault(); 
        appendNumber(event.key)
    }
    else if(event.key ==="."){
        event.preventDefault(); 
        addDecimal()
    }
    else if ("+-/*".includes(event.key)){
        event.preventDefault(); 
        chooseOperator(event.key)
    }
    else if (event.key ==="Enter" || event.key === "="){
        event.preventDefault(); 
        calculate();
    }
    else if (event.key === "Backspace"){
        event.preventDefault(); 
        deleteNum()
    }
    else if (event.key === "Escape"){
        event.preventDefault(); 
        clearAll()

    }
});
