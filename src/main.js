import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import  fetchData from "./js/pixabay-api";
import createMarkup from "./js/render-functions";
import { lightbox } from "./js/render-functions";
// import { page } from "./js/pixabay-api";


const form = document.querySelector(".search-form");
const imgList = document.querySelector(".img-list");
const loader = document.querySelector(".span")
const loadBtn = document.querySelector(".load")


form.addEventListener("submit", imgSearch);
// loadBtn.addEventListener("click", loadMoreImg);

async function imgSearch (event) {
    event.preventDefault();
    imgList.innerHTML = '';
    const imgName = event.target.elements.imgname.value.trim();
    if(imgName === "") {
        iziToast.show({
            title: 'Please,',
            message: 'fill the field',
            titleColor: '#fff',
            messageColor: '#fff',
            messageSize: '16px',
            backgroundColor: '#ef4040',
            position: "center",
        })
    }
    else {
        try {
        
            loader.classList.add("loader");
            const data = await fetchData(imgName);
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
            }
                imgList.innerHTML = createMarkup(data.hits);
                form.reset();
                lightbox.refresh();
                
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
}


