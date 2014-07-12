using System;
using System.Collections.Generic;
using System.Net;

namespace Ornament.IPLocation
{
    public struct Scope
    {
        public long Max { get; set; }
        public long Min { get; set; }
    }

    public class IpCountry
    {
        private IList<Scope> _scoprs;

        public IList<Scope> Scopes
        {
            get { return _scoprs ?? (_scoprs = new List<Scope>()); }
        }

        public string CountryName { get; set; }
        public string ShotName { get; set; }

        public bool In(string ip)
        {
            return In(IPAddress.Parse(ip));
        }

        public bool In(IPAddress ipAddress)
        {
            long companreId = ToLong(ipAddress);
            foreach (Scope item in Scopes)
            {
                if (companreId < item.Max && companreId > item.Min)
                {
                    return true;
                }
            }
            return false;
        }

        public void AddScopes(string startIp, string endIp)
        {
            var scope = new Scope
            {
                Min = ToLong(startIp),
                Max = ToLong(endIp)
            };
            Scopes.Add(scope);
        }

        public static long ToLong(string ip)
        {
            return ToLong(IPAddress.Parse(ip));
        }

        public static long ToLong(IPAddress ip)
        {
            var startIpAras = new Stack<string>(ip.ToString().Split('.'));
            long result = 0;
            int i = 0;
            while (startIpAras.Count != 0)
            {
                long item = Convert.ToInt64(startIpAras.Pop());
                result += item*Convert.ToInt64(Math.Pow(256, i));
                i++;
            }
            return result;
        }
    }
}