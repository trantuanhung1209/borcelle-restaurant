// loader
window.onload = () => {
    // Giải phóng màn hình loading sau khi trang đã load xong
    setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("main-content").style.display = "block";
    }, 800); // Thời gian loading (3 giây)
};
// end loader

// header
const removeDuplicateProducts2 = (products) => {
    const seen = new Set(); // Tập hợp các tên sản phẩm đã gặp
    return products.filter(product => {
        if (seen.has(product.name)) {
            return false; // Bỏ qua sản phẩm nếu tên đã tồn tại
        }
        seen.add(product.name); // Thêm tên vào danh sách đã gặp
        return true; // Giữ sản phẩm
    });
};

const renderProductSearch = async (content) => {
    try {
        // Fetch data từ file JSON hoặc API
        const response = await fetch('../../data/home/products.json');
        const products = await response.json();
        const dataFinal = [...products.products];

        // Lọc dữ liệu theo nội dung tìm kiếm
        const dataSearch = removeDuplicateProducts2(dataFinal).filter(item => item.name.toLowerCase().includes(content.toLowerCase()));

        // Lấy phần tử .inner-search-result
        const innerSearchResult = document.querySelector(".inner-search-result");
        if (innerSearchResult) {
            // Tạo nội dung template cho kết quả tìm kiếm
            const innerSearchResultTemplate = `
            <h3 class="inner-title">
                Kết quả tìm kiếm: 
            </h3>
            <div class="inner-list-result">
                ${dataSearch.splice(0,2).map(item => `
                <div class= "inner-item">
                    <div class="inner-image">
                        <a href="../dishDetails/?id=${item.id}">
                            <img src=${item.image} alt='${item.name}' />
                        </a>
                    </div>
                    
                    <div class="inner-text">
                        <h3 class="inner-name">
                            <a href="../dishDetails/?id=${item.id}">${item.name}</a>
                        </h3>
                        <p class="inner-price">
                            ${item.price}đ
                        </p>
                    </div>
                </div>
                `).join('')}
            </div>
            <a href="../search/?content=${content}" class="inner-extra">
                Xem tất cả kết quả tìm kiếm
            </a>
            `;

            // Hiển thị kết quả tìm kiếm
            innerSearchResult.innerHTML = innerSearchResultTemplate;
            innerSearchResult.style.display = "block";
        }
    } catch (error) {
        console.error("Failed to fetch product data:", error);
    }
};

// ------------cart--------------
const getQuantityTotal = (cart) => {
    let total = 0;
    cart.forEach(item => {
        total += item.quantity;
    });
    return total;
};

const getTotalPrice = (cart) => {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    return total.toLocaleString();
};

const rederCart = () => {
    const innerCart = document.querySelector(".inner-cart");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (innerCart) {
        if (cart.length > 0) {
            const cartTemplate = `
            
            <i class="fa-solid fa-shopping-cart"></i>
                            
                <div class="inner-quantity-total">
                    ${getQuantityTotal(cart)}
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
                                <div class="inner-remove" id=${item.id}>
                                    <i class="fa-solid fa-trash"></i>
                                </div>
                            </div>
                        </div>
                        `).join('')}
                    </div>
                    <div class="inner-total">
                    <p>
                        <span>Tổng cộng:</span> 
                        <span>${getTotalPrice(cart)}đ</span>
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
rederCart();
// ------------end cart--------------

const header = async () => {
    try {
        let isLogin = localStorage.getItem("isLogin");
        console.log("isLogin: ", isLogin);

        // Fetch data từ file JSON hoặc API
        const response = await fetch('../../data/menu.json');
        const menu = await response.json();

        // Lấy phần tử #header
        const headerElement = document.querySelector("#header");
        const headerTemplate = `
            <div class="container">
                <div class="inner-wrap">
                    <div class="inner-menu-res">
                        <i class="fa-solid fa-bars"></i>
                    </div>

                    <div class="inner-logo">
                        <a href="../../pages/home/">
                            <img src="../../assets/images/logo/logo_restaurant_2.svg" alt="Borcelle restaurant">
                        </a>
                    </div>
                    <nav class="inner-menu">
                        <ul>
                            ${menu.map(item => `
                            <li>
                                <a href=${item.link}>${item.title}</a>
                            </li>
                            `).join('')}
                        </ul>
                    </nav>
                    <div class="inner-control">
                        <button class="inner-search button-icon">
                            <i class="fa-solid fa-magnifying-glass"></i>

                            <div class="inner-search-box">
                                <h2 class="inner-title">
                                    Tìm kiếm món ăn 
                                </h2>
                                <form class="inner-form-search">
                                    <input type="text" placeholder="Tìm kiếm..." name="content" autocomplete="off">
                                    <a href="#" class="inner-search-button">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </a>
                                </form>

                                <div class="inner-search-result"></div>
                            </div>
                        </button>
                        <button class="inner-cart button-icon"></button>

                        <button class="inner-user button-icon">
                            <i class="fa-solid fa-user"></i>

                            <div class="inner-dropdown-menu">
                                ${isLogin === "true" ?
                                 `
                                 <a href="../account/" class="inner-account">Tài khoản</a>
                                 <a href="../home/" class="inner-logout">Đăng xuất</a>
                                 `
                                  : 
                                 `
                                 <a href="../login/" class="inner-login">Đăng nhập</a>
                                 <a href="../register/" class="inner-register">Đăng ký</a>
                                 `}
                            </div>
                        </button>
                        <button class="inner-location button-icon">
                            <a href="../contact/" style="color: white;">
                                <i class="fa-solid fa-location-dot"></i>
                            </a>
                        </button>
                        <a href="../order/" class="order button">
                            Đặt bàn
                        </a>
                    </div>
                </div>
            </div>
        `;

        if (headerElement) {
            headerElement.innerHTML = headerTemplate;

            const listMenu = document.querySelectorAll(".inner-menu ul li a");
            if (listMenu) {
                listMenu.forEach(item => {
                    if (window.location.href.includes(item.href)) {
                        item.classList.add("active");
                    }
                });
            }

            const innerLogout = document.querySelector(".inner-logout");
            if (innerLogout) {
                innerLogout.addEventListener("click", () => {
                    localStorage.setItem("isLogin", "false");
                    window.location.href = "../login/";
                });
            }

            // search
            const innerSearch = document.querySelector(".inner-search");
            const innerSearchBox = document.querySelector(".inner-search-box");

            innerSearch.addEventListener("click", (event) => {
                innerSearchBox.style.display = "block";
                event.stopPropagation();
            });

            document.addEventListener("click", (event) => {
                if (!innerSearchBox.contains(event.target) && !innerSearch.contains(event.target)) {
                    innerSearchBox.style.display = "none";
                }
            });

            const innerFormSearch = document.querySelector(".inner-form-search");
            if (innerFormSearch) {
                const innerSearchButton = document.querySelector(".inner-search-button");

                innerSearchButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    const content = innerFormSearch.querySelector("input[name='content']");
                    window.location.href = `../search/?content=${content.value}`;
                });

                innerFormSearch.addEventListener("input", (e) => {
                    e.preventDefault();
                    const content = innerFormSearch.querySelector("input[name='content']");
                    renderProductSearch(content.value);
                });
            }
            // end search

            // cart
            rederCart();
            const innerCart = document.querySelector(".inner-cart");
            if (innerCart) {
                innerCart.addEventListener("click", () => {
                    window.location.href = "../cart/";
                });
            }
            // end cart

            // menu responsive
            const innerMenuRes = document.querySelector(".inner-menu-res");
            const innerMenu = document.querySelector(".inner-menu");
            innerMenuRes.addEventListener("click", () => {
                innerMenu.style.display = innerMenu.style.display === "block" ? "none" : "block";
            });

            document.addEventListener("click", (event) => {
                if (!innerMenu.contains(event.target) && !innerMenuRes.contains(event.target)) {
                    innerMenu.style.display = "none";
                }
            });
        }
    } catch (error) {
        console.error("Failed to fetch menu data:", error);
    }
};

header();

// end header 

// footer
const footer = () => {
    const footerElement = document.querySelector("#footer");
    const footerTemplate = `
        <div class="container">
            <div class="inner-wrap">
                <div class="inner-left">
                    <div class="inner-logo">
                        <a href="../../index.html">
                            <img src="../../assets/images/logo/logo_restaurant_2.svg" alt="Borcelle">
                        </a>
                    </div>
                    <p>
                        Nhà hàng chúng tôi luôn luôn đặt khách hàng lên hàng đầu, tận tâm phục vụ, mang lại cho
                        khách hàng những trãi nghiệm tuyệt với nhất. Các món ăn với công thức độc quyền sẽ mang lại
                        hương vị mới mẻ cho thực khách. Borcelle Restaurant xin chân thành cảm ơn.
                    </p>
                    <h3 class="font-[700] text-[16px]">
                        Cửa hàng chính
                    </h3>
                    <div>
                        <b>Địa chỉ:</b>
                        <span>12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Hồ Chí Minh</span>
                    </div>
                    <div>
                        <b>Điện thoại:</b>
                        <a href="tel:0353133235" style="color: rgb(214, 156, 82);">0353133235</a>
                    </div>
                    <div>
                        <b>Email:</b>
                        <a href="mailto:tuanhungvip12@gmail.com"
                            style="color: rgb(214, 156, 82);">tuanhungvip12@gmail.com</a>
                    </div>
                </div>
                <div class="inner-middle">
                    <h3>Hướng dẫn</h3>
                    <div class="inner-tutorial">
                        <a href="#">Hướng dẫn mua hàng</a>
                        <a href="#">Hướng dẫn thanh toán</a>
                        <a href="#">Đăng ký thành viên</a>
                        <a href="#">Hỗ trợ khách hàng</a>
                    </div>
                </div>
                <div class="inner-right">
                    <h3>
                        Mạng xã hội
                    </h3>
                    <ul class="inner-social">
                        <li>
                            <a href="#">
                                <img src="../../assets/images/svgImage/zalo.svg" alt="">
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="../../assets/images/svgImage/facebook.svg" alt="">
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="../../assets/images/svgImage/youtube.svg" alt="">
                            </a>
                        </li>
                    </ul>
                    <h3>
                        Hình thức thanh toán
                    </h3>
                    <ul class="inner-payment">
                        <li>
                            <img src="../../assets/images/payment/payment_1.png" alt="">
                        </li>
                        <li>
                            <img src="../../assets/images/payment/payment_2.png" alt="">
                        </li>
                        <li>
                            <img src="../../assets/images/payment/payment_3.png" alt="">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    if (footerElement) {
        footerElement.innerHTML = footerTemplate;
    }
}
footer();
// end footer

// back to top
const backToTop = () => {
    const innerScroll = document.querySelector(".inner-scroll");
    if (innerScroll) {
        window.onscroll = () => {
            if (window.scrollY > 200) {
                innerScroll.style.display = "flex";
                innerScroll.style.zIndex = "99999";
            } else {
                innerScroll.style.display = "none";
            }
        }
        innerScroll.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
backToTop();
// end back to top

// sale popup 
const salePopup = async () => {
    // Lấy dữ liệu sản phẩm từ file JSON
    const response = await fetch('../../data/home/products.json');
    const products = await response.json();
    const dataFinal = [...products.products];

    const salePopup = document.querySelector(".inner-sale-popup");

    if (salePopup) {
        setInterval(() => {
            // Random một sản phẩm mới mỗi lần popup hiển thị
            const randomNumber = Math.floor(Math.random() * dataFinal.length);
            const randomProduct = dataFinal[randomNumber];

            // Tạo nội dung template cho popup
            const salePopupTemplate = `
            <div class="inner-content">
                <div class="inner-header">
                    <h2>
                        Thông báo
                    </h2>
                    <button class="inner-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="inner-body">
                    <div class="inner-image">
                        <a href="../dishDetails/?id=${randomProduct.id}">
                            <img src=${randomProduct.image} alt=${randomProduct.name}>
                        </a>
                    </div>
                    <div class="inner-text">
                        <h2 class="inner-title">
                            Món ăn
                        </h2>
                        <h3 class="inner-name">
                            <a href="../dishDetails/?id=${randomProduct.id}">${randomProduct.name}</a>
                        </h3>
                        <p>
                            Vừa được mua cách đây ${randomProduct.id} phút
                        </p>
                    </div>
                </div>
            </div>
            `;

            // Hiển thị popup
            salePopup.innerHTML = salePopupTemplate;
            salePopup.style.display = "block";
            salePopup.style.animation = "slideIn 1s forwards";

            // Ẩn popup sau 5 giây
            setTimeout(() => {
                salePopup.style.animation = "slideNone 1s forwards";
                setTimeout(() => {
                    salePopup.style.display = "none";
                }, 1000);
            }, 5000);

            // Sự kiện đóng khi nhấn nút "X"
            const innerClose = document.querySelector(".inner-close");
            innerClose.addEventListener("click", () => {
                salePopup.style.animation = "slideNone 1s forwards";
                setTimeout(() => {
                    salePopup.style.display = "none";
                }, 1000);
            });
        }, 10000);
    }
};

salePopup();
// end sale popup