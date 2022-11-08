import { getMyAdoptions, getMyProfile } from "../../scripts/api.js"
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

const createCard = (pet) => {
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

  attButton.addEventListener("click", (e) => {})

  const deleteButton = document.createElement("button")
  deleteButton.classList.add("iconDelete")
  deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`

  dataPet.append(petName, petSpecie)
  buttonContainer.append(attButton, deleteButton)
  card.append(imgPet, dataPet, buttonContainer)

  return card
}

const renderCards = async () => {
  const myAdoptions = await getMyAdoptions()

  const list = document.querySelector(".adoptionList")

  myAdoptions.forEach((adoption) => {
    const card = createCard(adoption.pet)
    list.append(card)
  })
}

const renderMyProfile = async () => {
  const myProfile = await getMyProfile()
  const userData = document.querySelector(".userData")
  const avatar = document.querySelector(".perfilHeader")

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
  modalContainer.classList = "modalContainer"

  const modalHeader = document.createElement("div")
  modalHeader.classList.add("modalHeader")

  const closeModal = document.createElement("span")
  closeModal.classList.add("closeModal")
  closeModal.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>'

  modalBg.addEventListener("click", (e) => {
    const { className } = e.target
    if (className === "modalBg" || className === "fa-regular fa-circle-xmark") {
      modalBg.remove()
    }
  })

  modalHeader.appendChild(closeModal)
  modalContainer.append(modalHeader, children)
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

  formContainer.append(title, nameInput, avatarInput, button)

  return formContainer
}

const editUserButton = document.querySelector("#editUser")
editUserButton.addEventListener("click", async (e) => {
  const user = await getMyProfile()
  const form = editUserModal(user)
  createModal(form)
})

renderMyProfile()
renderCards()
