微信开发的学习笔记

- 配置的步骤
- 接口调用的参数
- 基础检测接口


微信JS-SDK官方文档：
[http://qydev.weixin.qq.com/wiki/index.php?title=WeixinJS%E6%8E%A5%E5%8F%A3](http://qydev.weixin.qq.com/wiki/index.php?title=WeixinJS%E6%8E%A5%E5%8F%A3)

# 配置的步骤

- 步骤一、引入JS文件

https://res.wx.qq.com/open/js/jweixin-1.0.0.js

（在使用HTTPS的时候，必须需要使用HTTPS协议的文件，上周在做统一登录的时候，在HTTPS的协议下，有用HTTP协议的文件，导致出错了；一般大厂都会有HTTPS支持的，比如阿里的iconfont的链接直接在前面加入HTTPS即可用了）；

- 步骤二：通过config接口注入权限验证配置

> 所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用

    wx.config({
        debug: false||true,
        corpid: "",//必填
        signature: "",//签名,见附录1
        timestamp: timestamp,//签名的时间戳
        nonceStr: nonceStr,//签名的随机串
        jsApiList: [//需要使用的JS接口列表,见附录2
            "",
            '',
            ''
        ]
    });

- 步骤三、成功验证，进入ready接口

	wx.ready(function(){
	
	    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
	});

- 步骤四、验证失败，进入error接口

	wx.error(function(res){
	
	    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
	
	});

实例代码如下：

	//验证
	wx.config({
	    debug:true,
	    signature:"",
	    timestamp:"",
	    nonceStr:"",
	    jsApiList:[]
	});
	//成功到时候进入ready
	wx.ready(function(){
	
	});
	//失败的时候进入error
	wx.error(function(){
	    
	});

# 接口调用的参数

wx(iWweixin)相当于接口的实例，所有接口，都可以通过wx这个对象来调用，参数是一个对象；所有接口的参数都是对象，接口配置直接写在对象内即可；

- success	调用成功的回调函数
- fail		调用失败的回调函数
- complete	完成调用的回调函数，无论成功和失败都会执行；类似于try-catch-finally中的finally用法；
- cancel		用户取消时候的回调函数，（仅部分有用户取消操作的api才有意义）
- trigger	监听menu中的按钮点击触发的方法，该方法仅支持menu中的相关接口

上面都是方法，除了每个接口本身返回的数据以外，还有一个通用属性errMsg，

errMsg格式如下

- 调用成功时：值为"xxx.ok"，其中xxx为调用的接口名,
- 调用失败时：值为"xxx.ok",其中xxx为调用的借口名
- 调用失败时：值为具体的错误信息；

实例代码：

	//验证
	wx.config({
	    debug:true,
	    signature:"",
	    timestamp:"",
	    nonceStr:"",
	    jsApiList:[]
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
	    })
	});
	//失败的时候进入error
	wx.error(function(){
	
	});

# 基础检测接口

> 判断当前客户端版本是否支持指定JS接口；
> 备注：checkJsApi接口是客户端6.0.2新引入的一个预留接口，第一期开放的接口均可不使用checkJsApi来检测。

可以放在config后面检测；

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

# 分享接口

- 获取“分享到朋友圈”按钮点击状态，及自定义分享内容接口
- 获取“分享给朋友”按钮点击状态，及自定义分享内容接口
- 获取“分享到QQ”按钮点击状态，及自定义分享内容接口
- 获取“分享到腾讯微博”按钮点击状态,及自定义分享内容接口

##### 分享到朋友圈

