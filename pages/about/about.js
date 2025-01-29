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

const aboutPage = () => {
    const template = `
    <div class="inner-breadcumb">
        <div class="container ">
            <ul class="breadcumb m-0 py-3 d-flex gap-2 list-unstyled">
                <li>
                    <a href="../../index.html">Trang chủ</a>
                </li>
                <li>
                    <i class="fas fa-angle-right"></i>
                </li>
                <li>
                    <a href="#" style="color: var(--background-color-button);">Giới thiệu</a>
                </li>
            </ul>
        </div>
    </div>

    <section class="section-1 py-5">
        <div class="container">
            <h2 class="inner-title mb-2">
                Giới thiệu
            </h2>
            <div class="inner-desc mb-5">
                <span style="font-weight: 700; font-style: italic;">BORCELLE RESTAURANT</span> - Nhà hàng ẩm thực hiện đại kết hợp với truyền thống, tạo nên tính mới lạ cho thực khách. Được ra đời vào năm 2024 với tiêu chí "Khách hàng là trên hết" nên chúng tôi luôn tự hào về cách phục vụ cũng như các món ăn mà chúng tôi làm ra. Nhà hàng chúng tôi luôn luôn đặt khách hàng lên hàng đầu, tận tâm phục vụ, mang lại cho khách hàng những trãi nghiệm tuyệt với nhất. Các món ăn với công thức độc quyền sẽ mang lại hương vị mới mẻ cho thực khách. Borcelle Restaurant xin chân thành cảm ơn.
            </div>
            <div class="inner-image mb-2">
                <img src="../../assets/images/about/about_image.jpg" alt="about">
            </div>
            <div class="inner-bottom" style="font-weight: 700; font-style: italic;">
                HÃY ĐẾN BORCELLE RESTAURANT ĐỂ THƯỞNG THỨC NGAY BẠN NHÉ!
            </div>
        </div>
    </section>
    `;

    if (mainElement) {
        mainElement.innerHTML = template;
    }
}
aboutPage();