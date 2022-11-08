import {
  getMyAdoptions,
  getMyProfile,
  deleteMyAdoption,
  editMyAdoptions,
  deleteMyProfile,
  editMyProfile,
  getAllMyPets,
} from "../../scripts/api.js"
import {
  verifyLogin,
  logout,
  lockScroll,
  unlockScroll,
} from "../../scripts/LoginLogout.js"

verifyLogin()
logout()

{
  /* 
  <li>
    <img
      src="https://media.cnn.com/api/v1/images/stellar/prod/220818142713-dogs-tears-emotions-wellness-stock.jpg?c=16x9&q=h_720,w_1280,c_fill"
    />
    <div>
      <p><span class="txtBlue">Nome:</span> Bidu</p>
      <p><span class="txtBlue">Espécie:</span> Cachorro</p>
      <p><span class="txtBlue">Adotável:</span> Sim</p>
      <button class="btnSmallBrand">Atualizar</button>
    </div>
  </li> 
  */
}

const createCard = (adoption) => {
  let adoptable = ""
  if (adoption.pet.available_for_adoption == true) {
    adoptable = "Sim"
  } else {
    adoptable = "Não"
  }

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

  /*  const attButton = document.createElement("button")
  attButton.classList.add("iconEdit")
  attButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`

  attButton.addEventListener("click", (e) => {
    e.preventDefault()
    const form = editPetModal(pet)
    createModal(form)
    lockScroll()
  }) */

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

const renderCards = async () => {
  const myAdoptions = await getMyAdoptions()

  const list = document.querySelector(".adoptionList")

  list.innerHTML = ""

  myAdoptions.forEach((adoption) => {
    const card = createCard(adoption)
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

  console.log(myProfile)
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

  const avatarInput = document.createElement("input")
  avatarInput.classList.add("modalInput")
  avatarInput.placeholder = "Url do Avatar"
  avatarInput.value = user.avatar_url

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
    unlockScroll()
    renderMyProfile()
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

  const breadInput = document.createElement("input")
  breadInput.type = "text"
  breadInput.classList.add("modalInput")
  breadInput.placeholder = "Raça"
  breadInput.value = pet.bread

  const specieInput = document.createElement("input")
  specieInput.type = "text"
  specieInput.classList.add("modalInput")
  specieInput.placeholder = "Espécie"
  specieInput.value = pet.species

  const avatarInput = document.createElement("input")
  avatarInput.type = "text"
  avatarInput.classList.add("modalInput")
  avatarInput.placeholder = "Url do Avatar"
  avatarInput.value = pet.avatar_url

  const button = document.createElement("button")
  button.classList.add("btnBrand")
  button.innerText = "Atualizar"

  button.addEventListener("click", (e) => {
    e.preventDefault()

    let body = {}
    if (nameInput.value != pet.name) {
      body.name = nameInput.value
    }
    if (breadInput.value != pet.bread) {
      body.bread = breadInput.value
    }
    if (specieInput.value != pet.species) {
      body.bread = specieInput.value
    }
    if (avatarInput.value != pet.avatar_url) {
      body.bread = avatarInput.value
    }

    editMyAdoptions(body, pet.id)
  })

  formContainer.append(
    title,
    nameInput,
    breadInput,
    specieInput,
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
      renderCards()
    }, 500)
  })

  formContainer.append(title, button)

  return formContainer
}

const editUserButton = document.querySelector("#editUser")
editUserButton.addEventListener("click", async (e) => {
  e.preventDefault()
  const user = await getMyProfile()
  const form = editUserModal(user)
  createModal(form)
  lockScroll()
})

const deleteUserButton = document.querySelector("#deleteUser")
deleteUserButton.addEventListener("click", async (e) => {
  e.preventDefault()
  const user = await getMyProfile()
  const form = deleteUserModal(user)
  createModal(form)
  lockScroll()
})

renderMyProfile()
renderCards()
