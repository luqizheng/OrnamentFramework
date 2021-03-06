using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ornament.MemberShip;
using Ornament.MemberShip.MemberShipProviders;

namespace MemberShip.Test
{
    /// <summary>
    ///     This is a test class for UserTest and is intended
    ///     to contain all UserTest Unit Tests
    /// </summary>
    [TestClass]
    public class UserTest
    {
        /// <summary>
        ///     Gets or sets the test context which provides
        ///     information about and functionality for the current test run.
        /// </summary>
        public TestContext TestContext { get; set; }

        /// <summary>
        ///     A test for UpdateTime
        /// </summary>
        [TestMethod]
        public void UpdateTimeTest()
        {
            var target = new User("okok");
            DateTime? actual;
            actual = target.Other.UpdateTime;
            Assert.IsNull(target.Other.UpdateTime);
        }


        /// <summary>
        ///     A test for Phone
        /// </summary>
        [TestMethod]
        public void PhoneTest()
        {
            var target = new User("kkkkk");
            string expected = "ok";
            string actual;
            target.Contact.Phone = expected;
            actual = target.Contact.Phone;
            Assert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void LoginIdValidation()
        {
            var t = new User("用中文，看看会不会死", "kdjfkdj");
            t.Contact.Email = "kjfkdjf";
            var context = new ValidationContext(t, null, null);
            var colleection = new List<ValidationResult>();
            var result = Validator.TryValidateObject(t, context, colleection, true);

            Assert.IsFalse(result);
        }

        /// <summary>
        ///     A test for PasswordQuestion
        /// </summary>
        [TestMethod]
        public void PasswordQuestionTest()
        {
            var target = new User("kkkkk");
            const string expected = "theQuestion";
            target.Security.SetQuestionAndAnswer(expected, "answer");
            string actual = target.Security.PasswordQuestion;
            Assert.AreEqual(expected, actual);
        }

        /// <summary>
        ///     A test for PasswordAnswer
        /// </summary>
        [TestMethod]
        public void PasswordAnswerTest()
        {
            var target = new User("kkkkk");
            const string expected = "theAnswer";
            target.Security.SetQuestionAndAnswer("question", expected);
            Assert.IsTrue(target.Security.AnswertIsCorrect(expected));
        }

        [TestMethod, ExpectedException(typeof(ArgumentNullException))]
        public void AnswertIsCorrect_Test_nullException()
        {
            var target = new User("kkkkk");
            const string expected = "theAnswer";
            target.Security.SetQuestionAndAnswer("question", expected);
            Assert.IsTrue(target.Security.AnswertIsCorrect(null));
        }

        /// <summary>
        ///     A test for Password
        /// </summary>
        [TestMethod]
        public void PasswordTest()
        {
            var target = new User("kkkkk", "12345678910");
            string actual = target.Security.Password;
            Assert.AreEqual(target.Security.Password, actual);
        }


        /// <summary>
        ///     A test for Name
        /// </summary>
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
        ///     A test for LastPasswordChangedDate
        /// </summary>
        [TestMethod]
        public void LastPasswordChangedDateTest()
        {
            var target = new User("kkkkk", "123456");
            Assert.IsNull(target.Security.LastPasswordChangedDate);
            target.Security.ChangePassword("654321", "123456");
            DateTime? actual;
            actual = target.Security.LastPasswordChangedDate;
            Assert.IsNotNull(target.Security.LastPasswordChangedDate);
        }

        /// <summary>
        ///     A test for LastLoginDate
        /// </summary>
        [TestMethod]
        public void LastLoginDateTest()
        {
            var target = new User("kkkkk", "123456");

            Assert.IsNull(target.Security.LastLoginDate);
            string message;
            target.Security.ValidateUser("123456", out message);

            DateTime? actual;
            actual = target.Security.LastLoginDate;

            Assert.IsNotNull(actual);
        }

        /// <summary>
        ///     A test for LastLockoutDate
        /// </summary>
        [TestMethod]
        public void LastLockoutDateTest()
        {
            var target = new User("kkkkk");
            string message;
            for (int i = 0; i < 5; i++)
            {
                target.Security.ValidateUser("incorrect-pwd", out message);
            }

            DateTime? actual;
            actual = target.Security.LastLockoutDate;
            Assert.AreNotEqual(DateTime.MinValue, actual.Value);
        }

        /// <summary>
        ///     A test for LastActivityDate
        /// </summary>
        [TestMethod]
        public void LastActivityDateTest()
        {
            var target = new User("kkkkk");
            var expected = new DateTime?();
            DateTime? actual;
            target.Other.LastActivityDate = expected;
            actual = target.Other.LastActivityDate;
            Assert.AreEqual(expected, actual);
        }

        /// <summary>
        ///     A test for IsLockout
        /// </summary>
        [TestMethod]
        public void IsLockoutTest()
        {
            var target = new User("kkkkk");
            string message;
            for (int i = 0; i < 5; i++)
            {
                target.Security.ValidateUser("incorrect-pwd", out message);
            }

            Assert.AreEqual(true, target.Security.IsLocked);
        }


        /// <summary>
        ///     A test for Email
        /// </summary>
        [TestMethod]
        public void EmailTest()
        {
            var target = new User("kkkkk");
            string expected = "abc@abc.com";
            string actual;
            target.Contact.Email = expected;
            actual = target.Contact.Email;
            Assert.AreEqual(expected, actual);
        }


        /// <summary>
        ///     A test for CreateTime
        /// </summary>
        [TestMethod]
        public void CreateTimeTest()
        {
            var target = new User("kkkkk");
            DateTime actual;
            actual = target.Other.CreateTime;
            Assert.IsNotNull(actual);
        }

        /// <summary>
        ///     A test for Comment
        /// </summary>
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
        ///     A test for Remove
        /// </summary>
        [TestMethod, ExpectedException(typeof(ArgumentNullException))]
        public void Remove_Null_UserGroup_Test()
        {
            var target = new User("kkkkk");
            UserGroup ug = null;
            target.UserGroups.Remove(ug);
        }


        /// <summary>
        ///     A test for GetUserGroups
        /// </summary>
        [TestMethod]
        public void GetUserGroupsTest()
        {
            var target = new User("kkkkk");
            var expected = new ReadOnlyCollection<UserGroup>(new List<UserGroup>());

            Iesi.Collections.Generic.ISet<UserGroup> actual = target.UserGroups;
            Assert.AreEqual(expected.Count
                , actual.Count);
        }


        /// <summary>
        ///     A test for ClearUserGroup
        /// </summary>
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
        ///     A test for ChangePasswordByAnswer
        /// </summary>
        [TestMethod]
        public void ChangePasswordByAnswerTest()
        {
            var target = new User("kkkkk", "123456");
            string answer = "hehehe";
            target.Security.SetQuestionAndAnswer("question", answer);
            string newPassword = "654321";
            target.Security.ChangePasswordByAnswer(answer, newPassword);
            Assert.AreEqual("654321", target.Security.Password);
        }

        [TestMethod, ExpectedException(typeof(ArgumentNullException), "Password Answer is requested")]
        public void ChangePasswordByAnswer_AnswerIsNull()
        {
            var target = new User("kkkkk", "123456");
            const string answer = null;
            const string newPassword = "654321";
            target.Security.ChangePasswordByAnswer(answer, newPassword);
        }

        [TestMethod, ExpectedException(typeof(MemberShipPermissionException), "answer is not correct")]
        public void ChangePasswordByAnswer_AnswerIsNotCorrect()
        {
            var target = new User("kkkkk", "123456");
            target.Security.SetQuestionAndAnswer("question", "answer");
            string answer = "error_answer";
            string newPassword = "654321";
            target.Security.ChangePasswordByAnswer(answer, newPassword);
        }

        [TestMethod, ExpectedException(typeof(MemberShipPermissionException), "Password Answer of user is not setting")
        ]
        public void ChangePasswordByAnswer_NotInitAnswerAndQuestion()
        {
            var target = new User("kkkkk", "123456");
            string answer = "error_answer";
            string newPassword = "654321";
            target.Security.ChangePasswordByAnswer(answer, newPassword);
        }

        /// <summary>
        ///     A test for ChangePassword
        /// </summary>
        [TestMethod]
        public void ChangePasswordTest()
        {
            const string oldPassword = "123456";
            var target = new User("kkkkk", oldPassword);
            const string newPassword = "654321";

            bool expected = true;
            bool actual;
            actual = target.Security.ChangePassword(newPassword, oldPassword);
            Assert.AreEqual(expected, actual);
            Assert.AreEqual(newPassword, target.Security.Password);
        }

        [TestMethod]
        public void ChangePasswordTest_OldPasswordIncorrect()
        {
            const string oldPassword = "123456";
            var target = new User("kkkkk", oldPassword);
            const string newPassword = "654321";

            bool expected = false;
            bool actual;
            actual = target.Security.ChangePassword(newPassword, "errorOldPassword");
            Assert.AreEqual(expected, actual);
        }

        /// <summary>
        ///     A test for ValidateUser
        /// </summary>
        [TestMethod]
        public void CanLoginTest()
        {
            var target = new User("kkkkk", "123456");
            string inputPassword = "123456";
            string message;

            ValidateUserResult actual = target.Security.ValidateUser(inputPassword, out message);
            Assert.AreEqual(ValidateUserResult.Success, actual);

            Assert.AreEqual(ValidateUserResult.InvalidatePasswordOrAccount,
                target.Security.ValidateUser("error_password", out message));
        }

        [TestMethod, ExpectedException(typeof(ArgumentNullException))]
        public void SetQuestionAndAsnwerTest_Answer_null()
        {
            var target = new User("kkkkk", "123456");
            string answer = "";
            string password = "password";
            target.Security.SetQuestionAndAnswer(answer, password);
        }

        [TestMethod, ExpectedException(typeof(ArgumentNullException))]
        public void SetQuestionAndAsnwerTest_Question_null()
        {
            var target = new User("kkkkk", "123456");
            string answer = "answer";
            string password = "";
            target.Security.SetQuestionAndAnswer(answer, password);
        }

        [TestMethod]
        public void CanLoginTest_Lockout()
        {
            var target = new User("kkkkk", "123456");
            string message;
            for (int i = 0; i < 31; i++)
            {
                target.Security.ValidateUser("incorrect-pwd", out message);
            }

            string inputPassword = "123456";

            ValidateUserResult actual = target.Security.ValidateUser(inputPassword, out message);
            Assert.AreEqual(ValidateUserResult.MaxInValidatePasswordAttempt, actual);
        }


        [TestMethod, ExpectedException(typeof(ArgumentNullException))]
        public void CanLoginTest_checking_password_is_empty()
        {
            var target = new User("kkkkk", "123456");
            string message = "";
            target.Security.ValidateUser(null, out message);
        }

        /// <summary>
        ///     A test for Add
        /// </summary>
        [TestMethod]
        public void Add_Remove_UserGroup()
        {
            var target = new User("kkkkk");
            var ug = new UserGroup("usergroup2");
            Assert.IsTrue(target.UserGroups.Add(ug));

            Iesi.Collections.Generic.ISet<UserGroup> s = target.UserGroups;
            Assert.IsTrue(s.Contains(ug));

            target.UserGroups.Remove(ug);
            s = target.UserGroups;
            Assert.IsFalse(s.Contains(ug));

            target.UserGroups.Remove(ug);
        }

        /// <summary>
        /// </summary>
        [TestMethod, ExpectedException(typeof(ArgumentNullException))]
        public void Add_Null_UserGroup()
        {
            var target = new User("kkkkk");
            target.Roles.Add(null);
        }


        /// <summary>
        ///     A test for User Constructor
        /// </summary>
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
        ///     A test for User Constructor
        /// </summary>
        [TestMethod]
        public void UserConstructorTest()
        {
            const string loginId = "newuser";
            var target = new User(loginId);
            Assert.AreEqual(loginId, target.LoginId);
        }

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
        [ClassInitialize]
        public static void MyClassInitialize(TestContext testContext)
        {
            User.ValidateUserPolicy = new ValidateUserPolicy(new MembershipContextProvider())
            {
                MaxInvalidPasswordAttempts = 3
            };
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
    }
}