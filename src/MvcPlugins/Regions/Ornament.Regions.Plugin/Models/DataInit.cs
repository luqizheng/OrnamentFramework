using System.Collections.Generic;
using Ornament.Regions.Dao;
using Ornament.Web.DataInitializers;

namespace Ornament.Regions.Plugin.Models
{
    internal class DataInit : IDataInitializer
    {
        public string Name
        {
            get { return "Region"; }
        }

        public bool IsNeedInitialize
        {
            get
            {
                var factory = OrnamentContext.DaoFactory.GetDaoFactory<IRegionDaoFactory>();
                IProvicenDao provinceDao = factory.CreateProvinceDao();
                List<Province> d = Province.ProvinceData;
                return provinceDao.Get(d[0].Id) == null;
            }
        }

        public void CreateData()
        {
            var factory = OrnamentContext.DaoFactory.GetDaoFactory<IRegionDaoFactory>();
            IProvicenDao provinceDao = factory.CreateProvinceDao();
            
            List<Province> provicnes = Province.ProvinceData;
            foreach (Province item in provicnes)
            {
                provinceDao.Save(item);
            }

            ICityDao cityDao = factory.CreateCityDao();
            IList<City> cities = City.CreateNewCityData(provicnes);
            foreach (City city in cities)
            {
                cityDao.Save(city);
            }
            IAreaDao areaDao = factory.CreateAreaDao();
            var areas = District.CreateData(cities);
            foreach (District city in areas)
            {
                areaDao.Save(city);
            }
            areaDao.Flush();


        }
    }
}