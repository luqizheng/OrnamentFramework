using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Qi;
using Qi.Attendance;
using Qi.Attendance.Dao;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Attendance.Controllers
{
    public class EmployeeGroupController : Controller
    {
        private readonly IAttendanceFactory _attendanceFactory;

        public EmployeeGroupController(IAttendanceFactory attendanceFactory)
        {
            _attendanceFactory = attendanceFactory;
        }

        //
        // GET: /Attendance/EmployeeGroup/
        [Session]
        public ActionResult Index()
        {
            IList<EmployeeGroup> d = _attendanceFactory.GetEmployeeGroup().GetAll();
            return View(d);
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost, Session(Transaction = true)]
        public ActionResult Create(EmployeeGroup group, FormCollection form)
        {
            if (ModelState.IsValid)
            {
                FillWeekDay(group.Options, form);
                FillSpecialWorkDay(group.Options, form);
                _attendanceFactory.GetEmployeeGroup().Save(group);
                return Redirect("Index");
            }
            return View(group);
        }

        private static Time ConverToTime(string time)
        {
            string[] ary = time.Split(':');
            int hour = Convert.ToInt32(ary[0]);
            int mins = Convert.ToInt32(ary[1]);
            return new Time(hour, mins, 0);
        }

        private void FillWeekDay(EmployeeGroupOption option, FormCollection form)
        {
            foreach (DayOfWeek dayOfWeek in Enum.GetValues(typeof (DayOfWeek)))
            {
                if (form[dayOfWeek + "Start"] == null)
                    continue;

                string[] startTimes = form[dayOfWeek + "Start"].Split(',');
                string[] endTimes = form[dayOfWeek + "End"].Split(',');
                string[] remarks = form[dayOfWeek + "Remarks"].Split(',');
                option.WeekSetting[dayOfWeek].WorkTimes.Clear();
                for (int i = 0; i < startTimes.Length; i++)
                {
                    var period = new Period
                        {
                            EndTime = ConverToTime(endTimes[i]),
                            StartTime = ConverToTime(startTimes[i]),
                            Remarks = remarks[i]
                        };
                    option.WeekSetting[dayOfWeek].WorkTimes.Add(period);
                }
            }
        }

        private void FillSpecialWorkDay(EmployeeGroupOption option, FormCollection form)
        {
            if (form["workdayStart"] == null)
                return;
            string[] startTimes = form["workdayStart"].Split(',');
            string[] endTimes = form["workdayEnd"].Split(',');
            string[] dates = form["workdayDate"].Split(',');
            var mergeWorkDayMark = new Dictionary<DateTime, SpecialWorkDayMark>();
            for (int i = 0; i < startTimes.Length; i++)
            {
                Time startTime = ConverToTime(startTimes[i]);
                Time endTime = ConverToTime(endTimes[i]);
                DateTime date = DateTime.ParseExact(dates[i], "yyyy-MM-dd", null);
                if (!mergeWorkDayMark.ContainsKey(date))
                {
                    mergeWorkDayMark.Add(date, new SpecialWorkDayMark
                        {
                            Date = date
                        });
                }

                SpecialWorkDayMark mark = mergeWorkDayMark[date];
                mark.Periods.Add(new Period
                    {
                        StartTime = startTime,
                        EndTime = endTime
                    });
            }
            option.SpecialWorkDay.Clear();
            option.SpecialWorkDay.AddAll(mergeWorkDayMark.Values);
        }

        public ActionResult Edit(string id)
        {
            EmployeeGroup group = _attendanceFactory.GetEmployeeGroup().Get(new Guid(id));
            return View(group);
        }

        [HttpPost, Session(Transaction = true)]
        public ActionResult Edit([ModelBinder(typeof (NHModelBinder))] EmployeeGroup group, FormCollection form)
        {
            if (ModelState.IsValid)
            {
                FillWeekDay(group.Options, form);
                FillSpecialWorkDay(group.Options, form);
                _attendanceFactory.GetEmployeeGroup().Update(group);
                return RedirectToAction("Index");
            }
            return View(group);
        }
    }
}