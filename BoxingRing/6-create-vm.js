br.trimString = function(value) {
    return br.trim(value, 1, 1);
};

br.toBool = function (value) {
    return ( value.substr(1, value.length - 1) === "true");
};

br.toNumber = function (value) {
    return parseFloat(value.substr(1, value.length - 1));
};

br.toObservable = function (value, vm) {
    return vm[br.trim(value)];
};

br.toArray = function (value) {
    var re = /\s*,\s*/;
    return br.trim(value, 1, 1).split(re).map(br.transposeInitialValue);
    
};



br.transposeInitialValueFunctions = {
    "'": br.trimString,
    '"': br.trimString,
    '-': br.toBool,
    '+': br.toNumber,
    '^': br.toObservable,
    '[': br.toArray
}; 


br.transposeInitialValue = function (value) {
    var firstChar;
    if (!value)
        return value;
    firstChar = value[0];
    return br.transposeInitialValueFunctions.hasOwnProperty(firstChar) ?
        br.transposeInitialValueFunctions[firstChar](value) :
        value;
};

br.observableArrayBindings = ["foreach", "options"];
br.observableFunctionBindings = ["click", "submit"];



br.getVmItem = function (options) {
    var isArrayBinding = function(binding) {
            return -1 !== br.observableArrayBindings.indexOf(binding);
        },
        isFunctionBinding = function (binding) {
            return -1 !== br.observableFunctionBindings.indexOf(binding);
        },
        func = isArrayBinding(options.binding) ?
        ko.observableArray :
        ko.observable;
    if (options.computed) {
        return br.getVmComputed(options);
    }
    if (isFunctionBinding(options.binding)) {
        return br.getVmFunction(options);
    }
    
    return func(br.transposeInitialValue(options.initial));
};

br.logic = {
    ">=": function(left, right) {
        return left >= right;
    }    
};

br.computedFunctions = {
    sentance: function() {
        var args = Array.prototype.slice.call(arguments);
        return args.join(' ');
    },
    logic: function() {
        var args = Array.prototype.slice.call(arguments);
        return br.logic[args[1]](args[0], args[2]);
    }
};

br.getVmComputed = function (options) {
    var computed = br.trim(options.computed, 2, 1),
        parts = computed.split("("),
        computedFunction = parts[0],
        getTransposeArgumentValue = function(value) {
            return br.transposeArgumentValue(value, options.vm);
        };
        

    
    return ko.computed(function () {
        var args = parts[1].split(/\s*,\s*/).map(getTransposeArgumentValue);
        return br.computedFunctions[computedFunction].apply(this, args);
    }, options.vm);
};

br.createVm = function (elms) {
    var builtVm = {};
    elms.each(function() {
        var elm = $(this),
            options = elm.data('options'),
            id = options.id;
        options.vm = builtVm;
        builtVm[id] = br.getVmItem(options);
    });
    return builtVm;
};