using System;

namespace Ornament.EasySqlExecuter.Tables
{
    public class PrimaryKeyEventArgs : EventArgs
    {
        public object[] IdentityValue { get; set; }
    }
}