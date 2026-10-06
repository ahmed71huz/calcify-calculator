const theme = document.querySelector("#theme-toggle")
const numberButtons = document.querySelectorAll("[data-number]");

theme.addEventListener("click", () =>  {
    document.body.classList.toggle("light");
    theme.textContent = document.body.classList.contains("light") ? "🌙" : "☀️"; 
});


let current  = ""
let previous =""
let operator = ""

const currentEl =document.querySelector("#current")
const previousEl =document.querySelector("#previous")

function updateDisplay(){
    currentEl.textContent = current || "0";
    previousEl.textContent = previous + " " + operator;
}

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        current += button.dataset.number;                                   // يجيب اللي داخل البوكس مثل الbutton 
        updateDisplay();
    });
});
