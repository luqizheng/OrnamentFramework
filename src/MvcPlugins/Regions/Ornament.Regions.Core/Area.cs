using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml;
using Qi.Domain;

namespace Ornament.Regions
{
    public class Area : DomainObject<Area, int>
    {
        protected Area()
        {
        }

        /// <summary>
        ///     /
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="city"></param>
        public Area(int id, string name, City city)
        {
            if (city == null) throw new ArgumentNullException("city");
            Id = id;
            Name = name;
            City = city;
        }

        /// <summary>
        /// </summary>
        public virtual City City { get; set; }

        /// <summary>
        ///     名称
        /// </summary>
        public virtual string Name { get; set; }

        public override string ToString()
        {
            return City.Province + City.ToString() + Name;
        }

        public static List<Area> CreateData(IList<City> cities)
        {
            Dictionary<int, City> citiesDiect = cities.ToDictionary(city => city.Id);


            var result = new List<Area>();
            var xml = new XmlDocument();
            Stream stream = typeof (Area).Assembly.GetManifestResourceStream("Ornament.Regions.area.xml");
            xml.Load(stream);

            for (int i = 0; i < xml.DocumentElement.ChildNodes.Count; i++)
            {
                XmlNode ele = xml.DocumentElement.ChildNodes[i];
                int id = Convert.ToInt32(ele.Attributes["id"].Value);
                string name = ele.Attributes["name"].Value;
                var city = Convert.ToInt32(ele.Attributes["city"].Value);
                var area = new Area(id, name, citiesDiect[city]);

                result.Add(area);
            }

            return result;
        }
    }
}