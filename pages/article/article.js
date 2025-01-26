const mainElement = document.querySelector('.main');
const url = new URL(window.location.href);
const id = url.searchParams.get('id');
const idFinal = parseInt(id);

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