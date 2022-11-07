const baseUrl = 'https://m2-api-adot-pet.herokuapp.com/'

export async function login(body) {
    try {
        const request = await fetch(baseUrl + "session/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
        const response = await request.json().then((response) => {
            console.log(response)
            window.location.assign("../Pages/myAdoptions/index.html")
            localStorage.setItem("TokenLogin", response.token)
        })
        return response
    } catch (err) {
        console.log(err)
    }
}


