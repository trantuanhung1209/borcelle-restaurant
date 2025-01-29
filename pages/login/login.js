const mainElement = document.querySelector('.main');

// ------------cart--------------
// const getTotalPrice2 = (cart) => {
//     let total = 0;
//     cart.forEach(item => {
//         total += item.price * item.quantity;
//     });
//     return total.toLocaleString();
// };

// const rederCart2 = () => {
//     const innerCartBox = document.querySelector(".inner-cart-box");

//     const cart = JSON.parse(localStorage.getItem("cart")) || [];

//     if (innerCartBox) {
//         if (cart.length > 0) {
//             const cartTemplate = `
//             <div class="inner-list-product">
//                 ${cart.map(item => `
//                 <div class="inner-item">
//                     <div class="inner-image">
//                         <a href="../dishDetails/?id=${item.id}">
//                             <img src=${item.image} alt='${item.name}' />
//                         </a>
//                     </div>
//                     <div class="inner-text">
//                         <h3 class="inner-name">
//                             <a href="../dishDetails/?id=${item.id}">${item.name}</a>
//                         </h3>
//                         <p class="inner-quantity">
//                             Số lượng: ${item.quantity}
//                         </p>
//                     </div>
//                     <div class="inner-action">
//                         <p class="inner-price">
//                             ${(item.price * item.quantity).toLocaleString()}đ
//                         </p>
//                         <div class="inner-remove">
//                             <i class="fa-solid fa-trash"></i>
//                         </div>
//                     </div>
//                 </div>
//                 `).join('')}
//             </div>
//             <div class="inner-total">
//                 <p>
//                     <span>Tổng cộng:</span> 
//                     <span>${getTotalPrice2(cart)}đ</span>
//                 </p>
//                 <div class="inner-button">
//                     <div class="inner-button-checkout">
//                         Thanh toán
//                     </div>
//                 </div>
//             </div>
//             `;

//             innerCartBox.innerHTML = cartTemplate;
            
//         } else {
//             const cartTemplate = `
//             <div class="inner-empty">
//                 <p>Giỏ hàng của bạn đang trống</p>
//             </div>
//             `;

//             innerCartBox.innerHTML = cartTemplate;
//         }
//     }
// }
// rederCart2();
// ------------end cart--------------

// ----------breadcumb----------
const breadecumb = () => {
    const breadecumb = mainElement.querySelector('.inner-breadcumb');
    const breadecumbTemplate = `
    <div class="container ">
        <ul class="breadcumb m-0 py-3 d-flex gap-2 list-unstyled">
            <li>
                <a href="../../index.html">Trang chủ</a>
            </li>
            <li>
                <i class="fas fa-angle-right"></i>
            </li>
            <li>
                <a href="#" style="color: var(--background-color-button);">Đăng nhập tài khoản</a>
            </li>
        </ul>
    </div>
    `;

    breadecumb.innerHTML = breadecumbTemplate;
}
breadecumb();
// ----------end breadcumb----------

// ----------section 1----------
const section1 = () => {
    const section1 = mainElement.querySelector('.section-1');
    const section1Template = `
    <div class="container">
        <div class="row">
            <div class="col-4">
                <ul class="inner-menu">
                    <li class="active">
                        <a href="../login/">Đăng nhập</a>
                    </li>
                    <li>
                        <a href="../register/">Đăng ký</a>
                    </li>
                </ul>

                <div class="inner-title">
                    <h2>Đăng nhập</h2>
                </div>

                <div class="inner-content">
                    <form class="inner-form">
                        <fieldset class="form-group">
                            <label>Email của bạn:</label>
                            <input placeholder="Email" type="email" required="" id="email1"
                                class="form-control form-control-lg" value="" name="email">
                        </fieldset>
                        <fieldset class="form-group">
                            <label>Mật khẩu:</label>
                            <input placeholder="Mật khẩu..." type="password" required="" value=""
                                name="password">
                        </fieldset>
                        <div class="submit">
                            <button type="submit" class="inner-button">Đăng nhập</button>
                        </div>
                    </form>
                </div>

                <p class="inner-forgot-password">
                    <a href="#">Quên mật khẩu?</a>
                </p>

                <div class="inner-register-link">
                    <p>
                        Hoặc đăng nhập bằng
                    </p>

                    <div class="inner-social">
                        <a href="#" class="inner-social-link">
                            <i class="fab fa-google"></i>
                            Google
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    if (section1) {
        section1.innerHTML = section1Template;

        const formElement = section1.querySelector('.inner-form');
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = formElement.email.value;
            const password = formElement.password.value;

            if (!email || !password) {
                alert('Vui lòng nhập đầy đủ thông tin');
                return;
            }

            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData) {
                if (email === userData.email && password === userData.password) {
                    alert('Đăng nhập thành công');
                    window.location.href = '../account/';
                    localStorage.setItem("isLogin", true);
                } else {
                    alert('Email hoặc mật khẩu không chính xác');
                }
            } else {
                alert('Tài khoản không tồn tại');
            }
        });
    }
}
section1();
// ----------end section 1----------