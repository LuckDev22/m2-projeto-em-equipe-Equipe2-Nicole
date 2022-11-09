import { login } from "../../Scripts/api.js";


const btnLogin = document.getElementById("btnLoginPage")

export function loginUser() {
    const formLogin = document.getElementById("login");
    formLogin.addEventListener("submit", (event) => {
        event.preventDefault();
        const body = {
            email: event.target.children[0].value,
            password: event.target.children[1].value,
        };
        login(body, btnLogin)
    });
}

loginUser()

function buttonDisableSpiner() {
    const inputUser = document.getElementById("email")
    const inputPassword = document.getElementById("password")
    
    const spiner = document.getElementById("spiner")

    inputPassword.addEventListener('input', (event) => {
        if (inputUser.value.length && inputPassword.value.length) {
            event.preventDefault()
            btnLogin.disabled = false
        }
    })

    btnLogin.addEventListener("click", () => {
        btnLogin.innerText = ""
        spiner.classList = "imgLoading fa-solid fa-spinner"
        btnLogin.append(spiner)
    })
}

buttonDisableSpiner()