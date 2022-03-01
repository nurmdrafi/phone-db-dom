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
    div.classList.add('w-50', 'mx-auto')
    div.innerHTML = `
        <h2>${details.name}</h2>
        <p>${details.releaseDate}</p><br>
        <p>Main Features</p>
        <p>ChipSet: ${details.mainFeatures.chipSet}</p>
        <p>Display Size: ${details.mainFeatures.displaySize}</p>
        <p>Memory: ${details.mainFeatures.memory}</p>
        <p>Sensors: ${details.mainFeatures.sensors.join(", ")}</p><br>
        <p>Other Features</p>
        <p>Bluetooth: ${details.others.Bluetooth}</p>
        <p>GPS: ${details.GPS}</p>
        <p>NFC: ${details.others.NFC}</p>
        <p>Radio: ${details.others.Radio}</p>
        <p>USB: ${details.USB}</p>
        <p>WLAN: ${details.others.WLAN}</p>
    `;
    phoneDetails.appendChild(div);
}