var pd = pd || {};

br.initialFunctions = {
    "checked": function (elm) {
        return elm.prop('checked');
    },
    "click": function () {
        return null;
    },
    "disable": function (elm) {
        return !elm.is(":disabled");
    },
    "enable": function (elm) {
        return !elm.is(":disabled");
    },
    "foreach": function () {
        return [];
    },
    "html": function (elm) {
        return elm.html();
    },
    "options": function () {
        return [];
    },
    "submit": function () {
        return null;
    },
    "selectedOptions": function() {
        return [];
    },
    "text": function (elm) {
        return elm.text();
    },
    "value": function (elm) {
        return elm.val();
    },
    "visible": function (elm) {
        return elm.is(':visible');
    }
    
    
    
    
    
};
br.getInitialFromDom = function (elm) {
    var binding = elm.data("options").binding;
    return br.initialFunctions[binding](elm);
};