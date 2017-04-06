#### Date 类型 
// 本地时间 2000 年 1 月 1 日午夜零时 

var y2k = new Date(2000, 0); 
 
// 本地时间 2005 年 5 月 5 日下午 5:55:55 

var allFives = new Date(2005, 4, 5, 17, 55, 55); 

月份从0开始，0表示1月

120页


#### RegExp 类型 
- g：表示全局（global）模式，即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止； 
- i：表示不区分大小写（case-insensitive）模式，即在确定匹配项时忽略模式与字符串的大小写；
- m：表示多行（multiline）模式，即在到达一行文本末尾时还会继续查找下一行中是否存在与模 式匹配的项。 

/* 匹配字符串中所有"at"的实例 */ 

var pattern1 = /at/g; 
 
/* 匹配第一个"bat"或"cat"，不区分大小写 */ 

var pattern2 = /[bc]at/i; 
 
/* 匹配所有以"at"结尾的 3 个字符的组合，不区分大小写 */ 

var pattern3 = /.at/gi; 

/* 匹配第一个" [bc]at"，不区分大小写 */ 

var pattern2 = /\[bc\]at/i; 


与其他语言中的正则表达式类似，模式中使用的所有元字符都必须转义。正则表达式中的元字符包括：
 
( [ { \ ^ $ | ) ? * + .]} 


对于 exec()方法而言，即使在模式中设置了全局标志（g），它每次也只会返回一个匹配项。在不设置全局标志的情况下，在同一个字符串上多次调用exec()将始终返回第一个匹配项的信息。而在设置全局标志的情况下，每次调用 exec()则都会在字符串中继续查找新匹配项。


 RegExp.$1、RegExp.$2…RegExp.$9，分别用于存储第一、第二……第九个匹配的捕获组。
 


#### function 类型 

在函数内部，有两个特殊的对象：arguments和this。其中，arguments是一个类数组对象，包含着传入函数中的所有参数。虽然arguments的主要用途是保存函数参数，但这个对象还有一个名叫 callee 的属性，该属性是一个指针，指向拥有这个 arguments 对象的函数。 请看下面这个非常经典的阶乘函数。 

function factorial(num){  

    if (num <=1) {
    
        return 1;     
        
    } else {     
    
        return num * factorial(num-1)   
        
    } 
    
}  

定义阶乘函数一般都要用到递归算法；如上面的代码所示，在函数有名字，而且名字以后也不会变的情况下，这样定义没有问题。但问题是这个函数的执行与函数名 factorial 紧紧耦合在了一起。为 了消除这种紧密耦合的现象，可以像下面这样使用。 

 function factorial(num){
 
    if (num <=1) {  
     
        return 1;     
         
    } else {  
    
        return num * arguments.callee(num-1)     
         
    }
 }
 
 
在这个重写后的 factorial()函数的函数体内，没有再引用函数名factorial。这样，无论引用 函数时使用的是什么名字，都可以保证正常完成递归调用。例如： 

var trueFactorial = factorial; 
 
factorial = function(){     

    return 0; 
    
}; 
 
alert(trueFactorial(5));     //120 

alert(factorial(5));         //0 

在此，变量 trueFactorial获得了factorial的值，实际上是在另一个位置上保存了一个函数 的指针。然后，我们又将一个简单地返回0的函数赋值给factorial变量。如果像原来的 factorial() 那样不使用 arguments.callee，调用trueFactorial()就会返回 0。可是，在解除了函数体内的代码与函数名的耦合状态之后，trueFactorial()仍然能正常地计算阶乘；至于 factorial()，它现 在只是一个返回 0的函数。 


ps: ，函数的名字仅仅是一个包含指针的变量而已。因此，即使是在不同的环境中执行，全局的 sayColor()函数与 o.sayColor()指向的仍然是同一 个函数。


##### apply()和call()

每个函数都包含两个非继承而来的方法：apply()和call()。这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内this对象的值。首先，apply()方法接收两个参数：一个 是在其中运行函数的作用域，另一个是参数数组。

function sum(num1, num2){   

    return num1 + num2; 
    
} 
 
function callSum1(num1, num2){  

    return sum.apply(this, arguments); // 传入 arguments 对象 
    
} 
 
function callSum2(num1, num2){  

    return sum.apply(this, [num1, num2]); // 传入数组 
    
} 
 
alert(callSum1(10,10));   //20 

alert(callSum2(10,10));   //20 

ps: 在严格模式下，未指定环境对象而调用函数，则 this 值不会转型为 window。 除非明确把函数添加到某个对象或者调用 apply()或 call()，否则 this 值将是 undefined。 

call()方法与 apply()方法的作用相同，它们的区别仅在于接收参数的方式不同。对于 call() 方法而言，第一个参数是this值没有变化，变化的是其余参数都直接传递给函数。换句话说，在使用 call()方法时，传递给函数的参数必须逐个列举出来。

事实上，传递参数并非apply()和call()真正的用武之地；它们真正强大的地方是能够扩充函数 赖以运行的作用域。

引用类型与基本包装类型的主要区别就是对象的生存期。使用new操作符创建的引用类型的实例， 在执行流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁。这意味着我们不能在运行时为基本类型值添加属性和方法。来看下面的例子： 
 
    var s1 = "some text"; 
    s1.color = "red"; 
    alert(s1.color);  //undefined 
    
    
    
##### Boolean类型 

在布尔运算中，false && true 等于 false。

布尔表达式中的所有对象都会被转换为 true。

基本类型与引用类型的布尔值还有两个区别。首先，typeof操作符对基本类型返回"boolean"，而对引用类型返回"object"。其次，由于Boolean对象是Boolean类型的实例，所以使用instanceof 操作符测试Boolean对象会返回true，而测试基本类型的布尔值则返回 false。例如： 
 
    alert(typeof falseObject);   //object 
    alert(typeof falseValue);    //boolean 
    alert(falseObject instanceof Boolean); //true 
    alert(falseValue instanceof Boolean);  //false 
    
    
#### String类型 

1. 字符方法 

    var stringValue = "hello world"; 
    
    alert(stringValue.charAt(1));   //"e" 
    

字符串"hello world"位置1处的字符是"e"，因此调用charAt(1)就返回了"e"。如果你想得到的不是字符而是字符编码，那么就要像下面这样使用 charCodeAt()了。 
 
    var stringValue = "hello world"; 
    alert(stringValue.charCodeAt(1));   //输出"101" 
 
2.  字符串操作方法 
    
    第一个就是 concat()，用于将一或多个字符串拼接起来，返回拼接得到的新字符串。
    ECMAScript还提供了三个基于子字符串创建新字符串的方法：slice()、substr()和substring()。 这三个方法都会返回被操作字符串的一个子字符串，而且也都接受一或两个参数。第一个参数指定子字 符串的开始位置，第二个参数（在指定的情况下）表示子字符串到哪里结束。具体来说，slice()和 substring()的第二个参数指定的是子字符串后一个字符后面的位置。而 substr()的第二个参数指定的则是返回的字符个数。如果没有给这些方法传递第二个参数，则将字符串的长度作为结束位置。与concat()方法一样，slice()、substr()和 substring()也不会修改字符串本身的值——它们只是返回一个基本类型的字符串值，对原始字符串没有任何影响。请看下面的例子。 
 
    var stringValue = "hello world"; 

    alert(stringValue.slice(3));         //"lo world"
    
    alert(stringValue.substring(3));     //"lo world"
    
    alert(stringValue.substr(3));        //"lo world" 
    
    alert(stringValue.slice(3, 7));      //"lo w"
    
    alert(stringValue.substring(3,7));   //"lo w" 
    
    alert(stringValue.substr(3, 7));     //"lo worl" 
 
 
    var stringValue = "hello world"; 
    
    alert(stringValue.slice(-3));          //"rld"
    
    alert(stringValue.substring(-3));     //"hello world"
    
    alert(stringValue.substr(-3));        //"rld" 
    
    alert(stringValue.slice(3, -4));       //"lo w"
    
    alert(stringValue.substring(3, -4));   //"hel" 
    
    alert(stringValue.substr(3, -4));      //""（空字符串） 
 

这个例子清晰地展示了上述三个方法之间的不同行为。在给slice()和substr()传递一个负值参数时，它们的行为相同。这是因为-3会被转换为8（字符串长度加参数11+(-3)=8），实际上相当 于调用了slice(8)和substr(8)。但substring()方法则返回了全部字符串，因为它将-3 转换成了0。 