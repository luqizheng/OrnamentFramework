namespace Ornament.Files.FieldSettings
{
    public class CloumnFieldSetting : FieldSetting
    {
        public virtual int Index { get; set; }

        public static CloumnFieldSetting FromFieldSetting(FieldSetting d)
        {
            return new CloumnFieldSetting
            {
                Name = d.Name
            };
        }

        public static CloumnFieldSetting FromFieldSetting(FixLengthFieldSetting d)
        {
            return new CloumnFieldSetting
            {
                Name = d.Name
            };
        }
    }
}