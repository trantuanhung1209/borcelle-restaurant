const mainElement = document.querySelector('.main');
const url = new URL(window.location.href);
const id = url.searchParams.get('id');
const idFinal = parseInt(id);

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

// ------------breadcumb----------------
const breadCumb = async () => {
    const response = await fetch('../../data/home/articles.json');
    const data = await response.json();
    const dataItem = data.find(item => item.id === idFinal);

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
                <a href="../news/">Tin tức</a>
            </li>
            <li>
                <i class="fas fa-angle-right"></i>
            </li>
            <li>
                <a href="#" style="color: var(--background-color-button);">${dataItem.title}</a>
            </li>
        </ul>
    </div>
    `;

    breadCumbElement.innerHTML = breadCumbTemplate;
    document.querySelector('title').textContent = dataItem.title;
}
breadCumb();
// ------------end breadcumb----------------

// ------------inner-left----------------
const innerLeft = async () => {
    const response = await fetch('../../data/home/articles.json');
    const data = await response.json();

    const innerLeftElement = mainElement.querySelector('.inner-left');
    const innerLeftTemplate = `
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

    if (innerLeftElement) {
        innerLeftElement.innerHTML = innerLeftTemplate;

        // const innerBlogElement = innerLeftElement.querySelector('.inner-blog');
        // innerBlogElement.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     const innerItemElement = e.target.closest('.inner-item');
        //     if (innerItemElement) {
        //         const idTag = innerItemElement.id;
        //         const id = parseInt(idTag);
        //         const dataItem = data.find(item => item.id === id);
        //         if (dataItem) {
        //             window.location.href = `../article/?id=${dataItem.id}`;
        //         }
        //     }
        // });
    }
}
innerLeft();
// ------------end inner-left----------------

// ------------inner-right----------------
const innerRight = async () => {
    const response = await fetch('../../data/home/articles.json');
    const data = await response.json();
    const dataItem = data.find(item => item.id === idFinal);

    const innerRightElement = mainElement.querySelector('.inner-right');
    const innerRightTemplate = `
    <div class="inner-article">
        <h2 class="inner-title">
            ${dataItem.title}
        </h2>
        <div class="inner-info">
            <div class="inner-date">
                <i class="fa-regular fa-clock"></i> 
                ${dataItem.date}
            </div>
            <div class="inner-author">
                <i class="fa-solid fa-user"></i>
                Admin Hune
            </div>
        </div>
        <p class="inner-description">
            ${dataItem.description}
        </p>
        <div class="inner-thumb">
            <img src=${dataItem.image} alt='${dataItem.title}'>
        </div>
    </div>
    `;

    if (innerRightElement) {
        innerRightElement.innerHTML = innerRightTemplate;
    }
}
innerRight();