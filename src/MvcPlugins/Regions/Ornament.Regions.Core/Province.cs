using System.Collections.Generic;
using Qi.Domain;

namespace Ornament.Regions
{
    public class Province : DomainObject<Province, int>
    {
        protected Province(){}
        public Province(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public virtual string Name { get; set; }
        public override string ToString()
        {
            return Name;
        }
        public static List<Province> ProvinceData
        {
            get
            {
                var result = new List<Province>
                {
                    new Province(110000, "北京市"),
                    new Province(120000, "天津市"),
                    new Province(130000, "河北省"),
                    new Province(140000, "山西省"),
                    new Province(150000, "内蒙古自治区"),
                    new Province(210000, "辽宁省"),
                    new Province(220000, "吉林省"),
                    new Province(230000, "黑龙江省"),
                    new Province(310000, "上海市"),
                    new Province(320000, "江苏省"),
                    new Province(330000, "浙江省"),
                    new Province(340000, "安徽省"),
                    new Province(350000, "福建省"),
                    new Province(360000, "江西省"),
                    new Province(370000, "山东省"),
                    new Province(410000, "河南省"),
                    new Province(420000, "湖北省"),
                    new Province(430000, "湖南省"),
                    new Province(440000, "广东省"),
                    new Province(450000, "广西壮族自治区"),
                    new Province(460000, "海南省"),
                    new Province(500000, "重庆市"),
                    new Province(510000, "四川省"),
                    new Province(520000, "贵州省"),
                    new Province(530000, "云南省"),
                    new Province(540000, "西藏自治区"),
                    new Province(610000, "陕西省"),
                    new Province(620000, "甘肃省"),
                    new Province(630000, "青海省"),
                    new Province(640000, "宁夏回族自治区"),
                    new Province(650000, "新疆维吾尔自治区")
                };
                return result;
            }
        }
    }
}