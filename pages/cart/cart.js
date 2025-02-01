const mainElement = document.querySelector('.main');

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
    if (total > 200000) {
        total = total - (total * 0.1);
    }
    if (total > 500000) {
        total = total - (total * 0.2);
    }
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

// ----------inner-section1----------
const section1 = () => {
    const section1Element = mainElement.querySelector('.section-cart');
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const section1Template = `
    <div class="container">
        <div class="inner-title">
            <h2 class="text-start">Giỏ hàng của bạn</h2>
        </div>
        <table class="inner-list-product">
            <thead>
                <tr>
                    <th colspan="2">Thông tin sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                </tr>
            </thead>
            <tbody>
                ${cart.map(item => `
                <tr>
                    <td colspan="2">
                        <div class="inner-product">
                            <div class="inner-image">
                                <a href="../dishDetails/?id=${item.id}">
                                    <img src=${item.image} alt='${item.name}'>
                                </a>
                            </div>
                            <div class="inner-content">
                                <h3>
                                    <a href="../dishDetails/?id=${item.id}">
                                        ${item.name}
                                    </a>
                                </h3>
                                <button class="inner-button-remove" id=${item.id}>
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span>${item.price.toLocaleString()}đ</span>
                    </td>
                    <td>
                        <div class="inner-quantity">
                            ${item.quantity}
                        </div>
                    </td>
                    <td>
                        <span>${(item.price * item.quantity).toLocaleString()}đ</span>
                    </td>
                </tr>
                `).join('')}
            </tbody>
        </table>
        <div class="inner-total">
            <div class="inner-total-content">
                <h3>
                    Tổng cộng: <span>${getTotalPrice2(cart).toLocaleString()}đ</span>
                </h3>
            </div>
            <div class="inner-total-button">
                <a href="../checkout/" class="btn btn-primary">Thanh toán</a>
            </div>
        </div>
    </div>
    `;

    if (section1Element) {
        section1Element.innerHTML = section1Template;

        const buttonRemove = section1Element.querySelectorAll('.inner-button-remove');
        buttonRemove.forEach((button) => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('id');
                const idFinal = parseInt(id);
                const newCart = cart.filter(item => item.id !== idFinal);
                localStorage.setItem("cart", JSON.stringify(newCart));
                rederCart2();
                section1();
            });
        });
    }
}
section1();
// ----------end section 1----------
