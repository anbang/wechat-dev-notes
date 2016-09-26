//验证
wx.config({
    debug:true,
    signature:"",
    timestamp:"",
    nonceStr:"",
    jsApiList:[]
});

//判断当前客户端版本是否支持指定JS接口
wx.checkJsApi({
    jsApiList:[// 需要检测的JS接口列表，所有JS接口列表见附录2,
        "chooseImage",
        "stopSearchBeacons"
    ],
    success:function(res){
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    }
});

//成功到时候进入ready
wx.ready(function(){
    wx.getFunction({
        success:function(res){
            //调用成功
        },
        fail:function(){
            //调用失败
        },
        complete:function(arg){
            //无论成功还是失败，都会进入这个方法；
            if(arg.errMsg=="2222"){
                //to do something
            }else if(arg.errMsg=="3333"){
                //to do something
            }else{
                //to do something
            }
        },
        cancel:function(){
            //用户点击取消时的回调函数，有用户取消操作的api才会用到；
        },
        trigger:function(){
            //监听menu的按钮点击触发方法，仅支持meny中的相关接口；
        }
    });
});
//失败的时候进入error
wx.error(function(){

});