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
