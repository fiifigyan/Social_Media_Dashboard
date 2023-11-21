// check for saved 'lightMode' in localStorage
let lightMode = localStorage.getItem('light'); 
const body = document.body;
const lightModeToggle = document.querySelector('#light');
const lightBtn = 'lightBtn.svg'
const darkBtn = 'darkBtn.svg'

const enableLightMode = () => {
  // 1. Add the class to the body
  document.body.classList.add('light');
  // 2. Update lightMode in localStorage
  localStorage.setItem('lightMode', 'enabled');
}

const disableLightMode = () => {
  // 1. Remove the class from the body
  document.body.classList.remove('light');
  // 2. Update lightMode in localStorage 
  localStorage.setItem('lightMode', null);
}
 
// If the user already visited and enabled lightMode
// start things off with it on
if (lightMode === 'light-mode') {
  image.src = lightBtn;
  body.classList.toggle('light');

} 

// When someone clicks the button
lightModeToggle.addEventListener('click', () => {
  if(image.src.endsWith(darkBtn)){
            image.src = lightBtn;
  }
  else{
            image.src = darkBtn;
      }

    body.classList.toggle('light');
       
    if(image.src.endsWith(lightBtn)){
      localStorage.setItem('light', 'light-mode');
    }
    else if(image.src.endsWith(darkBtn)){
      localStorage.setItem('light', 'dark-mode');
    }
});

const fetchData = (url, callback) =>{
  // Create a new XMLHttpRequest object
  const http = new XMLHttpRequest();
  // Open a GET request to the specified URL
  http.open('get', url, true);
  // Define an event handler for when the request state changes
  http.onreadystatechange = function(){
    // Check if the request is complete (readyState 4 means request is finished and response is ready) 
    //and if the status is OK (HTTP status 200 means request is "OK")
    if(this.readyState == 4 && http.status == 200){
      // Parse the response text as JSON
      const data = JSON.parse(http.responseText);
      // Call the callback function with the parsed data as an argument
      callback(data); 
    }
  }
  // Send the HTTP request
  http.send();
};

document.addEventListener('DOMContentLoaded', () =>{
  fetchData('data.json', (data) =>{
    const mediaContainer = data ['media-banner'];
    const overviewContainer = data ['overview-container'];

    let sectionHTML = "";
    mediaContainer.forEach((banner) => {
      sectionHTML +=`
        <div class = "media-banner" id="${banner["media_id"]}" style="border-top:${banner["border_color"]}">
          <div class="media-icon">
            <img src="${banner["media_logo"]}">
            <p id="username">${banner["username"]}</p>
          </div>
          <div class="followers">
            <div id="follower">${banner["followers"]}</div>
            <p id="follow">${banner["follow_text"]}</p>
          </div>

          <div class="count">
            <span class="arrow-direction" id="${banner["arrow_id"]}"></span>
            <p class="counttoday" style="color: ${banner["count_today_color"]}">${banner["count_today"]}</p>
          </div>
        </div>`;
    });
    document.querySelector('.media-container').innerHTML = sectionHTML;

    let overviewHTML = "";
    overviewContainer.forEach((card) => {
      overviewHTML +=`
      <div class="overview-banner">
        <div id="countheader">
            <h3>${card["metric"]}</h3>
            <img src="${card["media_logo"]}">
        </div>
        
        <div id="countnumber">
            <p id="countdigit">${card["count_digit"]}</p>
            <div id="countup">
                <span class="arrow-direction" id="${card["arrow_id"]}" style="color:${card["countup_color"]}"></span>
                <p class="increment" id="inc-1" style="color:${card["countup_color"]}">${card["increment"]}</p>
            </div>
        </div>
      </div>`;
    });
    document.querySelector('.overview-container').innerHTML = overviewHTML;

  });

});