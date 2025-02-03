const body = document.querySelector('body');
const list = document.createElement('div');
list.classList.toggle('grid-container');

const baseUrlInfo = "https://api.artic.edu/api/v1";
const baseImageUrl = "https://www.artic.edu/iiif/2";
let parameters = "fields=id,title,image_id,gallery_title,artwork_type,department_title,artist_title,category_title,technique_titles";

fetch(baseUrlInfo + "/artworks?" + parameters + "&limit=100")
  .then(response => response.json())
  .then(data => {
    console.log(data.data);
    data.data.forEach(artwork => {
      if (artwork.image_id) {  
        const item = document.createElement('img');
        item.classList.add('artwork-item');
        
        item.src = `${baseImageUrl}/${artwork.image_id}/full/full/0/default.jpg`;
        item.alt = artwork.title;

        list.appendChild(item);
      }
    });
    body.appendChild(list);
  })
  .catch(error => console.log(error));
           
 





// artworkDetails = {
//     "Title": artwork.title,
//     "Artist": artwork.artist_title,
//     "Type": artwork.artwork_type,
//     "Technique": artwork.technique_titles.join(", "),
//     "Gallery": artwork.gallery_title,
//     "Department": artwork.department_title,
//     "Category": artwork.category_title,
//     "imageId": artwork.image_id,
//     // "AltText": artwork.alt_text
// };   
// images.push(artworkDetails);
// console.log(images);                              
// });            
// })
// .catch(error => console.log(error));

  

// 


// fetch(`${baseImageUrl}/${artworkDetails.imageId}/full/full/0/default.jpg`)
// .then(response => {
// JSON.parse(response);
// console.log(response)
// })