//define(function() {
var pd =  pd || {},
    defualtOptions = {
        
    },
    validBindings = ['text', 'checked', 'foreach', 'value', 'click'],
    attachProperyIfValid = function(obj, name, property) {
        if (property !== null) {
            obj[name] = property;
        }
        return obj;
    },
    getBinding = function(command) {
        var binding = command.match(/[^(#=$)]*/i)[0]; //todo: perf test vs split
        if (isValidBinding(binding)) return binding;
        throw new Error(binding + " is an invalid binding");
    },
    getId = function(command) {
        var splitCommand = command.split('#'),
            splitCount = splitCommand.length;
        if (splitCount > 1) {
            return splitCommand[splitCount - 1];
        }
        return null;
    },
    getFunctions = function (command) { //[$]\w*[.][^)]*[)]
        var functions = command.match(/[$]\w*[.][^)]*[)]/g);
        if (functions) {
            return functions;
        }
        return null;
    },
    getInitial = function (command) {//[=][^$#]* = any pattern starting with an = sign match everything up to $ or #
        var initial = command.match(/[=][^$#]*/);
        if (initial) {
            return pd.trim(initial[0]); 
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
    isValidBinding = function(binding) {
        return validBindings.indexOf(binding) !== -1;
    };
    pd.trim = function(str, head, tail) {
        head = head ? head : 1;
        tail = tail ? tail : 0;
        return str.substr(head, str.length - (head + tail));
    };

//todo: add spell checker
    pd.parseDataVm = function(command) {
        var options = jQuery.extend({}, defualtOptions); 
        options = attachProperyIfValid(options, "id", getId(command));
        options = attachProperyIfValid(options, "initial", getInitial(command));
        //options = attachProperyIfValid(options, "settings", getSettings(command));
        options = attachProperyIfValid(options, "functions", getFunctions(command));
        options.binding = getBinding(command);

        return options;
    };
//    return pd;
//})