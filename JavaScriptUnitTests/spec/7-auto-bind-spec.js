describe("7-auto-bind", function () {
    var setupDom = function (dom) {
        $(dom).appendTo("#testArea");
        var elm = $("#testArea").children().last();
        ko.cleanNode(elm[0]);
        return elm;
    },
        getDataBind = function (i) {
            i = (i) ? i : 0;
            return $($("#testArea").children()[i]).attr("data-bind");
        };
    afterEach(function () {
        $("#testArea").html("");
    });
    xit("autoBind - with dom - target =Andy", function () {
        // Arrange
        var reslut,
            elm = setupDom("<div data-vm='text#mId'>Andy</div><div id='target2' data-bind='text: mId'>");
        // Act
        br.autoBind();
        // Assert

        expect($("#target2").text()).toBe('Andy');
        ko.cleanNode($("#testArea").children()[0]);
        ko.cleanNode($("#testArea").children()[1]);
    });
    
    it("1 autoBind - visible binding - shows and hides properly", function () {
        // Arrange
        var reslut, vm,
            elm = setupDom("<div id='test1' data-vm='visible=-false'>Andy</div>");
        // Act
        vm= br.autoBind(document.getElementById("test1"));
        // Assert
        expect(elm.is(":visible")).toBeFalsy();
        vm.test1(true);
        expect(elm.is(":visible")).toBeTruthy();
    });
    
    it("1 autoBind - visible binding - shows and hides properly", function () {
        // Arrange
        var reslut, vm,
            elm = setupDom("<div id='test1' data-vm='visible=-false'>Andy</div>");
        // Act
        vm = br.autoBind(document.getElementById("test1"));
        // Assert
        expect(elm.is(":visible")).toBeFalsy();
        vm.test1(true);
        expect(elm.is(":visible")).toBeTruthy();
    });
    
    it("2 autoBind - html binding - valid vm", function () {
        // Arrange
        var reslut, vm,
            elm = setupDom("<div id='test2' data-vm='html'>hi <b>Andy</b></div>");
        // Act
        vm = br.autoBind(document.getElementById("test2"));
        // Assert
        expect(vm.test2()).toBe("hi <b>Andy</b>");
        vm.test2("hi<br>");
        expect(elm.html()).toBe("hi<br>");
    });
    
    it("3 autoBind - forEach binding - valid vm", function () {
        // Arrange
        var reslut, vm,
            elm = setupDom("<ul id='test3' data-vm='foreach'><li data-bind='text: $data'/></ul>");
        // Act
        vm = br.autoBind(document.getElementById("test3"));
        // Assert
        expect(elm.children().length).toBe(0);
        vm.test3.push('some Val');
        vm.test3.push('some Val');
        vm.test3.push('some Val');
        expect(elm.children().length).toBe(3);
    });
    
    xit(" autoBind  - event binding with parameter -valid vm ", function () {
        // Arrange
        var reslut, vm,
            elm = setupDom("<span id='test3' data-vm='event(moseOver:$something.doSomethign())'/>");
        // Act
        vm = br.autoBind(document.getElementById("test3"));
        // Assert
        expect(elm.children().length).toBe(0);
        vm.test3.push('some Val');
        vm.test3.push('some Val');
        vm.test3.push('some Val');
        expect(elm.children().length).toBe(3);
    });
    
    it("4 autoBind - options binding, no initial array - valid vm", function () {
        // Arrange
        var reslut, vm,
            elm = setupDom("<select id='test4' data-vm='options' />");
        // Act
        vm = br.autoBind(document.getElementById("test4"));
        // Assert
        expect(elm.children().length).toBe(0);
        vm.test4.push('some Val');
        vm.test4.push('some Val');
        vm.test4.push('some Val');
        expect(elm.children().length).toBe(3);
    });
    
    xit("5 autoBind - options binding, w initial array - valid vm", function () {
        // Arrange
        var reslut, vm,
            elm = setupDom("<ul id='test5' data-vm='options'><li data-bind='text: $data'/></ul>");
        // Act
        vm = br.autoBind(document.getElementById("test5"));
        // Assert
        expect(elm.children().length).toBe(0);
        vm.test5.push('some Val');
        vm.test5.push('some Val');
        vm.test5.push('some Val');
        expect(elm.children().length).toBe(3);
    });
    
    it("6 autoBind - submit binding, w initial array - valid vm", function () {
        // Arrange
        var reslut, vm,
            elm = setupDom("<form id='test6' data-vm='submit$count.set(+0)'><span id='count' data-vm='text'/></form>");
        // Act
        vm = br.autoBind(document.getElementById("test6"));
        // Assert
        vm.test6();
        expect($('#count').text()).toBe('0');
    });
    
    it("7 autoBind - enable binding, w initial array - valid vm", function () {
        // Arrange
        var reslut, vm,
            elm = setupDom("<button id='test7' data-vm='enable=-false'>Add</button>");
        // Act
        vm = br.autoBind(document.getElementById("test7"));
        // Assert
        
        expect(vm.test7()).toBe(false);
    });
    
    it("7.1 autoBind - enable binding, w initial array - valid vm", function () {
        // Arrange
        var reslut, vm,
            elm = setupDom("<button id='test71' data-vm='enable'>Add</button>");
        // Act
        vm = br.autoBind(document.getElementById("test71"));
        // Assert

        expect(vm.test71()).toBe(true);
    });
    
    it("7.2 autoBind - enable binding, w initial array - valid vm", function () {
        // Arrange
        var reslut, vm,
            elm = setupDom("<button id='test72' data-vm='enable' disabled='true'>Add</button>");
        // Act
        vm = br.autoBind(document.getElementById("test72"));
        // Assert

        expect(vm.test72()).toBe(false);
    });
    
    it("8 autoBind - punches {{ }} - valid vm", function () {
        // Arrange
        var reslut, vm,
            elm = setupDom("<form id='test7' data-vm='submit$count.set(+0)'><span id='count' data-vm='text'/><span id='punches'>{{count}}</span></form>");
        // Act
        vm = br.autoBind(document.getElementById("test7"));
        // Assert
        vm.test7();
        expect($('#punches').text()).toBe('0');
    });
});