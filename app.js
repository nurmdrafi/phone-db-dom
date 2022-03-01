// Global Variables
const phoneContainer = document.getElementById('phones-container');

// Load Phone Data from API
const loadPhones = () => {
  const searchText = document.getElementById("search-box").value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data));
};

// Display Phones
const displayPhones = (phones) => {
  phones.forEach(phone =>{
      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML = `
                    <div class="card">
                        <img src="${phone.image}" alt="" class="card-img-top w-75 mx-auto">
                        <div class="card-body text-center">
                            <h3 class="card-title">${phone.phone_name}</h3>
                            <h5>${phone.brand}</h5>
                            <button class="btn btn-primary" onclick="loadDetails('${phone.slug}')">Details</button>
                        </div>
                    </div>
      `;
      phoneContainer.appendChild(div);
  })
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
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = "";
    const div = document.createElement('div');
    div.classList.add('w-50', 'mx-auto');
    if(!details.others){
    div.innerHTML = `
        <h2>${details.name}</h2>
        <p class="text-muted">${details.releaseDate ? details.releaseDate : "No release date found"}</p><br>
        <p class="text-danger fw-bold">Main Features</p>
        <p><span class="fw-bold">ChipSet:</span> ${details.mainFeatures.chipSet}</p>
        <p><span class="fw-bold">Display Size:</span> ${details.mainFeatures.displaySize}</p>
        <p><span class="fw-bold">Memory:</span> ${details.mainFeatures.memory}</p>
        <p><span class="fw-bold">Sensors:</span> ${details.mainFeatures.sensors.join(", ")}</p><br>
        `;

    } else if(details.others){
        div.innerHTML = `
        <h2>${details.name}</h2>
        <p class="text-muted">${details.releaseDate ? details.releaseDate : "No release date found"}</p><br>
        <p class="text-danger fw-bold">Main Features</p>
        <p><span class="fw-bold">ChipSet:</span> ${details.mainFeatures.chipSet}</p>
        <p><span class="fw-bold">Display Size:</span> ${details.mainFeatures.displaySize}</p>
        <p><span class="fw-bold">Memory:</span> ${details.mainFeatures.memory}</p>
        <p><span class="fw-bold">Sensors:</span> ${details.mainFeatures.sensors.join(", ")}</p><br>
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