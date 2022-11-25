const addBtn = document.getElementById('add')

addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '') {
  const note = document.createElement('div')
  note.classList.add('note')

  // "div class=main" if text then have no class, else then have a class of hidden.
  // "textarea" if text has a class of hidden, else have no class
  note.innerHTML = `
    <div class="tools">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    
    <div class="main ${text ? "" : "hidden"} "></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    // we add the note every time we click
    document.body.appendChild(note)
} 