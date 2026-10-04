const theme = document.querySelector("#theme-toggle")


theme.addEventListener("click", () =>  {
    document.body.classList.toggle("light");
    theme.textContent = document.body.classList.contains("light") ? "🌙" : "☀️"; 
});
