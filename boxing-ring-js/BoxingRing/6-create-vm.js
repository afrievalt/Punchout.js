pd.trimString = function(value) {
    return pd.trim(value, 1, 1);
};

pd.toBool = function (value) {
    return ( value.substr(1, value.length - 1) === "true");
};

pd.toNumber = function (value) {
    return parseFloat(value.substr(1, value.length - 1));
};

pd.transposeInitialValueFunctions = {
    "'": pd.trimString,
    '"': pd.trimString,
    '-': pd.toBool,
    '+': pd.toNumber
}; 


pd.transposeInitialValue = function (value) {
    var firstChar;
    if (!value)
        return value;
    firstChar = value[0];
    return pd.transposeInitialValueFunctions.hasOwnProperty(firstChar) ?
        pd.transposeInitialValueFunctions[firstChar](value) :
        value;
};

pd.getVmItem = function (options) {
    var func = (options.binding === 'foreach') ?
        ko.observableArray :
        ko.observable;
    return func(pd.transposeInitialValue(options.initial));
};

pd.createVm = function (elms) {
    var builtVm = {};
    elms.each(function() {
        var elm = $(this),
            options = elm.data('options'),
            id = options.id;
        builtVm[id] = pd.getVmItem(options);
    });
    return builtVm;
};