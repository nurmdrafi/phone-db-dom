// Load Data from API

// Global Variables
const phoneContainer = document.getElementById('phones-container');

const loadPhones = () => {
  const searchText = document.getElementById("search-box").value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data));
};

const displayPhones = (phones) => {
  phones.forEach(phone =>{
      const div = document.createElement('div');
      div.classList.add('col');
      console.log(div);
      div.innerHTML = `
                    <div class="card">
                        <img src="${phone.image}" alt="" class="card-img-top w-75 mx-auto">
                        <div class="card-body text-center">
                            <h3 class="card-title">${phone.phone_name}</h3>
                            <h5>${phone.brand}</h5>
                            <button classs="btn btn-primary" onclick="">Details</button>
                        </div>
                    </div>
      `;
      phoneContainer.appendChild(div);
  })
};
