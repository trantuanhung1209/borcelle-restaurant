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
const header = async () => {
    try {
        // Fetch data từ file JSON hoặc API
        const response = await fetch('../../data/menu.json');
        const menu = await response.json();

        // Lấy phần tử #header
        const headerElement = document.querySelector("#header");
        const headerTemplate = `
            <div class="container">
                <div class="inner-wrap">
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
                        </button>
                        <button class="inner-cart button-icon">
                            <i class="fa-solid fa-shopping-cart"></i>
                        </button>
                        <button class="inner-user button-icon">
                            <i class="fa-solid fa-user"></i>
                        </button>
                        <button class="inner-location button-icon">
                            <i class="fa-solid fa-location-dot"></i>
                        </button>
                        <button class="order button">
                            Đặt bàn
                        </button>
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

