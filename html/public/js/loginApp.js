var loginApp = new Vue({
    el: '#loginForm',
    data: {
        titleStyle: {
            'text-align': 'center',
            'font': '30px bold',
            'text-shadow': '1px',
            transition: '1s ease 0.1s',
            'color': 'rgb(31,165,225)',
            'font-family': '"Youyuan", "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif',
            'line-height': '80px',
            position: 'relative',
            left: '2%',
            //transform: 'translateX(50%)'
        },
        containerStyle: {
            'z-index': '9999',
            'background-color': 'white',
            padding: '15px 100px 45px 100px',
            border: '2px ridge rgb(31,165,218)',
            'border-radius': '8px',
            'box-shadow': '6px 8px #ddd',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translateX(-50%) translateY(-50%)'
        },
        buttonsStyle: {
            position: 'relative',
            //left: '50%',
            transform: 'translateX(25%)'
        },
        authContent: {
            username: '',
            password: '',
        },
        formRules: {
            username: [{
                required: true,
                message: '用户名不能为空',
                trigger: 'blur'
            }],
            password: [{
                required: true,
                message: '密码不能为空',
                trigger: 'blur'
            }],
        },
        serverAddr: 'http://localhost:8081/login'
    },
    methods: {
        submitForm() {
            //alert(this.authContent.username + ' ' + this.authContent.password);
            var req = new XMLHttpRequest();
            req.open("POST", this.serverAddr, true);
            req.send(JSON.stringify(this.authContent));
            req.onreadystatechange = function() {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        location.reload();
                    } else {
                        alert('用户名或密码输入错误');
                    }
                } else {
                    //console.log(req.readyState + ", " + req.status);
                }
            };
        },
        reset() {
            this.authContent.username = '';
            this.authContent.password = '';
        },
    }
});