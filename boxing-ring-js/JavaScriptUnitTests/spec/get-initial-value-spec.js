describe("get-initial-value", function () {
    var setupDom = function(dom, binding) {
        $(dom).appendTo("#testArea");
        var elm = $("#testArea").children().last();
        elm.data("options", { "binding": binding });
        return elm;
    };
    afterEach(function () {
        $("#testArea").html("");
    });
    it("getInitialFromDom - text from <div>Andy</div> - Andy", function () {
        // Arrange
        var reslut,
            elm = setupDom("<div>Andy</div>", "text");
        // Act
        reslut = pd.getInitialFromDom(elm);
        // Assert
        expect(reslut).toBe('Andy');
    });
    
    it("getInitialFromDom - value from <input value='something'>Andy</input> - something", function () {
        // Arrange
        var reslut,
            elm = setupDom("<input value='something'>Andy</input>", "value");
        // Act
        reslut = pd.getInitialFromDom(elm);
        // Assert
        expect(reslut).toBe('something');
    });
    
    it("getInitialFromDom - checked from <input type='checkbox' value='something'>Andy</input> - false", function () {
        // Arrange
        var reslut,
            elm = setupDom("<input type='checkbox' value='something'>Andy</input>", "checked");
        // Act
        reslut = pd.getInitialFromDom(elm);
        // Assert
        expect(reslut).toBe(false);
    });
    
    it("getInitialFromDom - checked from <input type='checkbox' value='something'>Andy</input> - true", function () {
        // Arrange
        var reslut,
            elm = setupDom("<input type='checkbox' checked value='something'>Andy</input>", "checked");
        // Act
        reslut = pd.getInitialFromDom(elm);
        // Assert
        expect(reslut).toBe(true);
    });
    
    it("getInitialFromDom - visible from <input type='checkbox' value='something'>Andy</input> - true", function () {
        // Arrange
        var reslut,
            elm = setupDom("<input type='checkbox' checked value='something'>Andy</input>", "visible");
        // Act
        reslut = pd.getInitialFromDom(elm);
        // Assert
        expect(reslut).toBe(true);
    });
    
    it("getInitialFromDom - visible from <input type='checkbox' value='something' style='display: none'>Andy</input> - false", function () {
        // Arrange
        var reslut,
            elm = setupDom("<input type='checkbox' checked value='something' style='display: none'>Andy</input>", "visible");
        // Act
        reslut = pd.getInitialFromDom(elm);
        // Assert
        expect(reslut).toBe(false);
    });
});