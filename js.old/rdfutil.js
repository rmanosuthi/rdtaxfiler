"use strict";
exports.__esModule = true;
var jszip_1 = require("./jszip");
var RDFUtil = /** @class */ (function () {
    function RDFUtil() {
        this.zip = new jszip_1["default"]();
        this.currentFile = {};
    }
    RDFUtil.prototype.load = function (file) {
        jszip_1["default"].loadAsync(file).then(function (zip) {
            zip.forEach();
        });
    };
    return RDFUtil;
}());
exports.RDFUtil = RDFUtil;
