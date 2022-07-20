let book_library = new Set()


class Book {
    constructor(book) {
        this.id = book.id || null;
        this.title = book.title;
        this.author = book.author;
        this.pages = book.pages;
        this.language = book.language;
        this.publishing_date = book.publishing_date;
        this.status = book.status,
        this.show = book.show;
        this.summary = 'summary';
        this.date_added = new Date().toLocaleString();
    }
}

function addBook(book) {
    console.log('Adding Book ' + book.id);
    book_library.add(book)
}

function removeBook(bookID) {
    console.log('removing ' + bookID)
    for (const b of book_library) {
        if (b.id == bookID) book_library.delete(b)
    }
    showBooks()
}

function toggleReadStatus(bookID) {
    for (const b of book_library) {
        if (b.id == bookID) b.status = !b.status;
    }
}


function getNextID() {
    if (book_library.size == 0) return 1

    return [...book_library].pop().id + 1
}

function showBooks() {
    clearLibrary()
    console.log('showing')
    for (const book of book_library) {
        // if(book.show) continue;
        $('#list-books').addClass('ui cards');

        $('#list-books')[0].innerHTML = $('#list-books')[0].innerHTML + `
            <div class="card">
                <div class="image">
                    <img src="img/book-cover.png">
                </div>
                <div class="content">
                    <div class="header">${book.title}</div>
                    <div class="meta">
                        <a>${book.author}</a>
                    </div>
                    <div class="description">${book.summary}</div>
                </div>
                <div class="extra content">
                    <div class="ui toggle checkbox ">
                        <input ${book.status ? 'checked' : ''} onchange="toggleReadStatus(${book.id})" type="checkbox" id="read_status-${book.id}" name="read_status" tabindex="0" class="hidden">
                        <label>I finished reading this book</label>
                    </div>
                </div>
                <div class="extra content">
                    
                    <div class="ui two buttons">
                        <div onclick="removeBook(${book.id})" id="remove-btn-${book.id}" class="remove-book-btns ui basic red button">Remove</div>
                    </div>
                    
                </div>
                
            </div>`
        $('.ui.checkbox').checkbox()
    }

}

$('.ui.modal').modal();

$('.ui.checkbox').checkbox();

$('#add-book-modal-btn').click(function () {
    $('.ui.modal').modal('show');
});

$('#clear-btn').click(function () {
    $('#add-book-form')[0].reset()
});

$('#add-book-btn').click(function () {
    console.log($('input#read_status.hidden')[0].checked)
    book = {
        id: getNextID(),
        title: $('#title').val(),
        author: $('#author').val(),
        pages: $('#pages').val(),
        language: $('#language').val(),
        publishing_date: $('#publishing_date').val(),
        status:$('input#read_status.hidden')[0].checked,
        summary: 'summary',
        show: false
    }

    addBook(new Book(book))

    showBooks()
});

function clearLibrary() {
    console.log('clearing');
    $('#list-books').removeClass('ui cards');
    $('#list-books')[0].innerHTML = ''
    if(book_library.size == 0) {
        $('#list-books')[0].innerHTML = `
            <div class="card">
                <div class="image">
                    <img src="img/empty.png">
                </div>
            </div>`
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

showBooks()