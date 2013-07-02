using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Runtime.Remoting.Contexts;
using Iesi.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ornament.MemberShip;
using Ornament.MemberShip.MemberShipProviders;

namespace MemberShip.Test
{
    /// <summary>
    ///This is a test class for UserTest and is intended
    ///to contain all UserTest Unit Tests
    ///</summary>
    [TestClass]
    public class UserTest
    {
        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext { get; set; }
        public class MembershipContextProvider : IMemberShipProvider
        {
            public string Encrypt(string content)
            {
                return content;
            }

            public string Decrypt(string content)
            {
                return content;
            }
        }
        #region Additional test attributes

        // 
        //You can use the following additional attributes as you write your tests:
        //
        //Use ClassInitialize to run code before running the first test in the class
        [ClassInitialize()]
        public static void MyClassInitialize(TestContext testContext)
        {
            MembershipContext.Provider = new MembershipContextProvider();
        }
        //
        //Use ClassCleanup to run code after all tests in a class have run
        //[ClassCleanup()]
        //public static void MyClassCleanup()
        //{
        //}
        //
        //Use TestInitialize to run code before running each test
        //[TestInitialize()]
        //public void MyTestInitialize()
        //{
        //}
        //
        //Use TestCleanup to run code after each test has run
        //[TestCleanup()]
        //public void MyTestCleanup()
        //{
        //}
        //

        #endregion



        /// <summary>
        ///A test for UpdateTime
        ///</summary>
        [TestMethod]
        public void UpdateTimeTest()
        {
            var target = new User("okok");
            DateTime? actual;
            actual = target.UpdateTime;
            Assert.IsNull(target.UpdateTime);
        }




        /// <summary>
        ///A test for Phone
        ///</summary>
        [TestMethod]
        public void PhoneTest()
        {
            var target = new User("kkkkk");
            string expected = "ok";
            string actual;
            target.Phone = expected;
            actual = target.Phone;
            Assert.AreEqual(expected, actual);
        }

        /// <summary>
        ///A test for PasswordQuestion
        ///</summary>
        [TestMethod]
        public void PasswordQuestionTest()
        {
            var target = new User("kkkkk");
            const string expected = "theQuestion";
            target.SetQuestionAndAnswer(expected, "answer");
            string actual = target.PasswordQuestion;
            Assert.AreEqual(expected, actual);
        }

        /// <summary>
        ///A test for PasswordAnswer
        ///</summary>
        [TestMethod]
        public void PasswordAnswerTest()
        {
            var target = new User("kkkkk");
            const string expected = "theAnswer";
            target.SetQuestionAndAnswer("question", expected);
            Assert.IsTrue(target.AnswertIsCorrect(expected));
        }

        [TestMethod, ExpectedException(typeof(ArgumentNullException))]
        public void AnswertIsCorrect_Test_nullException()
        {
            var target = new User("kkkkk");
            const string expected = "theAnswer";
            target.SetQuestionAndAnswer("question", expected);
            Assert.IsTrue(target.AnswertIsCorrect(null));
        }

        /// <summary>
        ///A test for Password
        ///</summary>
        [TestMethod]
        public void PasswordTest()
        {
            var target = new User("kkkkk", "12345678910");
            string actual = target.Password;
            Assert.AreEqual(target.Password, actual);
        }


        /// <summary>
        ///A test for Name
        ///</summary>
        [TestMethod]
        public void NameTest()
        {
            var target = new User("kkkkk");
            string expected = "ppppp";
            string actual;
            target.Name = expected;
            actual = target.Name;
            Assert.AreEqual(expected, actual);
        }



        /// <summary>
        ///A test for LastPasswordChangedDate
        ///</summary>
        [TestMethod]
        public void LastPasswordChangedDateTest()
        {
            var target = new User("kkkkk", "123456");
            Assert.IsNull(target.LastPasswordChangedDate);
            target.ChangePassword("654321", "123456");
            DateTime? actual;
            actual = target.LastPasswordChangedDate;
            Assert.IsNotNull(target.LastPasswordChangedDate);
        }

        /// <summary>
        ///A test for LastLoginDate
        ///</summary>
        [TestMethod]
        public void LastLoginDateTest()
        {
            var target = new User("kkkkk", "123456");
            Assert.IsNull(target.LastLoginDate);

            target.ValidateUser("123456");
            DateTime? actual;
            actual = target.LastLoginDate;

            Assert.IsNotNull(actual);
        }

        /// <summary>
        ///A test for LastLockoutDate
        ///</summary>
        [TestMethod]
        public void LastLockoutDateTest()
        {
            var target = new User("kkkkk");
            target.IsLockout = true;
            DateTime? actual;
            actual = target.LastLockoutDate;
            Assert.AreNotEqual(DateTime.MinValue, actual.Value);
        }

        /// <summary>
        ///A test for LastActivityDate
        ///</summary>
        [TestMethod]
        public void LastActivityDateTest()
        {
            var target = new User("kkkkk");
            var expected = new DateTime?();
            DateTime? actual;
            target.LastActivityDate = expected;
            actual = target.LastActivityDate;
            Assert.AreEqual(expected, actual);
        }

        /// <summary>
        ///A test for IsLockout
        ///</summary>
        [TestMethod]
        public void IsLockoutTest()
        {
            var target = new User("kkkkk");
            bool expected = true;
            bool actual;
            target.IsLockout = expected;
            actual = target.IsLockout;
            Assert.AreEqual(expected, actual);
        }

        /// <summary>
        ///A test for IsApproved
        ///</summary>
        [TestMethod]
        public void IsApprovedTest()
        {
            var target = new User("kkkkk");
            bool expected = true;
            bool actual;
            target.IsApproved = expected;
            actual = target.IsApproved;
            Assert.AreEqual(expected, actual);
        }

        /// <summary>
        ///A test for Email
        ///</summary>
        [TestMethod]
        public void EmailTest()
        {
            var target = new User("kkkkk");
            string expected = "abc@abc.com";
            string actual;
            target.Email = expected;
            actual = target.Email;
            Assert.AreEqual(expected, actual);
        }



        /// <summary>
        ///A test for CreateTime
        ///</summary>
        [TestMethod]
        public void CreateTimeTest()
        {
            var target = new User("kkkkk");
            DateTime actual;
            actual = target.CreateTime;
            Assert.IsNotNull(actual);
        }

        /// <summary>
        ///A test for Comment
        ///</summary>
        [TestMethod]
        public void CommentTest()
        {
            var target = new User("kkkkk");
            string expected = "Comment";
            string actual;
            target.Remarks = expected;
            actual = target.Remarks;
            Assert.AreEqual(expected, actual);
        }

        /// <summary>
        ///A test for Remove
        ///</summary>
        [TestMethod, ExpectedException(typeof(ArgumentNullException))]
        public void Remove_Null_UserGroup_Test()
        {
            var target = new User("kkkkk");
            UserGroup ug = null;
            target.UserGroups.Remove(ug);
        }



        /// <summary>
        ///A test for GetUserGroups
        ///</summary>
        [TestMethod]
        public void GetUserGroupsTest()
        {
            var target = new User("kkkkk");
            var expected = new ReadOnlyCollection<UserGroup>(new List<UserGroup>());
            
            var actual = target.UserGroups;
            Assert.AreEqual(expected.Count
                            , actual.Count);
        }


        /// <summary>
        ///A test for ClearUserGroup
        ///</summary>
        [TestMethod]
        public void ClearUserGroupTest()
        {
            var target = new User("kkkkk");
            target.UserGroups.Add(new UserGroup("userGroup"));
            Assert.AreEqual(1, target.UserGroups.Count);
            target.UserGroups.Clear();
            Assert.AreEqual(0, target.UserGroups.Count);
        }

        /// <summary>
        ///A test for ChangePasswordByAnswer
        ///</summary>
        [TestMethod]
        public void ChangePasswordByAnswerTest()
        {
            var target = new User("kkkkk", "123456");
            string answer = "hehehe";
            target.SetQuestionAndAnswer("question", answer);
            string newPassword = "654321";
            target.ChangePasswordByAnswer(answer, newPassword);
            Assert.AreEqual("654321", target.Password);
        }

        [TestMethod, ExpectedException(typeof(ArgumentNullException), "Password Answer is requested")]
        public void ChangePasswordByAnswer_AnswerIsNull()
        {
            var target = new User("kkkkk", "123456");
            const string answer = null;
            const string newPassword = "654321";
            target.ChangePasswordByAnswer(answer, newPassword);
        }

        [TestMethod, ExpectedException(typeof(MemberShipPermissionException), "answer is not correct")]
        public void ChangePasswordByAnswer_AnswerIsNotCorrect()
        {
            var target = new User("kkkkk", "123456");
            target.SetQuestionAndAnswer("question", "answer");
            string answer = "error_answer";
            string newPassword = "654321";
            target.ChangePasswordByAnswer(answer, newPassword);
        }

        [TestMethod, ExpectedException(typeof(MemberShipPermissionException), "Password Answer of user is not setting")
        ]
        public void ChangePasswordByAnswer_NotInitAnswerAndQuestion()
        {
            var target = new User("kkkkk", "123456");
            string answer = "error_answer";
            string newPassword = "654321";
            target.ChangePasswordByAnswer(answer, newPassword);
        }

        /// <summary>
        ///A test for ChangePassword
        ///</summary>
        [TestMethod]
        public void ChangePasswordTest()
        {
            const string oldPassword = "123456";
            var target = new User("kkkkk", oldPassword);
            const string newPassword = "654321";

            bool expected = true;
            bool actual;
            actual = target.ChangePassword(newPassword, oldPassword);
            Assert.AreEqual(expected, actual);
            Assert.AreEqual(newPassword, target.Password);
        }

        [TestMethod]
        public void ChangePasswordTest_OldPasswordIncorrect()
        {
            const string oldPassword = "123456";
            var target = new User("kkkkk", oldPassword);
            const string newPassword = "654321";

            bool expected = false;
            bool actual;
            actual = target.ChangePassword(newPassword, "errorOldPassword");
            Assert.AreEqual(expected, actual);
        }

        /// <summary>
        ///A test for ValidateUser
        ///</summary>
        [TestMethod]
        public void CanLoginTest()
        {
            var target = new User("kkkkk", "123456");
            string inputPassword = "123456";
            bool expected = true;
            bool actual;
            actual = target.ValidateUser(inputPassword);
            Assert.AreEqual(expected, actual);

            Assert.IsFalse(target.ValidateUser("error_password"));
        }

        [TestMethod, ExpectedException(typeof(ArgumentNullException))]
        public void SetQuestionAndAsnwerTest_Answer_null()
        {
            var target = new User("kkkkk", "123456");
            string answer = "";
            string password = "password";
            target.SetQuestionAndAnswer(answer, password);
        }

        [TestMethod, ExpectedException(typeof(ArgumentNullException))]
        public void SetQuestionAndAsnwerTest_Question_null()
        {
            var target = new User("kkkkk", "123456");
            string answer = "answer";
            string password = "";
            target.SetQuestionAndAnswer(answer, password);
        }

        [TestMethod]
        [ExpectedException(typeof(MemberShipException), "User is locked.")]
        public void CanLoginTest_Lockout()
        {
            var target = new User("kkkkk", "123456") { IsLockout = true };

            string inputPassword = "123456";

            bool expected = false;
            bool actual;
            actual = target.ValidateUser(inputPassword);
            Assert.AreEqual(expected, actual);
        }

        [TestMethod]
        [ExpectedException(typeof(MemberShipException), "User isn't approved.")]
        public void CanLoginTest_Unapproved()
        {
            var target = new User("kkkkk", "123456") { IsApproved = false };
            const string inputPassword = "123456";
            const bool expected = false;
            bool actual = target.ValidateUser(inputPassword);
            Assert.AreEqual(expected, actual);
        }

        [TestMethod, ExpectedException(typeof(ArgumentNullException))]
        public void CanLoginTest_checking_password_is_empty()
        {
            var target = new User("kkkkk", "123456");
            target.ValidateUser(null);
        }

        /// <summary>
        ///A test for Add
        ///</summary>
        [TestMethod]
        public void Add_Remove_UserGroup()
        {
            var target = new User("kkkkk");
            var ug = new UserGroup("usergroup2");
            Assert.IsTrue(target.UserGroups.Add(ug));

            var s = target.UserGroups;
            Assert.IsTrue(s.Contains(ug));

            target.UserGroups.Remove(ug);
            s = target.UserGroups;
            Assert.IsFalse(s.Contains(ug));

            target.UserGroups.Remove(ug);
        }

        /// <summary>
        /// 
        /// </summary>
        [TestMethod, ExpectedException(typeof(ArgumentNullException))]
        public void Add_Null_UserGroup()
        {
            var target = new User("kkkkk");
            target.Roles.Add(null);
        }


        /// <summary>
        ///A test for User Constructor
        ///</summary>
        [TestMethod]
        public void UserConstructorTest1()
        {
            const string loginId = "loginid";
            const string password = "password";
            var target = new User(loginId, password);
            Assert.AreEqual(loginId, target.LoginId);
            Assert.AreEqual(password, password);
        }

        /// <summary>
        ///A test for User Constructor
        ///</summary>
        [TestMethod]
        public void UserConstructorTest()
        {
            const string loginId = "newuser";
            var target = new User(loginId);
            Assert.AreEqual(loginId, target.LoginId);
        }
    }
}