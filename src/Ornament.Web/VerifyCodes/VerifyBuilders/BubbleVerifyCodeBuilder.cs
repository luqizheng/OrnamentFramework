using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ornament.Web.VerifyCodes.VerifyBuilders
{
    class BubbleVerifyCodeBuilder:VerifyBuilder
    {
        public override Bitmap Build(string text)
        {
            Random random = new Random();
            var bitmap = new Bitmap
              (Width, Height, PixelFormat.Format32bppArgb);
            Graphics g = Graphics.FromImage(bitmap);
            g.SmoothingMode = SmoothingMode.AntiAlias;
            var rect = new Rectangle(0, 0, Width, Height);
            var hatchBrush = new HatchBrush(HatchStyle.SmallConfetti,
                Color.LightGray, Color.White);
            g.FillRectangle(hatchBrush, rect);
            SizeF size;
            float fontSize = rect.Height + 1;
            Font font;

            do
            {
                fontSize--;
                font = new Font(FontFamily.GenericSansSerif, fontSize, FontStyle.Bold);
                size = g.MeasureString(text, font);
            } while (size.Width > rect.Width);
            var format = new StringFormat();
            format.Alignment = StringAlignment.Center;
            format.LineAlignment = StringAlignment.Center;
            var path = new GraphicsPath();
            //path.AddString(this.text, font.FontFamily, (int) font.Style, 
            //    font.Size, rect, format);
            path.AddString(text, font.FontFamily, (int)font.Style, 75, rect, format);
            float v = 4F;
            PointF[] points =
            {
                new PointF(random.Next(rect.Width)/v, random.Next(
                    rect.Height)/v),
                new PointF(rect.Width - random.Next(rect.Width)/v,
                    random.Next(rect.Height)/v),
                new PointF(random.Next(rect.Width)/v,
                    rect.Height - random.Next(rect.Height)/v),
                new PointF(rect.Width - random.Next(rect.Width)/v,
                    rect.Height - random.Next(rect.Height)/v)
            };
            var matrix = new Matrix();
            matrix.Translate(0F, 0F);
            path.Warp(points, rect, matrix, WarpMode.Perspective, 0F);
            hatchBrush = new HatchBrush(HatchStyle.Percent10, Color.Black, Color.SkyBlue);
            g.FillPath(hatchBrush, path);
            int m = Math.Max(rect.Width, rect.Height);
            for (int i = 0; i < (int)(rect.Width * rect.Height / 30F); i++)
            {
                int x = random.Next(rect.Width);
                int y = random.Next(rect.Height);
                int w = random.Next(m / 50);
                int h = random.Next(m / 50);
                g.FillEllipse(hatchBrush, x, y, w, h);
            }
            font.Dispose();
            hatchBrush.Dispose();
            g.Dispose();
            return bitmap;
        }
    }
}
