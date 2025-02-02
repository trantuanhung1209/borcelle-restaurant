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
                <a href="#" style="color: var(--background-color-button);">Đăng ký tài khoản</a>
            </li>
        </ul>
    </div>
    `;

    breadecumb.innerHTML = breadecumbTemplate;
}
breadecumb();
// ----------end breadcumb----------

// ----------section 1----------
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

const section1 = () => {
    const section1 = mainElement.querySelector('.section-1');
    const section1Template = `
    <div class="container">
        <div class="row">
            <div class="col-4">
                <ul class="inner-menu">
                    <li>
                        <a href="../login/">Đăng nhập</a>
                    </li>
                    <li class="active">
                        <a href="../register/" >Đăng ký</a>
                    </li>
                </ul>

                <div class="inner-title">
                    <h2>Đăng ký tài khoản</h2>
                </div>

                <div class="inner-content">
                    <form action="#" method="POST" class="inner-form">
                        <fieldset class="form-group">
                            <label>Tên của bạn:</label>
                            <input placeholder="Tên của bạn..." type="text" required="" value=""
                                name="fullName">
                        </fieldset>
                        <fieldset class="form-group">
                            <label>Email của bạn:</label>
                            <input placeholder="Email" type="email" required="" id="email1"
                                class="form-control form-control-lg" value="" name="email">
                        </fieldset>
                        <fieldset class="form-group">
                            <label>Số điện thoại của bạn:</label>
                            <input placeholder="Số điện thoại..." type="number"
                                class="form-control form-control-lg" required="" value=""
                                name="phoneNumber">
                        </fieldset>
                        <fieldset class="form-group">
                            <label>Mật khẩu:</label>
                            <input placeholder="Mật khẩu..." type="password" required="" value=""
                                name="password">
                        </fieldset>
                        <div class="submit">
                            <button type="submit" class="inner-button">Đăng ký</button>
                        </div>
                    </form>
                </div>

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

        const form = section1.querySelector('.inner-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = form.fullName.value;
            const email = form.email.value;
            console.log(email);
            const phoneNumber = form.phoneNumber.value;
            const password = form.password.value;
            const userData = JSON.parse(localStorage.getItem('userData'));

            if (!validateEmail(email)) {
                alert('Email không hợp lệ');
                return;
            } else if (userData && userData.email === email) {
                alert('Email đã tồn tại');
                return;
                
            } else {
                const newUser = {
                    fullName: fullName,
                    email: email,
                    phoneNumber: phoneNumber,
                    password: password
                };
                localStorage.setItem('userData', JSON.stringify(newUser));
                alert('Đăng ký thành công');
                window.location.href = '../home/';
                localStorage.setItem('isLogin', true);
            }
        });
    }
}
section1();
// ----------end section 1----------