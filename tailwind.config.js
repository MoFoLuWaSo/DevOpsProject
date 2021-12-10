module.exports = {
    purge: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {

            backgroundSize:{
                '100%':'100%'
            },
            opacity: ['disabled'],
            backgroundColor: ['active'],
        },
    },
    variants: {
        extend: {
            outline:['focus-visible'],
            borderColor: ['focus-visible'],

            borderWidth: ['hover', 'focus'],
        },
    },
    plugins: [],
}
