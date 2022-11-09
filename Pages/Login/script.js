import { login } from "../../scripts/api.js";


const btnLogin = document.getElementById("btnLoginPage")
const inputUser = document.getElementById("email")
const inputPassword = document.getElementById("password")

export function loginUser() {
    const formLogin = document.getElementById("login");
    formLogin.addEventListener("submit", (event) => {
        event.preventDefault();
        const body = {
            email: event.target.children[0].value,
            password: event.target.children[1].value,
        };
        login(body, btnLogin, inputUser, inputPassword)
    });
}

loginUser()

function buttonDisableSpiner() {
    
    
    const spiner = document.getElementById("spiner")

    inputPassword.addEventListener('input', (event) => {
        if (inputUser.value != "" && inputPassword.value != "") {
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