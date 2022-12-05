const addBtn = document.getElementById('add')

// When we want to pull out that obeject or array from localstorage and show then on the DOM, we use JSON.parse. It would parse it out as an array or object.
const notes = JSON.parse(localStorage.getItem('notes'))

if (notes) {
  notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click', () => addNewNote('New Note'))

function addNewNote(text = '') {
  const note = document.createElement('div')
  note.classList.add('note')

  // "div class=main" if text then have no class, else then have a class of hidden.
  // "textarea" if text has a class of hidden(hidde the textarea), else have no class. 
  // We have the text 'New note' that's why the textarea is hidden.
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

  // We are able to see 'New note' beacuse  we select the value of the textarea = text
  textArea.value = text
  // Using marked library. documentation: "https://marked.js.org/"
  main.innerHTML = marked.parse(text)

  deleteBtn.addEventListener('click', () => {
    note.remove()

    updateLS()
  })

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden')
    textArea.classList.toggle('hidden')
  })

  // Saving the text when is updating to show on the note. 
  textArea.addEventListener('input', (e) => {
    // e.target.value we can destructure to: 
    const { value } = e.target

    main.innerHTML = marked.parse(value)

    updateLS()
  })

  // we add the note every time we click it.
  document.body.appendChild(note)
}

// LocalSotage examples:
// --------------------->
// localStorage.setItem('name', 'Wicho')
// localStorage.setItem('name')
// localStorage.removeItem('name')

// Update localStorage
// -------------------->
function updateLS() {
  const notesText = document.querySelectorAll('textarea')

  // Crreating an empty array of notes
  const notes = []

  // for each note we are taking the notes array and push them onto it, adding their values(the text we write in the note)
  notesText.forEach(note => notes.push(note.value))

  // We can only storage string in localSotrage, if we want to store an object or an array we use JSON.stringify.
  // When we want to pull out that obeject or array from localstorage, we use JSON.parse. It would parse it out as an array or object.
  localStorage.setItem('notes', JSON.stringify(notes))
}
