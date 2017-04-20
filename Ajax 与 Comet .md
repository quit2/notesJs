## XMLHttpRequest 对象
### XHR的用法
    
    var xhr = createXHR();
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4){
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                alert(xhr.responseText);
            } else {
                alert("Request was unsuccessful: " + xhr.status);
            }
        }
    };
    xhr.open("get", "example.txt", true);
    xhr.send(null); 
    
    
在接收到响应后，第一步是检查status属性，以确定响应已经成功返回。一般来说，可以将 HTTP状态代码为 *200* 作为成功的标志。此时，responseText属性的内容已经就绪，而且在内容类型正确的情况下，responseXML也应该能够访问了。此外，状态代码为 *304* 表示请求的资源并没有被修改，可以直接使用浏览器中缓存的版本。

ps: 有的浏览器会错误地报告 204 状态代码。IE 中 XHR 的 ActiveX 版本会将 204 设
置为 1223，而 IE 中原生的 XHR 则会将 204 规范化为 200。Opera 会在取得 204 时报
告 status 的值为 0。

### HTTP头部信息

* Accept：浏览器能够处理的内容类型。
* Accept-Charset：浏览器能够显示的字符集。
* Accept-Encoding：浏览器能够处理的压缩编码。
* Accept-Language：浏览器当前设置的语言。
* Connection：浏览器与服务器之间连接的类型。
* Cookie：当前页面设置的任何 Cookie。
* Host：发出请求的页面所在的域 。
* Referer：发出请求的页面的URI。注意，HTTP规范将这个头部字段拼写错了，而为保证与规范一致，也只能将错就错了。（这个英文单词的正确拼法应该是 referrer。）
* User-Agent：浏览器的用户代理字符串。


var myHeader = xhr.getResponseHeader("MyHeader");

var allHeaders = xhr.getAllResponseHeaders(); 

调用 XHR 对象的 getResponseHeader()方法并传入头部字段名称，可以取得相应的响应头部信息。而调用 getAllResponseHeaders()方法则可以取得一个包含所有头部信息的长字符串。

### GET请求

查询字符串中每个参数的名称和值都必须使用encodeURIComponent()进行编码，然后才能放到 URL 的末尾；而且所有名-值对儿都必须由和号（&）分隔，如下面的例子所示。

    xhr.open("get", "example.php?name1=value1&name2=value2", true);

下面这个函数可以辅助向现有 URL 的末尾添加查询字符串参数：

    function addURLParam(url, name, value) {
        url += (url.indexOf("?") == -1 ? "?" : "&");
        url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
        return url;
    }
    
    var url = "example.php";
    //添加参数
    url = addURLParam(url, "name", "Nicholas");
    url = addURLParam(url, "book", "Professional JavaScript");
    //初始化请求
    xhr.open("get", url, false);
    在这里使用 addURLParam()函数可以确保查询字符串的格式良好，并可靠地用于 XHR 对象。

### POST请求

使用频率仅次于 GET 的是 POST 请求，通常用于向服务器发送应该被保存的数据。POST 请求应该把数据作为请求的主体提交，而GET请求传统上不是这样。POST请求的主体可以包含非常多的数据，而且格式不限。

    function submitData(){
        var xhr = createXHR();
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4){
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                    alert(xhr.responseText);
                } else {
                    alert("Request was unsuccessful: " + xhr.status);
                }
            }
        };
        xhr.open("post", "postexample.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var form = document.getElementById("user-info");
        xhr.send(serialize(form));//表单中的数据序列化之后发送给服务器
    } 

ps：与 GET 请求相比，POST 请求消耗的资源会更多一些。从性能角度来看，以发送
相同的数据计，GET 请求的速度最多可达到 POST 请求的两倍。


## XMLHttpRequest 2 级
### FormData
FormData 为序列化表单以及创建与表单格式相同的数据（用于通过 XHR 传输）提供
了便利。

    var data = new FormData();
    data.append("name", "Nicholas"); 

使用 FormData 的方便之处体现在不必明确地在 XHR 对象上设置请求头部。XHR 对象能够识别传入的数据类型是 FormData 的实例，并配置适当的头部信息。
支持 FormData 的浏览器有 Firefox 4+、Safari 5+、Chrome 和 Android 3+版 WebKit。

### 超时设定
    var xhr = createXHR();
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4){
            try {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                    alert(xhr.responseText);
                } else {
                    alert("Request was unsuccessful: " + xhr.status);
                }
            } catch (ex){
                //假设由 ontimeout 事件处理程序处理
            }
        }
    };
    xhr.open("get", "timeout.php", true);
    xhr.timeout = 1000; //将超时设置为 1 秒钟（仅适用于 IE8+）
    xhr.ontimeout = function(){
        alert("Request did not return in a second.");
    };
    xhr.send(null); 

### overrideMimeType()方法
    var xhr = createXHR();
    xhr.open("get", "text.php", true);
    xhr.overrideMimeType("text/xml");
    xhr.send(null);
    
这个例子强迫 XHR 对象将响应当作 XML 而非纯文本来处理。调用 overrideMimeType()必须在send()方法之前，才能保证重写响应的 MIME 类型。

支持 overrideMimeType()方法的浏览器有 Firefox、Safari 4+、Opera 10.5 和 Chrome。

## 进度事件
### load事件
### progress事件
    var xhr = createXHR();
    xhr.onload = function(event){
        if ((xhr.status >= 200 && xhr.status < 300) ||
            xhr.status == 304){
            alert(xhr.responseText);
        } else {
            alert("Request was unsuccessful: " + xhr.status);
        }
    };
    xhr.onprogress = function(event){
        var divStatus = document.getElementById("status");
        if (event.lengthComputable){
            divStatus.innerHTML = "Received " + event.position + " of " +
            event.totalSize +" bytes";
        }
    };
    xhr.open("get", "altevents.php", true);
    xhr.send(null); 
    
    //lengthComputable是一个表示进度信息是否可用的布尔值
    //position 表示已经接收的字节数
    //totalSize 表示根据Content-Length 响应头部确定的预期字节数。
    
## 跨源资源共享
CORS（Cross-Origin Resource Sharing，跨源资源共享）是W3C的一个工作草案，定义了在必须访问跨源资源时，浏览器与服务器应该如何沟通。

CORS背后的基本思想，就是使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功，还是应该失败。

Origin: http://www.nczonline.net

如果服务器认为这个请求可以接受，就在 Access-Control-Allow-Origin 头部中回发相同的源信息（如果是公共资源，可以回发"*"）。

例如：Access-Control-Allow-Origin: http://www.nczonline.net 