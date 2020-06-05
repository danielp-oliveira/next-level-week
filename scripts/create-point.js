const populateUFs = () => {
  const ufSelect = document.querySelector('select[name=uf]')

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then((res) => res.json())
    .then((states) => {
      states.forEach((state) => {
        ufSelect.innerHTML += `<option value=${state.id}>${state.nome}</option>`
      })
    })
}

populateUFs()

const getCities = (event) => {
  const citySelect = document.querySelector('select[name=city]')
  const ufInput = document.querySelector('input[name=state]')

  const uf = event.target.value

  const indexOfSelectedUf = event.target.selectedIndex
  console.log(indexOfSelectedUf)
  ufInput.value = event.target.options[indexOfSelectedUf].text

  citySelect.innerHTML = '<option value>Selecione a Cidade</option>'
  citySelect.disabled = true

  fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
  )
    .then((res) => res.json())
    .then((cities) => {
      cities.forEach((citie) => {
        citySelect.innerHTML += `<option value=${citie.nome}>${citie.nome}</option>`
      })

      citySelect.disabled = false
    })
}

document.querySelector('select[name=uf]').addEventListener('change', getCities)

// Items de coleta

const itemsToCollect = document.querySelectorAll('.items-grid li')

const collectedItems = document.querySelector('input[name=items]')
let selectedItems = []

const handleSelectedItem = (event) => {
  const itemLi = event.target

  itemLi.classList.toggle('selected')

  const itemId = itemLi.dataset.id

  const alreadySelected = selectedItems.findIndex((item) => item == itemId)
  if (alreadySelected >= 0) {
    selectedItems = selectedItems.filter((item) => item != itemId)
  } else {
    selectedItems.push(itemId)
  }

  collectedItems.value = selectedItems
}

itemsToCollect.forEach((item) =>
  item.addEventListener('click', handleSelectedItem)
)
