// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Bookmark the website
function saveBookmark(e){
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    console.log(bookmark);

    // Test if Bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        //Init Array
        var bookmarks = [];
        //Add to array
        bookmarks.push(bookmark);
        //Set to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
        // Get bookmarks from LocalStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add Bookmark to array
        bookmarks.push(bookmark);
        // Back to Local Storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //clear form
    document.getElementById('myForm').reset();
    
    //Re-fetch bookmarks
    fetchBookmarks();

    //Prevent from from submiting
    e.preventDefault();
}

//Delete
function deleteBookmark(url){
    //Get bookmarks from Storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop
    for(var i = 0; i < bookmarks.length; i++){
        if(url === bookmarks[i].url){
            //remove from array
            bookmarks.splice(i, 1);
        }
    }
//Re-set back to LocalStorage
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
//Re-fetch bookmarks
fetchBookmarks();
}

//Fetch bookmarks
function fetchBookmarks(){
    // Get bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Get output id
    var bookmarksResults = document.getElementById('bookmarkedWebsite');

    //Output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="jumbotron" id="jumbotron2">' + 
                                      '<h3>' + name + 
                                      '<a class = "btn btn-secondary" target="_blank" href="' + url + '">Visit</a>' + 
                                      '<a onClick ="deleteBookmark(\'' + url + '\')" class = "btn btn-danger" href="#">Delete</a>' + 
                                      '</h3>' + 
                                      '</div>';

    }
}

//Validation
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('You forgot to add something. What could it be?');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Something is just wrong, check you form.');
        return false;
    }

    return true;
}
