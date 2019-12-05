function request(json) {

    var access_token = window.localStorage.getItem('access_token');
    if(access_token === null||access_token === undefined ||access_token === ''){
        window.location.href = "login.html";
    }

    this.json = json;
    this.url = null;
    this.params = null;
    this.async = null;

    var _this = this;

    this.url = this.json.url;
    this.params = this.json.params;
    this.params.accessToken = access_token;
    this.async =  this.json.async || false;
}


request.prototype.get = function (callback) {

    console.log(this.url);
    console.log(this.params);
    console.log(this.async);

    $.ajax({
        //请求方式
        type: "GET",
        //请求的媒体类型
        contentType: "application/x-www-form-urlencoded",
        //请求地址
        url: this.url,
        // 数据，json字符串
        data: this.params,
        async: this.async,
        //请求成功
        success: function (result) {
            console.log(result);
            var code = result.code;
            var msg = result.msg;

            if (code === 1000) {
                var data = result.data;
                callback(data);

            } else {
                alert(msg);
                console.log(msg);
            }


        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
};