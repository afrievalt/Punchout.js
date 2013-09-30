br.autoBind = function (sub) {
    var elms = br.parseDom(),
        vm = br.createVm(elms);
    ko.punches.interpolationMarkup.enable();
    ko.applyBindings(vm, sub);
    return vm;
};

$(function () {
    br.autoBind();
}); 