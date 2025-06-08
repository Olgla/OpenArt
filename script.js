const body = document.querySelector('body');
const list = document.createElement('ul');

const artworksPagesNumber = "https://api.artic.edu/api/v1/artworks";
const infoURL = "https://api.artic.edu/api/v1";
const imageUrl = "https://www.artic.edu/iiif/2";
let parameters = "fields=id,title,image_id,gallery_title,artwork_type,artist_title,category_title,technique_titles";
let totalPages = 1;


// Initial request to get the total number of pages of artworks
async function getArtworksPagesNumber() {
  try {
  const response = await fetch(artworksPagesNumber);
    if(!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json()  
    //console.log(data);  
    totalPages = data.pagination.total_pages;
    return totalPages;  
  }  
  catch(error) {
    console.log(error)
  } 
}

  //Get artwork types
async function fetchArtworkTypes() {
  try {
    const response = await fetch(infoURL + "/artwork-types");
    const data = await response.json();
    //console.log(data); 
    const artworkTypes = [];

    data.data.forEach(artworkType => {
        if (artworkType.title && (artworkType.title === 'Painting' || 
                                  artworkType.title === "Print" || 
                                  artworkType.title === "Installation" || 
                                  artworkType.title === "Drawing and Watercolor"))             
          {          
            const listItem = document.createElement('li');
            listItem.classList.add('item');
            
            const id = artworkType.title.toLowerCase().replace(/\s+/g, '_');
            listItem.setAttribute("id", id);  
            listItem.innerText = artworkType.title; 


            listItem.addEventListener('click', () => {
              showArtworksByType(artworkType.title);
            });

            list.appendChild(listItem);
          }      
    });
    body.appendChild(list);  

  } catch (error) {
    console.log("Error fetching artwork types:", error);
  }
}


async function showArtworksByType(type) {
  let randomPage = Math.floor(Math.random() * totalPages) + 1;
  try {
    const response = await fetch(`${infoURL}/artworks?page=${randomPage}&${parameters}&artwork_type=${type}&limit=20`);
    const data = await response.json();
    console.log(data.data);

    // Clear any previous images from the page
    const artworksContainer = document.querySelector('#artworks-container');
    if (artworksContainer) {
      artworksContainer.innerHTML = '';  
    } 
      const newContainer = document.createElement('div');
      newContainer.id = 'artworks-container';
      body.appendChild(newContainer);
    
    // Display artworks of the selected type
    data.data.forEach(artwork => {
      if (artwork.image_id) {
        const item = document.createElement('img');
        item.classList.add('artwork-item');
        item.src = `${imageUrl}/${artwork.image_id}/full/full/0/default.jpg`;
        item.alt = artwork.title;

        item.addEventListener('click', () => {
          const imageUrl = `${imageUrl}/${artwork.image_id}/full/full/0/default.jpg`;
          window.open(imageUrl, '_blank'); 
        });

        document.querySelector('#artworks-container').appendChild(item);
      }
    });
  } catch (error) {
    console.log('Error fetching artworks:', error);
  }
}

getArtworksPagesNumber()
.then(() => fetchArtworkTypes())
.then(() => showArtworksByType);