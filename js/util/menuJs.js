function menu(json) {
    this.json = json;

    if (!this.json.id) {
        return false
    }
    this.obj = null;
    this.currentMenuName = null;

    this.menuData = null;

    var _this = this;
    this.obj = document.getElementById(this.json.id);
    this.currentMenuName = this.json.currentMenuName;
        //todo 获取总页数
    this.menuData = this.getMenuData();

    //todo 开始控制dom
    this.domControl( this.menuData, this.currentMenuName,this.obj,_this);

}

menu.prototype.domControl = function (menuDatas,currentMenuName,objDom,pageObj) {
//  <li><a href="../index.html" class="open"><i class="icon-home"></i> 首页</a>

    for(var i=0;i<menuDatas.length;i++){
        var gL =  document.createElement('li');
        var gA =  document.createElement('a');
        var group = menuDatas[i];
        gA.href = "#"+1;
        gA.innerHTML = group.menuName;

        gL.appendChild(gA);
        var subMenus = group.menu;
        if(subMenus.length>0){
            // gA.className += "open subdrop";
            gL.className += "has_sub";
            var mul =  document.createElement('ul');
            // mul.style = "display: block;";
            for(var j=0;j<subMenus.length;j++){
                var mL =  document.createElement('li');
                var mA =  document.createElement('a');
                var subMenu = subMenus[j];
                mA.href = subMenu.menuUrl;
                mA.innerHTML = subMenu.menuName;
                if(subMenu.menuName === currentMenuName){
                    gA.className += "open subdrop";
                    mul.style = "display: block;";
                }

                mL.appendChild(mA);
                mul.appendChild(mL);
            }
            gL.appendChild(mul);
        }
        objDom.appendChild(gL);
    }



    var aA = null;

    aA = objDom.getElementsByTagName('a');
    for (var i = 0; i < aA.length; i++) {

        // var _this = this;

        aA[i].onclick = function (e) {
            console.log($(this));
            if($(this).parent().hasClass("has_sub")) {
                e.preventDefault();
            }

            if(!$(this).hasClass("subdrop")) {
                // hide any open menus and remove all other classes
                $("#nav li ul").slideUp(350);
                $("#nav li a").removeClass("subdrop");

                // open our new menu and add the open class
                $(this).next("ul").slideDown(350);
                $(this).addClass("subdrop");
            }

            else if($(this).hasClass("subdrop")) {
                $(this).removeClass("subdrop");
                $(this).next("ul").slideUp(350);
            }

        };

    }
};



menu.prototype.getMenuData = function () {

    var dataMenu;
    $.ajax({
        //请求方式
        type: "GET",
        //请求的媒体类型
        contentType: "application/x-www-form-urlencoded",
        //请求地址
        url: "http://127.0.0.1:8095/menu/menuData",
        // 数据，json字符串
        // data: {
        //     pageSize: ps
        // },
        async: false,
        //请求成功
        success: function (result) {
            // console.log(result);
            var code = result.code;
            var msg = result.msg;
            if (code === 1000) {
                dataMenu = result.data;

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
    return dataMenu;
};