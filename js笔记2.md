###### 函数
- function sum(num1, num2) {
- &nbsp;&nbsp;&nbsp;&nbsp;return num1 + num2;
- &nbsp;&nbsp;&nbsp;&nbsp;alert("Hello world"); // 永远不会执行
- }

这个函数会在执行完 return 语句之后停止并立即退出。因此，位于 return 语句之后的任何代码都永远不会执行。

###### arguments 对象 
通过访问 arguments 对象的 length 属性可以获知有多少个参数传递给了函数。
- function howManyArgs() {
- &nbsp;&nbsp;&nbsp;&nbsp;alert(arguments.length);
-}
- howManyArgs("string", 45); //2
- howManyArgs(); //0
- howManyArgs(12); //1 
- 
关于参数还要记住最后一点：没有传递值的命名参数将自动被赋予 undefined 值。这就跟定义了变量但又没有初始化一样。


#### 变量、作用域和内存问题
对象是按值传递的，局部对象会在函数执行完毕后立即被销毁。
- function setName(obj) {
- &nbsp;&nbsp;&nbsp;&nbsp;obj.name = "Nicholas";
- &nbsp;&nbsp;&nbsp;&nbsp;obj = new Object();
- &nbsp;&nbsp;&nbsp;&nbsp;obj.name = "Greg";
- }
- var person = new Object();
- setName(person);
- alert(person.name); //"Nicholas" 
- 

###### instanceof 操作符
它是什么类型的对象
- alert(person instanceof Object); // 变量 person 是 Object 吗？
- alert(colors instanceof Array); // 变量 colors 是 Array 吗？
- alert(pattern instanceof RegExp); // 变量 pattern 是 RegExp 吗？
- 
根据规定，所有引用类型的值都是 Object 的实例。因此，在检测一个引用类型值和 Object 构造函数时，instanceof 操作符始终会返回 true。当然，如果使用 instanceof 操作符检测基本类型的值，则该操作符始终会返回 false，因为基本类型不是对象。

###### 作用域
全局执行环境直到应用程序退出——例如关闭网页或浏览器——时才会被销毁。


###### JS中attr和prop属性的区别
相比attr，prop是1.6.1才新出来的，两者从中文意思理解，都是获取/设置属性的方法（attributes和properties）。只是，window或document中使用.attr()方法在jQuery1.6之前不能正常运行，因为window和document中不能有attributes。prop应运而生了。

<input type="checkbox" id="test" abc="111" />

- $(function(){ 
- &nbsp;&nbsp;&nbsp;&nbsp;objel = $("#test"); 
- &nbsp;&nbsp;&nbsp;&nbsp;objconsole.log(el.attr("style")); //undefined 
- &nbsp;&nbsp;&nbsp;&nbsp;objconsole.log(el.prop("style")); //CSSStyleDeclaration对象 
- &nbsp;&nbsp;&nbsp;&nbsp;objconsole.log(document.getElementById("test").style); //CSSStyleDeclaration对象
- &nbsp;&nbsp;&nbsp;&nbsp;el.attr("abc","111") 
- &nbsp;&nbsp;&nbsp;&nbsp;console.log(el.attr("abc")); //111 
- &nbsp;&nbsp;&nbsp;&nbsp;console.log(el.prop("abc")); //undefined
- el.prop("abc", "222"); 
- console.log(el.attr("abc")); //111 
- console.log(el.prop("abc")); //222
- });


- <input type="checkbox" id="test" checked="checked" />
- console.log(el.attr("checked")); //checked 
- console.log(el.prop("checked")); //true 
- console.log(el.attr("disabled")); //undefined 
- console.log(el.prop("disabled")); //false

PS一下，如果你有JS性能洁癖的话，显然prop的性能更高，因为attr需要访问DOM属性节点，访问DOM是最耗时的。这种情况适用于多选项全选和反选的情况。



93页 - 75