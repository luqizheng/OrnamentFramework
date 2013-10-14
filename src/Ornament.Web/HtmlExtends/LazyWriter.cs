using System.IO;
using System.Text;

namespace Ornament.Web.HtmlExtends
{

    internal class RecordWriter : TextWriter
    {
        private readonly TextWriter _mInnerWriter;
        private readonly StringBuilder _mRecorders = new StringBuilder();

        public RecordWriter(TextWriter innerWriter)
        {
            _mInnerWriter = innerWriter;
        }

        public override Encoding Encoding
        {
            get { return _mInnerWriter.Encoding; }
        }

        public override void Write(char value)
        {
            _mRecorders.Append(value);
        }

        public override void Write(string value)
        {
            if (value != null)
            {
                _mRecorders.Append(value);
            }
        }

        public override void Write(char[] buffer, int index, int count)
        {
            _mRecorders.Append(buffer, index, count);
        }
        public StringBuilder Builder
        {
            get { return _mRecorders; }
        }

        public override string ToString()
        {
            return _mRecorders.ToString();
        }
    }

}