
br.parseFunction = function (funString) {
    var getTarget = function () {
        var base = funString.match(/[$][^.]*[.]/),
             target = base ? br.trim(base[0], 1, 1) : null;
        return target;
    },
    getFuncName = function () {
        var func = br.trim(funString.match(/[.][^(]*[(]/)[0], 1, 1);
        return func;
    },
    getArgs = function () {
        var args = br.trim(funString.match(/[(][^)]*[)]/)[0], 1, 1),
            argsArray = args.split(/\s*,\s*/);
        return argsArray;
    };
    
    return {target: getTarget() , funcName: getFuncName(), args: getArgs()};
};

br.transposeArgumentValue = function (value, vm) {
    var firstChar;
    if (!value)
        return value;
    firstChar = value[0];
    return br.transposeInitialValueFunctions.hasOwnProperty(firstChar) ?
        br.transposeInitialValueFunctions[firstChar](value, vm) :
        vm[value]();
};

br.actionFunctions =
{
    'set': function(target, arg) {
        target(arg[0]);
    },
    'push': function(target, arg) {
        target.push(arg[0]);
    },
    'add': function (target, arg) {
        target(target() + arg[0]);
    }
};

br.getSingleVmFunction = function(options, funcIndex) {
    var funcOptions = br.parseFunction(options.functions[funcIndex]),
        getTransposeArgumentValue = function(value) {
            return br.transposeArgumentValue(value, options.vm);
        },
        arg = funcOptions.args.map(getTransposeArgumentValue),
        target = options.vm[funcOptions.target],
        action = br.actionFunctions[funcOptions.funcName]; // Please learn to f*king test something you incompetent a$$hat!
    //todo: throw error if action is null
    
    return function () {
        action(target, arg);
    };
};

br.getVmFunction = function (options) {
    var i = 0,
        fncCount = options.functions.length;
    return function () {
        for(i= 0;i < fncCount; i += 1 ) {
            br.getSingleVmFunction(options, i)();
        }
    };
};

