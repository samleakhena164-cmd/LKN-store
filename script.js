
const products = [
    { id: 1, name: 'Type of bedroom', price: 20, icon: 'fa-microchip', category: 'Quality' ,image: "https://i.pinimg.com/1200x/06/9d/cd/069dcda86a4d7d15d85c10505799c45c.jpg"},
    { id: 2, name: ' Type of kitchen room', price: 10, icon: 'fa-microchip', category: 'Quality',image:"https://i.pinimg.com/736x/e2/d3/14/e2d314e556be83b3ec882539f87d2759.jpg" },
    { id: 3, name: 'Type of booK', price: 10, icon: 'fa-tv', category: 'Quality',image:"https://i.pinimg.com/736x/9f/a8/f9/9fa8f912402520868ddf9bdb5d1a9641.jpg" },
    { id: 4, name: 'Type of Orgernize', price: 5, icon: 'fa-tv', category: 'Quality' ,image:"https://i.pinimg.com/736x/8b/73/5a/8b735af84265d2c5e3a488fdd3f1dd60.jpg"},
    { id: 5, name: 'Type of Table', price: 25, icon: 'fa-memory', category: 'Quality',image:"https://i.pinimg.com/736x/1e/65/62/1e6562a1968634ffa0113c96b0d8d835.jpg" },
    { id: 6, name: 'Type of cleaning tools', price: 3, icon: 'fa-hdd', category: 'Quality',image:"https://i.pinimg.com/1200x/a1/5e/c2/a15ec267abe7af11e3cec50227c5cdf2.jpg" },
];


const grid = document.getElementById('productGrid');
function renderProducts() {
    grid.innerHTML = '';
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
                    <img src="${p.image}" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <div class="price">$${p.price} <small>${p.category}</small></div>
                    <button class="btn-order" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}">
                        <i class="fas fa-cart-plus"></i> Order
                    </button>
                `;
        grid.appendChild(card);
    });

    document.querySelectorAll('.btn-order').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const name = this.dataset.name;
            const price = this.dataset.price;
            openOrderModal(name, price);
        });
    });
}

const modal = document.getElementById('orderModal');
const modalProductName = document.getElementById('modalProductName');
const closeModalBtn = document.getElementById('closeModalBtn');
const orderForm = document.getElementById('orderForm');

function openOrderModal(productName, price) {
    modalProductName.textContent = `Product: ${productName} ($${price})`;
    modal.classList.add('active');
    orderForm.reset();
    orderForm.dataset.product = productName;
    orderForm.dataset.price = price;
}

function closeModal() {
    modal.classList.remove('active');
}

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
});


orderForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    const qty = document.getElementById('qtySelect').value;
    const product = this.dataset.product || 'PC component';
    const price = this.dataset.price || '0';

    if (!name || !phone || !address) {
        alert('Please fill all fields.');
        return;
    }


    const message = `🛒 *New Order from LKN Store*%0A` +
        `📦 Product: ${product}%0A` +
        `🔢 Qty: ${qty}%0A` +
        `💰 Price: $${price} each%0A` +
        `👤 Customer: ${name}%0A` +
        `📞 Phone: ${phone}%0A` +
        `📍 Address: ${address}%0A` +
        `📅 ${new Date().toLocaleString()}`;

    const token = '8972408115:AAHH7py6oG3CC1yJDN4N8o1ahH0howA_pF8';
    const chatId = '7921685220';  // Sam Leakhena's chat ID

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        const data = await response.json();
        if (data.ok) {
            alert('✅ Order placed! Notification sent to Telegram bot.');
            closeModal();
        } else {
            alert('❌ Telegram error: ' + (data.description || 'unknown error'));
        }
    } catch (error) {
        alert('⚠️ Network error. Please try again.');
        console.error(error);
    }
});

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you! Your message has been received (demo).');
    this.reset();
});


renderProducts();

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});