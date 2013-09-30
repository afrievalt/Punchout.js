var pd = pd || {};

pd.initialFunctions = {
    "checked": function (elm) {
        return elm.prop('checked');
    },
    "text": function (elm) {
        return elm.text();
    },
    "value": function (elm) {
        return elm.val();
    },
    "visible": function (elm) {
        return elm.is(':visible');
    },
    "foreach": function() {
        return [];
    },
    "click": function () {
        return null;
    }
};
pd.getInitialFromDom = function (elm) {
    var binding = elm.data("options").binding;
    return pd.initialFunctions[binding](elm);
};