describe("set-data-bind", function () {
    var setupDom = function (dom, options) {
            $(dom).appendTo("#testArea");
            var elm = $("#testArea").children().last();
            elm.data("options", options);
            return elm;
        },
        getDataBind = function(i) {
            i = (i) ? i : 0;
            return $($("#testArea").children()[i]).attr("data-bind");
        };
    afterEach(function () {
        $("#testArea").html("");
    });
    it("setDataBind - text from <div>Andy</div> - Andy", function () {
        // Arrange
        var reslut,
            elm = setupDom("<div>Andy</div>", {id: "name", binding: "text"});
        // Act
        pd.setDataBind(elm);
        // Assert
        expect(getDataBind()).toBe('text: name');
    });
    
    it("setDataBind - <div>Andy</div> - Andy", function () {
        // Arrange
        var reslut,
            elm = setupDom("<div>Andy</div>", { id: "foo", binding: "text" });
        // Act
        pd.setDataBind(elm);
        // Assert
        expect(getDataBind()).toBe('text: foo');
    });
    
    it("setDataBind - elm with existing data-bind - valid data-bind", function () {
        // Arrange
        var elm = setupDom("<div data-bind='visible: showThis'>Andy</div>", { id: "foo", binding: "text" });
        // Act
        pd.setDataBind(elm);
        // Assert
        expect(getDataBind()).toBe('visible: showThis, text: foo');
    });
});