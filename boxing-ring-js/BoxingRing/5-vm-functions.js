
pd.parseFunction = function (funString) {
    var getTarget = function () {
        var target = pd.trim(funString.match(/[$][^.]*[.]/)[0], 1, 1);
        return target;
    },
    getFuncName = function () {
        var func = pd.trim(funString.match(/[.][^(]*[(]/)[0], 1, 1);
        return func;
    },
    getArgs = function () {
        var args = pd.trim(funString.match(/[(][^)]*[)]/)[0], 1, 1),
            argsArray = args.split(/\s*,\s*/);
        return argsArray;
    };
    
    return {target: getTarget() , funcName: getFuncName(), args: getArgs()};
};
