const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const response = await fetch(url);
    const data = await response.json();
    displayCategories(data.data.news_category);
}

const displayCategories = (categories) => {
    const getCategory = document.getElementById('get-category');
    categories.forEach(category => {
        parentDiv = document.createElement('div');
        parentDiv.innerHTML = `
        <button onclick="loadNews('${category.category_id}')" class="text-decoration-none category-link-custom" style="border:none;">${category.category_name}</button>
        `;

        getCategory.appendChild(parentDiv);
    });
}


const loadNews = async id => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.data);
}


const displayNews = (news) => {
    const displayNews = document.getElementById('display-news');
    displayNews.textContent = '';

    //total news count
    const totalNews = document.getElementById('total-news');
    totalNews.innerText = news.length;

    //not found//
    const notFound = document.getElementById("not-found");
    if (news.length===0){
       notFound.classList.remove('d-none');
    }
    else {
       notFound.classList.add('d-none');
 
    }
        
    news.forEach(singleNews => {
        parentDiv = document.createElement('div');
        parentDiv.innerHTML = `
        <div class="card mb-3 border border-0 rounded rounded-3">
                <div class="row g-0">
                  <div class="col-md-3">
                    <img src="${singleNews.thumbnail_url ? singleNews.thumbnail_url : 'No Data Found'}" class="img-fluid rounded-start p-3" alt="...">
                  </div>
                  <div class="col-md-9">
                    <div class="card-body p-4">
                      <h5 class="card-title fw-bold">${singleNews.title ? singleNews.title : 'No Data Found'}</h5>
                      <p class="card-text text-muted">${singleNews.details.slice(0,250) ? singleNews.details.slice(0,250) : 'No Data Found'}....</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center p-4">
                        <div class="d-flex justify-content-center align-content-center">
                            <div>
                                <img class="img-fluid me-3" src="${singleNews.author.img ? singleNews.author.img : 'No Data Found'}" alt="Blog Profile" style="width:40px; height:40px;">
                            </div>
                            <div>
                                <h5 class="h6 text-muted fw-bold mb-0">${singleNews.author.name ? singleNews.author.name : 'No Data Found'}</h5>
                                <small class="text-muted">${singleNews.author.published_date ? singleNews.author.published_date : 'No Data Found'}</small>
                            </div>
                        </div>
                        <div>
                            <p class="mt-3 text-muted fw-bold"><i class="fa-regular fa-eye"></i> ${singleNews.total_view ? singleNews.total_view : 'No Data Found'}</p>
                        </div>
                        <div>
                            <i class="fa-regular fa-star text-muted"></i>
                            <i class="fa-regular fa-star text-muted"></i>
                            <i class="fa-regular fa-star text-muted"></i>
                            <i class="fa-regular fa-star text-muted"></i>
                            <i class="fa-regular fa-star text-muted"></i>
                        </div>
                        <div>
                            <button onclick="detailsNews('${singleNews._id}')" style="border: none; background-color: white;" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right custom-arrow-color"></i></button> 
                        </div>
                    </div>
                  </div>
                </div>
              </div>
        `;

        displayNews.appendChild(parentDiv);
    });
    toggleSpinner(false);
}

const detailsNews = async news_id => { 
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const response = await fetch(url);
    const data = await response.json();
    displayDetailsNews(data.data);
}

const displayDetailsNews = (newDetail) => {
    const modalBody = document.getElementById('modal-data');
    modalBody.textContent = '';

    newDetail.forEach(detail => {
        parentDiv = document.createElement('div');
        parentDiv.innerHTML = `
        <div class="d-flex justify-content-center align-items-center">
            <img src="${detail.thumbnail_url ? detail.thumbnail_url : 'No Data Found'}" class="img-fluid">
        </div>
        <div class="text-center">
            <h3 class="fw-bold" style="font-size: 16px; margin-top: 10px;">${detail.title ? detail.title : 'No Data Found'}</h3>
        </div>
        <div>
            <p class="text-muted text-center" style="font-size: 14px;">${detail.details ? detail.details : 'No Data Found'}</p>
        </div>
        `;
        modalBody.appendChild(parentDiv);
    })
    
}

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById("loader");
    if(isLoading) {
      loaderSection.classList.remove('d-none');
    }
    else {
      loaderSection.classList.add('d-none');
  
    }
}

loadCategories()
// loadNews()