const theme = document.querySelector("#theme-toggle")
const numberButtons = document.querySelectorAll("[data-number]");
const decimalBtn = document.querySelector('[data-action="decimal"]');
const clearBtn = document.querySelector('[data-action="clear"]');
const deleteBtn = document.querySelector('[data-action="delete"]');
const operatorBtn = document.querySelectorAll("[data-operator]");




theme.addEventListener("click", () => {
    document.body.classList.toggle("light");
    theme.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
});
let current = ""
let previous = ""
let operator = ""

const currentEl = document.querySelector("#current")
const previousEl = document.querySelector("#previous")

function deleteNum() {
    current = current.slice(0, -1)
    updateDisplay()

}
clearBtn.addEventListener("click", clearAll);
deleteBtn.addEventListener("click", deleteNum);
function clearAll() {
    previous = ""
    current = ""
    operator = ""
    updateDisplay()
}
function chooseOperator(op) {
    if (current === "") {
        return;
    }
    operator = op
    previous = current
    current = ""
    updateDisplay()
}


function updateDisplay() {
    currentEl.textContent = current || "0";
    previousEl.textContent = previous + " " + operator;
}

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        current += button.dataset.number;                                   // يجيب اللي داخل البوكس مثل الbutton 
        updateDisplay();
    });
});
operatorBtn.forEach((button) => {
    button.addEventListener("click", () => {
        chooseOperator(button.dataset.operator);
    })
})


decimalBtn.addEventListener("click", () => {
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

});