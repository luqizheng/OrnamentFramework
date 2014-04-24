using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ornament.IPLocation;

namespace Ornament.Test
{
    [TestClass]
    public class IpLocationTest
    {
        [TestMethod]
        public void TestMethod1()
        {
            var ipLocation = new IpCountry();
            ipLocation.AddScopes("125.56.128.1", "125.56.255.255");

            Assert.IsTrue(ipLocation.In("125.56.129.5"));
        }

    }
}
