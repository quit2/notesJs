## HTML5 脚本编程 
#### 跨文档消息传递 
跨文档消息传送（cross-document messaging），有时候简称为XDM，指的是在来自不同域的页面间 传递消息。

//注意：所有支持 XDM 的浏览器也支持 iframe 的 contentWindow 属性 

var iframeWindow = document.getElementById("myframe").contentWindow; iframeWindow.postMessage("A secret", "http://www.wrox.com"); 

最后一行代码尝试向内嵌框架中发送一条消息，并指定框架中的文档必须来源于"http:// www.wrox.com"域。如果来源匹配，消息会传递到内嵌框架中；否则，postMessage()什么也不做。

    EventUtil.addHandler(window, "message", function(event){ 
     
        //确保发送消息的域是已知的域     
        if (event.origin == "http://www.wrox.com"){ 
     
            //处理接收到的数据         
            processMessage(event.data); 
     
            //可选：向来源窗口发送回执        
            event.source.postMessage("Received!", "http://p2p.wrox.com");     
            
        } 
        
    }); 
    
有了 XDM，包含<iframe>的页面可以确保自身不受恶意 内容的侵扰，因为它只通过 XDM与嵌入的框架通信。而 XDM也可以在来自相同域的页面间使用。 支持 XDM的浏览器有 IE8+、Firefox 3.5+、Safari 4+、Opera、Chrome、iOS版 Safari及 Android版 WebKit。XDM 已经作为一个规范独立出来，现在它的名字叫 Web Messaging，官方页面是 http://dev.w3.org/html5/postmsg/。



#### 原生拖放 
1、拖放事件

拖动某元素时，将依次触发下列事件： 
>(1) dragstart 
(2) drag 
(3) dragend 

当某个元素被拖动到一个有效的放置目标上时，下列事件会依次发生： 
>(1) dragenter 
(2) dragover 
(3) dragleave 或 drop 

2、自定义放置目标 
有些元素默认是不允许放置的。如果拖动元素经过不允许放置的元素，无论用户如何操作，都不会发生 drop 事件。不过，你可以把任何元素变成有效的放置 目标，方法是重写 dragenter 和 dragover 事件的默认行为。例如，假设有一个 ID为"droptarget" 的<div>元素，可以用如下代码将它变成一个放置目标。 
 
    var droptarget = document.getElementById("droptarget"); 
    EventUtil.addHandler(droptarget, "dragover", function(event){
        EventUtil.preventDefault(event); 
    }); 
    EventUtil.addHandler(droptarget, "dragenter", function(event){ 
        EventUtil.preventDefault(event); 
    }); 
    
3、dataTransfer对象 

它是事件对象的一个属性，用于从被拖动元素向放置目标传递字符串格式的数据。

    //设置和接收文本数据
    
    event.dataTransfer.setData("text", "some text");
    
    var text = event.dataTransfer.getData("text"); 
     
    //设置和接收 URL
    
    event.dataTransfer.setData("URL", "http://www.wrox.com/"); 
    
    var url = event.dataTransfer.getData("URL"); 
    
PS: 保存在 dataTransfer 对象中的数据只能在 drop 事件处理程序中读取。如果在 ondrop 处理程序中没有读到数据，那就是dataTransfer对象已经被销毁，数据也丢失了。 


4、dropEffect与effectAllowed 

通过 dropEffect 属性可以知道被拖动的元素能够执行哪种放置行为。这个属性有下列 4 个可能的值。 
* "none"：不能把拖动的元素放在这里。这是除文本框之外所有元素的默认值。
* "move"：应该把拖动的元素移动到放置目标。
* "copy"：应该把拖动的元素复制到放置目标。
* "link"：表示放置目标会打开拖动的元素（但拖动的元素必须是一个链接，有 URL）。


dropEffect 属性只有搭配effectAllowed属性才有用。effectAllowed属性表示允许拖动元素的哪种 dropEffect，effectAllowed 属性可能的值如下。

* "uninitialized"：没有给被拖动的元素设置任何放置行为。
* "none"：被拖动的元素不能有任何行为。
* "copy"：只允许值为"copy"的 dropEffect。
* "link"：只允许值为"link"的 dropEffect。
* "move"：只允许值为"move"的 dropEffect。
* "copyLink"：允许值为"copy"和"link"的 dropEffect。
* "copyMove"：允许值为"copy"和"move"的 dropEffect。
* "linkMove"：允许值为"link"和"move"的 dropEffect。
* "all"：允许任意 dropEffect。 

必须在 ondragstart 事件处理程序中设置 effectAllowed 属性。 

5、可拖动 

HTML5为所有 HTML元素规定了一个draggable属性，表示元素是否可以拖动。图像和链接的 draggable 属性自动被设置成了 true，而其他元素这个属性 的默认值都是 false。

    <!-- 让这个图像不可以拖动 --> 
    <img src="smile.gif" draggable="false" alt="Smiley face"> 
    <!-- 让这个元素可以拖动 -->
    <div draggable="true">...</div> 

支持 draggable 属性的浏览器有 IE 10+、Firefox 4+、Safari 5+和 Chrome。Opera 11.5及之前的版本都不支持HTML5的拖放功能。另外，为了让Firefox支持可拖动属性，还必须添加一个 ondragstart 事件处理程序，并在dataTransfer对象中保存一些信息。 

6、其他成员 
* addElement(element)：为拖动操作添加一个元素。添加这个元素只影响数据（即增加作为拖 动源而响应回调的对象），不会影响拖动操作时页面元素的外观。在写作本书时，只有 Firefox 3.5+ 实现了这个方法。
* clearData(format)：清除以特定格式保存的数据。实现这个方法的浏览器有 IE、Fireforx 3.5+、 Chrome和 Safari 4+。
* setDragImage(element,x,y)：指定一幅图像，当拖动发生时，显示在光标下方。这个方法接收的三个参数分别是要显示的HTML元素和光标在图像中的x、y坐标。其中，HTML元素 可以是一幅图像，也可以是其他元素。是图像则显示图像，是其他元素则显示渲染后的元素。 实现这个方法的浏览器有 Firefox 3.5+、Safari 4+和 Chrome。
* types：当前保存的数据类型。这是一个类似数组的集合，以"text"这样的字符串形式保存着 数据类型。实现这个属性的浏览器有 IE10+、Firefox 3.5+和 Chrome。