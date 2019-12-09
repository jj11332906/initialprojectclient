function request(json) {

    var access_token = window.localStorage.getItem('access_token');
    if (access_token === null || access_token === undefined || access_token === '') {
        window.location.href = "login.html";
    }

    this.json = json||{};
    this.url = null;
    this.params = {};
    this.async = false;

    var _this = this;

    this.url = this.json.url;
    this.params = this.json.params || {};
    if (this.params !== undefined && this.params !== null && this.params !== '') {
        this.params.accessToken = access_token;
    }
    this.async = this.json.async || false;

}


request.prototype.get = function (callback) {

    console.log(this.url);
    console.log(this.params);
    console.log(this.async);
    var access_token = this.params.accessToken;
    var request_url = this.url;
    if (request_url.indexOf('?') === -1) {
        request_url += "?access_token=" + access_token;
    } else {
        request_url += "&access_token=" + access_token;
    }
    console.log(request_url);
    $.ajax({
        //请求方式
        type: "GET",
        //请求的媒体类型
        contentType: "application/x-www-form-urlencoded",
        //请求地址
        url: request_url,
        // beforeSend: function(request) {
        //     request.setRequestHeader("Authorization",  access_token);
        // },
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


request.prototype.post = function (callback) {

    console.log(this.url);
    console.log(this.params);
    console.log(this.async);
    var access_token = this.params.accessToken;
    var request_url = this.url;
    if (request_url.indexOf('?') === -1) {
        request_url += "?access_token=" + access_token;
    } else {
        request_url += "&access_token=" + access_token;
    }
    console.log(request_url);
    $.ajax({
        //请求方式
        type: "POST",
        //请求的媒体类型
        contentType: "application/x-www-form-urlencoded",
        //请求地址
        url: request_url,
        // beforeSend: function(request) {
        //     request.setRequestHeader("Authorization",  access_token);
        // },
        // 数据，json字符串
        data: this.params,
        async: this.async,
        //请求成功
        success: function (result) {
            console.log(result);
            callback(result);
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
};


request.prototype.put = function (callback) {

    console.log(this.url);
    console.log(this.params);
    console.log(this.async);
    var access_token = this.params.accessToken;
    var request_url = this.url;
    if (request_url.indexOf('?') === -1) {
        request_url += "?access_token=" + access_token;
    } else {
        request_url += "&access_token=" + access_token;
    }
    console.log(request_url);
    $.ajax({
        //请求方式
        type: "PUT",
        //请求的媒体类型
        contentType: "application/x-www-form-urlencoded",
        //请求地址
        url: request_url,
        // 数据，json字符串
        data: this.params,
        async: this.async,
        //请求成功
        success: function (result) {
            console.log(result);
            callback(result);
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
};


request.prototype.delete = function (callback) {

    console.log(this.url);
    console.log(this.params);
    console.log(this.async);
    var access_token = this.params.accessToken;
    var request_url = this.url;
    if (request_url.indexOf('?') === -1) {
        request_url += "?access_token=" + access_token;
    } else {
        request_url += "&access_token=" + access_token;
    }
    console.log(request_url);
    $.ajax({
        //请求方式
        type: "DELETE",
        //请求的媒体类型
        contentType: "application/x-www-form-urlencoded",
        //请求地址
        url: request_url,
        // beforeSend: function(request) {
        //     request.setRequestHeader("Authorization",  access_token);
        // },
        // 数据，json字符串
        data: this.params,
        async: this.async,
        //请求成功
        success: function (result) {
            console.log(result);
            callback(result);
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
};


request.prototype.logout = function () {
    var access_token = this.params.accessToken;
    var request_url = "http://127.0.0.1:8095/user/logout?access_token=" + access_token;
    console.log(request_url);
    $.ajax({
        //请求方式
        type: "DELETE",
        //请求的媒体类型
        contentType: "application/x-www-form-urlencoded",
        //请求地址
        url: request_url,
        // beforeSend: function(request) {
        //     request.setRequestHeader("Authorization",  access_token);
        // },
        // 数据，json字符串
        data: this.params,
        async: this.async,
        //请求成功
        success: function (result) {
            console.log(result);

            var code = result.code;
            var msg = result.msg;
            if (code === 2000) {
                alert(msg);
                window.location.href = "login.html";
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
