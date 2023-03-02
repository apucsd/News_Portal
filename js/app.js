let fetchData = [];
const loadData =async () =>{
    const URL = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(URL);
    const data = await res.json();
    displayNewsCategories(data.data)
}

const displayNewsCategories = (data) =>{
    // console.log(data.news_category);
    const news_category = data.news_category;
    // console.log(news_category);
    const container = document.getElementById('categories');
    news_category.forEach(singleCategory =>{
        const linkContainer = document.createElement('p');
        linkContainer.innerHTML += `
        <a onclick="fetchCategoryNews('${singleCategory.category_id}','${singleCategory.category_name}')" class= "nav-link" href="#">${singleCategory.category_name}</a>
     `; 

     container.appendChild(linkContainer)

    })
}
const fetchCategoryNews = async (category_id,category_name) => {
    const URL = `https://openapi.programming-hero.com/api/news/category/${category_id} `;
    const res = await fetch(URL);
    const data = await res.json();
    document.getElementById('items').innerText = data.data.length;
    document.getElementById('categories-item').innerText =category_name ? category_name : "Default Categories";
 showNews(data.data);
 fetchData = data.data;
}
const showNews = (news) =>{
  
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    news.forEach(singleNews =>{

        const {image_url,title,author,rating,details} = singleNews;
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card','mb-3');
        newsDiv.innerHTML = `
        <div class="row g-5">
                    <div class="col-md-4">
                        <img src="${image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${details.slice(0,150)}...</p>

                    <div class="row">
                     
                        <div class="col">
                        <div class="d-flex justify-content-center align-items-center gap-3"> <div>  <img style="width: 40px; height: 40px;" class="rounded-circle d-block" src="${author.img
                        }" alt=""></div>
                         <div> <p class="fw-bold">${author.name ? author.name:"NOT FOUND"}</p>
                         <p class="text-secondary">${author.published_date ? author.published_date: "NOT FOUND"}</p></div></div>
                   
                        </div>
        
                          <div class="col">
                          <i class="fa-solid fa-eye"></i>
                          <p class="card-text">${singleNews.total_view}</p>
                  
                          </div>
                          <div class="col text-warning">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half"></i>
                          </div>
                          <div  class="col text-primary text-end">
                            <i data-bs-toggle="modal" data-bs-target="#newsModal" onclick="showNewsDetails('${singleNews._id}')" style="cursor:pointer" class="fa-2x fa-solid fa-arrow-right"></i>
                           
                          </div>
                       </div>
                   
                        </div>
                      
                    </div>
                </div>
        
        
        `;
    newsContainer.appendChild(newsDiv);
      
    })
  
}
const showNewsDetails = async (_id) => {
   const URL = `https://openapi.programming-hero.com/api/news/${_id} `;
   const res =await fetch(URL);
   const data = await res.json();
   const newsDetails = data.data[0];
   ShowModalDetails(newsDetails)
}

const ShowModalDetails = (data) =>{

    document.getElementById('newsModalLabel').innerText = data.title;
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.innerHTML = `
    <img class="w-75 mx-auto text-center" src="${data.image_url}" alt="">
    <p>${data.details}</p>
    `;
}
const trendingAndTodaysPick = (todaysPick) =>{
   
    showNews(todaysPick);
    document.getElementById('items').innerText =todaysPick.length;
  
}
const showTodaysPick =() =>{
    const todaysPick = fetchData.filter(todaysPick =>todaysPick.others_info.is_todays_pick ===true);
    trendingAndTodaysPick(todaysPick);
  
}
const showTrending = () =>{
    const trending = fetchData.filter(trending =>trending.others_info.is_trending ===true);
    trendingAndTodaysPick(trending);

}
const sortBy = () =>{
    const selectCategoryID = document.getElementById('select-categori').value;
    // console.log(selectCategoryID)
    fetchCategoryNews(selectCategoryID)

}

loadData();