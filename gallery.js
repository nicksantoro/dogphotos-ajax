// HOMEWORK:
// 1. Look for something in the API documentation that could be more efficient and speed up 
//    loading the search results.
// 2. Nested for loop for the gallery rows and columns

let breed = document.getElementById('breed');
let btnBreedSearch = document.getElementById('btnBreedSearch');
let gallery = document.getElementById('gallery');
let nextPhotos = document.getElementById('nextPhotos');
let previousPhotos = document.getElementById('previousPhotos');
let subBreedList = document.getElementById('subBreedList');
let pageNumber =  0;


const loadPage = () => {

    ajaxRequest(`https://dog.ceo/api/breed/${breed.value}/images`, function(responseObj){
       
        let imageURLs = responseObj.message;
        console.log(imageURLs)
        
            let html = ``;
             
            // 0 1 2 
            // 3 4 5
            
            for(let row = 0; row < 2; row++) {
                html += `
                <div class="row mt-2">
                `;
                for(let column = 0; column < 3; column++) {
                    html += `
                    <div class="col-4 px-2">
                        <img class="w-100 border border-light" src="${imageURLs[pageNumber * 6 + column + 3 * row]}">
                    </div>
                `;
                }
                html += `
                </div>
                `;
            }

            console.log(html)

            gallery.innerHTML = html;
    }) 
    
    ajaxRequest(`https://dog.ceo/api/breed/${breed.value}/list`, (responseObj) => {
        let breeds = responseObj.message;
        let html = `<option selected>Sub Breed</option>`;
        breeds.forEach(breed => {
            html += `
                <option>${breed}</option>
            `
        })
        subBreedList.innerHTML = html;
    })
}

btnBreedSearch.addEventListener("click", () => { 
    pageNumber = 0;
    loadPage(); 
})

nextPhotos.addEventListener("click", () => { 
    pageNumber++;
    loadPage(); 
})

previousPhotos.addEventListener("click", () => {
    pageNumber--;
    loadPage();
})



function ajaxRequest(url, cb) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let responseObj = JSON.parse(this.responseText);

            cb(responseObj);

        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}




            // for( let i = 0; i < 6; i++) {

            //     if(i === 3) {
            //         html += `
            //             </div>
            //         `
            //     }

            //     if(i === 0 || i ===3) {
            //         html += `
            //             <div class="row mt-2">
            //         `;
            //     }

                // html += `
                //     <div class="col-4 px-2">
                //         <img class="w-100" src="${responseObj.message[i]}">
                //     </div>
                // `;

            //     if(i === 5) {
            //         html += `
            //             </div>
            //         `
            //     }
    
            // }