$(function () {
    // 点击切换
    console.log(222);
    $('#link_reg').click(() => {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').click(() => {
        $('.login-box').show();
        $('.reg-box').hide();
    })


    // 线引入
    const form = layui.form
    form.verify({
        // 自定义校验规则
        password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 函数方式
        repwd: (value) => {
            const pwd = $('.reg-box [name=password]').val()
            console.log(pwd, value);

            if (pwd !== value) return '两次密码不一致'
        }

    });

    
    // 接口
    // const baseurl = "http://www.liulongbin.top:3007";
    $('#form_reg').submit(e => {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: "/api/reguser",
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: res => {
                console.log(25552);
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('注册成功')
                $('#link_login').click()
        // $.ajax({
        //     type: "POST",
        //     url: baseUrl + "/api/reguser",
        //     data: {
        //         username: $("#form_reg [name=username").val(),
        //         password: $("#form_reg [name=password").val(),
        //     },
        //     success: (res) => {
        //         if (res.status !== 0) return layer.msg(res.message);
        //         layer.msg("注册成功！");
        //         // 注册成功后跳转到登录界面
        //         $("#link_login").click();
            }
        })
    });
    $('#form_login').submit(function (e) {
        e.preventDefault();

        console.log($(this).serialize());

        $.ajax({
            type: "POST",
            url: '/api/login',
            data: $(this).serialize(),
            success: res => {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)

                // 把token存储在本地
                localStorage.setItem('token', res.token)
                // 跳转首页
                location.href = '/index.html'
            }
        })
    })
})