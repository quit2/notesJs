# Javascript高级程序设计笔记
### 数据类型
数据类型: undefined、null、Boolean、Number、 String和Object。
此需要有一种手段来检测给定变量的数据类型——typeof 就是负责提供这方面信息的操作符。
### 数值转换
非数值转换为数值：Number()、parseInt()和 parseFloat()。

###### Number()数值转换
+ var num1 = Number("Hello world!"); //NaN
+ var num2 = Number(""); //0
+ var num3 = Number("000011"); //11
+ var num4 = Number(true); //1 

首先，字符串"Hello world!"会被转换为 NaN，因为其中不包含任何有意义的数字值。空字符串
会被转换为 0。字符串"000011"会被转换为 11，因为忽略了其前导的零。最后，true 值被转换为 1。

###### parseInt()数值转换
+ var num1 = parseInt("1234blue"); // 1234
+ var num2 = parseInt(""); // NaN
+ var num3 = parseInt("0xA"); // 10（十六进制数）
+ var num4 = parseInt(22.5); // 22
+ var num5 = parseInt("070"); // 56（八进制数）
+ var num6 = parseInt("70"); // 70（十进制数）
+ var num7 = parseInt("0xf"); // 15（十六进制数）
+ var num = parseInt("0xAF", 16); //175 （第二参数是转换为几进制）
+ var num1 = parseInt("10", 2); //2 （按二进制解析）
+ var num2 = parseInt("10", 8); //8 （按八进制解析）
+ var num3 = parseInt("10", 10); //10 （按十进制解析）
+ var num4 = parseInt("10", 16); //16 （按十六进制解析）

###### toString()转换为字符串
+ var age = 11;
+ var ageAsString = age.toString(); // 字符串"11"
+ var found = true;
+ var foundAsString = found.toString(); // 字符串"true" 
+ var num = 10;
+ alert(num.toString()); // "10"
+ alert(num.toString(2)); // "1010"
+ alert(num.toString(8)); // "12"
+ alert(num.toString(10)); // "10"
+ alert(num.toString(16)); // "a"
+ var value1 = 10;
+ var value2 = true;
+ var value3 = null;
+ var value4;
+ alert(String(value1)); // "10"
+ alert(String(value2)); // "true"
+ alert(String(value3)); // "null"
+ alert(String(value4)); // "undefined" 

###### object
+ Object 的每个实例都具有下列属性和方法。
+ constructor：保存着用于创建当前对象的函数。对于前面的例子而言，构造函数（constructor）就是 Object()。
+ hasOwnProperty(propertyName)：用于检查给定的属性在当前对象实例中（而不是在实例的原型中）是否存在。其中，作为参数的属性名（propertyName）必须以字符串形式指定（例如：o.hasOwnProperty("name")）。
+ isPrototypeOf(object)：用于检查传入的对象是否是传入对象的原型（第 5 章将讨论原型）。
+ propertyIsEnumerable(propertyName)：用于检查给定的属性是否能够使用 for-in 语句来枚举。与 hasOwnProperty()方法一样，作为参数的属性名必须以字符串形式指定。
+ toLocaleString()：返回对象的字符串表示，该字符串与执行环境的地区对应。
+ toString()：返回对象的字符串表示。
+ valueOf()：返回对象的字符串、数值或布尔值表示。通常与 toString()方法的返回值相同。

###### 一元操作符
+ var s1 = "2";
+ var s2 = "z";
+ var b = false;
+ var f = 1.1;
+ var o = {
+   valueOf: function() {
+     return -1;
+     }
+ };
+ s1++; // 值变成数值 3
+ s2++; // 值变成 NaN
+ b++; // 值变成数值 1
+ f--; // 值变成 0.10000000000000009（由于浮点舍入错误所致）
+ o--; // 值变成数值-2

以一个加号（+）表示，放在数值前面，对数值不会产生任何影响,在对非数值应用一元加操作符时，该操作符会像 Number()转型函数一样对这个值执行转换。
换句话说，布尔值 false 和 true 将被转换为 0 和 1，字符串值会被按照一组特殊的规则进行解析，而
对象是先调用它们的 valueOf()和（或）toString()方法，再转换得到的值。在将一元减操作符应用于数值时，该值会变成负数（如上面的例子所示）。而当应用于非数值时，一元减操作符遵循与一元加操作符相同的规则，最后再将得到的数值转换为负数.

+ 如下面的例子所示：
+ var num = 25;
+ num = +num; // 仍然是 25 

######  逻辑非
+ alert(!false); // true
+ alert(!"blue"); // false
+ alert(!0); // true
+ alert(!NaN); // true
+ alert(!""); // true
+ alert(!12345); // false 

+ alert(!!"blue"); //true
+ alert(!!0); //false
+ alert(!!NaN); //false
+ alert(!!""); //false
+ alert(!!12345); //true 

###### 操作符
+ var num1 = 5;
+ var num2 = 10;
+ var message = "The sum of 5 and 10 is " + num1 + num2;
+ alert(message); // "The sum of 5 and 10 is 510" 

+ var result1 = 5 - true; // 4，因为 true 被转换成了 1
+ var result2 = NaN - 1; // NaN
+ var result3 = 5 - 3; // 2
+ var result4 = 5 - ""; // 5，因为"" 被转换成了 0
+ var result5 = 5 - "2"; // 3，因为"2"被转换成了 2
+ var result6 = 5 - null; // 5，因为 null 被转换成了 0 

*任何操作数与 NaN 进行关系比较，结果都是 false。*

+ 即使两个操作数都是 NaN，相等操作符也返回 false；因为按照规则，NaN 不等于 NaN。
+ null 和 undefined 是相等的。
+ 要比较相等性之前，不能将 null 和 undefined 转换成其他任何值。
+ 如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回 true；否则，返回 false。
+ null == undefined //true 
+ "NaN" == NaN //false 
+ 5 == NaN //false 
+ NaN == NaN //false 
+ NaN != NaN //true 
+ true == 1 //true
+ true == 2 //false
+ undefined == 0 //false
+ null == 0 //false
+ "5"==5 //true
+ false == 0 //true 


break 和 continue 语句用于在循环中精确地控制代码的执行。其中，break 语句会立即退出循环，强制继续执行循环后面的语句。而 continue 语句虽然也是立即退出循环，但退出循环后会从循环的顶部继续执行。

+ var num = 0;
+ for (var i=1; i < 10; i++) {
+ if (i % 5 == 0) {
+ break;
+ }
+ num++;
+ }
+ alert(num); //4 

+ var num = 0;
+ for (var i=1; i < 10; i++) {
+ if (i % 5 == 0) {
+ continue;
+ }
+ num++;
+ }
+ alert(num); //8

###### switch
break 关键字会导致代码执行流跳出 switch 语句。如果省略 break 关键字，就会导致执行完当前 case 后，继续执行下一个 case。最后的 default 关键字则用于在表达式不匹配前面任何一种情形的时候，执行机动代码（因此，也相当于一个 else 语句）。
