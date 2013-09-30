//define(function() {
var pd = pd || {},
    getMissingValue = function (valueId, elm) {
        var missingValueFunctions = {
                "id" : getIdFromDom,
                "initial": pd.getInitialFromDom
            },
            opt = pd.options[valueId];
        pd.options[valueId] = (opt === undefined) ? missingValueFunctions[valueId](elm) : opt;
    },
    getIdFromDom = function (elm) {
        return elm.attr("id");
    };
//move to new file

    pd.options = {};
    pd.vmObjects = [];
    pd.createObject = function () {
        var elm = $(this);
        pd.options = {};
        pd.options = pd.parseDataVm(elm.attr("data-vm"));
        elm.data("options", pd.options);
        getMissingValue("id", elm);
        getMissingValue("initial", elm);
        pd.setDataBind(elm);
        pd.vmObjects.push(elm);
    };

    pd.parseDom = function () {
        var elms = $("[data-vm]");
        elms.each(pd.createObject);
        return elms;
    };

    

//    return pd;
//})