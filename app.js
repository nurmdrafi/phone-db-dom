// Global Variables
const spinner = document.getElementById('spinner');
const phoneContainer = document.getElementById('phones-container');
const phoneDetails = document.getElementById('phone-details');

// Load Phone Data from API
const loadPhones = () => {
const searchField = document.getElementById("search-box");
const searchText = searchField.value;
const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
fetch(url)
.then((res) => res.json())
.then((data) => displayPhones(data.data));

spinner.style.display = "block";
searchField.value = "";
phoneDetails.textContent = "";
};

// Display Phones
const displayPhones = (phones) => {
    if (phones.length === 0) {
        spinner.innerText = 'No result found';
        phoneContainer.textContent = "";
    } else{
        phoneContainer.textContent = "";
        spinner.innerText = 'Loading...';

        for(i = 0; i < phones.length; i++){
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                            <div class="card">
                                <img src="${phones[i].image}" alt="${phones[i].phone_name}" class="card-img-top w-50 mx-auto">
                                <div class="card-body text-center">
                                    <h3 class="card-title">${phones[i].phone_name}</h3>
                                    <h5>${phones[i].brand}</h5>
                                    <a href="#" class="btn btn-primary" onclick="loadDetails('${phones[i].slug}')">Details</a>
                                </div>
                            </div>
            `;
            phoneContainer.appendChild(div);

           if (i === 19) {    
               break;
           }
        }   
      spinner.style.display = "none";
    }   
};

// Load Phone Details
const loadDetails = (info) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${info}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
}

// Display Phone Details
const displayDetails = (details) =>{
    phoneDetails.textContent = "";
    const div = document.createElement('div');
    div.classList.add('w-50', 'mx-auto');
    const mainFeatures = `
    <img src="${details.image}" alt="${details.name}" class="card-img-top d-block mx-auto mb-3" style="max-width: 300px;">
    <h2>${details.name}</h2>
    <p class="text-muted">${details.releaseDate ? details.releaseDate : "No release date found"}</p><br>
    <p class="text-danger fw-bold">Main Features</p>
    <p><span class="fw-bold">ChipSet:</span> ${details.mainFeatures.chipSet}</p>
    <p><span class="fw-bold">Display Size:</span> ${details.mainFeatures.displaySize}</p>
    <p><span class="fw-bold">Memory:</span> ${details.mainFeatures.memory}</p>
    <p><span class="fw-bold">Sensors:</span> ${details.mainFeatures.sensors.join(", ")}</p><br>
    `;

    if(!details.others){
        div.innerHTML = `${mainFeatures}`;

    } else if(details.others){
        div.innerHTML = `
        ${mainFeatures}
        <p class="text-danger fw-bold">Other Features</p>
        <p><span class="fw-bold">Bluetooth:</span> ${details.others.Bluetooth}</p>
        <p><span class="fw-bold">GPS:</span> ${details.GPS}</p>
        <p><span class="fw-bold">NFC:</span> ${details.others.NFC}</p>
        <p><span class="fw-bold">Radio:</span> ${details.others.Radio}</p>
        <p><span class="fw-bold">USB:</span> ${details.USB}</p>
        <p><span class="fw-bold">WLAN:</span> ${details.others.WLAN}</p>
        `;
    }
    phoneDetails.appendChild(div);

}