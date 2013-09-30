pd.autoBind = function () {
    var elms = pd.parseDom(),
        vm = pd.createVm(elms);
    ko.punches.interpolationMarkup.enable();
    ko.applyBindings(vm);
};
pd.autoBind();