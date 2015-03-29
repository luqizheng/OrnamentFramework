namespace Ornament.Files.FieldSettings
{
    public class FixLengthFieldSetting : FieldSetting
    {
        public virtual int Start { get; set; }
        public virtual int Length { get; set; }

        public static FixLengthFieldSetting FromFieldSetting(FieldSetting d)
        {
            return new FixLengthFieldSetting
            {
                Name = d.Name
            };
        }

        public static FixLengthFieldSetting FromFieldSetting(CloumnFieldSetting d)
        {
            return new FixLengthFieldSetting
            {
                Name = d.Name
            };
        }
    }
}