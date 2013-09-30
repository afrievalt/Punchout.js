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
            functionToPare = "$foo.set(5)";
        // Act
        result = pd.parseFunction(functionToPare);
        // Assert
        expect(result.target).toBe('foo');
        expect(result.funcName).toBe('set');
        expect(result.args).toEqual(['5']);
    });
    
    it("parseFunction - with $tom.goes('hi') - target =foo", function () {
        // Arrange
        var result,
            functionToPare = "$tom.goes('hi')";
        // Act
        result = pd.parseFunction(functionToPare);
        // Assert
        expect(result.target).toBe('tom');
        expect(result.funcName).toBe('goes');
        expect(result.args).toEqual(["'hi'"]);
   });
    
   it("parseFunction - with $tom.goes(+5, -true, gim) - target =foo", function () {
       // Arrange
       var result,
           functionToPare = "$tom.goes(+5,-true,gim)";
       // Act
       result = pd.parseFunction(functionToPare);
       // Assert
       expect(result.target).toBe('tom');
       expect(result.funcName).toBe('goes');
       expect(result.args).toEqual(["+5", "-true", "gim"]);
   });
    
    it()

});