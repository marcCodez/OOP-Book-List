// Book Constructor
function Book(title, author, isbn) {
this.title = title;
this.author = author;
this.isbn = isbn;
}

// UI Constructor - Not going to pass anything in so it is just an empty function
//everything else will go inside the prototype
function UI(){}

// adding the addBookToList method to the prototype of UI
UI.prototype.addBookToList = function(book){
const list = document.querySelector('#book-list')
// Create tr element
const row = document.createElement('tr');

// Insert columns inside row - td=table column
row.innerHTML = `
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="delete">X<a></td>
`;

//append row to the table body list
list.appendChild(row);
}

// Clear Fields
UI.prototype.clearFields = function(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}

// Event Listeners
document.querySelector('#book-form').addEventListener('submit', 
function(e){
const title = document.querySelector("#title").value,
      author = document.querySelector('#author').value,
      isbn = document.querySelector('#isbn').value;

    // Instantiate book - create an isntance
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI()

    // Add book to list
    ui.addBookToList(book);

    // Clear fields
    ui.clearFields();
    //stop the form from submitting, the initial behviour
    e.preventDefault();
})