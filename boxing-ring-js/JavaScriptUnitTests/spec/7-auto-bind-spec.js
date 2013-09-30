describe("7-auto-bind", function () {
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
     //   $("#testArea").html("");
    });
    it("autoBind - with dom - target =Andy", function () {
        // Arrange
        var reslut,
            elm = setupDom("<div data-vm='text#myId'>Andy</div><div>xxxxxxxxx{{ myId }}xxxxxxxxxx</div><div id='target' data-bind='text: myId'>");
        // Act
        pd.autoBind();
        // Assert
        expect($("#target").text()).toBe('Andy');
    });
});