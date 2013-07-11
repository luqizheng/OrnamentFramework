using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Profile;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Qi.NHibernateExtender;

namespace Ornament.Web.MemberShips
{
    public class OrnamentProfileProvider : ProfileProvider
    {
        private IMemberShipFactory _memberShip;

        public OrnamentProfileProvider(IMemberShipFactory memberShip)
        {
            _memberShip = memberShip;
        }

        public OrnamentProfileProvider()
        {
        }

        private IMemberShipFactory MemberShipFactory
        {
            get { return _memberShip ?? (_memberShip = OrnamentContext.DaoFactory.MemberShipFactory); }
            set { _memberShip = value; }
        }

        /// <summary>
        ///     Gets or sets the name of the currently running application.
        /// </summary>
        /// <returns>
        ///     A <see cref="T:System.String"></see> that contains the application's shortened name, which does not contain a full path or extension, for example, SimpleAppSettings.
        /// </returns>
        /// <filterpriority>2</filterpriority>
        public override string ApplicationName { get; set; }

        /// <summary>
        ///     When overridden in a derived class, deletes profile properties and information for the supplied list of profiles.
        /// </summary>
        /// <returns>
        ///     The number of profiles deleted from the data source.
        /// </returns>
        /// <param name="profiles">
        ///     A <see cref="T:System.Web.Profile.ProfileInfoCollection"></see>  of information about profiles that are to be deleted.
        /// </param>
        public override int DeleteProfiles(ProfileInfoCollection profiles)
        {
            SessionWrapper wrapper =
                SessionManager.GetSessionWrapper();
            bool openCurrent = wrapper.InitSession();
            try
            {
                var userName = new string[profiles.Count];
                int i = 0;
                foreach (ProfileInfo info in profiles)
                {
                    userName[i] = info.UserName;
                    i++;
                }
                return MemberShipFactory.CreateProfileDao().Delete(userName);
            }
            finally
            {
                if (openCurrent)
                {
                    wrapper.Close(true);
                }
            }
        }

        /// <summary>
        ///     When overridden in a derived class, deletes profile properties and information for profiles that match the supplied list of user names.
        /// </summary>
        /// <returns>
        ///     The number of profiles deleted from the data source.
        /// </returns>
        /// <param name="usernames">A string array of user names for profiles to be deleted.</param>
        public override int DeleteProfiles(string[] usernames)
        {
            SessionWrapper sessionWrapper = SessionManager.GetSessionWrapper();
            bool opened = sessionWrapper.InitSession();
            try
            {
                return MemberShipFactory.CreateProfileDao().Delete(usernames);
            }

            finally
            {
                if (opened)
                {
                    sessionWrapper.Close(true);
                }
            }
        }

        /// <summary>
        ///     When overridden in a derived class, deletes all user-profile data for profiles in which the last activity date occurred before the specified date.
        /// </summary>
        /// <returns>
        ///     The number of profiles deleted from the data source.
        /// </returns>
        /// <param name="authenticationOption">
        ///     One of the <see cref="T:System.Web.Profile.ProfileAuthenticationOption"></see> values, specifying whether anonymous, authenticated, or both types of profiles are deleted.
        /// </param>
        /// <param name="userInactiveSinceDate">
        ///     A <see cref="T:System.DateTime"></see> that identifies which user profiles are considered inactive. If the
        ///     <see
        ///         cref="P:System.Web.Profile.ProfileInfo.LastActivityDate">
        ///     </see>
        ///     value of a user profile occurs on or before this date and time, the profile is considered inactive.
        /// </param>
        public override int DeleteInactiveProfiles(ProfileAuthenticationOption authenticationOption,
                                                   DateTime userInactiveSinceDate)
        {
            SessionWrapper sessionWrapper = SessionManager.GetSessionWrapper();
            bool opened = sessionWrapper.InitSession();
            try
            {
                switch (authenticationOption)
                {
                    case ProfileAuthenticationOption.Anonymous:
                        return
                            MemberShipFactory.CreateProfileDao().DeleteAnonymous(
                                userInactiveSinceDate);
                    case ProfileAuthenticationOption.Authenticated:
                        return
                            MemberShipFactory.CreateProfileDao().DeleteAuthenticated(
                                userInactiveSinceDate);
                    default:
                        return MemberShipFactory.CreateProfileDao().Delete(userInactiveSinceDate);
                }
            }
            finally
            {
                if (opened)
                {
                    sessionWrapper.Close(true);
                }
            }
        }

        /// <summary>
        ///     When overridden in a derived class, returns the number of profiles in which the last activity date occurred on or before the specified date.
        /// </summary>
        /// <returns>
        ///     The number of profiles in which the last activity date occurred on or before the specified date.
        /// </returns>
        /// <param name="authenticationOption">
        ///     One of the <see cref="T:System.Web.Profile.ProfileAuthenticationOption"></see> values, specifying whether anonymous, authenticated, or both types of profiles are returned.
        /// </param>
        /// <param name="userInactiveSinceDate">
        ///     A <see cref="T:System.DateTime"></see> that identifies which user profiles are considered inactive. If the
        ///     <see
        ///         cref="P:System.Web.Profile.ProfileInfo.LastActivityDate">
        ///     </see>
        ///     of a user profile occurs on or before this date and time, the profile is considered inactive.
        /// </param>
        public override int GetNumberOfInactiveProfiles(ProfileAuthenticationOption authenticationOption,
                                                        DateTime userInactiveSinceDate)
        {
            SessionWrapper sessionWrapper = SessionManager.GetSessionWrapper();
            bool opened = sessionWrapper.InitSession();
            try
            {
                switch (authenticationOption)
                {
                    case ProfileAuthenticationOption.Anonymous:
                        return
                            MemberShipFactory.CreateProfileDao().CountAnonymous(userInactiveSinceDate);
                    case ProfileAuthenticationOption.Authenticated:
                        return
                            MemberShipFactory.CreateProfileDao().CountAuthenticated(
                                userInactiveSinceDate);
                    default:
                        return MemberShipFactory.CreateProfileDao().Count(userInactiveSinceDate);
                }
            }
            finally
            {
                if (opened)
                {
                    sessionWrapper.Close(true);
                }
            }
        }

        /// <summary>
        ///     When overridden in a derived class, retrieves user profile data for all profiles in the data source.
        /// </summary>
        /// <returns>
        ///     A <see cref="T:System.Web.Profile.ProfileInfoCollection"></see> containing user-profile information for all profiles in the data source.
        /// </returns>
        /// <param name="authenticationOption">
        ///     One of the <see cref="T:System.Web.Profile.ProfileAuthenticationOption"></see> values, specifying whether anonymous, authenticated, or both types of profiles are returned.
        /// </param>
        /// <param name="totalRecords">When this method returns, contains the total number of profiles.</param>
        /// <param name="pageIndex">The index of the page of results to return.</param>
        /// <param name="pageSize">The size of the page of results to return.</param>
        public override ProfileInfoCollection GetAllProfiles(ProfileAuthenticationOption authenticationOption,
                                                             int pageIndex, int pageSize, out int totalRecords)
        {
            SessionWrapper sessionWrapper = SessionManager.GetSessionWrapper();
            bool opened = sessionWrapper.InitSession();
            try
            {
                IList<ProfileValue> users;
                switch (authenticationOption)
                {
                    case ProfileAuthenticationOption.Anonymous:
                        users =
                            MemberShipFactory.CreateProfileDao().GetAllAnonymous(pageIndex, pageSize,
                                                                                 out totalRecords);
                        break;
                    case ProfileAuthenticationOption.Authenticated:
                        users =
                            MemberShipFactory.CreateProfileDao().GetAllAuthenticated(pageIndex,
                                                                                     pageSize,
                                                                                     out totalRecords);
                        break;
                    default:
                        users = MemberShipFactory.CreateProfileDao().GetAll(pageIndex, pageSize,
                                                                            out totalRecords);
                        break;
                }
                var result = new ProfileInfoCollection();
                foreach (ProfileValue userProfile in users)
                {
                    result.Add(ToProfileInfo(userProfile));
                }
                return result;
            }
            finally
            {
                if (opened)
                {
                    sessionWrapper.Close(true);
                }
            }
        }

        private static ProfileInfo ToProfileInfo(ProfileValue profileValue)
        {
            SessionWrapper sessionWrapper = SessionManager.GetSessionWrapper();
            bool opened = sessionWrapper.InitSession();
            try
            {
                var reuslt =
                    new ProfileInfo(profileValue.LoginId, profileValue.IsAnonymous, profileValue.LastActivityDate.Value,
                                    profileValue.LastActivityDate.Value,
                                    0);
                return reuslt;
            }
            finally
            {
                if (opened)
                {
                    sessionWrapper.Close(true);
                }
            }
        }

        /// <summary>
        ///     When overridden in a derived class, retrieves user-profile data from the data source for profiles in which the last activity date occurred on or before the specified date.
        /// </summary>
        /// <returns>
        ///     A <see cref="T:System.Web.Profile.ProfileInfoCollection"></see> containing user-profile information about the inactive profiles.
        /// </returns>
        /// <param name="authenticationOption">
        ///     One of the <see cref="T:System.Web.Profile.ProfileAuthenticationOption"></see> values, specifying whether anonymous, authenticated, or both types of profiles are returned.
        /// </param>
        /// <param name="userInactiveSinceDate">
        ///     A <see cref="T:System.DateTime"></see> that identifies which user profiles are considered inactive. If the
        ///     <see
        ///         cref="P:System.Web.Profile.ProfileInfo.LastActivityDate">
        ///     </see>
        ///     of a user profile occurs on or before this date and time, the profile is considered inactive.
        /// </param>
        /// <param name="totalRecords">When this method returns, contains the total number of profiles.</param>
        /// <param name="pageIndex">The index of the page of results to return.</param>
        /// <param name="pageSize">The size of the page of results to return.</param>
        public override ProfileInfoCollection GetAllInactiveProfiles(ProfileAuthenticationOption authenticationOption,
                                                                     DateTime userInactiveSinceDate, int pageIndex,
                                                                     int pageSize, out int totalRecords)
        {
            SessionWrapper sessionWrapper = SessionManager.GetSessionWrapper();
            bool opened = sessionWrapper.InitSession();
            try
            {
                var infos = new ProfileInfoCollection();
                IQueryable<ProfileValue> profiles =
                    from profile in
                        MemberShipFactory.Profiles.Take(pageSize).Skip(pageIndex*pageSize)
                    where profile.LastActivityDate < userInactiveSinceDate
                    select profile;
                totalRecords =
                    (from profile in
                         MemberShipFactory.Profiles.Take(pageSize).Skip(pageIndex*pageSize)
                     where profile.LastActivityDate < userInactiveSinceDate
                     select profile).Count();


                foreach (ProfileValue prof in profiles)
                {
                    User u = MemberShipFactory.CreateUserDao().GetByLoginId(prof.LoginId);
                    infos.Add(ToProfileInfo(prof));
                }
                return infos;
            }
            finally
            {
                if (opened)
                {
                    sessionWrapper.Close(true);
                }
            }
        }

        /// <summary>
        ///     When overridden in a derived class, retrieves profile information for profiles in which the user name matches the specified user names.
        /// </summary>
        /// <returns>
        ///     A <see cref="T:System.Web.Profile.ProfileInfoCollection"></see> containing user-profile information for profiles where the user name matches the supplied usernameToMatch parameter.
        /// </returns>
        /// <param name="authenticationOption">
        ///     One of the <see cref="T:System.Web.Profile.ProfileAuthenticationOption"></see> values, specifying whether anonymous, authenticated, or both types of profiles are returned.
        /// </param>
        /// <param name="totalRecords">When this method returns, contains the total number of profiles.</param>
        /// <param name="pageIndex">The index of the page of results to return.</param>
        /// <param name="usernameToMatch">The user name to search for.</param>
        /// <param name="pageSize">The size of the page of results to return.</param>
        public override ProfileInfoCollection FindProfilesByUserName(ProfileAuthenticationOption authenticationOption,
                                                                     string usernameToMatch, int pageIndex, int pageSize,
                                                                     out int totalRecords)
        {
            SessionWrapper sessionWrapper = SessionManager.GetSessionWrapper();
            bool opened = sessionWrapper.InitSession();
            try
            {
                return FindInactiveProfilesByUserName(authenticationOption, usernameToMatch, DateTime.MaxValue,
                                                      pageIndex,
                                                      pageSize, out totalRecords);
            }
            finally
            {
                if (opened)
                {
                    sessionWrapper.Close(true);
                }
            }
        }

        /// <summary>
        ///     When overridden in a derived class, retrieves profile information for profiles in which
        ///     the last activity date occurred on or before the specified date and the user name matches the specified user name.
        /// </summary>
        /// <returns>
        ///     A <see cref="T:System.Web.Profile.ProfileInfoCollection"></see> containing user profile information for inactive profiles where the user name matches the supplied usernameToMatch parameter.
        /// </returns>
        /// <param name="authenticationOption">
        ///     One of the <see cref="T:System.Web.Profile.ProfileAuthenticationOption"></see> values, specifying whether anonymous, authenticated, or both types of profiles are returned.
        /// </param>
        /// <param name="userInactiveSinceDate">
        ///     A <see cref="T:System.DateTime"></see> that identifies which user profiles are considered inactive. If the
        ///     <see
        ///         cref="P:System.Web.Profile.ProfileInfo.LastActivityDate">
        ///     </see>
        ///     value of a user profile occurs on or before this date and time, the profile is considered inactive.
        /// </param>
        /// <param name="totalRecords">When this method returns, contains the total number of profiles.</param>
        /// <param name="pageIndex">The index of the page of results to return.</param>
        /// <param name="usernameToMatch">The user name to search for.</param>
        /// <param name="pageSize">The size of the page of results to return.</param>
        public override ProfileInfoCollection FindInactiveProfilesByUserName(
            ProfileAuthenticationOption authenticationOption, string usernameToMatch, DateTime userInactiveSinceDate,
            int pageIndex, int pageSize, out int totalRecords)
        {
            SessionWrapper sessionWrapper = SessionManager.GetSessionWrapper();
            bool opened = sessionWrapper.InitSession();
            try
            {
                var infos = new ProfileInfoCollection();


                IQueryable<ProfileValue> profiles;
                switch (authenticationOption)
                {
                    case ProfileAuthenticationOption.All:
                        profiles = (from pf in MemberShipFactory.Profiles
                                    where
                                        pf.LastActivityDate < userInactiveSinceDate &&
                                        pf.LoginId.StartsWith(usernameToMatch)
                                    select pf);

                        totalRecords = (from pf in MemberShipFactory.Profiles
                                        where
                                            pf.LastActivityDate < userInactiveSinceDate &&
                                            pf.LoginId.StartsWith(usernameToMatch)
                                        select pf).Count();
                        break;
                    case ProfileAuthenticationOption.Anonymous:
                        profiles = (from pf in MemberShipFactory.Profiles
                                    where
                                        pf.LastActivityDate < userInactiveSinceDate &&
                                        pf.LoginId.StartsWith(usernameToMatch) && pf.IsAnonymous
                                    select pf);
                        totalRecords = (from pf in MemberShipFactory.Profiles
                                        where
                                            pf.LastActivityDate < userInactiveSinceDate &&
                                            pf.LoginId.StartsWith(usernameToMatch) && pf.IsAnonymous
                                        select pf).Count();
                        break;
                    default:
                        profiles = (from pf in MemberShipFactory.Profiles
                                    where
                                        pf.LastActivityDate < userInactiveSinceDate &&
                                        pf.LoginId.StartsWith(usernameToMatch) && pf.IsAnonymous == false
                                    select pf);
                        totalRecords = (from pf in MemberShipFactory.Profiles
                                        where
                                            pf.LastActivityDate < userInactiveSinceDate &&
                                            pf.LoginId.StartsWith(usernameToMatch) && pf.IsAnonymous == false
                                        select pf).Count();
                        break;
                }


                foreach (ProfileValue prof in profiles)
                {
                    User u = MemberShipFactory.CreateUserDao().GetByLoginId(prof.LoginId);
                    infos.Add(new ProfileInfo(u.Name, prof.IsAnonymous, u.OtherInfo.LastActivityDate.Value,
                                              prof.LastActivityDate.Value, 30));
                }

                return infos;
            }
            finally
            {
                if (opened)
                {
                    sessionWrapper.Close(true);
                }
            }
        }

        /// <summary>
        ///     Returns the collection of settings property values for the specified application instance and settings property group.
        /// </summary>
        /// <returns>
        ///     A <see cref="T:System.Configuration.SettingsPropertyValueCollection"></see> containing the values for the specified settings property group.
        /// </returns>
        /// <param name="context">
        ///     A <see cref="T:System.Configuration.SettingsContext"></see> describing the current application use.
        /// </param>
        /// <param name="collection">
        ///     A <see cref="T:System.Configuration.SettingsPropertyCollection"></see> containing the settings property group whose values are to be retrieved.
        /// </param>
        /// <filterpriority>2</filterpriority>
        public override SettingsPropertyValueCollection GetPropertyValues(SettingsContext context,
                                                                          SettingsPropertyCollection collection)
        {
            SessionWrapper sessionWrapper = SessionManager.GetSessionWrapper();
            bool opened = sessionWrapper.InitSession();
            IUserProfileDao profileDao = MemberShipFactory.CreateProfileDao();
            try
            {
                var result = new SettingsPropertyValueCollection();
                Dictionary<string, object> persisteProfileValue = null;
                string userName = LoginId(context);
                ProfileValue profileValue = profileDao.FindByLoginId(userName);
                if (profileValue != null)
                {
                    persisteProfileValue = profileValue.Properities;
                }
                foreach (SettingsProperty property in collection)
                {
                    var item = new SettingsPropertyValue(property);
                    if (persisteProfileValue != null && persisteProfileValue.ContainsKey(item.Name))
                    {
                        item.PropertyValue = persisteProfileValue[item.Name];
                    }
                    result.Add(item);
                }

                return result;
            }
            finally
            {
                if (opened)
                {
                    sessionWrapper.Close(true);
                }
            }
        }


        /// <summary>
        ///     Sets the values of the specified group of property settings.
        /// </summary>
        /// <param name="context">
        ///     A <see cref="T:System.Configuration.SettingsContext"></see> describing the current application usage.
        /// </param>
        /// <param name="collection">
        ///     A <see cref="T:System.Configuration.SettingsPropertyValueCollection"></see> representing the group of property settings to set.
        /// </param>
        /// <filterpriority>2</filterpriority>
        public override void SetPropertyValues(SettingsContext context, SettingsPropertyValueCollection collection)
        {
            SessionWrapper sessionWrapper = SessionManager.GetSessionWrapper();
            bool opened = sessionWrapper.InitSession();
            try
            {
                string userName = LoginId(context);
                IUserProfileDao profileDao = MemberShipFactory.CreateProfileDao();


                ProfileValue profileValue = profileDao.FindByLoginId(userName) ??
                                            new ProfileValue
                                                {
                                                    LastActivityDate = DateTime.Now,
                                                    IsAnonymous = !userIsAuthenticated(context),
                                                    LoginId = userName
                                                };
                foreach (SettingsPropertyValue settingsPropertyValue in collection)
                {
                    if (profileValue.Properities.ContainsKey(settingsPropertyValue.Name))
                        profileValue.Properities[settingsPropertyValue.Name] = settingsPropertyValue.PropertyValue;
                    else

                        profileValue.Properities.Add(settingsPropertyValue.Name, settingsPropertyValue.PropertyValue);
                }
                profileDao.SaveOrUpdate(profileValue);
            }
            finally
            {
                if (opened)
                {
                    sessionWrapper.Close(true);
                }
            }
        }

        private bool userIsAuthenticated(SettingsContext context)
        {
            return (bool) context["IsAuthenticated"];
        }

        private string LoginId(SettingsContext context)
        {
            return (string) context["UserName"];
        }
    }
}