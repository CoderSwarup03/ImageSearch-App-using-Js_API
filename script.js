// console.log("My project is running") ---> Testing Purpose!!
const accesKey = "7_2q0ddfokUxXva1kVcIb9CnSEsPTQg3tvuVnaNGyAY"
const searchForm = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const imageContainer = document.querySelector(".image-container");
const loadMoreBtn = document.querySelector(".loadMoreBtn");
// for trial
const materialSymbolsOutlined = document.querySelector(".material-symbols-outlined")


let page = 1;
//fetchIamges function to fetch images from the unfalsh API


const fetchImages = async (query, pageNo) => {
    try {
        // for empty the imageContainer
        if (pageNo === 1) {
            imageContainer.innerHTML = "";
        }
        // console.log(query);
        const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accesKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length > 0) {
            //Every image store in one by one
            data.results.forEach(image => {
                //creating image div
                const imageElement = document.createElement("div");
                imageElement.classList.add("imagediv");
                imageElement.innerHTML = `<img src = "${image.urls.regular}"/>`;

                //creating overlay
                const overlayText = document.createElement("h3");
                overlayText.innerText = `${image.alt_description}`;


                //for effect create a div
                const overlay = document.createElement("div");
                overlay.classList.add('overlay');

                imageContainer.appendChild(imageElement);
                imageElement.appendChild(overlay);
                overlay.appendChild(overlayText);
            })

            if (data.total_pages === pageNo) {
                loadMoreBtn.style.display = "none";
            }
            else {
                loadMoreBtn.style.display = "block";
                if (loadMoreBtn.style.display === "block") {
                    loadMoreBtn.style.display = "none"
                }

            }

        }
        else {
            imageContainer.innerHTML = `<h2>No Images Found</h2>`
        }
    }
    catch (error) {
        imageContainer.innerHTML = `<h2>Faild to fetch images.Plese try again later...</h2>`
    }

}

// Adding event listner to search form(Submit process 1)
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();

    if (inputText !== "") {
        // page start from 1
        page = 1;
        fetchImages(inputText, page);
    } else {
        imageContainer.innerHTML = `<h2>Search your image query</h2>`;
        if (loadMoreBtn.style.display === "block") {
            loadMoreBtn.style.display = "none"
        }
    }
})

// Adding event listner to search icon(Submit process 2)
materialSymbolsOutlined.addEventListener("click", (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();

    if (inputText !== "") {
        // page start from 1
        page = 1;
        fetchImages(inputText, page);
    } else {
        imageContainer.innerHTML = `<h2>Search your image query</h2>`;
        if (loadMoreBtn.style.display === "block") {
            loadMoreBtn.style.display = "none"
        }
    }
})

// Adding event listner to Load more Btn
loadMoreBtn.addEventListener("click", () => {
    fetchImages(searchInput.value.trim(), ++page);
})
// 1hrs:00 YT