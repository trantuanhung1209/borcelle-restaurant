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
                <a href="#" style="color: var(--background-color-button);">Đặt bàn</a>
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

const formatDate = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    return `${day}/${month}/${year}`;
}
const section1 = () => {
    const section1 = mainElement.querySelector('.section-1');
    const section1Template = `
    <div class="container">
        <div class="row row-fix">
            <div class="col col-6 p-4"
                style="background-color: var(--background-color-primary); border-radius: 15px;">
                <div class="inner-title">
                    <img src="../../assets/images/svgImage/dish.png" alt="dish">
                    <h2>
                        Liên hệ đặt bàn
                    </h2>
                    <img src="../../assets/images/svgImage/dish.png" alt="dish" class="dish-2">
                </div>

                <div class="inner-content">
                    <form class="inner-form">
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
                            <label>Bạn có thể đến dùng ngày nào?</label>
                            <input id="datesss" name="date" type="date" placeholder="Chọn Ngày"
                                data-date-format="dd MM yyyy" required="">
                        </fieldset>
                        <fieldset class="form-group">
                            <label>Bạn đi mấy người?</label>
                            <input placeholder="Số người..." type="number" required="" value=""
                                name="personNumber">
                        </fieldset>
                        <fieldset class="form-group">
                            <label>Thời gian bạn đến?</label>
                            <input type="time" required="" value="" name="time">
                        </fieldset>
                        <p class="description">Khách muốn liên hệ trực tiếp vui lòng gọi số điện thoại: <a
                                href="tel:0353133235">0353133235</a></p>
                        <div class="submit">
                            <button type="submit" class="inner-button">Đặt bàn ngay</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;

    if (section1) {
        section1.innerHTML = section1Template;

        const form = document.querySelector('.inner-form');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = form.fullName.value.trim();
            const email = form.email.value.trim();
            const phoneNumber = form.phoneNumber.value.trim();
            const date = form.date.value.trim();
            const time = form.time.value.trim();
            const personNumber = parseInt(form.personNumber.value.trim(), 10);

            if (!fullName || !validateEmail(email) || !phoneNumber || !date || !time || isNaN(personNumber)) {
                alert('Vui lòng nhập đầy đủ thông tin');
                return;
            }

            const today = new Date().toISOString().split("T")[0]; // Định dạng YYYY-MM-DD
            if (new Date(date) < new Date(today)) {
                alert('Ngày bạn chọn đã qua rồi hoặc không hợp lệ'); 
                return;
            }

            if (personNumber <= 0) {
                alert('Số lượng người phải lớn hơn 0');
                return;
            }

            form.reset();

            // Hiển thị popup xác nhận
            const sectionPopup = document.querySelector('.section-popup');
            if (sectionPopup) {
                sectionPopup.style.display = 'block';
                sectionPopup.style.opacity = '1';
                sectionPopup.style.pointerEvents = 'auto';

                const popupBody = sectionPopup.querySelector('.inner-popup-body');
                const popupContentTemplate = `
                    <p style="font-weight: 700; margin-bottom: 20px; font-size: 18px;">
                        Thông tin đặt bàn của bạn đã được xác nhận! 🎉
                    </p>
                    <div class="inner-info">
                        <p><b>Xin chào</b> &nbsp; <span>${fullName}</span></p>
                        <p>Chúng tôi rất vui được thông báo rằng đặt bàn của bạn đã được xác nhận với thông tin sau:</p>
                        <p><b>Tên:</b> &nbsp; <span>${fullName}</span></p>
                        <p><b>Email:</b> &nbsp; <span>${email}</span></p>
                        <p><b>Số điện thoại:</b> &nbsp; <span>${phoneNumber}</span></p>
                        <p><b>Ngày:</b> &nbsp; <span>${formatDate(date)}</span></p>
                        <p><b>Giờ:</b> &nbsp; <span>${time}</span></p>
                        <p><b>Số lượng người:</b> &nbsp; <span>${personNumber}</span></p>
                        <p>
                            <b>Lưu ý</b>: Vui lòng đến trước 15 phút để đảm bảo trải nghiệm tốt nhất. Nếu cần thay đổi hoặc hủy đặt bàn, 
                            vui lòng liên hệ qua số 
                            <a href="tel:0353133235" style="color: var(--background-color-button);">0353133235</a>.
                        </p>
                        <p>Cảm ơn và hẹn gặp lại bạn sớm!</p>
                    </div>
                    <div class="inner-action">
                        <button class="inner-button">Xác nhận</button>
                    </div>
                `;

                popupBody.innerHTML = popupContentTemplate;

                // Đóng popup khi nhấn nút "Xác nhận" hoặc nút đóng
                const closePopup = () => {
                    sectionPopup.style.display = 'none';
                    sectionPopup.style.opacity = '0';
                    sectionPopup.style.pointerEvents = 'none';
                };

                popupBody.querySelector('.inner-button').addEventListener('click', closePopup);
                sectionPopup.querySelector('.inner-popup-close').addEventListener('click', closePopup);

                // Ngăn chặn đóng popup khi bấm vào bên trong nội dung
                sectionPopup.querySelector('.inner-popup').addEventListener('click', (e) => {
                    e.stopPropagation();
                });

                // Đóng popup khi click bên ngoài
                sectionPopup.addEventListener('click', closePopup);
            }
        });

    }
}
section1();
// ----------end section 1----------