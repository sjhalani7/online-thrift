const urlParams = new URLSearchParams(window.location.search);
const storeId = urlParams.get("id");

function fetchStoreItems() {
    fetch(`/api/stores/${storeId}/items`)
        .then((res) => res.json())
        .then((items) => {
            const container = document.querySelector(".items-container");
            container.innerHTML = "";
            items.forEach((item) => {
                const card = document.createElement("div");
                card.className = "item-card";
                card.innerHTML = `
                    <img src="${item.image_url}" alt="${item.name}">
                    <h4>${item.name}</h4>
                    <p>$${item.price}</p>
                `;
                card.onclick = () => openItemPopup(item.name, `$${item.price}`, item.description, item.image_url);
                container.appendChild(card);
            });
        });
}

function fetchStoreInfo() {
    fetch("/api/stores")
        .then((res) => res.json())
        .then((stores) => {
            const store = stores.find((s) => s.id == storeId);
            if (store) {
                document.querySelector(".store-name").textContent = store.name;
                document.querySelector(".store-details").innerHTML = `
                    📍 ${store.address} &nbsp;|&nbsp;
                    🕒 ${store.hours} &nbsp;|&nbsp;
                    📸 <a href="#">@placeholder</a>
                `;
            }
        });
}

function openItemPopup(title, price, description, imgSrc) {
    document.getElementById('itemModal').style.display = 'flex';
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalPrice').innerText = price;
    document.getElementById('modalDescription').innerText = description;
    document.getElementById('modalImg').src = imgSrc;
}

function closeItemPopup() {
    document.getElementById('itemModal').style.display = 'none';
}

// Initial fetch
fetchStoreInfo();
fetchStoreItems();
