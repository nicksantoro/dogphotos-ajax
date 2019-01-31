// HOMEWORK: 
// 1. Make a page that uses the dog.ceo/api/ API...
// Show a random image of a dog of a breed provided by the user.
// a. Make a form to search by breed
// b. When the user clicks the search button, make the API request
// c. Show the image on the page
// 2. Make a new page that is a gallery of dog images...
// a. Start with a form to search by breed. Display the first 6 dogs of that breed.
// HINT: https://dog.ceo/dog-api/documentation/breed
// BONUS: Put each dog image in a Bootstrap "card" with the sub-breed in the caption
//        If the aspect ratios screw up the cards, forget about cards for now.
// b. Paginate the search results.
// Add links/buttons at the bottom of the page that show the next 6 dogs, and the next 6, and so on...


// 2. Look for a few APIs (at https://github.com/toddmotto/public-apis) that interest you. 
// You'll use one in a project later. Think about how you'll use the API. For example, you might 
// create a gallery of images, products, media, etc, or just search a database with filters/sorting.

// AJAX (Asynchronous Javascript And XML): a (bad) name for technique for 
// making HTTP requests in JavaScript (without having to reload the page)

// HTTP (HyperText Transfer Protocol): a protocol for sending/receiving data to/from web servers
// When you navigate to a web page in your web browser, your browser sends an HTTP(S) request
// to a web server. An HTTP(S) request is just plain text that follows the HTTP format standard
// so it can be interpreted when its received.
// For example, an HTTP(S) request is expected to have "headers" at the beginning of the text.
// After a web server parses/interprets a request, it sends an HTTP(S) response (plain text).

// A web server can respond with ANY plain text that the (server) developer wants.
// Developers will often make servers that respond with plain text that is NOT HTML.

// Making an HTTP request with AJAX:

/*
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    
    if (this.readyState == 4 && this.status == 200) {
        //document.getElementById( "contents" ).innerHTML = this.responseText;
        let person = JSON.parse( this.responseText );
        document.getElementById( "contents" ).innerHTML = person.name + " is " + person.age + " years old.";
    }
};
xhttp.open("GET", "person.json", true);
xhttp.send();
*/

// API (Application Programming Interface): code written in one program to be used to interact with it
// by other programs. An API is usually code on a server that waits for requests from other applications.
// A very common type of API is a database API.

// Example:
// https://dog.ceo/dog-api

// Using an API:
// To use an API with AJAX, look for the following in its documentation...
// 1. The URL(s) to request to accomplish your goal
// 2. The format/data of the response

// TODO: Show the image on the page (with an img tag)

let btnRandom = document.getElementById("btnRandom");
btnRandom.addEventListener("click", function () {

    ajaxRequest("https://dog.ceo/api/breeds/image/random", function (response) {
        document.getElementById("contents").innerHTML = `<img src="${response.message}">`;
    })
})

let btnBreed = document.getElementById("btnBreed");
btnBreed.addEventListener("click", function () {
    let inputBreed = document.getElementById("inputBreed");

    let breed = inputBreed.value;

    ajaxRequest(`https://dog.ceo/api/breed/${breed}/images/random`, function (response) {
        document.getElementById("contentsBreed").innerHTML = `<img src="${response.message}">`;
    });

    ajaxRequest(`https://dog.ceo/api/breed/${breed}/list`, function (response) {
        let subBreed = response.message[0];
        if (response.message.length > 0) {
            ajaxRequest(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`, function (response) {
                document.getElementById("randomSubBreed").innerHTML = `<img src="${response.message}">`;
            });
        }

        // response.message.forEach((val, index) => {
        //     console.log(val);
        // });
        // document.getElementById("listSubBreeds").innerHTML = `<li>${response.message}</li>`;

    });


})

function ajaxRequest(url, cb) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            cb(response);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}




// let xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {

//     if (this.readyState == 4 && this.status == 200) {
//         let response = JSON.parse( this.responseText );
//         document.getElementById( "contents" ).innerHTML = `<img src="${response.message}">`;
//     }
// };
// xhttp.open("GET", "https://dog.ceo/api/breed/african/images/random", true);
// xhttp.send();

// let randomPhoto = document.getElementById("randomPhoto");
// randomPhoto.addEventListener("click", function() {

// })