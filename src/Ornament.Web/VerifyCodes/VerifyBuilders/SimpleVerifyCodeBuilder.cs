using System;
using System.Drawing;

namespace Ornament.Web.VerifyCodes.VerifyBuilders
{
    public class SimpleVerifyCodeBuilder : VerifyBuilder
    {
        public SimpleVerifyCodeBuilder()
        {
            Colors = new Color[] {Color.Black, Color.Red, Color.DarkBlue, Color.Green, Color.Orange, Color.Brown, Color.DarkCyan, Color.Purple};
            FontSize = 15;
            Padding = 1;
            EnableNoise = true;
            NoiseColor = Color.LightGray;
            Twist = false;
            BackColor = Color.White;

            Fonts = new[] {"Arial", "Georgia"};
        }

        public Color[] Colors { get; set; }

        public string[] Fonts { get; set; }
        public Color NoiseColor { get; set; }
        public bool Twist { get; set; }
        public Color BackColor { get; set; }

        public int FontSize { get; set; }
        public Color[] FontColor { get; set; }
        public bool EnableNoise { get; set; }
        public int Padding { get; set; }

        public override Bitmap Build(string code)
        {
            int num6;
            int fontSize = FontSize;
            int num2 = fontSize + Padding;
            int width = ((code.Length*num2) + 4) + (Padding*2);
            int height = (fontSize*2) + Padding;
            var image = new Bitmap(width, height);
            Graphics graphics = Graphics.FromImage(image);
            graphics.Clear(BackColor);
            var random = new Random();
            if (EnableNoise)
            {
                var pen = new Pen(NoiseColor, 0f);
                int num5 = code.Length*10;
                for (num6 = 0; num6 < num5; num6++)
                {
                    int x = random.Next(image.Width);
                    int y = random.Next(image.Height);
                    graphics.DrawRectangle(pen, x, y, 1, 1);
                }
            }
            int num9 = 0;
            int num10 = 0;
            int num11 = 1;
            int num12 = 1;
            int num13 = (height - FontSize) - (Padding*2);
            int num14 = num13/4;
            num11 = num14;
            num12 = num14*2;
            for (num6 = 0; num6 < code.Length; num6++)
            {
                int index = random.Next(Colors.Length - 1);
                int num16 = random.Next(Fonts.Length - 1);
                var font = new Font(Fonts[num16], fontSize, FontStyle.Bold);
                Brush brush = new SolidBrush(Colors[index]);
                if ((num6%2) == 1)
                {
                    num10 = num12;
                }
                else
                {
                    num10 = num11;
                }
                num9 = num6*num2;
                graphics.DrawString(code.Substring(num6, 1), font, brush, num9, num10);
            }
            //graphics.DrawRectangle(new Pen(Color.Gray, 0f), 0, 0, image.Width - 1, image.Height - 1);
            graphics.Dispose();
            if (Twist)
            {
                image = TwistImage(image, false, 1.8, 2.1);
            }
            return image;
        }


        private Bitmap TwistImage(Bitmap srcBmp, bool bXDir, double dMultValue, double dPhase)
        {
            var image = new Bitmap(srcBmp.Width, srcBmp.Height);
            Graphics graphics = Graphics.FromImage(image);
            graphics.FillRectangle(new SolidBrush(Color.White), 0, 0, image.Width, image.Height);
            graphics.Dispose();
            double num = bXDir ? (image.Height) : (image.Width);
            for (int i = 0; i < image.Width; i++)
            {
                for (int j = 0; j < image.Height; j++)
                {
                    double a = 0.0;
                    a = bXDir ? ((6.2831853071795862*j)/num) : ((6.2831853071795862*i)/num);
                    a += dPhase;
                    double num5 = Math.Sin(a);
                    int x = 0;
                    int y = 0;
                    x = bXDir ? (i + ((int) (num5*dMultValue))) : i;
                    y = bXDir ? j : (j + ((int) (num5*dMultValue)));
                    Color pixel = srcBmp.GetPixel(i, j);
                    if ((((x >= 0) && (x < image.Width)) && (y >= 0)) && (y < image.Height))
                    {
                        image.SetPixel(x, y, pixel);
                    }
                }
            }
            return image;
        }
    }
}