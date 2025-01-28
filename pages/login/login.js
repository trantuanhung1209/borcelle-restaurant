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
                <a href="#" style="color: var(--background-color-button);">Đăng nhập tài khoản</a>
            </li>
        </ul>
    </div>
    `;

    breadecumb.innerHTML = breadecumbTemplate;
}
breadecumb();
// ----------end breadcumb----------

// ----------section 1----------
const section1 = () => {
    const section1 = mainElement.querySelector('.section-1');
    const section1Template = `
    <div class="container">
        <div class="row">
            <div class="col-4">
                <ul class="inner-menu">
                    <li class="active">
                        <a href="../login/">Đăng nhập</a>
                    </li>
                    <li>
                        <a href="../register/">Đăng ký</a>
                    </li>
                </ul>

                <div class="inner-title">
                    <h2>Đăng nhập</h2>
                </div>

                <div class="inner-content">
                    <form class="inner-form">
                        <fieldset class="form-group">
                            <label>Email của bạn:</label>
                            <input placeholder="Email" type="email" required="" id="email1"
                                class="form-control form-control-lg" value="" name="email">
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

                <p class="inner-forgot-password">
                    <a href="#">Quên mật khẩu?</a>
                </p>

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
    }
}
section1();
// ----------end section 1----------