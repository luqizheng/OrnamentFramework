using System;
using System.Globalization;
using System.Threading;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ornament.Web.ModelBinder;

namespace Ornament.Test
{
    [TestClass]
    public class TimeModelBinderTest
    {
        [TestMethod]
        public void TestMethod1()
        {
            var dateTime = TimeModelBinder.ToDateTime("23:20", "aa:mm");
            Assert.AreEqual(23, dateTime.Hour);
            Assert.AreEqual(20, dateTime.Minute);
        }

        [TestMethod]
        public void TestMethod1_AMPM()
        {
            Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture("en");
            Thread.CurrentThread.CurrentUICulture = CultureInfo.CreateSpecificCulture("en");
            var dateTime = TimeModelBinder.ToDateTime("10:20 PM", "hh:mm");
            Assert.AreEqual(22, dateTime.Hour);
            Assert.AreEqual(20, dateTime.Minute);
        }

    }
}
