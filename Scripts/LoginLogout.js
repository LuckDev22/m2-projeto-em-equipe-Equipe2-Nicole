export const verifyLogin = () => {
    const user = localStorage.getItem('TokenLogin') || ""
    console.log(user);
    if (user == "" || user == null|| user == 'undefined') {
        window.location.replace("../login/index.html");
    }
};

export const logout = () => {
    const btnLogout = document.getElementById('btnLogout')
    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('TokenLogin')
        setTimeout(() => {
            window.location.replace("../login/index.html");
        }, 3300);
    })
}

const body = document.querySelector('body')
export function lockScroll() {
    window.scroll(0, 0)
    body.style.overflow = 'hidden'
}

export function unlockScroll() {
    body.style.overflow = 'auto'
}
