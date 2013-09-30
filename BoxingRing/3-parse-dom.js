//define(function() {
var pd = pd || {},
    getMissingValue = function (valueId, elm) {
        var missingValueFunctions = {
                "id" : getIdFromDom,
                "initial": br.getInitialFromDom
            },
            opt = br.options[valueId];
        br.options[valueId] = (opt === undefined) ? missingValueFunctions[valueId](elm) : opt;
    },
    getIdFromDom = function (elm) {
        return elm.attr("id");
    };
//move to new file

    br.options = {};
    br.vmObjects = [];
    br.createObject = function () {
        var elm = $(this);
        br.options = {};
        br.options = br.parseDataVm(elm.attr("data-vm"));
        elm.data("options", br.options);
        getMissingValue("id", elm);
        getMissingValue("initial", elm);
        br.setDataBind(elm);
        br.vmObjects.push(elm);
    };

    br.parseDom = function () {
        var elms = $("[data-vm]");
        elms.each(br.createObject);
        return elms;
    };

    

//    return pd;
//})