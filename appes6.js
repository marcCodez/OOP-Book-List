// The constructors Book and UI will become classes
// copy and paste the constructor in the book class, the prototypes inside the UI class
// and everything else like event listeners belongs outside of the classes

class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
}
}

class UI {
    addBookToList(book){
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


    showAlert(message, alertClassName){
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

    deleteBook(target){
        if (target.className === 'delete') {
            //parentElement twice because the target element is situated inside a td tag then one level up is a tr tag
            // This is basically DOM traversing
            target.parentElement.parentElement.remove();
        }
    }

    

    clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }
}

// Local Storage Class
class Store {
    // Fetch from local storage
    static getBooks() {
    let books;
    if(localStorage.getItem('books') === null){
        books = [];
    } else {
        // convert it to a JS object to push the item
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
    }

    // To display the books from local storage in the UI
    static displayBooks() {
        //get the books from storage like we did for add book
        const books = Store.getBooks();

        // loop through the books
        books.forEach(function(book){
            // Instantiate the UI class to display each book in UI
            const ui = new UI

            // Add book to UI
            ui.addBookToList(book);
        });

    }

    // To add to local storage
    static addBook(book) {
        const books = Store.getBooks();

        // push it in the converted JS object
        books.push(book);
        // Set local storage again with that new book
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        //first get the books from local storage
        const books = Store.getBooks();

        //We want to loop through the books
        // if the isbn from local storage is equal to the isbn we are passing
        // then we want to splice out the index which can be passed in the callback
        books.forEach(function(book, index){
            if(book.isbn === isbn) {
                books.splice(index, 1);
                }
        });

          // Set local storage again with that new book
          localStorage.setItem('books', JSON.stringify(books));
   
    }

}

// DOM Load Event - when dom content is loaded call displayBooks in class Store
document.addEventListener('DOMContentLoaded', Store.displayBooks);

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

    // Add to Local Storage
    Store.addBook(book);

    // Show success
    ui.showAlert('Successfully added a book!', 'success');

    // Clear fields
    ui.clearFields();
    }

  
    //stop the form from submitting, the initial behviour
    e.preventDefault();
});


// Event delegation = if we have something thats going to show up more than once with the same class
// or something that is not there when the page loads but its dynamically added
// Event listener for delete - using event delegation
document.querySelector('#book-list').addEventListener('click', function(e){
   
    // Instantiate UI like we did for add book to access the prototype
    const ui = new UI();

    //e.target would be the anchor link element
   
    // Delete book
    ui.deleteBook(e.target);

    //Remove from Local Storage
    // We want use something that is unique so the isbn number
    // We go to parent element which gived us td
    // previous Element sibling of tr will give us the isbn
    // access the contents of that element with textContent
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

     // added this if statement to remove the removed message bug
    if (e.target.className === 'delete') {
    // Show message
    ui.showAlert('Book Removed!', 'success');
    }
    
    e.preventDefault();
});