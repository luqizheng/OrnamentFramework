using System;
using System.ComponentModel.DataAnnotations;
using Qi;

namespace Ornament.MVCWebFrame.Areas.Docs.Models
{
    public class ExtenderTypeModel
    {
        public ExtenderTypeModel()
        {
           
        }
        [UIHint("Time")]
        //[DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "HH:ss")]
        public Time TimeNow { get; set; }

        

    }
}