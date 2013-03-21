﻿using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.MVCWebFrame.Areas.Attendance.Models;
using Qi.Attendance;
using Qi.Attendance.Dao;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Attendance.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly IAttendanceFactory _attendanceFactory;

        public EmployeeController(IAttendanceFactory attendanceFactory)
        {
            _attendanceFactory = attendanceFactory;
        }

        //
        // GET: /Attendance/Employee/employeeGroupId
        [Session]
        public ActionResult Index(string employeeGroupId)
        {
            IList<Employee> all = _attendanceFactory.GetEmployeeDao().GetAll();
            return View(all);
        }

        public ActionResult Create()
        {
            ViewBag.Groups = _attendanceFactory.GetEmployeeGroup().GetAll();
            return View();
        }

        [HttpPost, Session(Transaction = true)]
        public ActionResult Create([ModelBinder(typeof(NHModelBinder))]Employee employee)
        {
            if (ModelState.IsValid)
            {
                _attendanceFactory.GetEmployeeDao().SaveOrUpdate(employee);
                return RedirectToAction("Index");
            }
            ViewBag.Groups = _attendanceFactory.GetEmployeeGroup().GetAll();
            return View(employee);
        }

        public ActionResult Edit(string id)
        {
            ViewBag.Groups = _attendanceFactory.GetEmployeeGroup().GetAll();
            return View(_attendanceFactory.GetEmployeeDao().Get(new Guid(id)));
        }

        [Session(Transaction = true), HttpPost]
        public ActionResult Edit([ModelBinder(typeof(NHModelBinder))] Employee employee)
        {
            if (ModelState.IsValid)
            {
                _attendanceFactory.GetEmployeeDao().SaveOrUpdate(employee);
                return RedirectToAction("Index");
            }
            ViewBag.Groups = _attendanceFactory.GetEmployeeGroup().GetAll();
            return View(employee);
        }

        public ActionResult Cards(Guid id)
        {
            var employee = _attendanceFactory.GetEmployeeDao().Get(id);
            var cards = _attendanceFactory.GetCardDao().GetEmployeeCards(employee);
            return View(new CardModelList()
                {
                    Cards = CardModel.Paser(cards),
                    Employee = employee
                });
        }
        [HttpPost, Session(Transaction = true)]
        public ActionResult Cards(CardModelList cardModelList)
        {
            return View(cardModelList);
        }
    }
}