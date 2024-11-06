import axios from "axios";
export default fetchData;
// export { page };


const BASE_URL = "https://pixabay.com/api/";
const params = new URLSearchParams ({
    key: "46809493-025d46e6636e036ef2e71f554",
    q: "",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page: 1,
    per_page: 15

});

async function fetchData (imgName) {
    params.set("q", imgName);
   const result = await axios(`${BASE_URL}?${params}`);
   return result.data; 
}

async function loadMoreImg () {
    try {
    const data = await fetchData();
    

    } catch (error) {console.log(error);
    }
}