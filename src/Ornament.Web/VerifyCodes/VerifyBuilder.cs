using System.Drawing;

namespace Ornament.Web.VerifyCodes
{
    public abstract class VerifyBuilder
    {
        public int Width { get; set; }

        public int Height { get; set; }


        public abstract Bitmap Build(string text);
    }
}