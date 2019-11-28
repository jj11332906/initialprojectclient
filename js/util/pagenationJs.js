function page(json) {
    this.json = json;

    if (!this.json.id) {
        return false
    }
    this.obj = null;
    this.nowNum = null;
    this.allNumUrl = null;
    this.allNum = null;
    this.callback = null;
    this.dataMethod = null;
    this.queryForm = null;
    this.pageSize = null;
    this.isParam = null;//是否有搜索参数

    var _this = this;
    this.obj = document.getElementById(this.json.id);
    this.nowNum = this.json.nowNum || 1;
    this.pageSize = this.json.pageSize || 5;
    this.allNumUrl = this.json.allNumUrl;
    this.isParam = this.json.isParam || false;
    this.callback = this.json.callback || function () {
    };
    this.dataMethod = this.json.dataMethod;
    this.queryForm = this.json.queryForm;

    //todo 获取总页数
    this.allNum = this.getTotalPages(this.allNumUrl, this.pageSize, this.isParam);

    //todo 当前页面号大于总页数，将总页数赋给当前页面号
    if(this.nowNum>this.allNum){
        console.log(this.nowNum);
        console.log(this.allNum);
        this.nowNum=this.allNum;
    }
    this.callback(this.nowNum, this.allNum);

    //todo 开始控制dom
    this.domControl(this.nowNum,this.allNum,this.obj,_this);




}

page.prototype.domControl = function (nowNum_dom,allNum_dom,obj_dom,pageObj) {

    if (nowNum_dom > 3 && allNum_dom> 5) {
        var oL = null;
        var oA = null;
        oL = document.createElement('li');
        oA = document.createElement('a');
        oA.href = "#" + 1;
        oA.innerHTML = "首页";
        oL.appendChild(oA);
        obj_dom.appendChild(oL);
    }
    if (nowNum_dom > 1) {
        var oA = null;
        var oL = null;
        oL = document.createElement('li');
        oA = document.createElement('a');
        oA.href = "#" + (nowNum_dom - 1);
        oA.innerHTML = "上一页";
        oL.appendChild(oA);
        obj_dom.appendChild(oL);
    }


    if (allNum_dom <= 5) {
        for (var i = 0; i < allNum_dom; i++) {
            var oA = null;
            var oL = null;
            oL = document.createElement('li');
            oA = document.createElement('a');

            oA.href = '#' + (i + 1);

            if (nowNum_dom == (i + 1)) {
                oA.innerHTML = (i + 1);
            } else {
                oA.innerHTML = '[' + (i + 1) + ']';
            }
            oL.appendChild(oA);
            obj_dom.appendChild(oL);

        }
    } else {

        for (var i = 1; i <= 5; i++) {
            var oA = null;
            var oL = null;
            oL = document.createElement('li');
            oA = document.createElement('a');

            if (nowNum_dom == 1 || nowNum_dom == 2) {
                oA.href = '#' + i;
                oA.innerHTML = '[' + i + ']';

                if (nowNum_dom == i) {
                    oA.innerHTML = i
                }
            } else if ((allNum_dom - nowNum_dom) == 0 || (allNum_dom - nowNum_dom == 1)) {

                oA.href = '#' + (allNum_dom - 5 + i);
                if (allNum_dom - nowNum_dom == 0 && i == 5) {
                    oA.innerHTML = (allNum_dom - 5 + i);
                } else if (allNum_dom - nowNum_dom == 1 && i == 4) {
                    oA.innerHTML = (allNum_dom - 5 + i);
                } else {
                    oA.innerHTML = '[' + (allNum_dom - 5 + i) + ']';
                }


            } else {
                oA.href = '#' + (nowNum_dom - 3 + i);

                if (i == 3) {
                    oA.innerHTML = (nowNum_dom - 3 + i);
                } else {
                    oA.innerHTML = '[' + (nowNum_dom - 3 + i) + ']';
                }

            }
            oL.appendChild(oA);
            obj_dom.appendChild(oL);
        }
    }

    if ((allNum_dom - nowNum_dom) > 0) {
        var oA = null;
        var oL = null;
        oL = document.createElement('li');
        oA = document.createElement('a');
        oA.href = '#' + (nowNum_dom + 1);
        oA.innerHTML = '下一页';
        oL.appendChild(oA);
        obj_dom.appendChild(oL);
    }
    if ((allNum_dom - nowNum_dom) > 2) {
        var oA = null;
        var oL = null;
        oL = document.createElement('li');
        oA = document.createElement('a');
        oA.href = '#' + allNum_dom;
        oA.innerHTML = '尾页';
        oL.appendChild(oA);
        obj_dom.appendChild(oL);
    }



    var aA = null;

    aA = obj_dom.getElementsByTagName('a');
    for (var i = 0; i < aA.length; i++) {

        // var _this = this;

        aA[i].onclick = function () {
            pageObj.change(this);
        };

    }
};

page.prototype.change = function (btn) {

    this.nowNum =parseInt(btn.getAttribute('href').substring(1));
    console.log(this.nowNum);

    this.obj.innerHTML = '';

    //todo 获取总页数
    console.log("isParam:"+this.isParam);
    this.allNum = this.getTotalPages(this.allNumUrl, this.pageSize, this.isParam);
    if(this.nowNum>this.allNum){
        console.log(this.nowNum);
        console.log(this.allNum);
        this.nowNum=this.allNum;
    }
    this.callback(this.nowNum, this.allNum);
    //todo 开始控制dom
    this.domControl(this.nowNum , this.allNum,this.obj,this);

    if (this.isParam === true) {
        var timestamp = Date.parse(new Date());
        var q = "ts=" + timestamp;
        var queryParam = this.queryForm;
        for (var i = 0; i < queryParam.length; i++) {
            var paramName = queryParam[i];
            var paramValue = $("#" + queryParam[i]).val();

            if (paramValue !== '') {
                q += "&" + paramName + "=" + paramValue;
            }
        }
        // console.log(q);

        eval(this.dataMethod + '(\'' + q + '\')');
    }else{
        eval(this.dataMethod + '(\'\')');
    }


};

page.prototype.reload = function () {

    this.obj.innerHTML = '';
    console.log(this.nowNum);
    //todo 获取总页数
    console.log("isParam:"+this.isParam);
    this.allNum = this.getTotalPages(this.allNumUrl, this.pageSize, this.isParam);
    if(this.nowNum>this.allNum){
        console.log(this.nowNum);
        console.log(this.allNum);
        this.nowNum=this.allNum;
    }
    this.callback(this.nowNum, this.allNum);
    //todo 开始控制dom
    this.domControl(this.nowNum ,this.allNum,this.obj,this);

    if (this.isParam === true) {
        var timestamp = Date.parse(new Date());
        var q = "ts=" + timestamp;
        var queryParam = this.queryForm;
        for (var i = 0; i < queryParam.length; i++) {
            var paramName = queryParam[i];
            var paramValue = $("#" + queryParam[i]).val();

            if (paramValue !== '') {
                q += "&" + paramName + "=" + paramValue;
            }
        }
        // console.log(q);
        eval(this.dataMethod + '(\'' + q + '\')');
    }else{
        eval(this.dataMethod + '(\'\')');
    }


};

page.prototype.init = function (isParam) {

    this.obj.innerHTML = '';
    this.isParam = isParam;
    console.log("isParam:"+this.isParam);
    //todo 获取总页数
    this.allNum = this.getTotalPages(this.allNumUrl, this.pageSize,  this.isParam );
    if(this.nowNum>this.allNum){
        console.log(this.nowNum);
        console.log(this.allNum);
        this.nowNum=this.allNum;
    }

    this.nowNum = 1;
    this.callback( this.nowNum,this.allNum);
    //todo 开始控制dom
    this.domControl( this.nowNum,this.allNum,this.obj,this);
};

page.prototype.getTotalPages = function (url, ps, isParam) {
    // console.log("url:" + url);
    // console.log("ps:" + ps);
    if (isParam === true) {
        var timestamp = Date.parse(new Date());
        var q = "ts=" + timestamp;
        var queryParam = this.queryForm;
        for (var i = 0; i < queryParam.length; i++) {
            var paramName = queryParam[i];
            var paramValue = $("#" + queryParam[i]).val();

            if (paramValue !== '') {
                q += "&" + paramName + "=" + paramValue;
            }
        }
        // console.log(q);
        url += "?" + q;
    }
    // console.log(url);
    // return 5;
    var totalPages;
    $.ajax({
        //请求方式
        type: "GET",
        //请求的媒体类型
        contentType: "application/x-www-form-urlencoded",
        //请求地址
        url: url,
        //数据，json字符串
        data: {
            pageSize: ps
        },
        async: false,
        //请求成功
        success: function (result) {
            // console.log(result);
            var code = result.code;
            var msg = result.msg;
            if (code === 1000) {
                totalPages = result.data;

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
    return totalPages;
};