const mainElement = document.querySelector('.main');

// -----------------section 1
const section1 = () => {
    const section1Element = mainElement.querySelector('.section-1');
    const section1Template = `
    <div class="container mx-auto">
        <div class="flex flex-col justify-center items-center pb-[420px] pt-[118px] text-white ">
            <h1 class="text-[50px] font-[700] font-dancing text-animation">
                Borcelle Restaurant
            </h1>
            <p class="text-[20px] font-[600] mb-[15px] font-dancing slideIn">Chúng tôi mang đến cho bạn
                những trải nghiệm ẩm thực tuyệt vời nhất</p>
            <a href="../order/"
                class="uppercase px-[20px] py-[12px] rounded-[8px] bg-button hover:bg-buttonHover slide-butom">
                Đặt bàn ngay
            </a>
        </div>
    </div>
    `;
    if (section1Element) {
        section1Element.innerHTML = section1Template;
    }
}
section1();
// -----------------end section 1

// -----------------section 2
const section2 = () => {
    const section2Element = mainElement.querySelector('.section-2');
    const section2Template = `
    <div class="container mx-auto">
        <div class="inner-wrap grid grid-cols-2 gap-[20px]">
            <div class="inner-content">
                <h3 class="font-[500] text-[18px] capitalize my-[5px] italic text-button">
                    Về chúng tôi
                </h3>
                <h2 class="text-[50px] font-[700] font-dancing text-white">
                    Borcelle Restaurant
                </h2>
                <p class="my-[20px] text-[16px] font-[300] text-white">
                    Nhà hàng chúng tôi luôn luôn đặt khách hàng lên hàng đầu, tận tâm phục vụ, mang lại cho
                    khách hàng những trãi nghiệm tuyệt với nhất. Các món ăn với công thức độc quyền sẽ mang
                    lại hương vị mới mẻ cho thực khách. Borcelle Restaurant xin chân thành cảm ơn.
                </p>
                <a href="../about/">
                    <div class="button-block cursor-pointer">
                        <span class="button-line-left bg-button w-[29px] h-[1px] mr-[15px]"></span>
                        <span class="button-text text-button">Xem thêm </span>
                        <span class="button-line-right bg-button w-[29px] h-[1px] ml-[15px]"></span>
                    </div>
                </a>
            </div>
            <div class="inner-image">
                <a href="#">
                    <img src="../../assets/images/about/about_image.jpg" alt="about" loading="lazy">
                </a>
            </div>
        </div>
    </div>
    `;
    if (section2Element) {
        section2Element.innerHTML = section2Template;
    }
}
section2();
// -----------------end section 2

// -----------------section 3
const section3 = async () => {
    try {
        const response = await fetch('../../data/home/section3.json');
        const dataSection3 = await response.json();

        const section3Element = mainElement.querySelector('.section-3');
        const section3Template = `
        <div class="container mx-auto">
            <div class="inner-title mb-[30px] flex justify-center items-center">
                <img src="../../assets/images/svgImage/dish.png" alt="icon" class="w-[45px] h-auto"
                    loading="lazy">
                <h2 class="text-[48px] font-[700] inline-block px-[20px] font-dancing text-white">
                    Danh mục nổi bật
                </h2>
                <img src="../../assets/images/svgImage/dish.png" alt="icon" class="w-[45px] h-auto rotate-90"
                    loading="lazy">
            </div>

            <div class="carousel carousel-center  rounded-box max-w-full space-x-4 p-4 " id="myCarousel">
                ${dataSection3.map(item => `
                <div class="carousel-item py-[30px] px-[25px] mb-[4px] rounded-[8px] border-[1px] border-white w-[280px] h-[300px] ">
                    <a href="#"
                        class="block p-[10px] ease-linear duration-200 hover:border-[1px] hover:border-button hover:rounded-[8px]">
                        <div class="flex justify-center items-center">
                            <img src=${item.image} alt='${item.title}' loading="lazy">
                        </div>
                        <h4 class="text-[26px] text-white mt-[20px] mb-[5px] text-center" title='${item.title}'>
                            ${item.title}
                        </h4>
                        <p class="text-[16px] font-[300] text-white text-center">
                            ${item.description}
                        </p>
                    </a>
                </div>
                `).join('')}
            </div>
            <div class="pagination flex justify-center mt-4 gap-[10px]">
                <button id="scrollToStart"
                    class=" w-[15px] h-[15px] border-button border-[1px] rounded-[3px] bg-button"></button>
                <button id="scrollToEnd"
                    class=" w-[15px] h-[15px] border-button border-[1px] rounded-[3px]"></button>
            </div>
        </div>
    `;
        if (section3Element) {
            section3Element.innerHTML = section3Template;
            // Lấy carousel 1
            const carousel = document.getElementById("myCarousel");

            // Nút cuộn về đầu 1
            document.getElementById("scrollToStart").addEventListener("click", () => {
                carousel.scrollTo({ left: 0, behavior: "smooth" });
            });

            // Nút cuộn về cuối 1
            document.getElementById("scrollToEnd").addEventListener("click", () => {
                carousel.scrollTo({ left: carousel.scrollWidth, behavior: "smooth" });
            });

            const pagination = document.querySelector(".section-3 .pagination");
            if (pagination) {
                const listButton = pagination.querySelectorAll("button");
                listButton.forEach(button => {
                    button.addEventListener("click", () => {
                        listButton.forEach(item => {
                            item.classList.remove("bg-button");
                        })
                        button.classList.add("bg-button");
                    })
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}
section3();
// -----------------end section 3

// -----------------section 4
const getProductsByTag = async (tag) => {
    try {
        const response = await fetch('../../data/home/products.json');
        const data = await response.json();
        return data.products.filter(product => product.category === tag);
    } catch (error) {
        console.error("Error fetching products by tag:", error);
        return [];
    }
}

const section4 = async () => {
    try {
        // Fetch dữ liệu từ menuProducts và products
        const [menuResponse, productResponse] = await Promise.all([
            fetch('../../data/home/menuProducts.json'),
            fetch('../../data/home/products.json')
        ]);

        const dataMenuSection4 = await menuResponse.json();
        const dataProductSection4 = await productResponse.json();

        const section4Element = document.querySelector('.section-4');
        const section4Template = `
        <div class="container mx-auto">
            <div class="inner-title mb-[30px] flex justify-center items-center">
                <img src="../../assets/images/svgImage/dish.png" alt="icon" class="w-[45px] h-auto" loading="lazy">
                <h2 class="text-[48px] font-[700] inline-block px-[20px] font-dancing text-white">
                    Thực đơn của chúng tôi
                </h2>
                <img src="../../assets/images/svgImage/dish.png" alt="icon" class="w-[45px] h-auto rotate-90" loading="lazy">
            </div>

            <div class="flex items-center justify-center mb-[16px]">
                <ul class="flex items-center gap-[10px] text-center ">
                    ${dataMenuSection4.map(item => `
                        <li class="p-[10px] border-[1px] border-white text-white rounded-[8px] cursor-pointer hover:bg-button" tag=${item.tag}>
                            <span title="${item.title}">
                                ${item.title}
                            </span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="list-products grid grid-cols-5 gap-x-[20px] gap-y-[40px] wrap">
                ${dataProductSection4.products.splice(0, 10).map(item => `
                    <div class="product-item px-[7px] pt-[7px] pb-[45px] bg-white" style="box-shadow: 5px 10px #888888;" id=${item.id}>
                        <div class="thumbnail relative">
                            <a href="../dishDetails/?id=${item.id}" class="block flex items-center justify-center">
                                <img src="${item.image}" alt='${item.name}' class="w-full h-full object-cover" loading="lazy">
                            </a>
                            <div class="product-action flex items-center gap-[20px] pl-[36px] absolute bottom-[-36px]">
                                <!-- Nút thêm vào giỏ hàng -->
                                <a href="#" class="add-to-cart block w-[82px] h-[82px] bg-button rounded-full flex items-start justify-center pt-[24px]">
                                    <i class="fas fa-shopping-cart text-[20px] font-[700] text-white hover:text-primary"></i>
                                </a>
                                <!-- Nút yêu thích -->
                                <a href="#" class="add-to-wishlist block w-[82px] h-[82px] bg-button rounded-full flex items-start justify-center pt-[24px]">
                                    <i class="${item.isFavorite ? 'fas fa-heart text-[#ff0000d1]' : 'far fa-heart text-white'} text-[20px] font-[700] hover:text-[#ff0000d1]"></i>
                                </a>
                            </div>
                            ${item.discount ? `
                                <div class="product-discount">
                                    <span class="text-[14px] text-white font-[700] bg-[#ff0000d1] px-[10px] py-[5px] absolute top-[10px] right-[10px] rounded-[8px]">-${item.discount}%</span>
                                </div>
                            ` : ''}
                        </div>
                        <div class="product-info text-center p-[10px] relative bg-white">
                            <h3 class="product-name mb-[10px]">
                                <a href="../dishDetails/?id=${item.id}" class="text-[16px] font-[700] line-clamp-1 text-black hover:text-button">
                                    ${item.name}
                                </a>
                            </h3>
                            <div class="product-price">
                                <span class="text-[18px] text-[#d83a3a] font-[600]">${item.price.toLocaleString()}₫</span>
                                ${item.old_price ? `<span class="text-[12px] text-[#969696] font-[500] line-through">${item.old_price.toLocaleString()}₫</span>` : ''}
                            </div>
                            <a href="../dishDetails/?id=${item.id}" class="button absolute top-[123%] right-[26%]">
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        `;

        if (section4Element) {
            section4Element.innerHTML = section4Template;
            const listMenu = document.querySelectorAll('.section-4 ul li');
            listMenu[0].classList.add('bg-button');

            listMenu.forEach((item, index) => {
                item.addEventListener('click', () => {
                    listMenu.forEach(menu => {
                        menu.classList.remove('bg-button');
                    });
                    item.classList.add('bg-button');

                    const tag = item.getAttribute('tag');

                    const listProducts = document.querySelector('.section-4 .list-products');
                    const listItem = [];
                    listProducts.innerHTML = 'Đang tải...';
                    setTimeout(() => {
                        getProductsByTag(tag).then(data => {
                            data.forEach(item => {
                                listItem.push(`
                                <div class="product-item px-[7px] pt-[7px] pb-[45px] bg-white" style="box-shadow: 5px 10px #888888;">
                                    <div class="thumbnail relative">
                                        <a href="../dishDetails/?id=${item.id}" class="block flex items-center justify-center">
                                            <img src="${item.image}" alt='${item.name}' class="w-full h-full object-cover" loading="lazy">
                                        </a>
                                        <div class="product-action flex items-center gap-[20px] pl-[36px] absolute bottom-[-36px]">
                                            <!-- Nút thêm vào giỏ hàng -->
                                            <a href="#" class="add-to-cart block w-[82px] h-[82px] bg-button rounded-full flex items-start justify-center pt-[24px]">
                                                <i class="fas fa-shopping-cart text-[20px] font-[700] text-white hover:text-primary"></i>
                                            </a>
                                            <!-- Nút yêu thích -->
                                            <a href="#" class="add-to-wishlist block w-[82px] h-[82px] bg-button rounded-full flex items-start justify-center pt-[24px]">
                                                <i class="${item.isFavorite ? 'fas fa-heart text-[#ff0000d1]' : 'far fa-heart text-white'} text-[20px] font-[700] hover:text-[#ff0000d1]"></i>
                                            </a>
                                        </div>
                                        ${item.discount ? `
                                            <div class="product-discount">
                                                <span class="text-[14px] text-white font-[700] bg-[#ff0000d1] px-[10px] py-[5px] absolute top-[10px] right-[10px] rounded-[8px]">-${item.discount}%</span>
                                            </div>
                                        ` : ''}
                                    </div>
                                    <div class="product-info text-center p-[10px] relative bg-white">
                                        <h3 class="product-name mb-[10px]">
                                            <a href="../dishDetails/?id=${item.id}" class="text-[16px] font-[700] line-clamp-1 text-black hover:text-button">
                                                ${item.name}
                                            </a>
                                        </h3>
                                        <div class="product-price">
                                            <span class="text-[18px] text-[#d83a3a] font-[600]">${item.price.toLocaleString()}₫</span>
                                            ${item.old_price ? `<span class="text-[12px] text-[#969696] font-[500] line-through">${item.old_price.toLocaleString()}₫</span>` : ''}
                                        </div>
                                        <a href="../dishDetails/?id=${item.id}" class="button absolute top-[123%] right-[26%]">
                                            Xem chi tiết
                                        </a>
                                    </div>
                                </div>
                                `);
                            })
                        })
                    }, 800);
                    setTimeout(() => {
                        listProducts.innerHTML = listItem.join('');
                    }, 1000);
                });
            });
        }
    } catch (error) {
        console.error("Error fetching section 4 data:", error);
    }
};
section4();
// -----------------end section 4

// -----------------section 5
const section5 = async () => {
    try {
        const response = await fetch('../../data/home/products.json');
        const dataSection5 = await response.json();

        const section5Element = mainElement.querySelector('.section-5');
        const section5Template = `
        <div class="container mx-auto">
            <div class="inner-title mb-[30px] flex justify-center items-center">
                <img src="../../assets/images/svgImage/dish.png" alt="icon" class="w-[45px] h-auto"
                    loading="lazy">
                <h2 class="text-[48px] font-[700] inline-block px-[20px] font-dancing text-white">
                    <a href="../topDishes/index.html" class="hover:text-button">
                        Món ăn nổi bật
                    </a>
                </h2>
                <img src="../../assets/images/svgImage/dish.png" alt="icon" class="w-[45px] h-auto rotate-90"
                    loading="lazy">
            </div>

            <div class="carousel carousel-center max-w-full gap-x-[20px] p-4 " id="myCarousel-2">
                ${dataSection5.products.splice(0, 6).map(item => `
                <div class="carousel-item w-[20%] h-[400px]">
                    <div class="product-item px-[7px] pt-[7px] pb-[45px] bg-white" style="box-shadow: 5px 10px #888888;" id=${item.id}>
                        <div class="thumbnail relative">
                            <a href="../dishDetails/?id=${item.id}" class="block flex items-center justify-center">
                                <img src=${item.image} alt='${item.name}' class="w-full h-ful object-cover" loading="lazy">
                            </a>
                            <div class="product-action flex items-center gap-[20px] pl-[36px] absolute bottom-[-36px]">
                                <a href="#" class="add-to-cart block w-[82px] h-[82px] bg-button rounded-full flex items-start justify-center pt-[24px] ">
                                    <i class="fas fa-shopping-cart text-[20px] font-[700] text-white hover:text-primary"></i>
                                </a>
                                <a href="#"
                                    class="add-to-wishlist block w-[82px] h-[82px] bg-button rounded-full flex items-start justify-center pt-[24px]">
                                    <i class="far fa-heart text-[20px] font-[700] text-white hover:text-[#ff0000d1]"></i>
                                </a>
                            </div>
                        </div>
                        <div class="product-info text-center p-[10px] relative bg-white">
                            <h3 class="product-name mb-[10px]">
                                <a href="../dishDetails/?id=${item.id}" class="text-[16px] font-[700] line-clamp-1 text-black hover:text-button">
                                    ${item.name}
                                </a>
                            </h3>
                            <div class="product-price">
                                <span class="text-[18px] text-[#d83a3a] font-[600]">${item.price.toLocaleString()}₫</span>
                                ${item.old_price ? `<span class="text-[12px] text-[#969696] font-[500] line-through">${item.old_price.toLocaleString()}₫</span>` : ''}
                            </div>
                            <a href="../dishDetails/?id=${item.id}" class="button absolute top-[123%] right-[26%]">
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>
            <div class="pagination-2 flex justify-center mt-4 gap-[10px]">
                <button id="scrollToStart-2"
                    class=" w-[15px] h-[15px] border-button border-[1px] rounded-[3px] bg-button"></button>
                <button id="scrollToEnd-2"
                    class=" w-[15px] h-[15px] border-button border-[1px] rounded-[3px]"></button>
            </div>
        </div>
        `;
        if (section5Element) {
            section5Element.innerHTML = section5Template;
            // Lấy carousel 2
            const carousel2 = document.getElementById("myCarousel-2");

            // Nút cuộn về đầu 2
            document.getElementById("scrollToStart-2").addEventListener("click", () => {
                carousel2.scrollTo({ left: 0, behavior: "smooth" });
            });

            // Nút cuộn về cuối 2
            document.getElementById("scrollToEnd-2").addEventListener("click", () => {
                carousel2.scrollTo({ left: carousel2.scrollWidth, behavior: "smooth" });
            });

            const pagination2 = document.querySelector(".section-5 .pagination-2");
            if (pagination2) {
                const listButton2 = pagination2.querySelectorAll("button");
                listButton2.forEach(button => {
                    button.addEventListener("click", () => {
                        listButton2.forEach(item => {
                            item.classList.remove("bg-button");
                        })
                        button.classList.add("bg-button");
                    })
                })
            }
        }
    } catch (error) {
        console.error("Error fetching section 5 data:", error);
    }

}
section5();
// -----------------end section 5

// -----------------section 6
const section6 = async () => {
    try {
        const response = await fetch('../../data/home/section6.json');
        const dataSection6 = await response.json();

        const section6Element = mainElement.querySelector('.section-6');
        const section6Template = `
        <div class="container mx-auto">
            <div class="inner-wrap grid grid-cols-4 gap-[20px]">
                ${dataSection6.map(item => `
                <div class="inner-item inner-banner relative">
                    <img src=${item.image} alt="banner" loading="lazy"
                        class="w-full h-full">
                    <div
                        class="inner-content p-[10px] flex items-center justify-center bg-[#0d1115e6] opacity-0 absolute top-[30px] left-[30px] right-[30px] bottom-[30px]">
                        <a href="#" title="banner ">
                            <span class=" block text-[18px] text-center capitalize mb-[5px] text-button">Borcelle
                                Restaurant</span>
                            <span class=" block text-[24px] text-center text-white">${item.description}</span>
                        </a>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
        `;

        if (section6Element) {
            section6Element.innerHTML = section6Template;
        }
    } catch (error) {
        console.error("Error fetching section 6 data:", error);
    }
}
section6();
// -----------------end section 6

// --------------section 7
const section7 = () => {
    const section7Element = mainElement.querySelector('.section-7');
    const section7Template = `
    <div class="container mx-auto">
        <div class="inner-wrap grid grid-cols-4">
            <div
                class="inner-item flex items-center justify-center gap-[20px] px-[15px] border-r-[1px] border-[#797979]">
                <img src="../../assets/images/statistics/thong_ke1.png" alt="num" loading="lazy"
                    class="w-[64px] h-[64px]">
                <div class="content">
                    <div class="flex gap-[5px] items-center">
                        <h3 class="text-[48px] font-[500] text-white">8</h3>
                        <span class="text-[48px] font-[500] text-white">+</span>
                    </div>
                    <p class="text-[18px] text-white">Cửa hàng</p>
                </div>
            </div>
            <div
                class="inner-item flex items-center justify-center gap-[20px] px-[15px] border-r-[1px] border-[#797979]">
                <img src="../../assets/images/statistics/thong_ke2.png" alt="num" loading="lazy"
                    class="w-[64px] h-[64px]">
                <div class="content">
                    <div class="flex gap-[5px] items-center">
                        <h3 class="text-[48px] font-[500] text-white">200</h3>
                        <span class="text-[48px] font-[500] text-white">+</span>
                    </div>
                    <p class="text-[18px] text-white">Nhân viên</p>
                </div>
            </div>
            <div
                class="inner-item flex items-center justify-center gap-[20px] px-[15px] border-r-[1px] border-[#797979]">
                <img src="../../assets/images/statistics/thong_ke3.png" alt="num" loading="lazy"
                    class="w-[64px] h-[64px]">
                <div class="content">
                    <div class="flex gap-[5px] items-center">
                        <h3 class="text-[48px] font-[500] text-white">5000</h3>
                        <span class="text-[48px] font-[500] text-white">+</span>
                    </div>
                    <p class="text-[18px] text-white">Khách hàng</p>
                </div>
            </div>
            <div class="inner-item flex items-center justify-center gap-[20px] px-[15px]">
                <img src="../../assets/images/statistics/thong_ke4.png" alt="num" loading="lazy"
                    class="w-[64px] h-[64px]">
                <div class="content">
                    <div class="flex gap-[5px] items-center">
                        <h3 class="text-[48px] font-[500] text-white">50</h3>
                        <span class="text-[48px] font-[500] text-white">+</span>
                    </div>
                    <p class="text-[18px] text-white">Món ăn</p>
                </div>
            </div>
        </div>
    </div>
    `;
    if (section7Element) {
        section7Element.innerHTML = section7Template;
        const counters = document.querySelectorAll('.section-7 .content h3');

        // Hàm tăng số dần dần
        function animateCounter(element, target) {
            const duration = 1000; // Thời gian hoàn thành (ms)
            const increment = Math.ceil(target / (duration / 10)); // Bước tăng
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current > target) {
                    element.textContent = target; // Đảm bảo không vượt quá số mục tiêu
                } else {
                    element.textContent = current;
                    requestAnimationFrame(updateCounter); // Tiếp tục cập nhật
                }
            };

            updateCounter();
        }

        // Sử dụng Intersection Observer để phát hiện khi cuộn đến `section-7`
        const section7 = document.querySelector('.section-7');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Khi section-7 vào viewport, chạy hiệu ứng tăng số
                    counters.forEach(counter => {
                        const target = parseInt(counter.textContent.replace(/[^\d]/g, '')); // Lấy số mục tiêu
                        animateCounter(counter, target);
                    });
                    observer.unobserve(section7); // Ngừng quan sát sau khi đã chạy hiệu ứng
                }
            });
        }, {
            root: null, // Quan sát viewport
            threshold: 0.5 // Ít nhất 50% section hiển thị mới kích hoạt
        });

        // Bắt đầu quan sát section-7
        observer.observe(section7);
    }
}
section7();
// -----------end section 7

// --------------section 8
const section8 = async () => {
    try {
        const response = await fetch('../../data/home/articles.json');
        const dataSection8 = await response.json();

        const section8Element = mainElement.querySelector('.section-8');
        const section8Template = `
        <div class="container mx-auto">
            <div class="inner-title mb-[30px] flex justify-center items-center">
                <img src="../../assets/images/svgImage/dish.png" alt="icon" class="w-[45px] h-auto"
                    loading="lazy">
                <h2 class="text-[48px] font-[700] inline-block px-[20px] font-dancing text-white">
                    <a href="../news/index.html" class="hover:text-button">
                        Tin tức
                    </a>
                </h2>
                <img src="../../assets/images/svgImage/dish.png" alt="icon" class="w-[45px] h-auto rotate-90"
                    loading="lazy">
            </div>

            <div class="carousel carousel-center rounded-box max-w-full space-x-4 p-4 gap-[24px]" id="myCarousel-3">
                ${dataSection8.map(item => `
                <div class="carousel-item articles bg-black rounded-[8px] overflow-hidden w-[425px]" id=${item.id}>
                    <div class="block flex flex-col">
                        <div class="inner-thumb bg-[#231f20] w-[425px] h-[255px] relative ${item.id % 2 != 0 ? 'order-1' : 'order-2'}">
                            <img src=${item.image} alt='${item.title}' loading="lazy" class="w-full h-full scale-[0.9]">
                            <p class="px-[15px] py-[5px] text-center bg-button rounded-[8px] absolute top-[20px] left-[20px] text-white">
                                ${item.date}
                            </p>
                        </div>
                        <div class="inner-content order-1 pt-[30px] px-[30px]">
                            <div class="time-post mb-[20px] text-[16px] text-white">
                                <span>Đăng bởi: Admin Hune</span>
                            </div>
                            <h3 class="line-clamp-2 text-[20px] font-[700] mb-[20px] text-white hover:text-button">
                                <a href="../article/index.html?id=${item.id}">${item.title}</a>
                            </h3>
                            <p class="line-clamp-2 text-[16px] text-[#d0d0d0]">
                                ${item.description}
                            </p>
                            <a href="../article/index.html?id=${item.id}"
                                class=" block pb-[20px] mt-[20px] pt-[20px] border-t-[1px] border-white">
                                <div class="button-block cursor-pointer">
                                    <span class="button-line-left bg-button w-[29px] h-[1px] mr-[15px]"></span>
                                    <span class="button-text text-button">Xem thêm </span>
                                    <span class="button-line-right bg-button w-[29px] h-[1px] ml-[15px]"></span>
                                </div>
                            </a>
                        </div>
                    </div>
            </div>
                `).join('')}
        </div>
        <div class="pagination-3 flex justify-center mt-4 gap-[10px]">
            <button id="scrollToStart-3"
                class=" w-[15px] h-[15px] border-button border-[1px] rounded-[3px] bg-button"></button>
            <button id="scrollToEnd-3"
                class=" w-[15px] h-[15px] border-button border-[1px] rounded-[3px]"></button>
        </div>
        `;

        if (section8Element) {
            section8Element.innerHTML = section8Template;

            // Lấy carousel 3
            const carousel3 = document.getElementById("myCarousel-3");

            // Nút cuộn về đầu 3
            document.getElementById("scrollToStart-3").addEventListener("click", () => {
                carousel3.scrollTo({ left: 0, behavior: "smooth" });
            });

            // Nút cuộn về cuối 3
            document.getElementById("scrollToEnd-3").addEventListener("click", () => {
                carousel3.scrollTo({ left: carousel3.scrollWidth, behavior: "smooth" });
            });

            const pagination3 = document.querySelector(".section-8 .pagination-3");
            if (pagination3) {
                const listButton3 = pagination3.querySelectorAll("button");
                listButton3.forEach(button => {
                    button.addEventListener("click", () => {
                        listButton3.forEach(item => {
                            item.classList.remove("bg-button");
                        })
                        button.classList.add("bg-button");
                    })
                })
            }

            // Xử lý link xem thêm
            const listArticles = document.querySelectorAll('.section-8 .articles');
            listArticles.forEach(article => {
                article.addEventListener('click', () => {
                    const idTag = article.getAttribute('id');
                    window.location.href = `../article/index.html?id=${idTag}`;
                });
            });
        }

    } catch (error) {
        console.error("Error fetching section 8 data:", error);
    }
}
section8();
// --------------end section 8

// --------------section 9
const section9 = async () => {
    try {
        const response = await fetch('../../data/home/feedback.json');
        const dataSection9 = await response.json();

        const section9Element = mainElement.querySelector('.section-9');
        const section9Template = `
        <div class="container mx-auto">
            <div class="carousel carousel-center rounded-box max-w-[653px] space-x-4 p-4 gap-[24px]" id="myCarousel-4">
                ${dataSection9.map(item => `
                <div class="carousel-item flex flex-col gap-[30px] articles bg-secondary rounded-[8px] overflow-hidden w-[553px] p-[45px] item-1">
                    <div class="block flex items-center gap-[15px]">
                        <div class="inner-avatar w-[80px] h-[80px] rounded-full overflow-hidden">
                            <img src=${item.image} alt='${item.name}' loading="lazy" class="w-full h-full object-cover">
                        </div>
                        <div class="inner-info">
                            <h3 class="inner-name text-[26px] text-white mb-[10px] capitalize">
                                ${item.name}
                            </h3>
                            <div class="inner-work text-[18px] text-button capitalize">
                                ${item.position}
                            </div>
                        </div>
                    </div>
                    <div class="inner-feedback">
                        <p class="text-white">
                            ${item.content}
                        </p>
                    </div>
                </div>
                `).join('')}
            </div>
            <div class="pagination-4 flex justify-center mt-4 gap-[10px]">
                <button id="scrollToStart-4"
                    class=" w-[15px] h-[15px] border-button border-[1px] rounded-[3px] bg-button"></button>
                <button id="scrollToMiddle-4"
                    class=" w-[15px] h-[15px] border-button border-[1px] rounded-[3px]"></button>
                <button id="scrollToEnd-4"
                    class=" w-[15px] h-[15px] border-button border-[1px] rounded-[3px]"></button>
            </div>
        </div>
        `;

        if (section9Element) {
            section9Element.innerHTML = section9Template;

            // Lấy tham chiếu đến các nút và carousel
            const buttonStart = document.getElementById('scrollToStart-4');
            const buttonMiddle = document.getElementById('scrollToMiddle-4');
            const buttonEnd = document.getElementById('scrollToEnd-4');
            const carousel4 = document.getElementById('myCarousel-4');
            const items = carousel4.querySelectorAll('.carousel-item'); // Tham chiếu đúng tới các mục

            // Chuyển đến mục cụ thể
            function scrollToItem(index) {
                if (items[index]) {
                    const offsetLeft = items[index].offsetLeft; // Lấy vị trí của mục
                    carousel4.scrollTo({
                        left: offsetLeft,
                        behavior: 'smooth', // Cuộn mượt
                    });
                }
            }

            // Thêm sự kiện click cho từng nút
            buttonStart.addEventListener('click', () => scrollToItem(0)); // Chuyển về mục đầu
            buttonMiddle.addEventListener('click', () => scrollToItem(1)); // Chuyển đến mục 2
            buttonEnd.addEventListener('click', () => scrollToItem(2)); // Chuyển đến mục 3

            // Xử lý trạng thái các nút trong pagination
            const pagination4 = document.querySelector(".section-9 .pagination-4");
            if (pagination4) {
                const listButton4 = pagination4.querySelectorAll("button");
                listButton4.forEach(button => {
                    button.addEventListener("click", () => {
                        listButton4.forEach(item => {
                            item.classList.remove("bg-button"); // Xóa lớp hiện tại
                        });
                        button.classList.add("bg-button"); // Thêm lớp cho nút được chọn
                    });
                });
            }
        }
    } catch (error) {
        console.error("Error fetching section 9 data:", error);
    }
}
section9();
// ----------------end section 9