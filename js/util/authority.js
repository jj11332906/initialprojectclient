var authorityStr = window.localStorage.getItem('authority');

function checkAuth() {
    if(authorityStr.indexOf('sysadmin') > -1 ){
        return;
    }

    $("button").each(function(){
        var authority = $(this).attr("authority");
        console.log("authority:"+authority);
        if(authority!==undefined&&authority!==null&&authority!==''){
           if(authorityStr.indexOf(authority) > -1){
               $(this).show();
           }else{
               $(this).hide();
           }

        }
    });
}
