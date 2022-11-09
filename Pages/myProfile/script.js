import {
  getMyAdoptions,
  getMyProfile,
  deleteMyAdoption,
  editMyPets,
  deleteMyProfile,
  deleteMyPet,
  editMyProfile,
  getAllMyPets,
  createPet,
} from "../../scripts/api.js"
import {
  verifyLogin,
  logout,
  lockScroll,
  unlockScroll,
} from "../../scripts/LoginLogout.js"

verifyLogin()
logout()

const createCard = (adoption) => {
  const card = document.createElement("li")
  const imgPet = document.createElement("img")
  imgPet.src = adoption.pet.avatar_url

  const dataPet = document.createElement("div")
  dataPet.classList.add("dataPet")

  const petName = document.createElement("p")
  petName.innerHTML = `<span class="txtBlue">Nome:</span> ${adoption.pet.name}`

  const petSpecie = document.createElement("p")
  petSpecie.innerHTML = `<span class="txtBlue">Espécie:</span> ${adoption.pet.species}`

  const buttonContainer = document.createElement("div")
  buttonContainer.classList.add("buttonContainer")

  const deleteButton = document.createElement("button")
  deleteButton.classList.add("iconDelete")
  deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`

  deleteButton.addEventListener("click", async (e) => {
    e.preventDefault()
    const form = deleteMyAdoptionModal(adoption)
    createModal(form)
    lockScroll()
  })

  dataPet.append(petName, petSpecie)
  buttonContainer.appendChild(deleteButton)
  card.append(imgPet, dataPet, buttonContainer)

  return card
}

const createMyPetsCard = (pet) => {
  let adoptable = ""
  if (pet.available_for_adoption == true) {
    adoptable = "Sim"
  } else {
    adoptable = "Não"
  }

  const card = document.createElement("li")
  const imgPet = document.createElement("img")
  imgPet.src = pet.avatar_url

  const dataPet = document.createElement("div")
  dataPet.classList.add("dataPet")

  const petName = document.createElement("p")
  petName.innerHTML = `<span class="txtBlue">Nome:</span> ${pet.name}`

  const petSpecie = document.createElement("p")
  petSpecie.innerHTML = `<span class="txtBlue">Espécie:</span> ${pet.species}`

  const buttonContainer = document.createElement("div")
  buttonContainer.classList.add("buttonContainer")

  const attButton = document.createElement("button")
  attButton.classList.add("iconEdit")
  attButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`

  attButton.addEventListener("click", (e) => {
    e.preventDefault()
    const form = editPetModal(pet)
    createModal(form)
    lockScroll()
  })

  const deleteButton = document.createElement("button")
  deleteButton.classList.add("iconDelete")
  deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`

  deleteButton.addEventListener("click", (e) => {
    e.preventDefault()
    const form = deleteMyPetModal(pet)
    createModal(form)
    lockScroll()
  })

  dataPet.append(petName, petSpecie)
  buttonContainer.append(attButton, deleteButton)
  card.append(imgPet, dataPet, buttonContainer)

  return card
}

const renderCards = async () => {
  const myAdoptions = await getMyAdoptions()

  const list = document.querySelector(".adoptionList")

  list.innerHTML = ""

  myAdoptions.forEach((adoption) => {
    const card = createCard(adoption)
    list.append(card)
  })
}

const renderMyPetCards = async () => {
  const myPets = await getAllMyPets()

  const list = document.querySelector("#myPetList")

  list.innerHTML = ""

  myPets.forEach((pet) => {
    const card = createMyPetsCard(pet)
    list.append(card)
  })
}

const renderMyProfile = async () => {
  const myProfile = await getMyProfile()
  const userData = document.querySelector(".userData")
  const avatar = document.querySelector(".perfilHeader")

  userData.innerHTML = ""
  avatar.innerHTML = ""

  userData.insertAdjacentHTML(
    "afterbegin",
    `
    <p><span class="txtBlue">Nome:</span> ${myProfile.name}</p>
    <p><span class="txtBlue">E-mail:</span> ${myProfile.email}</p>
    `
  )

  avatar.insertAdjacentHTML(
    "afterbegin",
    `
    <img src="${myProfile.avatar_url}"
      class="avatarProfile" />
    `
  )
}

const createModal = (children) => {
  const body = document.querySelector("body")
  const modalBg = document.createElement("div")
  modalBg.classList.add("modalBg")

  const modalContainer = document.createElement("section")
  modalContainer.classList = "modal"

  const modalHeader = document.createElement("div")
  modalHeader.classList.add("modalHeader")

  const closeModal = document.createElement("span")
  closeModal.classList.add("closeModal")
  closeModal.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>'

  const modalFooter = document.createElement("div")
  modalFooter.classList.add("modalFooter")

  modalBg.addEventListener("click", (e) => {
    const { className } = e.target
    if (className === "modalBg" || className === "fa-regular fa-circle-xmark") {
      modalBg.remove()
      unlockScroll()
    }
  })

  modalHeader.appendChild(closeModal)
  modalContainer.append(modalHeader, children, modalFooter)
  modalBg.appendChild(modalContainer)

  body.appendChild(modalBg)
}

const editUserModal = (user) => {
  const formContainer = document.createElement("form")
  formContainer.classList.add("formContainer")

  const title = document.createElement("h3")
  title.innerText = "Editar usuário"

  const nameInput = document.createElement("input")
  nameInput.classList.add("modalInput")
  nameInput.placeholder = "Nome"
  nameInput.value = user.name
  nameInput.required = true

  const avatarInput = document.createElement("input")
  avatarInput.classList.add("modalInput")
  avatarInput.placeholder = "Url do Avatar"
  avatarInput.value = user.avatar_url
  avatarInput.required = true

  const button = document.createElement("button")
  button.classList.add("btnBrand")
  button.innerText = "Atualizar"

  button.addEventListener("click", (e) => {
    e.preventDefault()

    let body = {}
    if (nameInput.value != user.name) {
      body.name = nameInput.value
    }
    if (avatarInput.value != user.avatar_url) {
      body.avatar_url = avatarInput.value
    }

    editMyProfile(body)
    const modal = document.querySelector(".modalBg")
    modal.remove()
    setTimeout(() => {
      renderMyProfile()
    }, 700)
    unlockScroll()
  })

  formContainer.append(title, nameInput, avatarInput, button)

  return formContainer
}

const editPetModal = (pet) => {
  const formContainer = document.createElement("form")
  formContainer.classList.add("formContainer")

  const title = document.createElement("h3")
  title.innerText = "Editar pet"

  const nameInput = document.createElement("input")
  nameInput.type = "text"
  nameInput.classList.add("modalInput")
  nameInput.placeholder = "Nome"
  nameInput.value = pet.name
  nameInput.required = true

  const breadInput = document.createElement("input")
  breadInput.type = "text"
  breadInput.classList.add("modalInput")
  breadInput.placeholder = "Raça"
  breadInput.value = pet.bread
  breadInput.required = true

  const specieSelect = document.createElement("select")

  specieSelect.classList.add("modalInput")
  specieSelect.required = true

  const dog = document.createElement("option")
  dog.innerText = 'Cachorro'
  const cat = document.createElement("option")
  cat.innerText = 'Gato'
  const bird = document.createElement("option")
  bird.innerText = 'Aves'
  const reptile = document.createElement("option")
  reptile.innerText = 'Repteis'
  const other = document.createElement('option')
  other.innerText = 'Outros'


  specieSelect.append(dog, cat, bird, reptile, other)
  specieSelect.value = pet.species

  const avatarInput = document.createElement("input")
  avatarInput.type = "text"
  avatarInput.classList.add("modalInput")
  avatarInput.placeholder = "Url do Avatar"
  avatarInput.value = pet.avatar_url
  avatarInput.required = true

  const button = document.createElement("button")
  button.classList.add("btnBrand")
  button.innerText = "Atualizar"

  button.addEventListener("click", async (e) => {
    e.preventDefault()

    let body = {
      name: nameInput.value,
      bread: breadInput.value,
      species: specieSelect.value,
      avatar_url: avatarInput.value,
    }

    await editMyPets(body, pet.id)
    const modal = document.querySelector(".modalBg")
    modal.remove()
    unlockScroll()
    renderMyPetCards()
    renderCards()
  })

  formContainer.append(
    title,
    nameInput,
    breadInput,
    specieSelect,
    avatarInput,
    button
  )

  return formContainer
}

const deleteUserModal = (user) => {
  const formContainer = document.createElement("form")
  formContainer.classList.add("formContainer")

  const title = document.createElement("h3")
  title.innerText = "Deseja mesmo deletar sua conta?"
  title.classList.add("txtCenter")

  const button = document.createElement("button")
  button.classList.add("btnSmallAlert")
  button.innerText = "Quero deletar minha conta"

  button.addEventListener("click", async (e) => {
    e.preventDefault()
    deleteMyProfile()
    const modal = document.querySelector(".modalBg")
    modal.remove()
    unlockScroll()
  })

  formContainer.append(title, button)

  return formContainer
}

const deleteMyAdoptionModal = (pet) => {
  const formContainer = document.createElement("form")
  formContainer.classList.add("formContainer")

  const title = document.createElement("h3")
  title.innerText = "Deseja mesmo desfazer a adoção desse pet??"
  title.classList.add("txtCenter")

  const button = document.createElement("button")
  button.classList.add("btnSmallAlert")
  button.innerText = "Quero cancelar a adoção!"

  button.addEventListener("click", async (e) => {
    e.preventDefault()
    deleteMyAdoption(pet.id)

    setTimeout(() => {
      const modal = document.querySelector(".modalBg")
      modal.remove()
      unlockScroll()
      renderMyPetCards()
      renderCards()
    }, 500)
  })

  formContainer.append(title, button)

  return formContainer
}

const deleteMyPetModal = (pet) => {
  const formContainer = document.createElement("form")
  formContainer.classList.add("formContainer")

  const title = document.createElement("h3")
  title.innerText = "Deseja mesmo deletar esse pet?"
  title.classList.add("txtCenter")

  const button = document.createElement("button")
  button.classList.add("btnSmallAlert")
  button.innerText = "Quero deletar esse pet!"

  button.addEventListener("click", async (e) => {
    e.preventDefault()
    await deleteMyPet(pet.id)
    const modal = document.querySelector(".modalBg")
    modal.remove()
    unlockScroll()
    renderMyPetCards()
    renderCards()
  })

  formContainer.append(title, button)

  return formContainer
}

const createPetModal = () => {
  const formContainer = document.createElement("form")
  formContainer.classList.add("formContainer")

  const title = document.createElement("h3")
  title.innerText = "Cadastrar novo pet"

  const nameInput = document.createElement("input")
  nameInput.type = "text"
  nameInput.classList.add("modalInput")
  nameInput.placeholder = "Nome"
  nameInput.required = true

  const breadInput = document.createElement("input")
  breadInput.type = "text"
  breadInput.classList.add("modalInput")
  breadInput.placeholder = "Raça"
  breadInput.required = true

  const specieSelect = document.createElement("select")

  specieSelect.classList.add("modalInput")
  specieSelect.id = "select"
  specieSelect.required = true

  const species = document.createElement("option")
  species.innerText = 'Espécies'
  species.setAttribute("disabled", "")
  species.setAttribute("selected", "")
  const dog = document.createElement("option")
  dog.innerText = 'Cachorro'
  const cat = document.createElement("option")
  cat.innerText = 'Gato'
  const bird = document.createElement("option")
  bird.innerText = 'Aves'
  const reptile = document.createElement("option")
  reptile.innerText = 'Repteis'
  const other = document.createElement('option')
  other.innerText = 'Outros'

  specieSelect.append(species, dog, cat, bird, reptile, other)

  specieSelect.addEventListener('change', () => {
    console.log('teste');
    specieSelect.style = 'color: var(--blue-dark);'
  })

  const avatarInput = document.createElement("input")
  avatarInput.type = "text"
  avatarInput.classList.add("modalInput")
  avatarInput.placeholder = "Url do Avatar"
  avatarInput.required = true

  const button = document.createElement("button")
  button.classList.add("btnBrand")
  button.innerText = "Cadastrar Pet"

  button.addEventListener("click", async (e) => {
    e.preventDefault()

    let body = {
      name: nameInput.value,
      bread: breadInput.value,
      species: specieSelect.value,
      avatar_url: avatarInput.value,
    }

    await createPet(body)
    const modal = document.querySelector(".modalBg")
    modal.remove()
    unlockScroll()
    renderMyPetCards()
    renderCards()
  })

  formContainer.append(
    title,
    nameInput,
    breadInput,
    specieSelect,
    avatarInput,
    button
  )

  return formContainer
}

const editUserButton = document.querySelector("#editUser")
editUserButton.addEventListener("click", async (e) => {
  const user = await getMyProfile()
  const form = editUserModal(user)
  createModal(form)
  lockScroll()
})

const deleteUserButton = document.querySelector("#deleteUser")
deleteUserButton.addEventListener("click", async (e) => {
  const user = await getMyProfile()
  const form = deleteUserModal(user)
  createModal(form)
  lockScroll()
})

const newPetButton = document.querySelector("#newPet")
newPetButton.addEventListener("click", async (e) => {
  e.preventDefault()
  const form = createPetModal()
  createModal(form)
  lockScroll()
})

renderMyProfile()
renderCards()
renderMyPetCards()