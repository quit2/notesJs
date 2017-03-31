#### js跨域
跨域资源共享（CORS） Cross-Origin Resource Sharing (CORS)是W3c工作草案，它定义了在跨域访问资源时浏览器和服务器之间如何通信。CORS背后的基本思想是使用自定义的HTTP头部允许浏览器和服务器相互了解对方，从而决定请求或响应成功与否。

CORS与JSONP相比，更为先进、方便和可靠。

- 1、 JSONP只能实现GET请求，而CORS支持所有类型的HTTP请求。
- 2、 使用CORS，开发者可以使用普通的XMLHttpRequest发起请求和获得数据，比起JSONP有更好的错误处理。
- 3、 JSONP主要被老的浏览器支持，它们往往不支持CORS，而绝大多数现代浏览器都已经支持了CORS。

对一个简单的请求，没有自定义头部，要么使用GET，要么使用POST，它的主体是text/plain,请求用一个名叫Orgin的额外的头部发送。

Origin头部包含请求页面的头部（协议，域名，端口），这样服务器可以很容易的决定它是否应该提供响应。服务器端对于CORS的支持，主要就是通过设置Access-Control-Allow-Origin来进行的。

Header set Access-Control-Allow-Origin * 
为了防止XSS攻击我们的服务器，我们可以限制域，比如Access-Control-Allow-Origin: 很多服务都已经提供了CORS支持，比如AWS支持跨域资源分享功能CORS，向S3上传不需要代理。


#### js没有块级作用域
在 JavaScript中，if 语句中的变量声明会将变量添加到当前的执行环境（在这里是 全局环境）中。在使用 for 语句时尤其要牢记这一差异，例如： 
 
for (var i=0; i < 10; i++){

    doSomething(i);
    
} 
 
alert(i);      //10 

对于有块级作用域的语言来说，for语句初始化变量的表达式所定义的变量，只会存在于循环的环境之中。而对于 JavaScript来说，由for语句创建的变量i即使在for循环执行结束后，也依旧会存在于循环外部的执行环境中。


### 垃圾收集 
1、标记清除
2、引用计数(循环引用bug)
3、管理内存(解除引用dereferencing)

将变量设置为 null 意味着切断变量与它此前引用的值之间的连接。当垃圾收集器下次运行时，就会删除这些值并回收它们占用的内存。

为了解决上述问题，IE9把BOM和DOM对象都转换成了真正的JavaScript对象。这样，就避免了 两种垃圾收集算法并存导致的问题，也消除了常见的内存泄漏现象。 

解除一个值的引用并不意味着自动回收该值所占用的内存。解除引用的真正作用是让值脱离 执行环境，以便垃圾收集器下次运行时将其回收。 


99页总结要细看

*确定一个值是哪种基本类型(undefined,null,boolean,string,number)可以使用typeof操作符，而确定一个值是哪种引用类型可以使用 instanceof 操作符。*

## 引用类型
##### Object 类型 
- 1、使用 new 操作符后跟 Object 构造函数
- 2、对象字面量表示法


## 检测数组 
1、于一个网页， 或者一个全局作用域而言，使用 instanceof 操作符就能得到满意的结果。

if (value instanceof Array){     

//对数组执行某些操作 
    
} 
 

2、ECMAScript 5新增了 Array.isArray()方法。这个方法的目的是终确定某 个值到底是不是数组，而不管它是在哪个全局执行环境中创建的。
支持 Array.isArray()方法的浏览器有 IE9+、Firefox 4+、Safari 5+、Opera 10.5+和 Chrome。

if (Array.isArray(value)){  

//对数组执行某些操作 
    
} 

## 数组转换
所有对象都具有 toLocaleString()、toString()和 valueOf()方法。其中，调用数组的 toString()方法会返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串。而 调用 valueOf()返回的还是数组。

- var colors = ["red", "blue", "green"];    // 创建一个包含 3 个字符串的数组
- alert(colors.toString());     // red,blue,green 
- alert(colors.valueOf());      // red,blue,green 
- alert(colors);                // red,blue,green 

由于 alert()要接收字符串参数，所以它会在后台调用 toString()方法，由此 会得到与直接调用 toString()方法相同的结果。


join()方 法只接收一个参数，即用作分隔符的字符串，然后返回包含所有数组项的字符串。请看下面的例子： 
 
- var colors = ["red", "green", "blue"]; 
- alert(colors.join(","));       //red,green,blue 
- alert(colors.join("||"));      //red||green||blue 
- 

toLocaleString()方法经常也会返回与 toString()和 valueOf()方法相同的值，但也 不总是如此。当调用数组的toLocaleString()方法时，它也会创建一个数组值的以逗号分隔的字符 串。而与前两个方法唯一的不同之处在于，这一次为了取得每一项的值，调用的是每一项的 toLocale- String()方法，而不是 toString()方法。请看下面这个例子。 
 
- var person1 = {    
-   - toLocaleString : function () {        
-   - &nbsp;&nbsp;&nbsp;&nbsp;return "Nikolaos";     
-   - },          
    - toString : function() {         
    - &nbsp;&nbsp;&nbsp;&nbsp;return "Nicholas";     
    - } 
- }; 
 
- var person2 = {     
-   - toLocaleString : function () {         
-   - &nbsp;&nbsp;&nbsp;&nbsp;return "Grigorios"; 
-   - },          
-   - toString : function() {         
-   - &nbsp;&nbsp;&nbsp;&nbsp;return "Greg";    
-   - } 
- }; 
 
- var people = [person1, person2]; 
- alert(people); //Nicholas,Greg 
- alert(people.toString());   //Nicholas,Greg
- alert(people.toLocaleString());        //Nikolaos,Grigorios



#### 栈方法（后进先出）
push()方法可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。
pop()方法则从数组末尾移除后一项，减少数组的 length 值，然后返回移除的项。

#### 队列方法(先进先出)
unshift()它能在数组前端添加任意个项并返回新数组的长度。
shift()能够移除数组中的第一个项并返回该项，同时将数组长度减 1。


sort()方法按升序排列数组项——即小的值位于前面，大的值排在后面。 为了实现排序，sort()方法会调用每个数组项的toString()转型方法，然后比较得到的字符串，以 确定如何排序。即使数组中的每一项都是数值，sort()方法比较的也是字符串


#### 升序
- function compare(value1, value2){     
-   return value2 - value1;
- }
- var values = [0, 1, 5, 10, 15]; 
- values.sort(compare);
- alert(values);    // 15,10,5,1,0 



#### 操作方法 

##### .concat()

这个方法会先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾后返回新构建的数组。在没有给concat()方法传递参数的情况下，它只是复制当前数组并返回副本。如果传递给concat()方法的是一或多个数组，则该方法会将这些数组中的 每一项都添加到结果数组中。如果传递的值不是数组，这些值就会被简单地添加到结果数组的末尾。

- var colors = ["red", "green", "blue"]; 
- var colors2 = colors.concat("yellow", ["black", "brown"]); 
- alert(colors);     //red,green,blue         
- alert(colors2);    //red,green,blue,yellow,black,brown 


##### slice()

它能够基于当前数组中的一或多个项创建一个新数组。slice()方法可以接受一或两个参数，即要返回项的起始和结束位置。在只有一个参数的情况下，slice()方法返回从该 参数指定位置开始到当前数组末尾的所有项。如果有两个参数，该方法返回起始和结束位置之间的项— —但不包括结束位置的项。注意，slice()方法不会影响原始数组。请看下面的例子。 
 
- var colors = ["red", "green", "blue", "yellow", "purple"];
- var colors2 = colors.slice(1); 
- var colors3 = colors.slice(1,4); 
- alert(colors2);   //green,blue,yellow,purple 
- alert(colors3);   //green,blue,yellow 
 
.slice(0, value.indexOf('.') + 3) //从已有数组中返回选定的元数(start,end) 整数前2位   小数点后2位
 

##### splice()

1、删除：可以删除任意数量的项，只需指定2个参数：要删除的第一项的位置和要删除的项数。 例如，splice(0,2)会删除数组中的前两项。 

2、插入：可以向指定位置插入任意数量的项，只需提供3个参数：起始位置、0（要删除的项数） 和要插入的项。如果要插入多个项，可以再传入第四、第五，以至任意多个项。例如， splice(2,0,"red","green")会从当前数组的位置 2开始插入字符串"red"和"green"。 

3、替换：可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定3个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。例如， splice (2,1,"red","green")会删除当前数组位置 2 的项，然后再从位置 2 开始插入字符串 "red"和"green"。 

var colors = ["red", "green", "blue"]; 

var removed = colors.splice(0,1); // 删除第一项 

alert(colors);     // green,blue 

alert(removed);    // red，返回的数组中只包含一项 
 
removed = colors.splice(1, 0, "yellow", "orange");   // 从位置 1 开始插入两项

alert(colors);     // green,yellow,orange,blue 

alert(removed);    // 返回的是一个空数组 
 
removed = colors.splice(1, 1, "red", "purple");// 插入两项，删除一项 
alert(colors);     // green,red,purple,orange,blue 
alert(removed);    // yellow，返回的数组中只包含一项 

重点在第二个参数，0的时候是增加，n>0是删除n个，有第三个及多个参数就是替换。


#### indexOf()

接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。

indexOf()方法从数组的开头（位置0）开始向后查找，lastIndexOf()方法则从数组的末尾开始向前查找。这两个方法都返回要查找的项在数组中的位置，或者在没找到的情况下返回-1。支持它们的浏览器包 括 IE9+、Firefox 2+、Safari 3+、Opera 9.5+和 Chrome。

#### 5个迭代方法

ECMAScript 5为数组定义了 5个迭代方法，支持这些迭代方法的浏览器有 IE9+、Firefox 2+、Safari 3+、Opera 9.5+和 Chrome。

every()：对数组中的每一项运行给定函数，如果该函数对每一项都返回 true，则返回 true。

filter()：对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。

forEach()：对数组中的每一项运行给定函数。这个方法没有返回值。

map()：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。

some()：对数组中的每一项运行给定函数，如果该函数对任一项返回 true，则返回 true。

以上方法都不会修改数组中的包含的值。

#### reduce()和 reduceRight()

ECMAScript 5 还新增了两个归并数组的方法：reduce()和 reduceRight()。
reduce()方法从数组的第一项开始，逐个遍历 到后。
而 reduceRight()则从数组的后一项开始，向前遍历到第一项。

使用 reduce()方法可以执行求数组中所有值之和的操作，比如： 

var values = [1,2,3,4,5];
var sum = values.reduce(function(prev, cur, index, array){    
 return prev + cur;  
});
alert(sum); //15  

第一次执行回调函数，prev 是 1，cur 是 2。第二次，prev 是 3（1加 2的结果），cur 是 3（数组 的第三项）。这个过程会持续到把数组中的每一项都访问一遍，后返回结果。 