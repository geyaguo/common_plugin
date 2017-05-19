var pwdBox = PwdBox = {
    template: '<style>.flexable{display: -webkit-box;} .flexable>div{-webkit-box-flex: 1;} .flexable.password>div{opacity: 0};.flexable.password>div.active{opacity: 1 !important;}.password{ margin: 12px 25px;}.password>div{height:46px;line-height:46px;text-align:center}.password>div:first-child{border-top-left-radius:5px;border-bottom-left-radius:5px}.password>div:last-child{border-top-right-radius:5px;border-bottom-right-radius:5px}.input-box .flexable>div{height:53px}.input-box .flexable>div:active{background:rgba(0,200,200,.5)}.list-block .item-title{font-weight:normal!important;font-size:14px}ul li{position:relative}.close{position:absolute;top:4px;left:4px;font-size:20px;width:22px;text-align:center} h1.title{height:50px;font-size:18px;line-height:50px;text-align:center;margin: 0;} .notice{height:30px;line-height:30px;font-size:12px;text-align:center;margin-bottom:15px;color: #00a9dd;}</style>' + '<div class="password-box" style="position: fixed;top:0;left:0;z-index: 100;width: 100%;height: 100%;background: rgba(0,0,0,.7);display:none;">' + '<div class="inner-box" style="position: fixed;bottom: 0;left: 0;width: 100%;height: 380px;background: url(img/pwd_keyboard.png) center bottom / 100% 100%;">' + '<span class="iconfont icon-guanbi close">×</span>' + '<h1 class="title">支付密码</h1>' + '<div class="flexable password">' + '<div >●</div>' + '<div >●</div>' + '<div >●</div>' + '<div >●</div>' + '<div >●</div>' + '<div >●</div>' + '<!--●-->' + '</div>' + '<div class="notice color-lightblue">请输入支付密码！</div>' + '<div class="input-box">' + '<div class="flexable">' + '<div class="input-key" data-label="1" ></div><div class="input-key" data-label="2"></div><div class="input-key"  data-label="3"></div>' + '</div>' + '<div class="flexable">' + '<div class="input-key" data-label="4" ></div><div class="input-key" data-label="5"></div><div class="input-key" data-label="6"></div>' + '</div>' + '<div class="flexable">' + '<div class="input-key" data-label="7" ></div><div class="input-key" data-label="8"></div><div class="input-key" data-label="9"></div>' + '</div>' + '<div class="flexable">' + '<div></div><div class="input-key" data-label="0" ></div><div class="input-key" data-label="del"  ></div>' + '</div>' + '</div>' + '</div>' + '</div>',
	passwordOrg: '',
    password: '',
    inited: false,
    callback: function(res) {
        if (res) {
            alert('密码正确');
            document.querySelector('.password-box').style.display = 'none'
        } else {
            alert('密码错误')
        }
    },
    init: function(password, keyboard, title, notice) {
        if (pwdBox.inited) {
            return
        }
        console.log(document.getElementsByTagName('body'));
        document.getElementsByTagName('body')[0].innerHTML += pwdBox.template;
        if (keyboard) {
            document.querySelector('.password-box .inner-box').style.backgroundImage = keyboard
        }
        title && (document.querySelector('h1.title').innerText = title);
        notice && (document.querySelector('.password-box .notice').innerText = notice);
        password && (pwdBox.passwordOrg = password);
        document.querySelector('.close').addEventListener('click', function() {
            document.querySelector('.password-box').style.display = 'none';
            pwdBox.reset()
        });
        var inputs = document.querySelectorAll('.input-key');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('touchstart', function(e) {
                onTouch(this.getAttribute('data-label'))
            }, true)
        }
        var onTouch = function(label) {
            if (label == 'del') {
                pwdBox.password = pwdBox.password.substr(0, pwdBox.password.length - 1);
                pwdBox.onChange()
            } else {
                pwdBox.password += label;
                pwdBox.onChange();
                if (pwdBox.password.length == 6) {
                    if (pwdBox.passwordOrg) {
                        if (pwdBox.password == pwdBox.passwordOrg) {
                            pwdBox.callback({
                                status: true,
                                password: pwdBox.password
                            })
                        } else {
                            pwdBox.callback({
                                status: false,
                                password: pwdBox.password
                            })
                        }
                    } else {
                        pwdBox.callback({
                            status: true,
                            password: pwdBox.password
                        })
                    }
                }
            }
        };
        pwdBox.inited = true
    },
    onChange: function() {
        var texts = document.querySelectorAll('.password>div');
        for (var i = 0; i < texts.length; i++) {
            texts[i].style.opacity = 0
        }
        for (i = 0; i < pwdBox.password.length; i++) {
            texts[i].style.opacity = 1
        }
    },
    reset: function() {
        pwdBox.password = '';
        pwdBox.onChange();
        document.querySelector('.password-box').style.display = 'none'
    },
    show: function(callback) {
        if (callback) {
            pwdBox.callback = callback
        }
        document.querySelector('.password-box').style.display = 'block'
    }
};