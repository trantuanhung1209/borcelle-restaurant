const mainElement = document.querySelector('.main');

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
                <span style="font-weight: 700; font-style: italic;">DOLA RESTAURANT</span> - Nhà hàng ẩm thực hiện đại kết hợp với truyền thống, tạo nên tính mới lạ cho thực khách. Được ra đời vào năm 2021 với tiêu chí "Khách hàng là trên hết" nên chúng tôi luôn tự hào về cách phục vụ cũng như các món ăn mà chúng tôi làm ra. Nhà hàng chúng tôi luôn luôn đặt khách hàng lên hàng đầu, tận tâm phục vụ, mang lại cho khách hàng những trãi nghiệm tuyệt với nhất. Các món ăn với công thức độc quyền sẽ mang lại hương vị mới mẻ cho thực khách. Dola Restaurant xin chân thành cảm ơn.
            </div>
            <div class="inner-image mb-2">
                <img src="../../assets/images/about/about_image.jpg" alt="about">
            </div>
            <div class="inner-bottom" style="font-weight: 700; font-style: italic;">
                HÃY ĐẾN DOLA RESTAURANT ĐỂ THƯỞNG THỨC NGAY BẠN NHÉ!
            </div>
        </div>
    </section>
    `;

    if (mainElement) {
        mainElement.innerHTML = template;
    }
}
aboutPage();