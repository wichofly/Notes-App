const addBtn = document.getElementById('add')

addBtn.addEventListener('click', () => addNewNote('New Note'))

function addNewNote(text = '') {
  const note = document.createElement('div')
  note.classList.add('note')

  // "div class=main" if text then have no class, else then have a class of hidden.
  // "textarea" if text has a class of hidden(hidde the textarea), else have no class
  note.innerHTML = `
    <div class="tools">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    
    <div class="main ${text ? "" : "hidden"} "></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

  const editBtn = note.querySelector('.edit')
  const deleteBtn = note.querySelector('.delete')
  const main = note.querySelector('.main')
  const textArea = note.querySelector('textarea')

  textArea.value = text
  // Using marked library. documentation: "https://marked.js.org/"
  main.innerHTML = marked.parse(text)

  deleteBtn.addEventListener('click', () => {
    note.remove()
  })

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden')
    textArea.classList.toggle('hidden')
  })

  textArea.addEventListener('input', (e) => {
    // e.target.value we can destructure to: 
    const { value } = e.target

    main.innerHTML = marked.parse(value)
  })


  // we add the note every time we click
  document.body.appendChild(note)
} 