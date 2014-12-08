using System;

namespace Ornament.Web.InputBuilder.ViewEngine
{
    public class RenderInputBuilderException : Exception
    {
        public RenderInputBuilderException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}