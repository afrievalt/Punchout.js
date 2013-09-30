describe("parse-dom", function () {
it("pd is there", function () {
    expect(pd).toBeTruthy();
});
describe("parseDom", function () {
    var addDom = function(dom) {
            $(dom).appendTo("#testArea");
            return $("#testArea").children().last();
        },
        getOpitons = function (i) {
            i = (i) ? i : 0;
            return $($("#testArea").children()[i]).data("options");
        },
        getDataBind = function (i) {
            i = (i) ? i : 0;
            return $($("#testArea").children()[i]).attr("data-bind");
        };
    

    afterEach(function () {
       $("#testArea").html("");
    });
    it("prseDom - <div data-vm='text#myId'/> - br.options.id = myId", function () {
        // Arrange
        addDom("<div id='foo' data-vm='text#myId'>boo</div>");

        // Act
        br.parseDom();

        // Assert
        expect(getOpitons().id).toBe("myId");
        expect(getDataBind()).toBe("text: myId");
    });
    
    it("prseDom - <div data-vm='text#myId'/> - options.binding = text", function () {
        // Arrange
        addDom("<div id='foo' data-vm='text#myId'>boo</div>");

        // Act
        br.parseDom();

        // Assert
        expect(getOpitons().id).toBe("myId");
        expect(getOpitons().binding).toBe("text");
        expect(getDataBind()).toBe("text: myId");
    });
    
    it("prseDom - <div id='boo' data-vm='text'/> - options.id = boo", function () {
        // Arrange
        var elm = addDom("<div id='boo' data-vm='text'>boo</div>");

        // Act
        br.parseDom();

        // Assert
        expect(getOpitons().id).toBe("boo");
        expect(getOpitons().binding).toBe("text");
        expect(getDataBind()).toBe("text: boo");
    });
    
    it("prseDom - <div id='boo' data-vm='text#bar'/> - options.id = bar", function () {
        // Arrange
        var elm = addDom("<div id='boo' data-vm='text#bar'>boo</div>");

        // Act
        br.parseDom();

        // Assert
        expect(getOpitons().id).toBe("bar");
        expect(getOpitons().binding).toBe("text");
        expect(getDataBind()).toBe("text: bar");
    });
    
    it("prseDom - <div id='boo' data-vm='text#bar'>hello world</div> - options.id = bar", function () {
        // Arrange
        var elm = addDom("<div id='boo' data-vm='text#bar'>hello world</div>");

        // Act
        br.parseDom();

        // Assert
        expect(getOpitons().id).toBe("bar");
        expect(getOpitons().binding).toBe("text");
        expect(getOpitons().initial).toBe("hello world");
        expect(getDataBind()).toBe("text: bar");
    });
    
    it("prseDom - <div id='boo' data-vm='text#bar'>hello</div> - options.id = bar", function () {
        // Arrange
        var elm = addDom("<div id='boo' data-vm='text#bar'>hello</div>");

        // Act
        br.parseDom();

        // Assert
        expect(getOpitons().id).toBe("bar");
        expect(getOpitons().binding).toBe("text");
        expect(getOpitons().initial).toBe("hello");
        expect(getDataBind()).toBe("text: bar");
    });

    it("prseDom - with 2 divs - options.id = bar", function () {
        // Arrange
        var elms;
        addDom("<div id='boo' data-vm='text#bar'>boo</div><div id='foo' data-vm='text=\"start\"'>boo</div>");

        // Act
        elms = br.parseDom();

        // Assert
        expect(getOpitons().id).toBe("bar");
        expect(getOpitons().binding).toBe("text");
        expect(getOpitons().initial).toBe("boo");
        expect(getDataBind()).toBe("text: bar");
        expect(getOpitons(1).id).toBe("foo");
        expect(getOpitons(1).binding).toBe("text");
        expect(getOpitons(1).initial).toBe("\"start\"");
        expect(getDataBind(1)).toBe("text: foo");
        expect(elms.length).toBe(2);

    });
});

    
});
