## JSON 
#### 语法
JSON的语法可以表示以下三种类型的值。
* 简单值：使用与 JavaScript 相同的语法，可以在 JSON 中表示字符串、数值、布尔值和 null。 但 JSON不支持 JavaScript中的特殊值 undefined。
* 对象：对象作为一种复杂数据类型，表示的是一组无序的键值对儿。而每个键值对儿中的值可 以是简单值，也可以是复杂数据类型的值。
* 数组：数组也是一种复杂数据类型，表示一组有序的值的列表，可以通过数值索引来访问其中 的值。数组的值也可以是任意类型——简单值、对象或数组。 

注意点：

1、JavaScript字符串与JSON字符串的大区别在于，JSON字符串必须使用双引号（单引号会导致语法错误）。 

2、与 JavaScript的对象字面量相比，JSON对象有两个地方不一样。首先，没有声明变量（JSON中没有变量的概念）。其次，没有末尾的分号（因为这不是JavaScript语句，所以不需要分号）。再说一遍，对象的属性必须加双引号，这在JSON中是必需的。属性的值可以是简单值，也可以是复杂类型值。

3、JSON数组也没有变量和分号。

#### 解析与序列化 
#### JSON 对象
JSON 对象有两个方法：stringify()和parse()。在简单的情况下，这两个方法分别用于把 JavaScript对象序列化为 JSON字符串和把 JSON字符串解析为原生 JavaScript值。例如： 
 
    var book = {                
        title: "Professional JavaScript",                 
        authors: [                    
            "Nicholas C. Zakas"                 
        ],                 
        edition: 3,                
        year: 2011            
    }; 
    var jsonText = JSON.stringify(book); 
    
    
默认情况下，JSON.stringify()输出的JSON字符串不包含任何空格字符或缩进，因此保存在 jsonText 中的字符串如下所示： 
 
{"title":"Professional JavaScript","authors":["Nicholas C. Zakas"],"edition":3, "year":2011} 

在序列化 JavaScript 对象时，所有函数及原型成员都会被有意忽略，不体现在结果中。此外，值为 undefined的任何属性也都会被跳过。结果中终都是值为有效JSON数据类型的实例属性。

#### 序列化选项
1、过滤结果

如果过滤器参数是数组，那么 JSON.stringify()的结果中将只包含数组中列出的属性。

    var book = {                 
        "title": "Professional JavaScript",                 
        "authors": [                    
        "Nicholas C. Zakas"                 
        ],                 
        edition: 3,                 
        year: 2011            
    }; 
    var jsonText = JSON.stringify(book, ["title", "edition"]);
    
    //结果 {"title":"Professional JavaScript","edition":3} 
    
    
    var jsonText = JSON.stringify(book, function(key, value){     
        switch(key){    
            case "authors":             
                return value.join(",") 
            case "year":             
                return 5000; 
            case "edition":            
                return undefined; 
            default:             
                return value;     
        }
    }); 
    //{"title":"Professional JavaScript","authors":"Nicholas C. Zakas","year":5000} 
 

Firefox 3.5和 3.6对 JSON.stringify()的实现有一个bug，在将函数作为该方法的第二个参数时 这个 bug就会出现，即这个函数只能作为过滤器：返回undefined意味着要跳过某个属性，而返回其他任何值都会在结果中包含相应的属性。Firefox 4修复了这个 bug。 
 
2、字符串缩进 

    var jsonText = JSON.stringify(book, null, 4); 
    
    var jsonText = JSON.stringify(book, null, " - -"); 
    
PS: 缩进字符串长不能超过10个字符长。如果字符串长度超过了10个，结果中将只出现前 10 个字符。 
    
3、toJSON()方法 

    var book = {            
        "title": "Professional JavaScript",              
        "authors": [                  
            "Nicholas C. Zakas"             
        ],             
        edition: 3,             
        year: 2011,              
        toJSON: function(){ 
            return this.title; 
        }            
    }; 
 
    var jsonText = JSON.stringify(book); 
    
    序列化该对象的顺序如下。 
    (1) 如果存在 toJSON()方法而且能通过它取得有效的值，则调用该方法。否则，返回对象本身。 
    (2) 如果提供了第二个参数，应用这个函数过滤器。传入函数过滤器的值是第(1)步返回的值。 
    (3) 对第(2)步返回的每个值进行相应的序列化。 
    (4) 如果提供了第三个参数，执行相应的格式化。 

4、解析选项 

    var book = {               
        "title": "Professional JavaScript",                
        "authors": [                    
            "Nicholas C. Zakas"                 
        ],                 
        edition: 3,                 
        year: 2011,                 
        releaseDate: new Date(2011, 11, 1)            
    }; 
    
    var jsonText = JSON.stringify(book); 
    
    var bookCopy = JSON.parse(jsonText, function(key, value){     
        if (key == "releaseDate"){         
            return new Date(value);     
        } else {         
            return value;
        } 
    }); 
 
    alert(bookCopy.releaseDate.getFullYear()); 
    
以上代码先是为 book 对象新增了一个 releaseDate 属性，该属性保存着一个 Date 对象。这个对象在经过序列化之后变成了有效的 JSON字符串，然后经过解析又在 bookCopy 中还原为一个Date对象。还原函数在遇到"releaseDate"键时，会基于相应的值创建一个新的 Date 对象。结果就是 bookCopy.releaseDate 属性中会保存一个 Date 对象。正因为如此，才能基于这个对象调用 getFullYear()方法。

原生的 JSON对象也得到了很多浏览器的支持，比如 IE8+、Firefox 3.5+、Safari 4+、Opera 10.5和 Chrome。 