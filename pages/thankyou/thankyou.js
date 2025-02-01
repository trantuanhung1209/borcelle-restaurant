const mainElement = document.querySelector('.main');
const orders = JSON.parse(localStorage.getItem('orders'));
const order = orders[orders.length - 1];

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

// --------------inner left----------------
const innerLeft = () => {

    const innerLeftElement = document.querySelector('.inner-left');
    const innerLeftTemplate = ` 
    <div class="inner-logo">
        <a href="../home/">
            Borcelle Restaurant
        </a>
    </div>

    <div class="inner-title">
        <div class="inner-checked">
            <img src="../../assets/images/svgImage/check-mark-svgrepo-com.svg" alt="">
        </div>

        <div class="inner-content">
            <h1>Cảm ơn bạn đã đặt hàng tại Borcelle Restaurant</h1>
            <p>Chúng tôi đã nhận được thông tin đặt bàn của bạn và sẽ liên hệ với bạn trong thời
                gian sớm nhất.</p>
        </div>
    </div>

    <div class="inner-order-info">
        <div class="inner-info-group">
            <h2>
                Thông tin mua hàng
            </h2>
            <div class="inner-user-infor">
                <p>${order.fullName}</p>
                <p>${order.email}</p>
                <p>${order.phoneNumber}</p>
            </div>
        </div>

        <div class="inner-info-group">
            <h2>
                Địa chỉ nhận hàng
            </h2>
            <div class="inner-user-infor">
                <p>${order.fullName}</p>
                <p>${order.address}</p>
                <p>${order.phoneNumber}</p>
            </div>
        </div>

        <div class="inner-info-group">
            <h2>
                Phương thức thanh toán
            </h2>
            <div class="inner-user-infor">
                <p>${order.payment}</p>
            </div>
        </div>

        <div class="inner-info-group">
            <h2>
                Phương thức vận chuyển
            </h2>
            <div class="inner-user-infor">
                <p>Giao hàng tận nơi</p>
            </div>
        </div>
    </div>


    <div class="inner-action">
        <a href="../home/" class="inner-btn">Quay lại trang chủ</a>
        <div class="inner-print">
            <a href="#" class="inner-btn" onclick="window.print()">In thông tin đặt hàng</a>
        </div>
    </div>
    `;

    if  (innerLeftElement) {
        innerLeftElement.innerHTML = innerLeftTemplate;
    }
}
innerLeft();
// --------------end inner left----------------

// --------------inner right----------------
const innerRight = () => {
    const cart = order.cart;

    const innerRightElement = document.querySelector('.inner-right');
    const innerRightTemplate = `
    <h2 class="inner-title">
        Đơn hàng của bạn có (${getQuantityTotal2(cart)} sản phẩm)
    </h2>

    <div class="inner-order-summary">
        ${cart.map(item => `
        <div class="inner-item">
            <div class="inner-image">
                <img src=${item.image} alt='${item.name}'>

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
    `;

    if  (innerRightElement) {
        innerRightElement.innerHTML = innerRightTemplate;
    }
}
innerRight();
// --------------end inner right----------------