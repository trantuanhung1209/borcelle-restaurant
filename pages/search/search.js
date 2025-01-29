const mainElement = document.querySelector('.main');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchValue = urlParams.get('content');

// ------------cart--------------
const cart2 = JSON.parse(localStorage.getItem("cart")) || [];

const getQuantityTotal2 = (cart) => {
    let total = 0;
    cart.forEach(item => {
        total += item.quantity;
    });
    return total;
};

const getTotalPrice2 = (cart) => {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    return total.toLocaleString();
};

const rederCart2 = () => {
    const innerCart = document.querySelector(".inner-cart");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (innerCart) {
        if (cart.length > 0) {
            const cartTemplate = `
            
            <i class="fa-solid fa-shopping-cart"></i>
                            
                <div class="inner-quantity-total">
                    ${getQuantityTotal2(cart)}
                </div>

                <div class="inner-cart-box">
                    <div class="inner-list-product">
                        ${cart.map(item => `
                        <div class="inner-item">
                            <div class="inner-image">
                                <a href="../dishDetails/?id=${item.id}">
                                    <img src=${item.image} alt='${item.name}' />
                                </a>
                            </div>
                            <div class="inner-text">
                                <h3 class="inner-name">
                                    <a href="../dishDetails/?id=${item.id}">${item.name}</a>
                                </h3>
                                <p class="inner-quantity">
                                    Số lượng: ${item.quantity}
                                </p>
                            </div>
                            <div class="inner-action">
                                <p class="inner-price">
                                    ${(item.price * item.quantity).toLocaleString()}đ
                                </p>
                                <div class="inner-remove">
                                    <i class="fa-solid fa-trash"></i>
                                </div>
                            </div>
                        </div>
                        `).join('')}
                    </div>
                    <div class="inner-total">
                    <p>
                        <span>Tổng cộng:</span> 
                        <span>${getTotalPrice2(cart)}đ</span>
                    </p>
                    <div class="inner-button">
                        <div class="inner-button-checkout">
                            Thanh toán
                        </div>
                    </div>
                </div>
            </div>
            `;

            innerCart.innerHTML = cartTemplate;
            
        } else {
            const cartTemplate = `
            <div class="inner-empty">
                <i class="fa-solid fa-shopping-cart"></i>
            </div>
            `;

            innerCart.innerHTML = cartTemplate;
        }
    }
}
rederCart2();
// ------------end cart--------------

// ----------inner-right----------
const removeDuplicateProducts = (products) => {
    const seen = new Set(); // Tập hợp các tên sản phẩm đã gặp
    return products.filter(product => {
        if (seen.has(product.name)) {
            return false; // Bỏ qua sản phẩm nếu tên đã tồn tại
        }
        seen.add(product.name); // Thêm tên vào danh sách đã gặp
        return true; // Giữ sản phẩm
    });
};

const innerProductHtml = (dataProduct) => {
    const dataFinal = removeDuplicateProducts(dataProduct);
    return `
    ${dataFinal.map(item => `
        <div class="inner-product-item">
            <div class="inner-image">
                <a href="../dishDetails/?id=${item.id}">
                    <img src=${item.image} alt='${item.name}'>
                </a>

                <div class="inner-action">
                    <div class="inner-cart" id=${item.id}>
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                </div>
                ${item.discount? `
                <div class="inner-discount">
                    -9 <span>%</span>
                </div>
                ` : ``}
            </div>
            <div class="inner-content">
                <h3>
                    <a href="../dishDetails/?id=${item.id}" title='${item.name}'>
                        ${item.name}
                    </a>
                </h3>
                <div class="inner-price">
                    <div class="inner-new-price">
                        ${item.price.toLocaleString()}₫
                    </div>
                    ${item.originalPrice? `
                        <div class="inner-old-price">
                            ${item.originalPrice.toLocaleString()}₫
                        </div>
                    ` : ``}
                </div>
            </div>
            <a href="../dishDetails/?id=${item.id}" class="inner-button">
                Xem chi tiết
            </a>
        </div>
        `).join('')}
    `;
}

const innerRight = async () => {
    try {
        const response = await fetch('../../data/home/products.json');
        const dataProduct = await response.json();
        const dataSearch = dataProduct.products.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()));

        const innerRightElement = mainElement.querySelector('.inner-right');
        const innerRightTemplate = `
        <div class="inner-products">
            <div class="inner-top">
                <h2 class="inner-title">
                   Có ${dataSearch.length} kết quả tìm kiếm cho "${searchValue}"
                </h2>
            </div>
            <div class="inner-list-product">
                ${innerProductHtml(dataSearch)}
            </div>
        </div>
        `;

        if (innerRightElement) {
            innerRightElement.innerHTML = innerRightTemplate;

            const innerCart = document.querySelectorAll('.inner-action .inner-cart');
            console.log(innerCart);
            innerCart.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const id = item.getAttribute('id');
                    const idFinal = parseInt(id);
                    const product = dataProduct.products.find(item => item.id === idFinal);
                    if (product) {
                        const cart = JSON.parse(localStorage.getItem("cart")) || [];
                        const cartItem = cart.find(item => item.id === idFinal);
                        if (cartItem) {
                            cartItem.quantity += 1;
                            alert('Sản phẩm đã được thêm vào giỏ hàng');
                        } else {
                            cart.push({...product, quantity: 1});
                            alert('Sản phẩm đã được thêm vào giỏ hàng');
                        }
                        localStorage.setItem("cart", JSON.stringify(cart));
                        rederCart2();
                    } else {
                        alert('Sản phẩm không tồn tại');
                    }
                    
                });
            });
        }

    } catch (error) {
        console.error(error);
    }
}
innerRight();
// ----------end inner-right----------
