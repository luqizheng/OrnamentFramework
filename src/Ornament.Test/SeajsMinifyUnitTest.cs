﻿using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ornament.Web.Bundles;

namespace Ornament.Test
{
    [TestClass]
    public class SeajsMinifyUnitTest
    {
        [TestMethod]
        public void ReformatToSeajs()
        {
//            const string content = @"define(function (require) {
//    /* for user ajax search */
//    var api = require(""/models/util/select2Helper.js"");
//    return {
//        select2: function (selector, initData) {
//            var opts = {
//                ajax:
//                    { url: ""/api/Orgs"" },
//                multiple: false
//            };
//            return api.select2(selector, opts, initData);
//        }
//    };
//});";

//            const string expect = @"define(""/finad/js.js"",[""/models/util/select2Helper.js""],function (require) {
//    /* for user ajax search */
//    var api = require(""/models/util/select2Helper.js"");
//    return {
//        select2: function (selector, initData) {
//            var opts = {
//                ajax:
//                    { url: ""/api/Orgs"" },
//                multiple: false
//            };
//            return api.select2(selector, opts, initData);
//        }
//    };
//});";
//            var target = new CombineSeajs("/finad/js.js", "/base/modules/");
//            string actual = target.Processs(content);
//            Assert.AreEqual(expect, actual);
        }
    }
}