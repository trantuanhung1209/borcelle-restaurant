const mainElement = document.querySelector('.main');
const isLogin = localStorage.getItem('isLogin');
const isLoginFinal = JSON.parse(isLogin);
// ------------checkout--------------
const  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

const validatePhoneNumber = (phoneNumber) => {
    const re = /^[0-9]{10}$/;
    return re.test(phoneNumber);
}

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

    let discount = 0;
    let flag = 0;

    if (total > 200000 && total <= 500000) {
        discount = 0.1;
        flag = 10;
    } else if (total > 500000) {
        discount = 0.2;
        flag = 20;
    }

    const finalTotal = total - (total * discount);
    
    return {
        total: finalTotal.toLocaleString() + "đ",
        flag: `Giảm giá ${flag}%`
    };
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

            const innerRemove = document.querySelectorAll(".inner-remove");
            if (innerRemove) {
                innerRemove.forEach(item => {
                    item.addEventListener("click", (e) => {
                        e.stopPropagation();
                        const id = item.getAttribute("id");
                        const idFinal = parseInt(id);
                        const newCart = cart.filter(product => product.id !== idFinal);
                        localStorage.setItem("cart", JSON.stringify(newCart));
                        rederCart();
                    });
                });
            }

            const innerButtonCheckout = document.querySelector(".inner-button-checkout");
            console.log(innerButtonCheckout);
            if (innerButtonCheckout) {
                innerButtonCheckout.addEventListener("click", (e) => {
                    e.stopPropagation();
                    window.location.href = "../checkout/";
                });
            }
            
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

const innerLeft = () => {
    const innerLeftElement = mainElement.querySelector('.inner-left');

    const leftTemplate = `
    <h2 class="inner-title">
        Thông tin nhận hàng
    </h2>

    <div class="inner-content">
        <form class="inner-form">
            <fieldset class="inner-form-group">
                <input type="email" name="email" id="email" placeholder="Email" autocomplete="off">
            </fieldset>

            <fieldset class="inner-form-group">
                <input type="text" name="fullName" id="fullName" placeholder="Họ và tên" autocomplete="off">
            </fieldset>

            <fieldset class="inner-form-group">
                <input type="number" name="phoneNumber" id="phoneNumber" placeholder="Số điện thoại" autocomplete="off">
            </fieldset>

            <fieldset class="inner-form-group">
                <input type="text" name="address" id="address" placeholder="Địa chỉ" autocomplete="off">
            </fieldset>
        </form>

        <div class="inner-method-check">
            <h2 class="inner-title-check">
                Phương thức thanh toán
            </h2>

            <div class="inner-check">
                <input type="checkbox" name="payment" id="payment1" value="payment1">
                <label for="payment1">Thanh toán khi nhận hàng</label>
            </div>
        </div>
    </div>
    `;

    if (innerLeftElement) {
        innerLeftElement.innerHTML = leftTemplate;

        const innerForm = innerLeftElement.querySelector('.inner-form');
        const emailElement = innerForm.querySelector('#email');
        const fullNameElement = innerForm.querySelector('#fullName');
        const phoneNumberElement = innerForm.querySelector('#phoneNumber');


        if (isLoginFinal) {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            emailElement.value = user.email;
            fullNameElement.value = user.fullName;
            phoneNumberElement.value = user.phoneNumber;
        } else {
            innerForm.reset();
        }
    }
}
innerLeft();

const innerRight = () => {
    const innerRightElement = mainElement.querySelector('.inner-right');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const rightTemplate = `
    <h2 class="inner-title">
        Đơn hàng của bạn có (${cart.length} sản phẩm)
    </h2>

    <div class="inner-order-summary">
        ${cart.map(item => `
        <div class="inner-item">
            <div class="inner-image">
                <img src=${item.image} alt=${item.name}>

                <div class="inner-quantity">
                    <span>${item.quantity}</span>
                </div>
            </div>

            <div class="inner-name">
                ${item.name}
            </div>

            <div class="inner-price">
                ${item.price.toLocaleString()}đ
            </div>
        </div>
        `).join('')}
    </div>

    <div class="inner-discount">
        <span>${getTotalPrice2(cart).flag}</span>
    </div>

    <div class="inner-total-price">
        <span>Tổng cộng:</span>
        <span>${getTotalPrice2(cart).total}</span>
    </div>

    <div class="inner-action">
        <a href="../menu/">
            <i class="fa-solid fa-chevron-left"></i>
            Quay lại mua hàng
        </a>
        <button class="inner-button">Đặt hàng</button>
    </div>
    `;

    if (innerRightElement) {
        innerRightElement.innerHTML = rightTemplate;

        const innerButton = innerRightElement.querySelector('.inner-button');
        const innerForm = mainElement.querySelector('.inner-form');

        innerButton.onclick = () => {
            const emailElement = innerForm.querySelector('#email');
            const fullNameElement = innerForm.querySelector('#fullName');
            const phoneNumberElement = innerForm.querySelector('#phoneNumber');
            const addressElement = innerForm.querySelector('#address');
            const paymentElement = mainElement.querySelector('.inner-check input');
            const payment1 = mainElement.querySelector('.inner-check label');

            if (cart.length === 0) {
                alert('Giỏ hàng của bạn đang trống');
                return;
            } else {
                if (!validateEmail(emailElement.value) || !emailElement.value) {
                    alert('Email không hợp lệ');
                    return;
                }
    
                if (!fullNameElement.value) {
                    alert('Vui lòng nhập họ và tên');
                    return;
                }
    
                if (!phoneNumberElement.value || !validatePhoneNumber(phoneNumberElement.value)) {
                    alert('Số điện thoại không hợp lệ');
                    return;
                }
    
                if (!addressElement.value) {
                    alert('Vui lòng nhập địa chỉ');
                    return;
                }
    
                if (!paymentElement.checked) {
                    alert('Vui lòng chọn phương thức thanh toán');
                    return;
                }
    
                const order = {
                    email: emailElement.value,
                    fullName: fullNameElement.value,
                    phoneNumber: phoneNumberElement.value,
                    address: addressElement.value,
                    payment: payment1.textContent,
                    cart: cart,
                    quantityTotal: getQuantityTotal2(cart),
                    totalPrice: getTotalPrice2(cart)
                };
    
                const orders = JSON.parse(localStorage.getItem('orders')) || [];
                orders.push(order);
                localStorage.setItem('orders', JSON.stringify(orders));
    
                localStorage.removeItem('cart');
                rederCart2();
                innerRight();
                alert('Đặt hàng thành công');
                window.location.href = '../thankyou/';
            }
        };
    }
}
innerRight();
// ------------end checkout--------------