describe("parse-data-vm-spec", function () {
it("pd is there", function () {
    expect(pd).toBeTruthy();
});
describe("trim", function() {
    it("trim - 'text' => 'ext", function () {
        //Arange
        var result;
        //Act
        result = br.trim('text');
        //Asert
        expect(result).toBe('ext');
    });

    it("trim('text', 1, 1) => 'ex", function() {
        //Arange
        var result;
        //Act
        result = br.trim('text', 1, 1);
        //Asert
        expect(result).toBe('ex');
    });
});
    
describe("parseDataVm", function () {
    it("parseDataVm('text') => binding = text}", function() {
        //Arange
        var result;
        //Act
        result = br.parseDataVm('text');
        //Asert
        expect(result.binding).toBe('text');
        expect(result.id).toBeUndefined();
        expect(result.default).toBeUndefined();
        expect(result.type).toBeUndefined();
    });
    
    it("parseDataVm('foo') => binding = text}", function () {
        //Arange
        expect(function () {
        //Act
            br.parseDataVm('foo');
       //Assert
        }).toThrow(new Error("foo is an invalid binding"));
    });
    
    it("parseDataVm('text#myId') => id = myId}", function () {
        //Arange
        var result;
        //Act
        result = br.parseDataVm('text#myId');
        //Asert
        expect(result.id).toBe('myId');
        expect(result.binding).toBe('text');
        expect(result.default).toBeUndefined();
        expect(result.type).toBeUndefined();
    });
    it("parseDataVm('text='hello'#myId') => initial = 'hello'}", function () {
        //Arange
        var result;
        //Act
        result = br.parseDataVm("text='hello'#myId");
        //Asert
        expect(result.id).toBe('myId');
        expect(result.binding).toBe('text');
        expect(result.initial).toBe("'hello'");
        expect(result.type).toBeUndefined();
    });
    });
    
    //xit("parseDataVm('text{type: const}) => settings = {type: 'fixed'}", function () {
    //    //Arange
    //    var result;
    //    //Act
    //    result = br.parseDataVm('text{"type": "fixed"}');
    //    //Asert'
    //    expect(result.id).toBeUndefined();
    //    expect(result.binding).toBe('text');
    //    expect(result.initial).toBeUndefined();
    //    expect(result.settings).toEqual({ type: 'fixed' });
    //});
    
    it("parseDataVm('text=true) => initial = true", function () {
        //Arange
        var result;
        //Act
        result = br.parseDataVm('text=true');
        //Asert'
        expect(result.id).toBeUndefined();
        expect(result.binding).toBe('text');
        expect(result.initial).toBe('true');
        expect(result.settings).toBeUndefined();
    });
    
    it("parseDataVm('checked=false) => initial = false", function () {
        //Arange
        var result;
        //Act
        result = br.parseDataVm('checked=false');
        //Asert'
        expect(result.id).toBeUndefined();
        expect(result.binding).toBe('checked');
        expect(result.initial).toBe('false');
        expect(result.settings).toBeUndefined();
    });

    it("parseDataVm('checked$.foo()) => computed = $.foo()", function () {
        //Arange
        var result;
        //Act
        result = br.parseDataVm('checked$.foo()');
        //Asert'
        expect(result.id).toBeUndefined();
        expect(result.binding).toBe('checked');
        expect(result.initial).toBeUndefined();
        expect(result.computed).toBe('$.foo()');
        expect(result.settings).toBeUndefined();
    });
    

    it("parseDataVm('clik$foo.set(+0)) => computed =undefined", function () {
        //Arange
        var result;
        //Act
        result = br.parseDataVm('click$foo.set(+0)');
        //Asert'
        expect(result.id).toBeUndefined();
        expect(result.binding).toBe('click');
        expect(result.initial).toBeUndefined();
        expect(result.computed).toBeUndefined();
        expect(result.settings).toBeUndefined();
    });
    //click$foo.set(+0)

    it("parseDataVm -w/ 'checked$name.function(attr1, 'attr2')' => funtion = $name.function(attr1, 'attr2')", function () {
        //Arange
        var result;
        //Act
        result = br.parseDataVm("checked$name.function(attr1, 'attr2')");
        //Asert'
        expect(result.id).toBeUndefined();
        expect(result.binding).toBe('checked');
        expect(result.initial).toBeUndefined();
        expect(result.settings).toBeUndefined();
        expect(result.functions).toEqual(["$name.function(attr1, 'attr2')"]);
    });
    it("parseDataVm -w/ 'checked$.function(attr1, 'attr2')' => funtion = $name.function(attr1, 'attr2')", function () {
        //Arange
        var result;
        //Act
        result = br.parseDataVm("checked$.function(attr1, 'attr2')");
        //Asert'
        expect(result.id).toBeUndefined();
        expect(result.binding).toBe('checked');
        expect(result.initial).toBeUndefined();
        expect(result.settings).toBeUndefined();
        expect(result.functions).toEqual(["$.function(attr1, 'attr2')"]);
    });
    it("parseDataVm -w/ 2 functions  => has 2  funtions", function () {
        //Arange
        var result;
        //Act
        result = br.parseDataVm("checked$name.function(attr1, 'attr2')$id.other()#hello");
        //Asert'
        expect(result.id).toBe("hello");
        expect(result.binding).toBe('checked');
        expect(result.initial).toBeUndefined();
        expect(result.settings).toBeUndefined();
        expect(result.functions).toEqual(["$name.function(attr1, 'attr2')", "$id.other()"]);
    });
});

    
