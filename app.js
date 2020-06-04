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

// Show Alert
UI.prototype.showAlert = function(message, alertClassName) {
    // Now we want to construct the element
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${alertClassName}`;
    // Add Text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');

    // Insert alert
    // insertBefore takes arg1: what we want to insert, arg2: what we want to insert before
    container.insertBefore(div, form)

    // Timeout after 3 sec, setTimeout is a property of the window object
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

// Delete Book
UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
        //parentElement twice because the target element is situated inside a td tag then one level up is a tr tag
        // This is basically DOM traversing
        target.parentElement.parentElement.remove();
    }
}


// Clear Fields
UI.prototype.clearFields = function(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}

// Event Listener for add book
document.querySelector('#book-form').addEventListener('submit', 
function(e){
const title = document.querySelector("#title").value,
      author = document.querySelector('#author').value,
      isbn = document.querySelector('#isbn').value;

    // Instantiate book - create an isntance
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI()

    // Validate - so submitted will not add empty inputs
    if (title === '' || author === '' || isbn === '') {
        // Error Alert, second argument with class error as we created the css on index.html
        ui.showAlert('Please fill in all fields', 'error');
    } else {
          // Add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert('Successfully added a book!', 'success');

    // Clear fields
    ui.clearFields();
    }

  
    //stop the form from submitting, the initial behviour
    e.preventDefault();
})


// Event delegation = if we have something thats going to show up more than once with the same class
// or something that is not there when the page loads but its dynamically added
// Event listener for delete - using event delegation
document.querySelector('#book-list').addEventListener('click', function(e){
   
    // Instantiate UI like we did for add book to access the prototype
    const ui = new UI();

    // Delete book
    ui.deleteBook(e.target);

    // added this if statement to remove the removed message bug
    if (e.target.className === 'delete') {
    // Show message
    ui.showAlert('Book Removed!', 'success');
    }
            
    
    e.preventDefault();
});