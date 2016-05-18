using System;

namespace Ornament
{
    public class ChinaCalendar
    {
        #region 农历的静态数据

        private static readonly string[] Animals = {"鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"};

        private static readonly int[] ChinaCalendarInfo = {
                                                              0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950,
                                                              0x16554, 0x056a0, 0x09ad0, 0x055d2,
                                                              0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540,
                                                              0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
                                                              0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54,
                                                              0x02b60, 0x09570, 0x052f2, 0x04970,
                                                              0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60,
                                                              0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
                                                              0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0,
                                                              0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
                                                              0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573,
                                                              0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
                                                              0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260,
                                                              0x0f263, 0x0d950, 0x05b57, 0x056a0,
                                                              0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250,
                                                              0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
                                                              0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50,
                                                              0x06d40, 0x0af46, 0x0ab60, 0x09570,
                                                              0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58,
                                                              0x055c0, 0x0ab60, 0x096d5, 0x092e0,
                                                              0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0,
                                                              0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
                                                              0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0,
                                                              0x0a5b0, 0x15176, 0x052b0, 0x0a930,
                                                              0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6,
                                                              0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
                                                              0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0,
                                                              0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
                                                              0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0,
                                                              0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
                                                              0x14b63
                                                          };

        private static readonly string[] chinaMonthName = {
                                                              "正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月"
                                                              ,
                                                              "十一", "腊月"
                                                          };

        private static readonly string[] dayStr1 = {"日", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"};

        private static readonly string[] dayStr2 = {"初", "十", "廿", "卅", "□"};

        private static readonly string[] Gan = {"甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"};

        private static readonly string[] solarTermName = {
                                                             "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满",
                                                             "芒种", "夏至",
                                                             "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪",
                                                             "大雪", "冬至"
                                                         };

        private static readonly string[] Zhi = {"子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"};

        //  private static string[] solarTerm = { "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至" };

        private static int[] sTermInfo = {
                                             0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551,
                                             218072,
                                             240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210,
                                             440795
                                             , 462224, 483532, 504758
                                         };

        #endregion

        #region 构造函数

        public ChinaCalendar()
        {
            InitializeValue();
        }

        public ChinaCalendar(DateTime date)
        {
            dtvalue = Convert.ToDateTime(date.ToShortDateString());
            InitializeValue();
        }

        #endregion

        //默认系统当前日期

        //用来计算农历的初始日期
        private readonly DateTime baseDate = new DateTime(1900, 1, 31);
        private int chinaDay; //农历日

        private int chinaMonth; //农历月
        private int chinaYear; //农历年
        private int doubleMonth; //闰月
        private DateTime dtvalue = Convert.ToDateTime(DateTime.Now.ToShortDateString());
        private bool isLeap; //是否闰月标记

        /// <summary>
        /// 获取或设置类中应用日期  
        /// </summary>
        public DateTime CurrentDatetime
        {
            get { return dtvalue; }
            set
            {
                dtvalue = Convert.ToDateTime(value.ToShortDateString());
                InitializeValue();
            }
        }

        /// <summary>
        /// 获取该年的属相（生肖）
        /// </summary>
        public string Animal
        {
            get { return Animals[(chinaYear - 4)%60%12]; }
        }

        /// <summary>
        ///  获取农历年（天干 地支）
        /// </summary>
        public string ChinaYear
        {
            get { return (Gan[(chinaYear - 4)%60%10] + Zhi[(chinaYear - 4)%60%12] + "年"); }
        }

        /// <summary>
        /// 获取农历月或闰月
        /// </summary>
        public string ChinaMonth
        {
            get
            {
                if (isLeap)
                {
                    return "闰" + chinaMonthName[chinaMonth - 1];
                }
                return chinaMonthName[chinaMonth - 1];
            }
        }

        /// <summary>
        /// 获取农历日
        /// </summary>
        public string ChinaDay
        {
            get
            {
                string s;
                switch (chinaDay)
                {
                    case 10:
                        s = "初十";
                        break;
                    case 20:
                        s = "二十";
                        break;
                    case 30:
                        s = "三十";
                        break;
                    default:
                        s = dayStr2[chinaDay/10];
                        s += dayStr1[chinaDay%10];
                        break;
                }
                return (s);
            }
        }


        private void InitializeValue()
        {
            TimeSpan timeSpan = dtvalue - baseDate;
            int sumdays = Convert.ToInt32(timeSpan.TotalDays); //86400000=1000*24*60*60
            int tempdays = 0;

            //计算农历年
            for (chinaYear = 1900; chinaYear < 2050 && sumdays > 0; chinaYear++)
            {
                tempdays = ChinaYearDays(chinaYear);
                sumdays -= tempdays;
            }

            if (sumdays < 0)
            {
                sumdays += tempdays;
                chinaYear--;
            }

            //计算闰月
            doubleMonth = DoubleMonth(chinaYear);
            isLeap = false;

            //计算农历月
            for (chinaMonth = 1; chinaMonth < 13 && sumdays > 0; chinaMonth++)
            {
                //闰月
                if (doubleMonth > 0 && chinaMonth == (doubleMonth + 1) && isLeap == false)
                {
                    --chinaMonth;
                    isLeap = true;
                    tempdays = DoubleMonthDays(chinaYear);
                }
                else
                {
                    tempdays = MonthDays(chinaYear, chinaMonth);
                }

                //解除闰月
                if (isLeap && chinaMonth == (doubleMonth + 1))
                {
                    isLeap = false;
                }
                sumdays -= tempdays;
            }

            //计算农历日
            if (sumdays == 0 && doubleMonth > 0 && chinaMonth == doubleMonth + 1)
            {
                if (isLeap)
                {
                    isLeap = false;
                }
                else
                {
                    isLeap = true;
                    --chinaMonth;
                }
            }

            if (sumdays < 0)
            {
                sumdays += tempdays;
                --chinaMonth;
            }

            chinaDay = sumdays + 1;

            //计算节气
            ComputeSolarTerm();
        }

        ///<summary>
        ///返回农历年的总天数
        ///</summary>
        ///<param name="year">农历年</param>
        ///<returns></returns>
        private int ChinaYearDays(int year)
        {
            int i, sum = 348;
            for (i = 0x8000; i > 0x8; i >>= 1)
            {
                sum += ((ChinaCalendarInfo[year - 1900] & i) != 0) ? 1 : 0;
            }
            return (sum + DoubleMonthDays(year));
        }

        ///<summary>
        ///返回农历年闰月月份1-12 , 没闰返回0
        ///</summary>
        ///<param name="year">农历年</param>
        ///<returns></returns>
        private int DoubleMonth(int year)
        {
            return (ChinaCalendarInfo[year - 1900] & 0xf);
        }

        ///<summary>
        ///返回农历年闰月的天数
        ///</summary>
        ///<param name="year">农历年</param>
        ///<returns></returns>
        private int DoubleMonthDays(int year)
        {
            if (DoubleMonth(year) != 0)
                return (((ChinaCalendarInfo[year - 1900] & 0x10000) != 0) ? 30 : 29);
            return (0);
        }

        ///</summary>
        ///返回农历年月份的总天数
        ///</summary>
        ///<param name="year">农历年</param>
        ///<param name="month">农历月</param>
        ///<returns></returns>
        private int MonthDays(int year, int month)
        {
            return (((ChinaCalendarInfo[year - 1900] & (0x10000 >> month)) != 0) ? 30 : 29);
        }

        #region 节气

        private readonly SolarTerm[] solarTerm = new SolarTerm[2];

        /// <summary>
        /// 返回指定日期的月份两个节气的名称及时间的SolarTerm数组
        /// </summary>
        public SolarTerm[] SolarTerm
        {
            get { return solarTerm; }
        }

        /// <summary>
        /// 返回指定日期的节气名,没有节气名则返回空字符串
        /// </summary>
        public string TermName
        {
            get
            {
                foreach (SolarTerm sterm in solarTerm)
                    if (dtvalue.Day == sterm.DateTime.Day)
                    {
                        return sterm.Name;
                    }

                return "";
            }
        }

        // 计算节气
        private void ComputeSolarTerm()
        {
            int year = dtvalue.Year;
            int month = dtvalue.Month;

            for (int n = month*2 - 1; n <= month*2; n++)
            {
                double Termdays = Term(year, n, true);
                double mdays = AntiDayDifference(year, Math.Floor(Termdays));
                double sm1 = Math.Floor(mdays/100);
                var hour = (int) Math.Floor(Tail(Termdays)*24);
                var minute = (int) Math.Floor((Tail(Termdays)*24 - hour)*60);
                var tMonth = (int) Math.Ceiling((double) n/2);
                int day = (int) mdays%100;

                solarTerm[n - month*2 + 1].Name = solarTermName[n - 1];
                solarTerm[n - month*2 + 1].DateTime = new DateTime(year, tMonth, day, hour, minute, 0);
            }
        }


        //返回y年第n个节气（如小寒为1）的日差天数值（pd取值真假，分别表示平气和定气）
        private double Term(int y, int n, bool pd)
        {
            //儒略日
            double juD = y*(365.2423112 - 6.4e-14*(y - 100)*(y - 100) - 3.047e-8*(y - 100)) + 15.218427*n +
                         1721050.71301;

            //角度
            double tht = 3e-4*y - 0.372781384 - 0.2617913325*n;

            //年差实均数
            double yrD = (1.945*Math.Sin(tht) - 0.01206*Math.Sin(2*tht))*(1.048994 - 2.583e-5*y);

            //朔差实均数
            double shuoD = -18e-4*Math.Sin(2.313908653*y - 0.439822951 - 3.0443*n);

            double vs = (pd)
                            ? (juD + yrD + shuoD - EquivalentStandardDay(y, 1, 0) - 1721425)
                            : (juD - EquivalentStandardDay(y, 1, 0) - 1721425);
            return vs;
        }


        // 返回阳历y年日差天数为x时所对应的月日数（如y=2000，x=274时，返回1001(表示10月1日，即返回100*m+d)）
        private double AntiDayDifference(int y, double x)
        {
            int m = 1;
            for (int j = 1; j <= 12; j++)
            {
                int mL = DayDifference(y, j + 1, 1) - DayDifference(y, j, 1);
                if (x <= mL || j == 12)
                {
                    m = j;
                    break;
                }
                else
                    x -= mL;
            }
            return 100*m + x;
        }


        // 返回x的小数尾数，若x为负值，则是1-小数尾数
        private double Tail(double x)
        {
            return x - Math.Floor(x);
        }


        // 返回等效标准天数（y年m月d日相应历种的1年1月1日的等效(即对Gregorian历与Julian历是统一的)天数）
        private double EquivalentStandardDay(int y, int m, int d)
        {
            //Julian的等效标准天数
            double v = (y - 1)*365 + Math.Floor((double) ((y - 1)/4)) + DayDifference(y, m, d) - 2;

            if (y > 1582)
            {
                //Gregorian的等效标准天数
                v += -Math.Floor((double) ((y - 1)/100)) + Math.Floor((double) ((y - 1)/400)) + 2;
            }
            return v;
        }


        // 返回阳历y年m月d日的日差天数（在y年年内所走过的天数，如2000年3月1日为61）
        private int DayDifference(int y, int m, int d)
        {
            int ifG = IfGregorian(y, m, d, 1);
            int[] monL = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
            if (ifG == 1)
                if ((y%100 != 0 && y%4 == 0) || (y%400 == 0))
                    monL[2] += 1;
                else if (y%4 == 0)
                    monL[2] += 1;
            int v = 0;
            for (int i = 0; i <= m - 1; i++)
            {
                v += monL[i];
            }
            v += d;
            if (y == 1582)
            {
                if (ifG == 1)
                    v -= 10;
                if (ifG == -1)
                    v = 0; //infinity 
            }
            return v;
        }


        // 判断y年m月(1,2,..,12,下同)d日是Gregorian历还是Julian历
        //（opt=1,2,3分别表示标准日历,Gregorge历和Julian历）,是则返回1，是Julian历则返回0，
        // 若是Gregorge历所删去的那10天则返回-1
        private int IfGregorian(int y, int m, int d, int opt)
        {
            if (opt == 1)
            {
                if (y > 1582 || (y == 1582 && m > 10) || (y == 1582 && m == 10 && d > 14))
                    return (1); //Gregorian
                else if (y == 1582 && m == 10 && d >= 5 && d <= 14)
                    return (-1); //空
                else
                    return (0); //Julian
            }

            if (opt == 2)
                return (1); //Gregorian
            if (opt == 3)
                return (0); //Julian
            return (-1);
        }

      
        #endregion 节气
    }
}