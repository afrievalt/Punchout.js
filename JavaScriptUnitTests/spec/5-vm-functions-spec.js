describe("5-vm-functions", function () {
    var setupDom = function (dom) {
        $(dom).appendTo("#testArea");
        var elm = $("#testArea").children().last();
        return elm;
    },
        getDataBind = function (i) {
            i = (i) ? i : 0;
            return $($("#testArea").children()[i]).attr("data-bind");
        };
    afterEach(function () {
        $("#testArea").html("");
    });
    it("parseFunction - with $foo.set(5) - target =foo", function () {
        // Arrange
        var result,
            functionToParse = "$foo.set(5)";
        // Act
        result = br.parseFunction(functionToParse);
        // Assert
        expect(result.target).toBe('foo');
        expect(result.funcName).toBe('set');
        expect(result.args).toEqual(['5']);
    });
    
    it("parseFunction - with $tom.goes('hi') - target =foo", function () {
        // Arrange
        var result,
            functionToParse = "$tom.goes('hi')";
        // Act
        result = br.parseFunction(functionToParse);
        // Assert
        expect(result.target).toBe('tom');
        expect(result.funcName).toBe('goes');
        expect(result.args).toEqual(["'hi'"]);
   });
    
   it("parseFunction - with $tom.goes(+5, -true, gim) - target =foo", function () {
       // Arrange
       var result,
           functionToParse = "$tom.goes(+5,-true,gim)";
       // Act
       result = br.parseFunction(functionToParse);
       // Assert
       expect(result.target).toBe('tom');
       expect(result.funcName).toBe('goes');
       expect(result.args).toEqual(["+5", "-true", "gim"]);
   });

   it("parseFunction - with $.goes(+5, -true, gim) - target =foo", function () {
       // Arrange
       var result,
           functionToParse = ".goes(+5,-true,gim)";
       // Act
       result = br.parseFunction(functionToParse);
       // Assert
       expect(result.target).toBe(null);
       expect(result.funcName).toBe('goes');
       expect(result.args).toEqual(["+5", "-true", "gim"]);
   });
    
   it("createFucntion - with $count.set(+0) - creats function", function () {
       // Arrange
       var result,
           functionToParse = ".goes(+5,-true,gim)";
       // Act
       result = br.parseFunction(functionToParse);
       // Assert
       expect(result.target).toBe(null);
       expect(result.funcName).toBe('goes');
       expect(result.args).toEqual(["+5", "-true", "gim"]);
   });
    
   it("transposeArgumentValue - +0 - 0", function () {
       // Arrange
       var result;
       // Act
       result = br.transposeArgumentValue("+0", null);
       // Assert
       expect(result).toBe(0);
   });
    
   it("transposeArgumentValue - someFunc - someFucn of mv", function () {
       // Arrange
       var result,
           vm = { someFunc: ko.observable('bar') };
       // Act
       result = br.transposeArgumentValue("^someFunc", vm);
       // Assert
       expect(result()).toBe('bar');
   });
    
   it("transposeArgumentValue - someFunc - someFucn of mv", function () {
       // Arrange
       var result,
           vm = { someFunc: ko.observable('bar') };
       // Act
       result = br.transposeArgumentValue("someFunc", vm);
       // Assert
       expect(result).toBe('bar');
   });
    
   it("getVmFunction - $me.set(' ') - ", function () {
       // Arrange
       var result,
           vm = { me: ko.observable('bar') },
           options = {};
       options.functions = [];
       options.functions[0] = "$me.set(' ')";
       options.vm = vm;

       // Act
       result = br.getVmFunction(options);

       // Assert
       result();
       expect(vm.me()).toBe(" ");
   });
    
   it("getVmFunction - $me.set(+0) - ", function () {
       // Arrange
       var result,
           vm = { me: ko.observable('bar') },
           options = {};
       options.functions = [];
       options.functions[0] = "$me.set(+0)";
       options.vm = vm;

       // Act
       result = br.getVmFunction(options);

       // Assert
       result();
       expect(vm.me()).toBe(0);
   });
   it("getVmFunction - $me.push('andy') - ", function () {
       // Arrange
       var result,
           vm = { me: ko.observableArray([]) },
           options = {};
       options.functions = [];
       options.functions[0] = "$me.push('andy')";
       options.vm = vm;

       // Act
       result = br.getVmFunction(options);

       // Assert
       result();
       expect(vm.me()[0]).toBe('andy');
   });
   it("getVmFunction - two functions - runs both functions", function () {
       // Arrange
       var result,
           vm = { theList: ko.observableArray([]),
                  theItem: ko.observable('Andy')},
           options = {};
       options.functions = [];
       options.functions[0] = "$theList.push(^theItem)";
       options.functions[1] = "$theItem.set('x')";
       options.vm = vm;

       // Act
       result = br.getVmFunction(options);

       // Assert
       result();
       expect(vm.theList()[0]()).toBe('x');
   });
   it("getVmFunction - two functions - runs both functions", function () {
       // Arrange
       var result,
           vm = {
               theList: ko.observableArray([]),
               theItem: ko.observable('Andy')
           },
           options = {};
       options.functions = [];
       options.functions[0] = "$theList.push(theItem)";
       options.functions[1] = "$theItem.set('')";
       options.vm = vm;

       // Act
       result = br.getVmFunction(options);

       // Assert
       result();
       expect(vm.theList()[0]).toBe('Andy');
   });
});

