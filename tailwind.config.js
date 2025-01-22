tailwind.config = {
    theme: {
        screens: {
            'sm': '576px',
            'md': '768px',
            'lg': '992px',
            'xl': '1340px',
            '2xl': '1400px',
        },
        fontFamily: {
            dancing: ['Dancing Script', 'cursive'],
            quicksand: ['Quicksand', 'sans-serif'],
        },
        extend: {
            colors: {
                nav: '#143b36a1',
                primary: '#153b36',
                secondary: '#11302c',
                button: '#d69c52',
                buttonHover: '#c68f4bcb',
            }
        },
    }
}