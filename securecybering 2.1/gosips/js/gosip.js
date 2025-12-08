document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("container");
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";

    const toLogin = document.getElementById("toLogin");
    const toRegister = document.getElementById("toRegister");

    toLogin.addEventListener("click", () => {
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
        clearErrors();
    });
    toRegister.addEventListener("click", () => {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("registerForm").style.display = "block";
        clearErrors();
    });

