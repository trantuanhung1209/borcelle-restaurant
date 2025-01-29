const mainElement = document.querySelector('.main');
const url = new URL(window.location.href);
const id = url.searchParams.get('id');
const idFinal = parseInt(id);

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

// ------------breadcumb----------------
const breadCumb = async () => {
    const response = await fetch('../../data/home/products.json');
    const data = await response.json();
    const dataItem = data.products.find(item => item.id === idFinal);

    const breadCumbElement = mainElement.querySelector('.inner-breadcumb');
    const breadCumbTemplate = `
    <div class="container ">
        <ul class="breadcumb m-0 py-3 d-flex gap-2 list-unstyled">
            <li>
                <a href="../../index.html">Trang chủ</a>
            </li>
            <li>
                <i class="fas fa-angle-right"></i>
            </li>
            <li>
                <a href="../topDishes/">Món ăn nổi bật</a>
            </li>
            <li>
                <i class="fas fa-angle-right"></i>
            </li>
            <li>
                <a href="#" style="color: var(--background-color-button);">${dataItem.name}</a>
            </li>
        </ul>
    </div>
    `;

    breadCumbElement.innerHTML = breadCumbTemplate;
    document.querySelector('title').textContent = dataItem.name;
}
breadCumb();
// ------------end breadcumb----------------

// ------------inner-left----------------
const innerLeftTop = async () => {
    const response = await fetch('../../data/home/products.json');
    const data = await response.json();
    const dataItem = data.products.find(item => item.id === idFinal);

    const innerTopElement = mainElement.querySelector('.inner-left-top');
    const innerTopTemplate = `
    <div class="inner-wrap row">
        <div class="inner-image col-5">
            <img src=${dataItem.image} alt='${dataItem.name}'>
        </div>
        <div class="inner-content col-7">
            <h2 class="inner-title" title='${dataItem.name}'>
                ${dataItem.name}
            </h2>
            <div class="inner-price">
                <p class="inner-new-price">
                    ${dataItem.price.toLocaleString()}₫
                </p>
                ${dataItem.originalPrice ? `<p class="inner-old-price">${dataItem.originalPrice}₫</p>` : ''}
                ${dataItem.originalPrice ? `<p class="inner-save-price">Tiết kiệm: ${(dataItem.originalPrice - dataItem.price).toLocaleString()}</p>` : ''}
            </div>
            <div class="inner-action">
                <div class="quantity-selector">
                    <label for="quantity">Số lượng:</label>
                    <div class="inner-button-input">
                        <button class="quantity-btn" id="decrease">-</button>
                        <input type="number" id="quantity" value="1" min="1" />
                        <button class="quantity-btn" id="increase">+</button>
                    </div>
                </div>

                <div class="inner-button row gap-2">
                    <button class="inner-button-add col-5" id=${idFinal}>
                        <i class="fas fa-cart-plus"></i>
                        Thêm vào giỏ hàng
                    </button>
                    <a href="../order/" class="inner-button-order col-5">
                        Đặt bàn tại đây
                    </a>
                </div>
            </div>

            <div class="inner-voucher">
                <div class="inner-voucher-title">
                    <i class="fas fa-gift"></i>
                    <span>Ưu đãi</span>
                </div>
                <div class="inner-voucher-content">
                    <ul>
                        <li>
                            <i class="fas fa-check"></i>
                            <span>Giảm giá 10% cho hóa đơn từ 200.000₫</span>
                        </li>
                        <li>
                            <i class="fas fa-check"></i>
                            <span>Giảm giá 20% cho hóa đơn từ 500.000₫</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `;

    if (innerTopElement) {
        innerTopElement.innerHTML = innerTopTemplate;

        // const quantityInput = document.getElementById('quantity');
        // const decreaseBtn = document.getElementById('decrease');
        // const increaseBtn = document.getElementById('increase');

        // decreaseBtn.addEventListener('click', () => {
        //     const value = parseInt(quantityInput.value);
        //     if (value > 1) {
        //         quantityInput.value = value - 1;
        //     } else {
        //         quantityInput.value = 1;
        //     }
        // });

        // increaseBtn.addEventListener('click', () => {
        //     const value = parseInt(quantityInput.value);
        //     quantityInput.value = value + 1;
        //     quantity = value + 1;
        // });

        // const addToCartBtn = document.querySelector('.inner-button-add');
        // addToCartBtn.addEventListener('click', () => {
        //     console.log('click');
        // });
        
    }
};
innerLeftTop();
// ------------end inner-left top----------------

// ------------inner-left bottom----------------
const innerLeftBottom = async () => {
    const response = await fetch('../../data/home/products.json');
    const data = await response.json();
    const dataItem = data.products.find(item => item.id === idFinal);

    const innerBottomElement = mainElement.querySelector('.inner-left-bottom');
    const innerBottomTemplate = `
    <ul>
        <li>
            <h3 class="inner-title">
                Mô tả món ăn
            </h3>
        </li>
    </ul>
    <div class="inner-description">
        <p>
            ${dataItem.name} là món ăn được các đầu bếp dành nhiều thời gian dày công chế biến. Nhà hàng Borcelle tự hào mang đến thực đơn đa dạng, phong phú với sự kết hợp tinh tế giữa ẩm thực truyền thống và hiện đại. Từng món ăn tại Borcelle đều được chế biến từ các nguyên liệu tươi ngon, được lựa chọn kỹ lưỡng để đảm bảo chất lượng và hương vị tuyệt hảo. Đầu bếp tài hoa của chúng tôi luôn chú trọng từng chi tiết, từ cách nêm nếm, trang trí cho đến việc cân bằng dinh dưỡng, mang lại trải nghiệm ẩm thực hoàn hảo cho thực khách
        <h3>
            Nguyên liệu:
        </h3>
        <p>
            Nhà hàng Borcelle luôn cam kết sử dụng những nguyên liệu tươi ngon và chất lượng nhất để chế biến các món ăn. Rau củ và trái cây được tuyển chọn từ những nguồn cung ứng uy tín, đảm bảo độ tươi mới và an toàn vệ sinh thực phẩm. Các loại thịt và hải sản được nhập khẩu hoặc thu mua từ những nhà cung cấp đáng tin cậy, giữ được sự tươi ngon tự nhiên. Gia vị được sử dụng đa phần là gia vị nguyên bản, thơm ngon, có nguồn gốc rõ ràng, mang lại hương vị đậm đà và trọn vẹn cho từng món ăn. Từng nguyên liệu tại Borcelle đều được xử lý cẩn thận và kỹ lưỡng, không chỉ đảm bảo an toàn cho sức khỏe mà còn giữ được giá trị dinh dưỡng tối đa. Chính sự chú trọng trong việc chọn lọc nguyên liệu đã làm nên nét khác biệt và đặc trưng của ẩm thực Borcelle.
        </p>
        <h3>
            Khẩu phần:
        </h3>
        <p>
            1 người ăn
        </p>
        <h3>
            Năng lượng :
        </h3>
        <p>
            Protein - 28.33, Carbs - 24.93, Fats - 8.97 (Total Kcal - 293.77)
        </p>
    </div>
    `;

    if (innerBottomElement) {
        innerBottomElement.innerHTML = innerBottomTemplate;

        const addToCartBtn = document.querySelector('.inner-button-add');
        const quantityInput = document.getElementById('quantity');
        const decreaseBtn = document.getElementById('decrease');
        const increaseBtn = document.getElementById('increase');

        decreaseBtn.addEventListener('click', () => {
            const value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            } else {
                quantityInput.value = 1;
            }
        });

        increaseBtn.addEventListener('click', () => {
            const value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
            quantity = value + 1;
        });

        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const item = cart.find(item => item.id === idFinal);

            if (item) {
                item.quantity += quantity;
                alert('Đã thêm vào giỏ hàng');
            } else {
                const dataItem = data.products.find(item => item.id === idFinal);
                cart.push({ id: idFinal, quantity, ...dataItem });
                alert('Đã thêm vào giỏ hàng');
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            rederCart2();
        });

    }
};
innerLeftBottom();
// ------------end inner-left bottom----------------

// ------------inner-right top----------------
const innerRightTop = async () => {
    const response = await fetch('../../data/home/products.json');
    const data = await response.json();
    const dataFinal = data.products.filter(item => item.id !== idFinal).slice(0,5);

    const innerRightTopElement = mainElement.querySelector('.inner-right-top');
    const innerRightTopTemplate = `
    <div class="inner-title">
        <h3>
            Có thể bạn đang tìm
        </h3>
    </div>
    <div class="inner-list">
        ${dataFinal.reverse().map(item => `
        <div class="inner-item">
            <div class="inner-image">
                <a href="../dishDetails/?id=${item.id}">
                    <img src=${item.image} alt='${item.name}'>
                </a>
            </div>
            <div class="inner-content">
                <h4 class="inner-name">
                    <a href="../dishDetails/?id=${item.id}" title='${item.name}'>
                        ${item.name}
                    </a>
                </h4>
                <p class="inner-price">
                    ${item.price.toLocaleString()}₫
                </p>
                <button class="inner-button" id=${item.id}>
                    Đặt món
                </button>
            </div>
        </div>
        `).join('')}
    </div>
    `;

    if (innerRightTopElement) {
        innerRightTopElement.innerHTML = innerRightTopTemplate;

        const innerButton = innerRightTopElement.querySelectorAll('.inner-button');
        innerButton.forEach((button) => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('id');
                const idFinal = parseInt(id);
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                const item = cart.find(item => item.id === idFinal);

                if (item) {
                    item.quantity += 1;
                    alert('Đã thêm vào giỏ hàng');
                } else {
                    const dataItem = data.products.find(item => item.id === idFinal);
                    cart.push({ id: idFinal, quantity: 1, ...dataItem });
                    alert('Đã thêm vào giỏ hàng');
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                rederCart2();
            });
        });
    }
}
innerRightTop();
// ------------end inner-right top----------------

// ------------inner-right bottom----------------
const innerRightBottom = async () => {
    const response = await fetch('../../data/home/articles.json');
    const data = await response.json();

    const innerRightBottomElement = mainElement.querySelector('.inner-right-bottom');
    const innerRightBottomTemplate = `
    <div class="inner-blog">
        <h2 class="inner-title">
            <a href="#">
                Tin tức liên quan
            </a>
        </h2>
        <div class="inner-content">
            ${data.map(item => `
            <div class="inner-item" id=${item.id}>
                <div class="inner-thumb">
                    <a href="#" title='${item.title}'>
                        <img src=${item.image} alt='${item.title}'>
                    </a>
                </div>
                <div class="inner-text">
                    <a href="../article/?id=${item.id}">${item.title}</a>
                </div>
            </div>
            `).join('')}
        </div>
    </div>
    `;

    if (innerRightBottomElement) {
        innerRightBottomElement.innerHTML = innerRightBottomTemplate;
    }
}
innerRightBottom();
// ------------end inner-right bottom----------------