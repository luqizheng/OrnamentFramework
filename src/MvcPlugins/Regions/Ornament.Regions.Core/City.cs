using System;
using System.Collections.Generic;
using System.Xml;
using Qi.Domain;

namespace Ornament.Regions
{
    public class City : DomainObject<City, int>
    {
        protected City()
        {
        }

        public City(int id, string name, Province province)
        {
            if (name == null) throw new ArgumentNullException("name");
            if (province == null) throw new ArgumentNullException("province");
            Id = id;
            Name = name;
            Province = province;
        }

        public virtual string Name { get; set; }

        public virtual Province Province { get; set; }

        public static IList<City> CreateNewCityData(List<Province> provinces)
        {
            var dirct = new Dictionary<int, Province>();
            foreach (Province key in provinces)
            {
                dirct.Add(key.Id, key);
            }
            var result = new List<City>();
            var xml = new XmlDocument();
            var stream = typeof(City).Assembly.GetManifestResourceStream("Ornament.Regions.city.xml");
            xml.Load(stream);

            for (int i = 0; i < xml.DocumentElement.ChildNodes.Count; i++)
            {
                var ele = xml.DocumentElement.ChildNodes[i];
                var id = Convert.ToInt32(ele.Attributes["id"].Value);
                var name = ele.Attributes["name"].Value;
                var province = Convert.ToInt32(ele.Attributes["province"].Value);
                var city = new City(id, name, dirct[province]);

                result.Add(city);
            }

            return result;
        }

        public override string ToString()
        {
            return Name;
        }
    }
}