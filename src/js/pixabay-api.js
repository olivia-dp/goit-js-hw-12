import axios from "axios";
export default fetchData;



const BASE_URL = "https://pixabay.com/api/";


async function fetchData (imgName, page= 1, perPage = 15) {
    const params = new URLSearchParams ({
        key: "46809493-025d46e6636e036ef2e71f554",
        q: imgName,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page: perPage
    
    });
    
   const result = await axios(`${BASE_URL}?${params}`);
   return result.data; 
}

