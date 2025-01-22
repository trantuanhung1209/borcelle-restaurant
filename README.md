/restaurant-website
│
├── /assets                # Chứa tài nguyên tĩnh (hình ảnh, fonts, icons, v.v.)
│   ├── /images            # Hình ảnh sử dụng trên website
│   │   ├── /menu          # Hình ảnh menu
│   │   ├── /logo          # Logo và biểu tượng
│   │   └── /gallery       # Hình ảnh cho bộ sưu tập, sự kiện, v.v.
│   ├── /fonts             # Fonts sử dụng cho website
│   └── /icons             # Biểu tượng (SVG, icon fonts, v.v.)
│
├── /data                  # Chứa các file dữ liệu (JSON)
│   └── products.json      # Dữ liệu sản phẩm, menu
│
├── /pages                 # Chứa các trang của website
│   ├── /home              # Trang chủ
│   │   ├── index.html     # Trang chủ
│   │   ├── home.css       # CSS cho trang chủ
│   │   └── home.js        # JavaScript cho trang chủ
│   ├── /login             # Trang đăng nhập
│   │   ├── index.html     # Trang đăng nhập
│   │   └── login.js       # JavaScript cho trang đăng nhập
│   ├── /about             # Trang giới thiệu
│   │   ├── index.html     # Trang giới thiệu
│   │   └── about.js       # JavaScript cho trang giới thiệu
│   └── /contact           # Trang liên hệ
│       ├── index.html     # Trang liên hệ
│       └── contact.js     # JavaScript cho trang liên hệ
│
├── /shared                # Chứa các tài nguyên chung
│   ├── /css               # Các CSS chung cho toàn bộ dự án
│   │   ├── styles.css     # Các kiểu CSS chung
│   │   └── variables.css  # Các biến và cấu hình CSS
│   └── /js                # Các hàm JavaScript chung
│       ├── food-card.js   # Xử lý card món ăn
│       └── nav.js         # Xử lý thanh điều hướng
│
├── index.html             # Trang chủ mặc định (có thể redirect đến /pages/home/index.html)
├── about.html             # Trang giới thiệu
└── README.md              # Hướng dẫn sử dụng dự án
