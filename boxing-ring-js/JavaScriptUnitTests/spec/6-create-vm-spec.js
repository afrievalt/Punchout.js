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
        elms = pd.parseDom();
        // Act
        result = pd.createVm(elms);

        // Assert
        expect(result.myId()).toBe("boo");
    });
    
    it("createVm - <div data-vm='text'/> - vm = {foo = ko.observable('boo')}", function () {
        // Arrange
        var result, elms;
        addDom("<div id='foo' data-vm='text=\"boo\"'/>");
        elms = pd.parseDom();
        // Act
        result = pd.createVm(elms);

        // Assert
        expect(result.foo()).toBe("boo");
    });
    describe("pd.getVmItem", function () {
        it("getVmItem - <div data-vm='text#myId'/> => ko.observable('boo')", function () {
            // Arrange
            var observable = ko.observable(),
                result,
                elm =addDom("<div id='foo' data-vm='text=\"boo\"#myId'/>");
            pd.parseDom();
            

            // Act
            result = pd.getVmItem(getOpitons());

            // Assert
            expect(result()).toBe("boo");
            expect(result.toString()).toEqual(observable.toString());
        });
        
        it("getVmItem - <div data-vm='text#myId'/> => ko.observable('box')", function () {
            // Arrange
            var observable = ko.observable(),
                result,
                elm = addDom("<div id='foo' data-vm='text=\"box\"#myId'/>");
            pd.parseDom();


            // Act
            result = pd.getVmItem(getOpitons());

            // Assert
            expect(result()).toBe("box");
            expect(result.toString()).toEqual(observable.toString());
        });
        
        it("getVmItem - <div data-vm='text#myId'/> => ko.observableArray([])", function () {
            // Arrange
            var pop = ko.observableArray([]),
                x = ko.observable(),
                result;
            addDom("<ul id='myList' data-vm='foreach'/>");
            pd.parseDom();

            // Act
            result = pd.getVmItem(getOpitons());

            // Assert
            expect(result()).toEqual([]);
            expect(result.pop).toBeTruthy();
        });
    });
    describe("pd.transposeInitialValue", function () {
        it("transposeInitialValue - 'boo' => string boo", function () {
            // Arrange
            var result;
            // Act
            result = pd.transposeInitialValue('"boo"');

            // Assert
            expect(result).toBe("boo");
        });
        it("transposeInitialValue - 'boo' => string boo", function () {
            // Arrange
            var result;
            // Act
            result = pd.transposeInitialValue("'box'");

            // Assert
            expect(result).toBe("box");
        });
   
    
        it("transposeInitialValue - 'boo' => string boo", function () {
            // Arrange
            var result;
            // Act
            result = pd.transposeInitialValue("foo");

            // Assert
            expect(result).toBe("foo");
        });
    
        it("transposeInitialValue - '-true' => bool true", function () {
            // Arrange
            var result;
            // Act
            result = pd.transposeInitialValue("-true");

            // Assert
            expect(result).toBe(true);
        });
    
        it("transposeInitialValue - '-f' => bool false", function () {
            // Arrange
            var result;
            // Act
            result = pd.transposeInitialValue("-f");

            // Assert
            expect(result).toBe(false);
        });
    
        it("transposeInitialValue - '+5' => number 5", function () {
            // Arrange
            var result;
            // Act
            result = pd.transposeInitialValue("+5");

            //Assert
            expect(result).toBe(5);
        });
    
        it("transposeInitialValue - '+-3.4' => number -3.4", function () {
            // Arrange
            var result;
            // Act
            result = pd.transposeInitialValue("+-3.4");

            // Assert
            expect(result).toBe(-3.4);
        });
    });
});


