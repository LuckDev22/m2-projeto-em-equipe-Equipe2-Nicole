export const verifyLogin = () => {
    const user = localStorage.getItem('TokenLogin') || ""
    if (user == "" || user == null) {
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