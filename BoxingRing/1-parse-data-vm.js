//define(function() {
var br = br || {};

br.trim = function (str, head, tail) {
    head = head ? head : 1;
    tail = tail ? tail : 0;
    return str.substr(head, str.length - (head + tail));
};

br.defualtOptions = {

};

//todo: add spell checker
br.parseDataVm = function (dataVm) {
    var attachProperyIfValid = function (obj, name, property) {
        if (property !== null) {
            obj[name] = property;
        }
        return obj;
    },
getBinding = function (command) {
    var binding = command.match(/[^(#=$)]*/i)[0]; //todo: perf test vs split
    if (isValidBinding(binding)) return binding;
    throw new Error(binding + " is an invalid binding");
},
getId = function (command) {
    var splitCommand = command.split('#'),
        splitCount = splitCommand.length;
    if (splitCount > 1) {
        return splitCommand[splitCount - 1];
    }
    return null;
},
getFunctions = function (command) { //[$]\w*[.][^)]*[)]
    var functions = command.match(/[$]\w*[.][^)]*[)]/g); //todo, make work requeried
    if (functions) {
        return functions;
    }
    return null;
},
getComputed = function (command) { //[$]\w*[.][^)]*[)]
    var functions = command.match(/[$][.][^)]*[)]/);
    if (functions) {
        return functions[0];
    }
    return null;
},
getInitial = function (command) {//[=][^$#]* = any pattern starting with an = sign match everything up to $ or #
    var initial = command.match(/[=][^$#]*/);
    if (initial) {
        return br.trim(initial[0]);
    }
    return initial;
},
getSettings = function (command) {
    //var initial = command.match(/[^{}]+(?=\})/g);
    var settings = command.match(/{([^}]*)}/g);
    if (settings) {
        return JSON.parse(settings[0]);
    }
    return settings;
},
isValidBinding = function (binding) {
    return br.initialFunctions.hasOwnProperty(binding);
};

    var options = jQuery.extend({}, br.defualtOptions);

    options = attachProperyIfValid(options, "id", getId(dataVm));
    options = attachProperyIfValid(options, "initial", getInitial(dataVm));
    //options = attachProperyIfValid(options, "settings", getSettings(command));
    options = attachProperyIfValid(options, "functions", getFunctions(dataVm));
    options = attachProperyIfValid(options, "computed", getComputed(dataVm));
    options.binding = getBinding(dataVm);

    return options;
};
//    return pd;
//})