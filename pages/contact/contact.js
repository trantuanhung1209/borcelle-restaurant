const mainElement = document.querySelector('.main');

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
                <a href="#" style="color: var(--background-color-button);">Liên hệ</a>
            </li>
        </ul>
    </div>
    `;

    breadecumb.innerHTML = breadecumbTemplate;
}
breadecumb();
// ----------end breadcumb----------

// ----------section 1 inner left----------
const section1InnerLeft = () => {
    const section1 = mainElement.querySelector('.section-1');
    const innerLeftElement = section1.querySelector('.inner-left');

    const innerLeftTemplate = `
    <h2 class="inner-title">
        Nhà hàng Borcelle Restaurant
    </h2>
    <div class="inner-info">
        <p>
            Nhà hàng chúng tôi luôn luôn đặt khách hàng lên hàng đầu, tận tâm phục vụ, mang lại
            cho khách hàng những trãi nghiệm tuyệt với nhất. Các món ăn với công thức độc quyền
            sẽ mang lại hương vị mới mẻ cho thực khách. Borcelle Restaurant xin chân thành cảm
            ơn.
        </p>
        <h3>
            Cửa hàng chính
        </h3>
        <div class="inner-address">
            <p>
                <b>Địa chỉ:</b> &nbsp; 12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Hồ Chí Minh
            </p>
            <p>
                <b>Điện thoại:</b> &nbsp; <span>0353133235</span>
            </p>
            <p>
                <b>Email:</b> &nbsp; <span>tuanhungvip12@gmail.com</span>
            </p>
        </div>
    </div>
    `;

    if (innerLeftElement) {
        innerLeftElement.innerHTML = innerLeftTemplate;
    }
}
section1InnerLeft();
// ----------end section 1 inner left----------

// ----------section 1 inner right----------
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
const section1InnerRight = () => {
    const section1 = mainElement.querySelector('.section-1');
    const innerRightElement = section1.querySelector('.inner-right');

    const innerRightTemplate = `
    <h2 class="inner-title">
        Liên hệ với chúng tôi
    </h2>
    <div class="inner-form">
        <div class="inner-form-group">
            <input type="text" name="fullName" id="fullName" placeholder="Họ và tên">
        </div>
        <div class="inner-form-group">
            <input type="email" name="email" id="email" placeholder="Email">
        </div>
        <div class="inner-form-group">
            <input type="number" name="phone" id="phone" placeholder="Điện thoại*">
        </div>
        <div class="inner-form-group">
            <textarea name="message" id="message" placeholder="Nội dung"></textarea>
        </div>

        <button class="inner-button">
            Gửi thông tin
        </button>
    </div>
    `;
    if (innerRightElement) {
        innerRightElement.innerHTML = innerRightTemplate;

        const innerButton = innerRightElement.querySelector('.inner-button');
        innerButton.addEventListener('click', (e) => {
            e.preventDefault();
            const fullName = innerRightElement.querySelector('#fullName').value;
            const email = innerRightElement.querySelector('#email').value;
            const phone = innerRightElement.querySelector('#phone').value;
            const message = innerRightElement.querySelector('#message').value;

            if (fullName && validateEmail(email) && phone && message) {
                innerRightElement.reset();
                const sectionPopup = mainElement.querySelector('.section-popup');
                if (sectionPopup) {
                    sectionPopup.style.display = 'block';
                    sectionPopup.style.opacity = '1';
                    sectionPopup.style.pointerEvents = 'auto';
                    const popupContent = sectionPopup.querySelector('.inner-popup-body');
                    const popupContentTemplate = `
                    <p>
                        Cảm ơn bạn đã liên hệ với Borcelle Restaurant. Chúng tôi sẽ phản hồi lại bạn trong thời gian sớm
                        nhất.
                    </p>
                    <div class="inner-info">
                        <p>
                            <b>Họ và tên:</b> &nbsp; <span>${fullName}</span>
                        </p>
                        <p>
                            <b>Điện thoại:</b> &nbsp; <span>${phone}</span>
                        </p>
                        <p>
                            <b>Email:</b> &nbsp; <span>
                                ${email}
                            </span>
                        </p>
                        <p>
                            <b>Message:</b> &nbsp; <span>
                                ${message}
                            </span>
                        </p>
                    </div>
                    <div class="inner-action">
                        <button class="inner-button">
                        Xác nhận
                        </button>
                    </div>
                    `;
                    if (popupContent) {
                        popupContent.innerHTML = popupContentTemplate;
                        const innerButton = popupContent.querySelector('.inner-button');
                        innerButton.addEventListener('click', (e) => {
                            e.preventDefault();
                            sectionPopup.style.display = 'none';
                        });

                        const innerPopup = sectionPopup.querySelector('.inner-popup');
                        const buttonClose = sectionPopup.querySelector('.inner-popup-close');
                        innerPopup.addEventListener('click', (e) => {
                            e.stopPropagation();
                        });
                        buttonClose.addEventListener('click', (e) => {
                            e.preventDefault();
                            sectionPopup.style.display = 'none';
                        });
                    }
                }
            } else {
                alert('Vui lòng nhập đầy đủ thông tin');
            }
        });
    }
}
section1InnerRight();
// ----------end section 1 inner right----------