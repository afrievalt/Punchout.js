describe("6-create-vm", function() {
    var addDom = function(dom) {
        $(dom).appendTo("#testArea");
        return $("#testArea").children().last();
    },
        getOpitons = function(i) {
            i = (i) ? i : 0;
            return $($("#testArea").children()[i]).data("options");
        },
        getDataBind = function(i) {
            i = (i) ? i : 0;
            return $($("#testArea").children()[i]).attr("data-bind");
        };


    afterEach(function() {
        $("#testArea").html("");
    });
    it("createVm - <div data-vm='text#myId'/> - vm = {myId = ko.observable('boo')}", function () {
        // Arrange
        var result, elms;
        addDom("<div id='foo' data-vm='text=\"boo\"#myId'/>");
        elms = br.parseDom();
        // Act
        result = br.createVm(elms);

        // Assert
        expect(result.myId()).toBe("boo");
    });
    
    it("createVm - <div data-vm='text'/> - vm = {foo = ko.observable('boo')}", function () {
        // Arrange
        var result, elms;
        addDom("<div id='foo' data-vm='text=\"boo\"'/>");
        elms = br.parseDom();
        // Act
        result = br.createVm(elms);

        // Assert
        expect(result.foo()).toBe("boo");
    });
    
    it("createVm - <div id='bar' data-vm='click$foo.set(+0)'/> - vm = $foo.set", function () {
        // Arrange
        var result, elms;
        addDom("<div id='foo' data-vm='text=+1'/><div id='bar' data-vm='click$foo.set(+0)'/>");
        elms = br.parseDom();
        // Act
        result = br.createVm(elms);

        // Assert
        expect(result.foo()).toBe(1);
        result.bar();
        expect(result.foo()).toBe(0);
    });
    it("createVm - text$.sentance('hello', foo) - computerd observable", function () {
        // Arrange
        var result, elms;
        addDom("<div id='foo' data-vm='text=\"world\"'/><div id='bar' data-vm='text$.sentance(\"hello\", foo)'/>");
        elms = br.parseDom();
        // Act
        result = br.createVm(elms);

        // Assert
        expect(result.bar()).toBe('hello world');
        result.foo("Andy");
        expect(result.bar()).toBe('hello Andy');
    });

    describe("br.getVmItem", function () {
        it("getVmItem - <div data-vm='text#myId'/> => ko.observable('boo')", function () {
            // Arrange
            var observable = ko.observable(),
                result,
                elm =addDom("<div id='foo' data-vm='text=\"boo\"#myId'/>");
            br.parseDom();
            

            // Act
            result = br.getVmItem(getOpitons());

            // Assert
            expect(result()).toBe("boo");
            expect(result.toString()).toEqual(observable.toString());
        });
        
        it("getVmItem - <div data-vm='text#myId'/> => ko.observable('box')", function () {
            // Arrange
            var observable = ko.observable(),
                result,
                elm = addDom("<div id='foo' data-vm='text=\"box\"#myId'/>");
            br.parseDom();


            // Act
            result = br.getVmItem(getOpitons());

            // Assert
            expect(result()).toBe("box");
            expect(result.toString()).toEqual(observable.toString());
        });
        
        it("getVmItem - <div data-vm='text#myId'/> => ko.observableArray([])", function () {
            // Arrange
            var result;
            addDom("<ul id='myList' data-vm='foreach'/>");
            br.parseDom();

            // Act
            result = br.getVmItem(getOpitons());

            // Assert
            expect(result()).toEqual([]);
            expect(result.pop).toBeTruthy();
        });
        
        it("getVmItem - text$.sentance('hello', foo) - computerd observable", function () {
            // Arrange
            var result, options;
            addDom("<div id='foo' data-vm='text=\"world\"'/><div id='bar' data-vm='text$.sentance(\"hello\", foo)'/>");
            br.parseDom();
            options = getOpitons(1);
            options.vm = { foo: br.getVmItem(getOpitons()) };

            // Act
            result = br.getVmItem(options);

            // Assert
            expect(result()).toBe('hello world');
            
        });
        

        it("getVmItem - text$.sentance('hello', foo) - computerd observable", function () {
            // Arrange
            var result, options;
            addDom("<div id='foo' data-vm='text=\"andy\"'/><div id='bar' data-vm='text$.sentance(\"hello\", foo)'/>");
            br.parseDom();
            options = getOpitons(1);
            options.vm = { foo: br.getVmItem(getOpitons()) };

            // Act
            result = br.getVmItem(options);

            // Assert
            expect(result()).toBe('hello andy');
        });
    });
    
    it("getVmComputed - text$.sentance('hello', foo) - computerd observable", function () {
        // Arrange
        var result, options;
        addDom("<div id='foo' data-vm='text=\"world\"'/><div id='bar' data-vm='text$.sentance(\"hello\", foo)'/>");
        br.parseDom();
        options = getOpitons(1);
        options.vm = { foo: ko.observable('world') };

        // Act
        result = br.getVmItem(options);

        // Assert
        expect(result()).toBe('hello world');

    });

    describe("br.transposeInitialValue", function () {
        it("transposeInitialValue - 'boo' => string boo", function () {
            // Arrange
            var result;
            // Act
            result = br.transposeInitialValue('"boo"');

            // Assert
            expect(result).toBe("boo");
        });
        it("transposeInitialValue - 'boo' => string boo", function () {
            // Arrange
            var result;
            // Act
            result = br.transposeInitialValue("'box'");

            // Assert
            expect(result).toBe("box");
        });
   
    
        it("transposeInitialValue - 'boo' => string boo", function () {
            // Arrange
            var result;
            // Act
            result = br.transposeInitialValue("foo");

            // Assert
            expect(result).toBe("foo");
        });
    
        it("transposeInitialValue - '-true' => bool true", function () {
            // Arrange
            var result;
            // Act
            result = br.transposeInitialValue("-true");

            // Assert
            expect(result).toBe(true);
        });
    
        it("transposeInitialValue - '-f' => bool false", function () {
            // Arrange
            var result;
            // Act
            result = br.transposeInitialValue("-f");

            // Assert
            expect(result).toBe(false);
        });
    
        it("transposeInitialValue - '+5' => number 5", function () {
            // Arrange
            var result;
            // Act
            result = br.transposeInitialValue("+5");

            //Assert
            expect(result).toBe(5);
        });
    
        it("transposeInitialValue - '+-3.4' => number -3.4", function () {
            // Arrange
            var result;
            // Act
            result = br.transposeInitialValue("+-3.4");

            // Assert
            expect(result).toBe(-3.4);
        });
    });
});


