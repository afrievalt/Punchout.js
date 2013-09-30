require.config({
    baseUrl: "../boxingRing/",
    urlArgs: 'cb=' + Math.random(),
    paths: {
        "jasmine": '../JavaScriptUnitTests/spec/jasmine/jasmine',
        "jasmine"
        
        "jquery": 'lib/jquery-2.0.3',
        "knockout": "lib/knockout-2.3.0.debug",
        "pareDom": "parse-dom"
    }
});




require(['jquery', 'jasmine-html', 'sinon'], function ($, jasmine) {

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];

    specs.push('spec/views/phoningListSpec');

    require(specs, function () {
        jasmineEnv.execute();
    });

});
