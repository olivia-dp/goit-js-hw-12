import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import  fetchData from "./js/pixabay-api";
import createMarkup from "./js/render-functions";
import { lightbox } from "./js/render-functions";



const form = document.querySelector(".search-form");
const imgList = document.querySelector(".img-list");
const loader = document.querySelector(".span")
const loadBtn = document.querySelector(".load")


form.addEventListener("submit", imgSearch);
loadBtn.addEventListener("click", loadMoreImg);

let page = 300;
const perPage = 15;
let imgName = '';



async function imgSearch (event) {
    event.preventDefault();
    imgList.innerHTML = '';
    page = 1;
    imgName = event.target.elements.imgname.value.trim();
    if(imgName === "") {
        iziToast.show({
            title: 'Please,',
            message: 'fill the field',
            titleColor: '#fff',
            messageColor: '#fff',
            messageSize: '16px',
            backgroundColor: '#ef4040',
            position: "center",
        });
        return;
    }
await loadImages (imgName);
}


async function loadImages (imgName) {
    try {
        loadBtn.classList.remove("load-more");
        loader.classList.add("loader");
        
        const data = await fetchData(imgName, page, perPage);
        if (data.hits.length === 0) {
            iziToast.show({
                title: 'Sorry,',
                message: 'there are no images matching your search query. Please try again!',
                titleColor: '#fff',
                messageColor: '#fff',
                messageSize: '16px',
                backgroundColor: '#ef4040',
                position: "center",
            })
            return;
        }
            imgList.innerHTML += createMarkup(data.hits);
            loadBtn.classList.add("load-more");
            form.reset();
            
            lightbox.refresh();
            
            if (data.hits.length < perPage || page > Math.ceil(data.totalHits/perPage)) {
                loadBtn.classList.remove("load-more");
                iziToast.show({
                    message: `We're sorry, but you've reached the end of search results.`,
                    titleColor: '#fff',
                    messageColor: '#fff',
                    messageSize: '16px',
                    backgroundColor: '#ef4040',
                    position: "center",
                })
            }
            
    }
    catch(error) { iziToast.show({
        message: 'Error',
        titleColor: '#fff',
        messageColor: '#fff',
        messageSize: '16px',
        backgroundColor: '#ef4040',
        position: "center",
    })}
    finally{ loader.classList.remove("loader")}
}

async function loadMoreImg () {
    page++;
    const data = await loadImages(imgName);
    const card = document.querySelector(".img-card");
    const height = card.getBoundingClientRect().height;
    window.scrollBy({left: 0,
        top: height * 3,
        behavior: "smooth"});
}    


