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

// ------------breadcumb--------------
const breadCumb = () => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    const breadCumbElement = mainElement.querySelector('.inner-breadcumb');
    const template = `
    <div class="container ">
        <ul class="breadcumb m-0 py-3 d-flex gap-2 list-unstyled">
            <li>
                <a href="../../index.html">Trang chủ</a>
            </li>
            <li>
                <i class="fas fa-angle-right"></i>
            </li>
            <li>
                <a href="#" style="color: var(--background-color-button);">Xin chào, ${userData.fullName}</a>
            </li>
        </ul>
    </div>
    `;

    if (breadCumbElement) {
        breadCumbElement.innerHTML = template;
    }
}
breadCumb();
// ------------end breadcumb--------------

// ------------section 1--------------
const section1 = () => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    const section1Element = mainElement.querySelector('.section-1');
    const section1Template = `
    <div class="container">
        <div class="inner-content">
            <div class="inner-desc">
                <h2 class="inner-title">
                    Thông tin khách hàng
                </h2>

                <div class="inner-info">
                    <b><p>Họ tên: <span>${userData.fullName}</span></p></b>
                    <b><p>Email: <span>${userData.email}</span></p></b>
                    <b><p>Số điện thoại: <span>${userData.phoneNumber}</span></p></b>
                </div>
            </div>

            <div class="inner-orderDetail">
                <h2 class="inner-title">
                    Đơn hàng của bạn
                </h2>

                <div class="inner-orderDetail-content">
                    <table>
                        <thead>
                            <tr>
                                <th>Mã sản phẩm</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="5">Dữ liệu đang được cập nhật...</td>
                            </tr>
                        </tbody>

                        <tfoot>
                            <tr>
                                
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>

        <div class="inner-bottom" style="font-weight: 700; font-style: italic;">
            HÃY ĐẾN BORCELLE RESTAURANT ĐỂ THƯỞNG THỨC NGAY BẠN NHÉ!
        </div>
    </div>
    `;
    if (section1Element) {
        section1Element.innerHTML = section1Template;
    }
}
section1();
// ------------end section 1--------------