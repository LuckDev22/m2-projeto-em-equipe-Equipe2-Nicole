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
            localStorage.setItem("TokenLogin", response.token)
            setTimeout(() =>{
                // window.location.assign("../Pages/myAdoptions/index.html")
            },4000)
        })
        return response
    } catch (err) {
        console.log(err)
    }
}

export async function getAllPets() {
    const user = localStorage.getItem('TokenLogin')
    try {
        const request = await fetch(baseUrl + "pets", {
            method: "GET",
            headers: {
                'Authorization': "Bearer " + user,
            },
        })
        const response = await request.json().then((response) => {
            console.log(response)
            return response
        })
        return response
    } catch (err) {
        console.log(err)
    }
}

export async function deletePet(id) {
    const user = localStorage.getItem('TokenLogin')
    try {
        const request = await fetch(baseUrl + "pets/" + id, {
            method: "DELETE",
            headers: {
                'Authorization': "Bearer " + user,
            },
        })
        const response = await request.json().then((response) => {
            console.log(response)
            return response
        })
        return response
    } catch (err) {
        console.log(err)
    }
}

export async function adotePet(body) {
    const user = localStorage.getItem('TokenLogin')
    try {
        const request = await fetch(baseUrl + "adoptions", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + user,
            },
            body: JSON.stringify(body)
        })
        const response = await request.json().then((response) => {
            console.log(response)
            return response
        })
        return response
    } catch (err) {
        console.log(err)
    }
}

