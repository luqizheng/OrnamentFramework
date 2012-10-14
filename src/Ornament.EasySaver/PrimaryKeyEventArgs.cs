using System;

namespace Ornament.EasySqlExecuter
{
    public class PrimaryKeyEventArgs : EventArgs
    {
        public object[] IdentityValue { get; set; }
    }
}