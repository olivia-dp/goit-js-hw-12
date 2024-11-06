export default fetchData;

const BASE_URL = "https://pixabay.com/api/";
const params = new URLSearchParams ({
    key: "46809493-025d46e6636e036ef2e71f554",
    q: "",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true

});

function fetchData (imgName) {
    params.set("q", imgName);
   return fetch(`${BASE_URL}?${params}`)
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText)
            }

            return response.json();
              
        })
    }
