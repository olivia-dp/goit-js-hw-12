import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
export default createMarkup;

function createMarkup(arr) {
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `
        
        <li class="img-card">
            <a class="gallery-link" href="${largeImageURL}"><img class="img" src="${webformatURL}" alt="${tags}" width=360 height=200></a>
           <div class="text-container">
           <p class="text">Likes:</br>${likes}</p>
                <p class="text">Downloads:</br>${downloads}</p>
                <p class="text">Views:</br>${views}</p>
                <p class="text">Comments:</br>${comments}</p>
           </div></li>`).join("");
}


const lightbox = new SimpleLightbox ('.img-card a', {
    captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.8,
  widthRatio: 0.9,
  heigtRatio: 0.9,
})

export {lightbox}