const app = new Vue ({
    el : '#app',
    data : {
        longgedIn : false,
        currentPage : 'login',
        username : '',
        emailLog: '',
        passwordLog: '',
        addTask: true
    },
    methods: {
        registerForm() {
           return this.currentPage = 'register'
        },
        loginForm() {
           return this.currentPage = 'login'
        }
    },
})