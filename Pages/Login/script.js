import { login } from "../../Scripts/api.js";

export function loginUser() {
    const formLogin = document.getElementById("login");
    formLogin.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log(event)
        const body = {
            email: event.target.children[0].value,
            password: event.target.children[1].value,
        };
        console.log(body)
        login(body)
    });
}


loginUser()