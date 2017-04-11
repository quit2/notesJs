## Node类型 

#### appendChild()
向节点添加最后一个子节点。

#### insertBefore()
在指定的已有子节点之前插入新的子节点。

appendChild()和 insertBefore()方法都只插入节点，不会移除节点。

#### replaceChild()
接受的两个参数是：要插入的节点和要替换的节点。要替换的节点将由这个方法返回并从文档树中被移除，同时由要插入的节点占据其位置。

#### removeChild()

与使用 replaceChild()方法一样，通过removeChild()移除的节点仍然为文档所有，只不过在 文档中已经没有了自己的位置。 

#### 其他方法
1、cloneNode()，用于创建调用这个方法的节点的一个完全相同的副本。

cloneNode()方法接受一个布尔值参数，表示是否执行深复制。

在参数为 true 的情况下，执行深复制，也就是复制节点及其整个子节点树；在参数为 false 的情况下，执行浅复制，即只复制节点本身。复制后返回的节点副本属于文档所有，但并没有为它指定父节点。因此，这个节点 副本就成为了一个“孤儿”，除非通过 appendChild()、insertBefore()或 replaceChild()将它添加到文档中。

PS：cloneNode()方法不会复制添加到 DOM节点中的 JavaScript属性，例如事件处 理程序等。这个方法只复制特性、（在明确指定的情况下也复制）子节点，其他一切 都不会复制。IE在此存在一个 bug，即它会复制事件处理程序，所以我们建议在复制 之前最好先移除事件处理程序。 

2、normalize()，这个方法唯一的作用就是处理文档树中的文本节点。

## Document类型 

//取得文档标题 var originalTitle = document.title; 
 
//设置文档标题 document.title = "New page title"; 

//取得完整的 URL var url = document.URL

//取得域名 var domain = document.domain; 

//取得来源页面的 URL var referrer = document.referrer;

URL 与 domain 属性是相互关联的。例如，如果document.URL等于http://www.wrox.com/WileyCDA/，那么 document.domain 就等于 www.wrox.com。 

在这 3个属性中，只有 domain 是可以设置的。但由于安全方面的限制，也并非可以给 domain 设置任何值。由于跨域安全限制，来自不同子域的页面无法通过 JavaScript 通信。

    //假设页面来自 p2p.wrox.com 域 
     
    document.domain = "wrox.com";          // 成功 
     
    document.domain = "nczonline.net";      // 出错！ 

浏览器对 domain 属性还有一个限制，即如果域名一开始是“松散的”（loose），那么不能将它再设 置为“紧绷的”（tight）。换句话说，在将document.domain设置为"wrox.com"之后，就不能再将其设置回"p2p.wrox.com"，否则将会导致错误，如下面的例子所示。 
 
    //假设页面来自于 p2p.wrox.com 域 
     
    document.domain = "wrox.com";         //松散的（成功） 
     
    document.domain = "p2p.wrox.com";     //紧绷的（出错！） 
    
    
    
IE8及较低版本不区分 ID的大小写，因此"myDiv"和"mydiv"会被当作相同的元素 ID。 如果页面中多个元素的ID值相同，getElementById()只返回文档中第一次出现的元素。IE7及较 低版本还为此方法添加了一个有意思的“怪癖”：name特性与给定ID匹配的表单元素（<input>、 <textarea>、<button>及<select>）也会被该方法返回。如果有哪个表单元素的 name 特性等于指 定的 ID，而且该元素在文档中位于带有给定ID的元素前面，那么 IE就会返回那个表单元素。 
 
 
查找元素

  getElementsByName()方法的情况是取得单选按钮；为了确保发送给浏览器的值正确无误，所有单选按钮必须具有相同的 name 特性
  
  
文档写入 

write()、writeln()、open()和 close()。其中，write()和 writeln() 方法都接受一个字符串参数，即要写入到输出流中的文本。write()会原样写入，而 writeln()则会在字符串的末尾添加一个换行符（\n）。

    <html> 
    <head>     
        <title>document.write() Example 2</title> 
    </head> 
    <body>     
        <script type="text/javascript">         
         document.write("<script type=\"text/javascript\" src=\"file.js\">" +                "<\/script>");     
        </script> 
    </body>
    </html> 
    
ps: 在包含JavaScript文件时，必须注意不能像下面的例子那样直接包含字符串"</script>"，因为这会导致该字符串被解释为脚本块的结束，它后面的代码将无法执行。

## Element类型 
1. HTML元素 
2. 取得特性、设置特性、attributes 属性 

   操作特性的 DOM方法主要有三个，分别是 getAttribute()、setAttribute()和 removeAttribute()。
 
       div.mycolor = "red"; 
       alert(div.getAttribute("mycolor")); //null（IE 除外） 
       div.setAttribute("id", "someOtherId"); 
       var id = element.attributes["id"].nodeValue; 
       
       
        function outputAttributes(element){     
            var pairs = new Array(),         
                attrName,         
                attrValue,         
                i,         
                len; 
     
            for (i=0, len=element.attributes.length; i < len; i++){  
                attrName = element.attributes[i].nodeName;      
                attrValue = element.attributes[i].nodeValue;         
                if (element.attributes[i].specified) {  
                    pairs.push(attrName + "=\"" + attrValue + "\"");
                }     
            }     
            return pairs.join(" "); 
        } 
    
    Ps: 每个特性节点都有一个名为specified的属性，这个属性的值如果为true，则意味着要么是在 HTML中指定了相应特性，要么是通过setAttribute()方法设置了该特性。在 IE中，所有未设置过的特性的该属性值都为false，而在其他浏览器中根本不会为这类特性生成对应的特性节点（因此，在这些浏览器中，任何特性节点的 specified 值始终为 true）。
    
    
3. 创建元素 

使用 document.createElement()方法可以创建新元素。这个方法只接受一个参数，即要创建元 素的标签名。

var div = document.createElement("<div id=\"myNewDiv\" class=\"box\"></div >"); 


## Text类型 
1. 创建文本节点 

        var element = document.createElement("div"); 
        element.className = "message"; 
        var textNode = document.createTextNode("Hello world!");
        element.appendChild(textNode); 
        document.body.appendChild(element); 

2. 规范化文本节点 

   DOM文档中存在相邻的同胞文本节点很容易导致混乱，因为分不清哪个文本节点表示哪个字符串。 另外，DOM文档中出现相邻文本节点的情况也不在少数，于是就催生了一个能够将相邻文本节点合并的方法。这个方法是由Node类型定义的（因而在所有节点类型中都存在），名叫normalize()。如果在一个包含两个或多个文本节点的父元素上调用 normalize()方法，则会将所有文本节点合并成一个节点，结果节点的 nodeValue 等于将合并前每个文本节点的 nodeValue 值拼接起来的值。来看一个 例子。 
 
        var element = document.createElement("div"); 
        element.className = "message"; 
         
        var textNode = document.createTextNode("Hello world!");
        element.appendChild(textNode); 
         
        var anotherTextNode = document.createTextNode("Yippee!"); 
        element.appendChild(anotherTextNode); 
         
        document.body.appendChild(element); 
         
        alert(element.childNodes.length);    //2 
         
        element.normalize();   //将所有文本节点合并成一个节点
        alert(element.childNodes.length);    //1 
        alert(element.firstChild.nodeValue);    // "Hello world!Yippee!" 
        
        
3. 分割文本节点 

   Text 类型提供了一个作用与normalize()相反的方法：splitText()。这个方法会将一个文本节点分成两个文本节点，即按照指定的位置分割 nodeValue 值。
   
   
   
   插入标记
   1、innerHTML 属性 
   
   <script>元素被认为是“无作用域的元素”（NoScope element），也就是在页面中看不到的元素，与<style>元素或注释类似。如果通过 innerHTML 插入的字符串开头就是一个“无作用域的元素”，那么IE会在解析这个字符串前先删除该元素。
   
       div.innerHTML = "_<script defer>alert('hi');<\/script>"; 
       
       div.innerHTML = "<div>&nbsp;</div><script defer>alert('hi');<\/script>";
       
       div.innerHTML = "<input type=\"hidden\"><script defer>alert('hi');<\/script>"; 
       //由于隐藏的<input>域不影响页面布局，因此这种方式在大多数情况下都是首选。

   
    但在 IE8 及更早版本中，<style>也是一个“没有作用域的元素”，因此必须像下面这样给它前置 一个“有作用域的元素”： 
 
        div.innerHTML = "_<style type=\"text/css\">body {background-color: red; }</style>"; 
        
        div.removeChild(div.firstChild); 
 
    2、outerHTML 属性 
    支持 outerHTML 属性的浏览器有 IE4+、Safari 4+、Chrome和 Opera 8+。Firefox 7及之前版本都不 支持 outerHTML 属性。 
    
    3、insertAdjacentHTML()方法 
    
    插入标记的后一个新增方式是insertAdjacentHTML()方法。这个方法早也是在IE中出现的， 它接收两个参数：插入位置和要插入的HTML文本。第一个参数必须是下列值之一：  
    
        "beforebegin"，在当前元素之前插入一个紧邻的同辈元素；
        "afterbegin"，在当前元素之下插入一个新的子元素或在第一个子元素之前再插入新的子元素；
        "beforeend"，在当前元素之下插入一个新的子元素或在后一个子元素之后再插入新的子元素；
        "afterend"，在当前元素之后插入一个紧邻的同辈元素。
        
    注意，这些值都必须是小写形式。第二个参数是一个 HTML字符串（与 innerHTML 和 outerHTML 的值相同），如果浏览器无法解析该字符串，就会抛出错误。以下是这个方法的基本用法示例。 
 
    //作为前一个同辈元素插入 
    
    element.insertAdjacentHTML("beforebegin", "<p>Hello world!</p>"); 
     
    //作为第一个子元素插入 
    
    element.insertAdjacentHTML("afterbegin", "<p>Hello world!</p>"); 
     
    //作为最后一个子元素插入 
    
    element.insertAdjacentHTML("beforeend", "<p>Hello world!</p>"); 
     
    //作为后一个同辈元素插入 
    
    element.insertAdjacentHTML("afterend", "<p>Hello world!</p>"); 

 支持 insertAdjacentHTML()方法的浏览器有 IE、Firefox 8+、Safari、Opera和 Chrome。 
 
 
    4、内存与性能问题 
 
    for (var i=0, len=values.length; i < len; i++){      
        ul.innerHTML += "<li>" + values[i] + "</li>"; //要避免这种频繁操作！！ 
    } 
 这种每次循环都设置一次 innerHTML 的做法效率很低。而且，每次循环还要从 innerHTML 中读 取一次信息，就意味着每次循环要访问两次innerHTML。好的做法是单独构建字符串，然后再一次 性地将结果字符串赋值给 innerHTML，像下面这样： 
 
    var itemsHtml = ""; 
     
    for (var i=0, len=values.length; i < len; i++){     
        itemsHtml += "<li>" + values[i] + "</li>"; 
    } 
    ul.innerHTML = itemsHtml; 

 这个例子的效率要高得多，因为它只对 innerHTML 执行了一次赋值操作。
 
    5、scrollIntoView()方法 
    
    当页面发生变化时，一般会用这个方法来吸引用户的注意力。实际上，为某个元素设置焦点也会导 致浏览器滚动并显示出获得焦点的元素。 支持 scrollIntoView()方法的浏览器有 IE、Firefox、Safari和 Opera。
    
    
    
nodejs安装、查看版本正常，npm安装、查看版本正常，提示'gulp'不是内部或者外部命令，也不是可运行的程序或批处理文件。

    npm config get prefix
    就会显示一个地址，这个地址就是那个系统变量PATH
然后找到计算机环境变量，修改完系统变量PATH之后，一定要重启dos窗口才行，简单来说就是把cmd运行的黑窗口关掉，从新打开运行一下。


## 元素大小
#### 1、偏移量 
    offsetHeight：元素在垂直方向上占用的空间大小，以像素计。包括元素的高度、（可见的） 水平滚动条的高度、上边框高度和下边框高度。
    
    offsetWidth：元素在水平方向上占用的空间大小，以像素计。包括元素的宽度、（可见的）垂 直滚动条的宽度、左边框宽度和右边框宽度。
    
    offsetLeft：元素的左外边框至包含元素的左内边框之间的像素距离。
    
    offsetTop：元素的上外边框至包含元素的上内边框之间的像素距离。
    
    其中，offsetLeft 和 offsetTop 属性与包含元素有关，包含元素的引用保存在 offsetParent 属性中。offsetParent 属性不一定与 parentNode 的值相等。
    
#### 2、客户区大小 
元素的客户区大小（client dimension），指的是元素内容及其内边距所占据的空间大小。有关客户区大小的属性有两个：clientWidth 和 clientHeight。其中，clientWidth 属性是元素内容区宽度加 上左右内边距宽度；clientHeight 属性是元素内容区高度加上上下内边距高度。从字面上看，客户区大小就是元素内部的空间大小，因此滚动条占用的空间不计算在内。

    function getViewport(){     
        if (document.compatMode == "BackCompat"){        
            return {             
                width: document.body.clientWidth,             
                height: document.body.clientHeight         
            };     
            
        } else {         
            return {             
                width: document.documentElement.clientWidth,             
                height: document.documentElement.clientHeight         
                
            };     
            
        } 
    } 
 
    这个函数首先检查 document.compatMode 属性，以确定浏览器是否运行在混杂模式
    
####  3、滚动大小 
    scrollHeight：在没有滚动条的情况下，元素内容的总高度。
    scrollWidth：在没有滚动条的情况下，元素内容的总宽度。
    scrollLeft：被隐藏在内容区域左侧的像素数。通过设置这个属性可以改变元素的滚动位置。
    scrollTop：被隐藏在内容区域上方的像素数。通过设置这个属性可以改变元素的滚动位置。
    
    
    ps:  
    Firefox 中这两组属性始终都是相等的，但大小代表的是文档内容区域的实际尺寸，而非视口的 尺寸。
    
    Opera、Safari 3.1 及更高版本、Chrome 中的这两组属性是有差别的，其中 scrollWidth 和 scrollHeight 等于视口大小，而 clientWidth 和 clientHeight 等于文档内容区域的大小。
 
    IE（在标准模式）中的这两组属性不相等，其中 scrollWidth 和 scrollHeight 等于文档内 容区域的大小，而 clientWidth 和 clientHeight 等于视口大小。 
    
#### 4、确定元素大小 
IE、Firefox 3+、Safari4+、Opera9.5及Chrome为每个元素都提供了一个getBoundingClientRect()方法。这个方法会返回一个矩形对象，包含4个属性：left、top、right和bottom。这些属性给出了元素在页面中相对于视口的位置。但是，浏览器的实现稍有不同。IE8 及更早版本认为文档的左上角坐 标是(2, 2)，而其他浏览器包括IE9则将传统的(0,0)作为起点坐标。