using Ornament.Web.DataInitializers;

namespace Ornament.MVCWebFrame.Models.DataInit
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