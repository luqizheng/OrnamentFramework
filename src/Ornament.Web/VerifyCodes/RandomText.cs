using System;
using System.Drawing;

namespace Ornament.Web.VerifyCodes
{
    public class RandomText
    {
        private string _codeSerial =
            "2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,j,k,l,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,U,V,W,X,Y,Z";

        public RandomText(int length)
        {
            Length = length;
        }

        public int Length { get; set; }

        public string CodeSerial
        {
            get { return _codeSerial; }
            set { _codeSerial = value; }
        }

        public string GenerateCode(VerifyBuilder builder, out Bitmap image)
        {
            string str = "";
            var random = new Random((int) DateTime.Now.Ticks);
            string[] strArray = CodeSerial.Split(new[] {','});
            for (int i = 0; i < Length; i++)
            {
                int index = random.Next(0, strArray.Length - 1);
                str = str + strArray[index];
            }
            image = builder.Build(str);
            return str;
        }
    }
}