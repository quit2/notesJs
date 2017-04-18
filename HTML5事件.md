### HTML5事件
 
 5.1 contextmenu 事件
 
 由于contextmenu 事件是冒泡的，因此可以为document指定一个事件处理程序，用以处理页面中发生的所有此类事件。这个事件的目标是发生用户操作的元素。在所有浏览器中都可以取消这个事件： 在兼容 DOM的浏览器中，使用event.preventDefalut()；在 IE中，将 event.returnValue的值设置为false。因为contextmenu事件属于鼠标事件，所以其事件对象中包含与光标位置有关的所有属性。通常使用 contextmenu 事件来显示自定义的上下文菜单，而使用 onclick 事件处理程序来隐藏该菜单。
 
5.2 beforeunload 事件

    EventUtil.addHandler(window, "beforeunload", function(event){     
        event = EventUtil.getEvent(event);     
        var message = "I'm really going to miss you if you go.";     
        event.returnValue = message;     
        return message; 
    });  

IE和 Firefox、Safari和Chrome都支持beforeunload事件，也都会弹出这个对话框询问用户是否真想离开。Opera11及之前的版本不支持 beforeunload 事件。

5.3 DOMContentLoaded 事件 

如前所述，window 的 load事件会在页面中的一切都加载完毕时触发，但这个过程可能会因为要 加载的外部资源过多而颇费周折。而 DOMContentLoaded 事件则在形成完整的DOM树之后就会触发，不理会图像、JavaScript文件、CSS文件或其他资源是否已经下载完毕。与load事件不同，DOMContentLoaded支持在页面下载的早期添加事件处理程序，这也就意味着用户能够尽早地与页面 进行交互。 要处理 DOMContentLoaded 事件，可以为 document或window添加相应的事件处理程序（尽管这个事件会冒泡到window，但它的目标实际上是 document）。
 
    EventUtil.addHandler(document, "DOMContentLoaded", function(event){                 alert("Content loaded"); 
        
    });  
 
 
 IE9+、Firefox、Chrome、Safari 3.1+和 Opera 9+都支持 DOMContentLoaded事件，通常这个事件既可以添加事件处理程序，也可以执行其他DOM操作。这个事件始终都会在load事件之前触发。对于不支持DOMContentLoaded的浏览器，我们建议在页面加载期间设置一个时间为 0毫秒的超时调用，如下面的例子所示。 
 
    setTimeout(function(){     
    //在此添加事件处理程序 
    }, 0); 
    
5.4  readystatechange 事件

支持 readystatechange 事件的浏览器有 IE、Firfox 4+和 Opera。 

ps: 虽然使用 readystatechange 可以十分近似地模拟 DOMContentLoaded 事件， 但它们本质上还是不同的。在不同页面中，load 事件与 readystatechange 事件并 不能保证以相同的顺序触发。 

5.5  pageshow 和 pagehide 

Firefox 和 Opera 有一个特性，名叫“往返缓存”（back-forward cache，或 bfcache），可以在用户使 用浏览器的“后退”和“前进”按钮时加快页面的转换速度。

5.6  hashchange 事件 

必须要把 hashchange 事件处理程序添加给window对象，然后URL参数列表只要变化就会调用 它。此时的 event对象应该额外包含两个属性：oldURL和newURL。这两个属性分别保存着参数列表 变化前后的完整 URL。例如： 
 
    EventUtil.addHandler(window, "hashchange", function(event){     
        alert("Old URL: " + event.oldURL + "\nNew URL: " + event.newURL); 
    });  
    
    
支持 hashchange 事件的浏览器有 IE8+、Firefox 3.6+、Safari 5+、Chrome和 Opera 10.6+。在这些浏览器中，只有 Firefox 6+、Chrome和 Opera支持 oldURL 和 newURL 属性。为此，好是使用 location 对象来确定当前的参数列表。
    
    EventUtil.addHandler(window, "hashchange", function(event){     
        alert("Current hash: " + location.hash); 
    }); 
     
 
### 设备事件
6.1 orientationchange 事件 

移动 Safari的 window.orientation 属性中可能包含 3个值： 0 表示肖像模式，90 表示向左旋转的横向模式（“主屏幕”按钮在右侧），-90表示向右旋转的横向模式（“主屏幕”按钮在左侧）。相关文档中还提到一个值，即180表示iPhone头朝下；但这种模式至今 尚未得到支持。

6.2 MozOrientation 事件

>Firefox 3.6为检测设备的方向引入了一个名为 MozOrientation 的新事件。（前缀 Moz 表示这是特 定于浏览器开发商的事件，不是标准事件。）当设备的加速计检测到设备方向改变时，就会触发这个事 件。但这个事件与 iOS中的 orientationchange 事件不同，该事件只能提供一个平面的方向变化。由 于 MozOrientation 事件是在 window 对象上触发的，所以可以使用以下代码来处理。 
 
    EventUtil.addHandler(window, "MozOrientation", function(event){
    
        var output = document.getElementById("output");     
        output.innerHTML = "X=" + event.x + ", Y=" + event.y + ", Z=" + event.z +"<br>"; 
        
    }); 
    
>此时的 event 对象包含三个属性：x、y 和 z。这几个属性的值都介于 1到-1之间，表示不同坐标 轴上的方向。在静止状态下，x 值为 0，y 值为 0，z 值为 1（表示设备处于竖直状态）。如果设备向右倾斜，x 值会减小；反之，向左倾斜，x 值会增大。类似地，如果设备向远离用户的方向倾斜，y值会减小，向接近用户的方向倾斜，y 值会增大。z 轴检测垂直加速度度，1表示静止不动，在设备移动时值会减小。（失重状态下值为 0）。
    
只有带加速计的设备才支持 MozOrientation 事件，包括 Macbook、Lenovo Thinkpad、Windows Mobile和 Android设备。请大家注意，这是一个实验性 API，将来可能会变（可能会被其他事件取代）。
 
6.3 deviceorientation 事件 。它也是在加速计检测到设备方向变化时在 window 对象上触发，而且具有与 MozOrientation 事件 相同的支持限制。

6.4 devicemotion 事件 417

6.5 触摸与手势事件

  #### 触摸事件
  
   >touchstart：当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发。 touchmove：当手指在屏幕上滑动时连续地触发。在这个事件发生期间，调用preventDefault() 可以阻止滚动。
   touchend：当手指从屏幕上移开时触发。
   touchcancel：当系统停止跟踪触摸时触发。关于此事件的确切触发时间，文档中没有明确说明。
   
   上面这几个事件都会冒泡，也都可以取消。虽然这些触摸事件没有在DOM规范中定义，但它们却是以兼容 DOM的方式实现的。因此，每个触摸事件的event对象都提供了在鼠标事件中常见的属性： bubbles、cancelable、view、clientX、clientY、screenX、screenY、detail、altKey、shiftKey、 ctrlKey 和 metaKey。 

除了常见的 DOM属性外，触摸事件还包含下列三个用于跟踪触摸的属性。 

    touches：表示当前跟踪的触摸操作的 Touch 对象的数组。
    targetTouchs：特定于事件目标的 Touch 对象的数组。
    changeTouches：表示自上次触摸以来发生了什么改变的 Touch 对象的数组。 

每个 Touch 对象包含下列属性。 

    clientX：触摸目标在视口中的 x坐标。 
    clientY：触摸目标在视口中的 y坐标。
    identifier：标识触摸的唯一 ID。
    pageX：触摸目标在页面中的 x坐标。 
    pageY：触摸目标在页面中的 y坐标。
    screenX：触摸目标在屏幕中的 x坐标。
    screenY：触摸目标在屏幕中的 y坐标。
    target：触摸的 DOM节点目标。
    
    function handleTouchEvent(event){     
        //只跟踪一次触摸     
        if (event.touches.length == 1){ 
            var output = document.getElementById("output");
            switch(event.type){            
                case "touchstart":              
                    output.innerHTML = "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";           
                    break;        
                case "touchend":                 
                    output.innerHTML += "<br>Touch ended (" + event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";                 
                    break;     
                case "touchmove":                 
                    event.preventDefault();  //阻止滚动                
                    output.innerHTML += "<br>Touch moved (" + event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";                 
                    break;
            } 
        } 
    } 
 
    EventUtil.addHandler(document, "touchstart", handleTouchEvent);
    EventUtil.addHandler(document, "touchend", handleTouchEvent);
    EventUtil.addHandler(document, "touchmove", handleTouchEvent);
    
    
    
    在触摸屏幕上的元素 时，这些事件（包括鼠标事件）发生的顺序如下： 
    
    (1) touchstart 
    (2) mouseover 
    (3) mousemove（一次） 
    (4) mousedown 
    (5) mouseup 
    (6) click 
    (7) touchend 

>ps: 支持触摸事件的浏览器包括 iOS版 Safari、Android版 WebKit、bada版 Dolfin、OS6+中的 BlackBerry WebKit、Opera Mobile 10.1+和 LG专有 OS中的 Phantom浏览器。目前只有 iOS版 Safari支持多点触摸。 桌面版 Firefox 6+和 Chrome也支持触摸事件。 


7. 内存和性能

7.1 事件委托 
    
>事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。例如，click事件会一直冒泡到document层次。也就是说，我们可以为整个页面指定一个onclick事件处理程序，而不必给每个可单击的元素分别添加事件处理程序。

适合采用事件委托技术的事件包括click、mousedown、mouseup、keydown、keyup 和keypress。 虽然 mouseover和mouseout事件也冒泡，但要适当处理它们并不容易，而且经常需要计算元素的位置。（因为当鼠标从一个元素移到其子节点时，或者当鼠标移出该元素时，都会触发 mouseout 事件。） 

7.2  移除事件处理程序 

可以采用事件委托技术，限制建立的连接数量。另外，在不需要的时候移除事件处理程序，也是解决这个问题的一种方案。内存中留有那些过时不用的“空事件处理程序”（dangling event handler），也是造成 Web 应用程序内存与性能问题的主要原因。 

“空事件处理程序”

一般来说，好的做法是在页面卸载之前，先通过onunload事件处理程序移除所有事件处理程序。 在此，事件委托技术再次表现出它的优势——需要跟踪的事件处理程序越少，移除它们就越容易。对这 种类似撤销的操作，我们可以把它想象成：只要是通过 onload 事件处理程序添加的东西，后都要通 过 onunload 事件处理程序将它们移除。

ps: 不要忘了，使用 onunload 事件处理程序意味着页面不会被缓存在 bfcache中。 如果你在意这个问题，那么就只能在IE中通过 onunload 来移除事件处理程序了。 

7.3 模拟事件 

7.3.1 模拟鼠标事件 

创建鼠标事件对象的方法是为createEvent()传入字符串"MouseEvents"。返回的对象有一个名为 initMouseEvent()方法， 用于指定与该鼠标事件有关的信息。这个方法接收 15 个参数。

7.3.2 模拟键盘事件 

DOM3级规定，调用 createEvent()并传入"KeyboardEvent"就可以创建一个键盘事件。返回的 事件对象会包含一个 initKeyEvent()方法，这个方法接收下列参数。 

。。。


总结： 在使用事件时，需要考虑如下一些内存与性能方面的问题。
* 有必要限制一个页面中事件处理程序的数量，数量太多会导致占用大量内存，而且也会让用户 感觉页面反应不够灵敏。 
* 建立在事件冒泡机制之上的事件委托技术，可以有效地减少事件处理程序的数量。
* 建议在浏览器卸载页面之前移除页面中的所有事件处理程序。