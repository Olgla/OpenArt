const body = document.querySelector('body');
const list = document.createElement('div');
list.classList.toggle('grid-container');

const baseUrlInfo = "https://api.artic.edu/api/v1";
const baseImageUrl = "https://www.artic.edu/iiif/2";
let parameters = "fields=id,title,image_id,gallery_title,artwork_type,department_title,artist_title,category_title,technique_titles";

let totalPages = 1;

fetch(baseUrlInfo + "/artworks")
  .then(response => response.json())
  .then(data => {
    totalPages = data.pagination.total_pages;
    getArtworks()
  })
  .catch (error => console.error(error));


async function getArtworks() {
  let randomPage = Math.floor(Math.random() * totalPages) + 1;
  try {
    const response = await fetch(`${baseUrlInfo}/artworks?page=${randomPage}&${parameters}&limit=20`);
    const data = await response.json();
    console.log(data.data); 

    data.data.forEach(artwork => {
      if (artwork.image_id) {
        const item = document.createElement('img');
        item.classList.add('artwork-item');
        item.src = `${baseImageUrl}/${artwork.image_id}/full/full/0/default.jpg`;
        item.alt = artwork.title;

        item.addEventListener('click', () => {
          const imageUrl = `${baseImageUrl}/${artwork.image_id}/full/full/0/default.jpg`;
          window.open(imageUrl, '_blank'); 
        });

        list.appendChild(item);
      }
    });
    body.appendChild(list);
  } catch (error) {
    console.log('Error fetching artworks:', error);
  }
}