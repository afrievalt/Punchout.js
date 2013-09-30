describe("8-show-code", function () {
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


    it("1 parseShow - when data-show='vm' - finds one elm", function () {
        // Arrange
        var reslut, vm,
            elm = setupDom("<div id='showTest1' data-vm='visible=-false'>Andy</div>");
        // Act
        vm = br.autoBind(document.getElementById("test1"));
        // Assert
        expect(elm.is(":visible")).toBeFalsy();
        vm.test1(true);
        expect(elm.is(":visible")).toBeTruthy();
    });

});