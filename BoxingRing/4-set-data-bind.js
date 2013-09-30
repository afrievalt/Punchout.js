var pd = pd || {};

br.setDataBind = function(elm) {
    var options = elm.data("options"),
        orgBind = elm.attr("data-bind"),
        prepend = orgBind ? orgBind + ", " : "",
        result = prepend + options.binding + ": " + options.id;
    elm.attr("data-bind", result);
};