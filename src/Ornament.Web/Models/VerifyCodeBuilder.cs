using System;
using System.Drawing;

namespace Ornament.Web.Models
{
    public class VerifyCodeBuilder
    {
        private const double PI = 3.1415926535897931;
        private const double PI2 = 6.2831853071795862;

        private string codeSerial =
            "2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,j,k,l,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,U,V,W,X,Y,Z";

        private Color[] colors =
        {
            Color.Black, Color.Red, Color.DarkBlue, Color.Green, Color.Orange, Color.Brown, Color.DarkCyan,
            Color.Purple
        };

        private string[] fonts = {"Arial", "Georgia"};

        public VerifyCodeBuilder()
        {
            Length = 4;
            FontSize = 15;
            Padding = 1;
            EnableNoise = true;
            NoiseColor = Color.LightGray;
            Twist = false;
            BackColor = Color.White;
        }

        public Color BackColor { get; set; }

        public string CodeSerial
        {
            get { return codeSerial; }
            set { codeSerial = value; }
        }

        public Color[] Colors
        {
            get { return colors; }
            set { colors = value; }
        }

        public bool EnableNoise { get; set; }

        public string[] Fonts
        {
            get { return fonts; }
            set { fonts = value; }
        }

        public int FontSize { get; set; }

        public int Length { get; set; }

        public Color NoiseColor { get; set; }

        public int Padding { get; set; }

        public bool Twist { get; set; }

        public Bitmap CreateVerifyCodeImage(string code)
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
                int num5 = Length*10;
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

        public string GenerateCode()
        {
            string str = "";
            int index = -1;
            var random = new Random((int) DateTime.Now.Ticks);
            string[] strArray = CodeSerial.Split(new[] {','});
            for (int i = 0; i < Length; i++)
            {
                index = random.Next(0, strArray.Length - 1);
                str = str + strArray[index];
            }
            return str;
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