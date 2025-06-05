// Função para verificar se o usuário está autenticado
function isAuthenticated() {
    return localStorage.getItem('authenticated') === 'true';
}

// Função para atualizar a navbar com base no estado de autenticação
function updateNavbar() {
    const isLoggedIn = isAuthenticated();
    document.getElementById('login-item').classList.toggle('d-none', isLoggedIn);
    document.getElementById('signup-item').classList.toggle('d-none', isLoggedIn);
    document.getElementById('logout-item').classList.toggle('d-none', !isLoggedIn);
}

// Função para simular o login do usuário
function login() {
    localStorage.setItem('authenticated', 'true');
    updateNavbar();
}

// Função para simular o logout do usuário
function logout() {
    localStorage.setItem('authenticated', 'false');
    updateNavbar();
    window.location.href = 'index.html'; // Redireciona para a página principal após o logout
}

// Função para carregar produtos dinamicamente
const products = [
    { id: 1, name: "PS5", price: 4999.99, image: "img/ps5.png.webp" },
    { id: 2, name: "Xbox Series X", price: 4599.99, image: "img/xbox_seriesx.png" },
    { id: 3, name: "Controle DualSense PS5", price: 499.99, image: "img/dualsense-controller-product-thumbnail-01-en-14sep21.webp" },
    { id: 4, name: "Mouse Gamer", price: 249.99, image: "img/784912879_Mouse_Redragon_M987P-K_Reaping_Elite.png_1.png" },
    { id: 5, name: "Teclado Mecânico", price: 299.99, image: "img/teclado.webp" }
];

const cart = [];

// Função para carregar produtos
function loadProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">R$ ${product.price.toFixed(2)}</p>
                        <button class="btn btn-success" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

// Função para exibir o toast
function showToast(message) {
    const toastElement = document.getElementById('toast');
    const toastBody = document.getElementById('toast-body');
    toastBody.textContent = message;
    
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}

// Função para adicionar produto ao carrinho
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    document.getElementById('cart-count').textContent = cart.length;
    showToast(`${product.name} foi adicionado ao carrinho!`);
}

// Função para alternar o modo escuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Adiciona o evento de clique ao botão de modo escuro
document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);

// Carregar produtos e atualizar a navbar ao carregar a página
window.onload = function() {
    loadProducts();
    updateNavbar();
};
