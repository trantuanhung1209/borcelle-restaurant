const mainElement = document.querySelector('.main');

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
            console.log(innerButtonCheckout);
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
rederCart2();
// ------------end cart--------------

// ----------inner-right----------
const removeDuplicateProducts = (products) => {
    const seen = new Set(); // Tập hợp các tên sản phẩm đã gặp
    return products.filter(product => {
        if (seen.has(product.name)) {
            return false; // Bỏ qua sản phẩm nếu tên đã tồn tại
        }
        seen.add(product.name); // Thêm tên vào danh sách đã gặp
        return true; // Giữ sản phẩm
    });
};

const sortByType = (dataProduct, type) => {
    const copiedData = [...dataProduct]; 
    const dataFinal = removeDuplicateProducts(copiedData);
    switch (type) {
        case 'default':
            return dataFinal.sort((a, b) => a.id - b.id);
        case 'a-z':
            return dataFinal.sort((a, b) => a.name.localeCompare(b.name));
        case 'z-a':
            return dataFinal.sort((a, b) => b.name.localeCompare(a.name));
        case 'price-up':
            return dataFinal.sort((a, b) => a.price - b.price);
        case 'price-down':
            return dataFinal.sort((a, b) => b.price - a.price);
        case 'under100':
            return dataFinal.filter(item => item.price < 100000);
        case 'from100to200':
            return dataFinal.filter(item => item.price >= 100000 && item.price < 200000);
        case 'from200to500':
            return dataFinal.filter(item => item.price >= 200000 && item.price < 500000);
        case 'from500to1000':
            return dataFinal.filter(item => item.price >= 500000 && item.price < 1000000);
        case 'over1000':
            return dataFinal.filter(item => item.price >= 1000000);
        default: 
            return []; // Trả về bản sao nếu không có loại phù hợp
    }
}

const innerProductHtml = (dataProduct) => {
    const dataFinal = removeDuplicateProducts(dataProduct.products);
    return `
    ${dataFinal.map(item => `
        <div class="inner-product-item">
            <div class="inner-image">
                <a href="../dishDetails/?id=${item.id}">
                    <img src=${item.image} alt='${item.name}'>
                </a>

                <div class="inner-action">
                    <div class="inner-cart" id=${item.id}>
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                </div>
                ${item.discount? `
                <div class="inner-discount">
                    -9 <span>%</span>
                </div>
                ` : ``}
            </div>
            <div class="inner-content">
                <h3>
                    <a href="../dishDetails/?id=${item.id}" title='${item.name}'>
                        ${item.name}
                    </a>
                </h3>
                <div class="inner-price">
                    <div class="inner-new-price">
                        ${item.price.toLocaleString()}₫
                    </div>
                    ${item.originalPrice? `
                        <div class="inner-old-price">
                            ${item.originalPrice.toLocaleString()}₫
                        </div>
                    ` : ``}
                </div>
            </div>
            <a href="../dishDetails/?id=${item.id}" class="inner-button">
                Xem chi tiết
            </a>
        </div>
        `).join('')}
    `;
}

const innerPaginationHtml = () => {
    return `
    <nav aria-label="Page navigation example" class="inner-pagination">
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
    `;
}

const innerArrangeHtml = () => {
    return `
    <div class="inner-arrange">
        <div class="inner-list-content">
            <label class="inner-label">Sắp xếp: </label>
            <ul class="inner-select">
                <li>
                    <span
                        style="display: flex; justify-content: center; align-items: center; gap: 5px;">
                        Mặc định
                        <i class="fa-solid fa-chevron-down"
                            style="font-size: 12px;"></i>
                    </span>
                    <ul>
                        <li><a href="#" title="Mặc định" tag="default">Mặc định</a></li>
                        <li><a href="#" title="A → Z" tag="a-z">A → Z</a></li>
                        <li><a href="#" title="Z → A" tag="z-a">Z → A</a></li>
                        <li><a href="#" title="Giá tăng dần" tag="price-up">Giá tăng dần</a></li>
                        <li><a href="#" title="Giá giảm dần" tag="price-down">Giá giảm dần</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    `;
}

const innerRight = async () => {
    try {
        const response = await fetch('../../data/home/products.json');
        const dataProduct = await response.json();

        const innerRightElement = mainElement.querySelector('.inner-right');
        const innerRightTemplate = `
        <div class="inner-products">
            <div class="inner-top">
                <h2 class="inner-title">
                    Tất cả món ăn
                </h2>
                ${innerArrangeHtml()}
            </div>
            <div class="inner-list-product">
                ${innerProductHtml(dataProduct)}
            </div>
        </div>
        `;

        if (innerRightElement) {
            innerRightElement.innerHTML = innerRightTemplate;

            const innerSelect = document.querySelectorAll('.inner-arrange .inner-select li ul li');
            innerSelect.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const innerSelectText = item.querySelector('a').textContent;
                    const innerSelectParent = item.closest('.inner-select').querySelector('span');
                    innerSelectParent.innerHTML = innerSelectText + `<i class="fa-solid fa-chevron-down" style="font-size: 12px;"></i>`;
                    const innerSelectTag = item.querySelector('a').getAttribute('tag');
                    const innerListProduct = mainElement.querySelector('.inner-list-product');
                    const innerListProductTemplate = innerProductHtml({products: sortByType(dataProduct.products, innerSelectTag)});
                    innerListProduct.innerHTML = innerListProductTemplate;

                    if (innerListProduct) {
                        const innerCart = document.querySelectorAll('.inner-action .inner-cart');
                        innerCart.forEach(item => {
                            item.addEventListener('click', (e) => {
                                e.preventDefault();
                                const id = item.getAttribute('id');
                                const idFinal = parseInt(id);
                                const product = dataProduct.products.find(item => item.id === idFinal);
                                if (product) {
                                    const cart = JSON.parse(localStorage.getItem("cart")) || [];
                                    const cartItem = cart.find(item => item.id === idFinal);
                                    if (cartItem) {
                                        cartItem.quantity += 1;
                                        alert('Sản phẩm đã được thêm vào giỏ hàng');
                                    } else {
                                        cart.push({...product, quantity: 1});
                                        alert('Sản phẩm đã được thêm vào giỏ hàng');
                                    }
                                    localStorage.setItem("cart", JSON.stringify(cart));
                                    rederCart2();
                                } else {
                                    alert('Sản phẩm không tồn tại');
                                }
                                
                            });
                        });
                    }
                });
            });

            const innerCart = document.querySelectorAll('.inner-action .inner-cart');
            innerCart.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const id = item.getAttribute('id');
                    const idFinal = parseInt(id);
                    const product = dataProduct.products.find(item => item.id === idFinal);
                    if (product) {
                        const cart = JSON.parse(localStorage.getItem("cart")) || [];
                        const cartItem = cart.find(item => item.id === idFinal);
                        if (cartItem) {
                            cartItem.quantity += 1;
                            alert('Sản phẩm đã được thêm vào giỏ hàng');
                        } else {
                            cart.push({...product, quantity: 1});
                            alert('Sản phẩm đã được thêm vào giỏ hàng');
                        }
                        localStorage.setItem("cart", JSON.stringify(cart));
                        rederCart2();
                    } else {
                        alert('Sản phẩm không tồn tại');
                    }
                    
                });
            });
        }

    } catch (error) {
        console.error(error);
    }
}
innerRight();
// ----------end inner-right----------

// ----------inner-left----------
const innerFilterHtml = () => {
    return `
    <div class="inner-filter-for-you ">
        <h3 class="inner-title">
            Bạn chọn
        </h3>
        <div class="inner-selection">
            <a href="#" class="inner-clear-all">
                Xóa tất cả
                <i class="fa-solid fa-xmark"></i>
            </a>
            <ul></ul>
        </div>
    </div>
    `;
}

const innerPriceHtml = () => {
    return `
    <div class="inner-filter-price">
        <h3 class="inner-title">
            Chọn mức giá
        </h3>
        <div class="inner-selection">
            <ul>
                <li>
                    <span>
                        <label for="filter-under-100-000d" >
                            <input type="checkbox" name="filter-under-100-000d"
                                id="filter-under-100-000d" tag="under100" content="Dưới 100.000đ">
                            Dưới 100.000đ
                        </label>
                    </span>
                </li>
                <li>
                    <span>
                        <label for="filter-from-100-000d-200-000d" >
                            <input type="checkbox" name="filter-from-100-000d-200-000d"
                                id="filter-from-100-000d-200-000d" tag="from100to200" content="Từ 100.000đ - 200.000đ">
                            Từ 100.000đ - 200.000đ
                        </label>
                    </span>
                </li>
                <li>
                    <span>
                        <label for="filter-from-200-000d-500-000d" >
                            <input type="checkbox" name="filter-from-200-000d-500-000d"
                                id="filter-from-200-000d-500-000d" tag="from200to500" content="Từ 200.000đ - 500.000đ">
                            Từ 200.000đ - 500.000đ
                        </label>
                    </span>
                </li>
                <li>
                    <span>
                        <label for="filter-from-500-000d-1000-000d" >
                            <input type="checkbox" name="filter-from-500-000d-1000-000d"
                                id="filter-from-500-000d-1000-000d" tag="from500to1000" content="Từ 500.000đ - 1 triệu">
                            Từ 500.000đ - 1 triệu
                        </label>
                    </span>
                </li>
                <li>
                    <span>
                        <label for="filter-over-1000-000d" >
                            <input type="checkbox" name="filter-over-1000-000d"
                                id="filter-over-1000-000d" tag="over1000" content="Trên 1 triệu">
                            Trên 1 triệu
                        </label>
                    </span>
                </li>
            </ul>
        </div>
    </div>
    `;
}

const innerFlavorHtml = () => {
    return `
    <div class="inner-filter-flavor">
        <h3 class="inner-title">
            Hương vị
        </h3>
        <div class="inner-selection">
            <ul>
                <li>
                    <span>
                        <label for="man">
                            <input type="checkbox" name="man" id="man" content="Mặn">
                            Mặn
                        </label>
                    </span>
                </li>
                <li>
                    <span>
                        <label for="ngot">
                            <input type="checkbox" name="ngot" id="ngot" content="Ngọt">
                            Ngọt
                        </label>
                    </span>
                </li>
                <li>
                    <span>
                        <label for="chua">
                            <input type="checkbox" name="chua" id="chua" content="Chua">
                            Chua
                        </label>
                    </span>
                </li>
                <li>
                    <span>
                        <label for="cay">
                            <input type="checkbox" name="cay" id="cay" content="Cay">
                            Cay
                        </label>
                    </span>
                </li>
            </ul>
        </div>
    </div>
    `;
}

const innerSizeHtml = () => {
    return `
    <div class="inner-filter-size">
        <h3 class="inner-title">
            Kích cỡ
        </h3>
        <div class="inner-selection">
            <ul>
                <li>
                    <span>
                        <label for="lagre">
                            <input type="checkbox" name="lagre" id="lagre" content="Lớn">
                            Lớn
                        </label>
                    </span>
                </li>
                <li>
                    <span>
                        <label for="medium">
                            <input type="checkbox" name="medium" id="medium" content="Vừa">
                            Vừa
                        </label>
                    </span>
                </li>
                <li>
                    <span>
                        <label for="little">
                            <input type="checkbox" name="little" id="little" content="Nhỏ">
                            Nhỏ
                        </label>
                    </span>
                </li>
            </ul>
        </div>
    </div>
    `;
}

const innerLeft = async () => {
    const response = await fetch('../../data/home/products.json');
    const data = await response.json();
    const dataProduct = data.products;

    const innerLeftElement = mainElement.querySelector('.inner-left');
    const innerLeftTemplate = `
    ${innerFilterHtml()}
    ${innerPriceHtml()}
    ${innerFlavorHtml()}
    ${innerSizeHtml()}
    `;

    if (innerLeftElement) {
        innerLeftElement.innerHTML = innerLeftTemplate;

        const listProduct = mainElement.querySelector('.inner-list-product');
        const listSelection = document.querySelectorAll('.inner-selection ul li span label input');
        listSelection.forEach(item => {
            item.addEventListener('change', (e) => {
                const innerSelectTag = e.target.getAttribute('tag');
                item.checked? item.checked = true : item.checked = false;
                if (item.checked) {
                    const productFilter = sortByType(dataProduct, innerSelectTag);
                    if (productFilter && productFilter.length > 0) {
                        const innerListProductTemplate = innerProductHtml({products: productFilter});
                        listProduct.innerHTML = innerListProductTemplate;

                        if (listProduct) {
                            const innerCart = document.querySelectorAll('.inner-action .inner-cart');
                            innerCart.forEach(item => {
                                item.addEventListener('click', (e) => {
                                    e.preventDefault();
                                    const id = item.getAttribute('id');
                                    const idFinal = parseInt(id);
                                    console.log(dataProduct);
                                    const product = dataProduct.find(item => item.id === idFinal);
                                    if (product) {
                                        const cart = JSON.parse(localStorage.getItem("cart")) || [];
                                        const cartItem = cart.find(item => item.id === idFinal);
                                        if (cartItem) {
                                            cartItem.quantity += 1;
                                            alert('Sản phẩm đã được thêm vào giỏ hàng');
                                        } else {
                                            cart.push({...product, quantity: 1});
                                            alert('Sản phẩm đã được thêm vào giỏ hàng');
                                        }
                                        localStorage.setItem("cart", JSON.stringify(cart));
                                        rederCart2();
                                    } else {
                                        alert('Sản phẩm không tồn tại');
                                    }
                                    
                                });
                            });
                        }
                    } else {
                        listProduct.innerHTML = `
                        <div style="background-color: #fff3cd; width: 100%; color: #856404; border-radius: 8px; display: flex; justify-content: start; align-items: center; padding: 10px">
                            Món ăn đang được cập nhật
                        </div>`;
                    }
                } else {
                    listProduct.innerHTML = innerProductHtml({products: dataProduct});
                }

                const ulElement = mainElement.querySelector('.inner-filter-for-you .inner-selection ul');
                const content = e.target.getAttribute('content');
                if (item.checked) {
                    const liElement = document.createElement('li');
                    liElement.innerHTML = `
                    <a href="#">
                        <i class="fa-solid fa-xmark"></i>
                        ${content}
                    </a>
                    `;
                    ulElement.appendChild(liElement);
                } else {
                    const liElement = ulElement.querySelector(`.inner-selection ul li `);
                    ulElement.removeChild(liElement);
                }

                const listLiElement = ulElement.querySelectorAll('li');
                if (listLiElement.length > 0) {
                    listLiElement.forEach(item2 => {
                        item2.addEventListener('click', (e) => {
                            e.preventDefault();
                            item2.remove();
                            item.checked = false;
                            listProduct.innerHTML = innerProductHtml({products: dataProduct});

                            if (listProduct) {
                                const innerCart = document.querySelectorAll('.inner-action .inner-cart');
                                innerCart.forEach(item => {
                                    item.addEventListener('click', (e) => {
                                        e.preventDefault();
                                        const id = item.getAttribute('id');
                                        const idFinal = parseInt(id);
                                        const product = dataProduct.find(item => item.id === idFinal);
                                        if (product) {
                                            const cart = JSON.parse(localStorage.getItem("cart")) || [];
                                            const cartItem = cart.find(item => item.id === idFinal);
                                            if (cartItem) {
                                                cartItem.quantity += 1;
                                                alert('Sản phẩm đã được thêm vào giỏ hàng');
                                            } else {
                                                cart.push({...product, quantity: 1});
                                                alert('Sản phẩm đã được thêm vào giỏ hàng');
                                            }
                                            localStorage.setItem("cart", JSON.stringify(cart));
                                            rederCart2();
                                        } else {
                                            alert('Sản phẩm không tồn tại');
                                        }
                                        
                                    });
                                });
                            }
                        });
                    });
                }
            });
        });

        const innerClearAll = document.querySelector('.inner-clear-all');
        if (innerClearAll) {
            innerClearAll.addEventListener('click', (e) => {
                e.preventDefault();
                const listProduct = mainElement.querySelector('.inner-list-product');
                const innerListProductTemplate = innerProductHtml({products: dataProduct});
                listProduct.innerHTML = innerListProductTemplate;
                
                if (listProduct) {
                    const innerCart = document.querySelectorAll('.inner-action .inner-cart');
                    innerCart.forEach(item => {
                        item.addEventListener('click', (e) => {
                            e.preventDefault();
                            const id = item.getAttribute('id');
                            const idFinal = parseInt(id);
                            console.log(dataProduct);
                            const product = dataProduct.find(item => item.id === idFinal);
                            if (product) {
                                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                                const cartItem = cart.find(item => item.id === idFinal);
                                if (cartItem) {
                                    cartItem.quantity += 1;
                                    alert('Sản phẩm đã được thêm vào giỏ hàng');
                                } else {
                                    cart.push({...product, quantity: 1});
                                    alert('Sản phẩm đã được thêm vào giỏ hàng');
                                }
                                localStorage.setItem("cart", JSON.stringify(cart));
                                rederCart2();
                            } else {
                                alert('Sản phẩm không tồn tại');
                            }
                            
                        });
                    });
                }

                const listSelection = document.querySelectorAll('.inner-filter-price .inner-selection ul li span label input');
                listSelection.forEach(item => {
                    item.checked = false;
                });

                const ulElement = mainElement.querySelector('.inner-filter-for-you .inner-selection ul');
                ulElement.innerHTML = '';
            });
        }

        const innerFilterRes = document.querySelector('.inner-filter-res');
        if (innerFilterRes) {
            innerFilterRes.addEventListener('click', (e) => {
                const innerFilter = mainElement.querySelector('.inner-filter');
                innerFilter.classList.toggle('active');
            });
        }

        document.addEventListener('click', (e) => {
            const innerFilter = mainElement.querySelector('.inner-filter');
            if (innerFilter && !innerFilter.contains(e.target) && !innerFilterRes.contains(e.target)) {
                innerFilter.classList.remove('active');
            }
        });
    }
}
innerLeft();
// ----------end inner-left----------