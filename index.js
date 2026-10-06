const theme = document.querySelector("#theme-toggle")


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

current = "5";
previous = "12";
operator = "+";
updateDisplay();
