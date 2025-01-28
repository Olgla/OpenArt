const body = document.querySelector('body');
const list = document.createElement('ul');
list.classList.toggle('grid-container');
const item = document.createElement('li');

let parameters = "?fields=id,title,artist_display,date_display,main_reference_number,thumbnail";


fetch("https://api.artic.edu/api/v1/artworks" + parameters)
.then(response => response.json())
.then(data => {
    data.forEach(result => {
        const image = `<img src="${result.PROPERTY}" alt="${result.data.thumbnail.alt_text}"/>`;  //RESULT===IMAGE???
        item.insertAdjacentHTML("beforeend", result);
    });
})
.catch(error => console.log(error));



body.appendChild(list);
list.appendChild(item);