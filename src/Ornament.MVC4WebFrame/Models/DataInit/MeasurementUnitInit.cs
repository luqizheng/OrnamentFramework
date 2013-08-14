using Ornament.Web.Models;

namespace Ornament.Web
{
    public class MeasurementUnitInit : IDataInitializer
    {
        public string Name
        {
            get
            {
                return "Measurement Unit";
            }
        }

        public bool IsNeedInitialize
        {
            get
            {

                return false;
            }
        }
        public void CreateData()
        {

        }
    }
}