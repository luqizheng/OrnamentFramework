﻿//------------------------------------------------------------------------------
// <auto-generated>
//     此代码由工具生成。
//     运行时版本:4.0.30319.18052
//
//     对此文件的更改可能会导致不正确的行为，并且如果
//     重新生成代码，这些更改将会丢失。
// </auto-generated>
//------------------------------------------------------------------------------

namespace Ornament.Properties {
    using System;
    
    
    /// <summary>
    ///   一个强类型的资源类，用于查找本地化的字符串等。
    /// </summary>
    // 此类是由 StronglyTypedResourceBuilder
    // 类通过类似于 ResGen 或 Visual Studio 的工具自动生成的。
    // 若要添加或移除成员，请编辑 .ResX 文件，然后重新运行 ResGen
    // (以 /str 作为命令选项)，或重新生成 VS 项目。
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "4.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    public class Resources {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal Resources() {
        }
        
        /// <summary>
        ///   返回此类使用的缓存的 ResourceManager 实例。
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("Ornament.Properties.Resources", typeof(Resources).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   使用此强类型资源类，为所有资源查找
        ///   重写当前线程的 CurrentUICulture 属性。
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   查找类似 Please input confirm password. 的本地化字符串。
        /// </summary>
        public static string alert_Require_ConfirmPassword {
            get {
                return ResourceManager.GetString("alert_Require_ConfirmPassword", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Password doesn&apos;t match the confirmation. 的本地化字符串。
        /// </summary>
        public static string alertMsg_Confirm_Password_Not_Equal_New_password {
            get {
                return ResourceManager.GetString("alertMsg_Confirm_Password_Not_Equal_New_password", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 This email has been used by another user. 的本地化字符串。
        /// </summary>
        public static string alertMsg_duplicate_Email {
            get {
                return ResourceManager.GetString("alertMsg_duplicate_Email", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Logind is exist, please choice another one. 的本地化字符串。
        /// </summary>
        public static string alertMsg_duplicate_loginId {
            get {
                return ResourceManager.GetString("alertMsg_duplicate_loginId", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Current Password isn&apos;t right. 的本地化字符串。
        /// </summary>
        public static string alertMsg_OldPasswordNotRight {
            get {
                return ResourceManager.GetString("alertMsg_OldPasswordNotRight", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Password is too short (minimum is {0} characters). 的本地化字符串。
        /// </summary>
        public static string alertMsg_Password_length_not_right {
            get {
                return ResourceManager.GetString("alertMsg_Password_length_not_right", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Assign Roles 的本地化字符串。
        /// </summary>
        public static string AssignRoles {
            get {
                return ResourceManager.GetString("AssignRoles", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
        ///&lt;Content xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;&gt;
        ///  &lt;Subject&gt;关键信息被修改&lt;/Subject&gt;
        ///  &lt;Value&gt;
        ///    &lt;![CDATA[
        ///    &lt;p&gt;亲爱的[name]用户:
        ///
        ///    &lt;p&gt;  你已经在XXX系统修改了[content].
        ///
        ///  
        ///    &lt;p&gt;账号信息
        ///   &lt;p&gt; 登录Id:[loginId]  
        ///    
        ///
        ///   &lt;p&gt; 管理员
        /// ]]&gt;&lt;/Value&gt;
        ///&lt;/Content&gt; 的本地化字符串。
        /// </summary>
        public static string changeAccount {
            get {
                return ResourceManager.GetString("changeAccount", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
        ///&lt;Content xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;&gt;
        ///  &lt;Subject&gt;关键信息被修改&lt;/Subject&gt;
        ///    &lt;Value&gt;
        ///      &lt;![CDATA[
        ///      
        ///      
        ///&lt;![CDATA[
        ///    &lt;p&gt;亲爱的[name]用户:
        ///
        ///    &lt;p&gt;  你已经在XXX系统修改了[content].
        ///
        ///  
        ///    &lt;p&gt;账号信息
        ///   &lt;p&gt; 登录Id:[loginId]  
        ///    
        ///
        ///   &lt;p&gt; 管理员
        /// ]]&gt;
        /// &lt;/Value&gt;
        ///&lt;/Content&gt; 的本地化字符串。
        /// </summary>
        public static string changeAccount_zh {
            get {
                return ResourceManager.GetString("changeAccount_zh", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
        ///&lt;Content xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;&gt;
        ///  &lt;Subject&gt;关键信息被修改&lt;/Subject&gt;
        ///    &lt;Value&gt; &lt;![CDATA[
        ///    &lt;p&gt;亲爱的[name]用户:
        ///
        ///    &lt;p&gt;  你已经在XXX系统修改了[content].
        ///
        ///  
        ///    &lt;p&gt;账号信息
        ///   &lt;p&gt; 登录Id:[loginId]  
        ///    
        ///
        ///   &lt;p&gt; 管理员
        /// ]]&gt;&lt;/Value&gt;
        ///&lt;/Content&gt; 的本地化字符串。
        /// </summary>
        public static string changeAccount_zh_CN {
            get {
                return ResourceManager.GetString("changeAccount_zh_CN", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Password agan 的本地化字符串。
        /// </summary>
        public static string ConfirmPassword {
            get {
                return ResourceManager.GetString("ConfirmPassword", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Create time 的本地化字符串。
        /// </summary>
        public static string CreateTime {
            get {
                return ResourceManager.GetString("CreateTime", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Current Password 的本地化字符串。
        /// </summary>
        public static string CurrentPassword {
            get {
                return ResourceManager.GetString("CurrentPassword", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 e-Mail 的本地化字符串。
        /// </summary>
        public static string Email {
            get {
                return ResourceManager.GetString("Email", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
        ///&lt;Content xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;&gt;
        ///  &lt;Subject&gt;[site] notify messages&lt;/Subject&gt;
        ///  &lt;Value&gt; &lt;![CDATA[
        ///    Dear [name],
        ///
        ///	&lt;p&gt;
        ///    You eEmail has be changed, please click following Url to verify this email address.
        ///	&lt;/p&gt;
        ///
        ///    [url]
        ///
        ///	&lt;p&gt;
        ///    [site] administrator.
        ///	&lt;/p&gt;
        /// ]]&gt;&lt;/Value&gt;
        ///&lt;/Content&gt; 的本地化字符串。
        /// </summary>
        public static string emailChanged {
            get {
                return ResourceManager.GetString("emailChanged", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
        ///&lt;Content xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;&gt;
        ///  &lt;Subject&gt;[site] 通知 &lt;/Subject&gt;
        ///    &lt;Value&gt; &lt;![CDATA[
        ///    [name]，您好
        ///
        ///	&lt;p&gt;
        ///    你的安全電子郵件已經被修改了，請點擊下面的url進行確認。
        ///	&lt;/p&gt;
        ///
        ///	&lt;p&gt;
        ///    [url]
        ///	&lt;/p&gt;
        ///
        ///	&lt;p&gt;
        ///	請不要回覆此郵件。
        ///	&lt;/P&gt;
        ///
        ///	&lt;p&gt;
        ///    [site] 管理员
        ///	&lt;/p&gt;
        /// ]]&gt;&lt;/Value&gt;
        ///&lt;/Content&gt; 的本地化字符串。
        /// </summary>
        public static string emailChanged_zh {
            get {
                return ResourceManager.GetString("emailChanged_zh", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
        ///&lt;Content xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;&gt;
        /// &lt;Subject&gt;[site] 通知 &lt;/Subject&gt;
        ///    &lt;Value&gt; &lt;![CDATA[
        ///    [name]，您好
        ///	&lt;p&gt;
        ///		你的安全电子邮件已经被修改。请点击下面链接进行确认
        ///		&lt;/p&gt;
        ///
        ///    &lt;p&gt;[url]&lt;/p&gt;
        ///
        ///	&lt;p&gt;请不要回复此邮件&lt;/p&gt;
        ///
        ///    &lt;p&gt;[site] 管理员&lt;/p&gt;
        /// ]]&gt;&lt;/Value&gt;  
        ///&lt;/Content&gt; 的本地化字符串。
        /// </summary>
        public static string emailChanged_zh_CN {
            get {
                return ResourceManager.GetString("emailChanged_zh_CN", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Login id or Password is not match. 的本地化字符串。
        /// </summary>
        public static string error_LoginError {
            get {
                return ResourceManager.GetString("error_LoginError", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Please input email. 的本地化字符串。
        /// </summary>
        public static string error_missingEmailAddress {
            get {
                return ResourceManager.GetString("error_missingEmailAddress", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Please input login id. 的本地化字符串。
        /// </summary>
        public static string error_MissLoginId {
            get {
                return ResourceManager.GetString("error_MissLoginId", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Please input password. 的本地化字符串。
        /// </summary>
        public static string error_MissPassword {
            get {
                return ResourceManager.GetString("error_MissPassword", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Verify Code not match. 的本地化字符串。
        /// </summary>
        public static string error_notMatchVerifyCode {
            get {
                return ResourceManager.GetString("error_notMatchVerifyCode", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 User is lockout. 的本地化字符串。
        /// </summary>
        public static string error_UserIsLockout {
            get {
                return ResourceManager.GetString("error_UserIsLockout", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 User is not approved. 的本地化字符串。
        /// </summary>
        public static string error_UserIsNotApproved {
            get {
                return ResourceManager.GetString("error_UserIsNotApproved", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
        ///&lt;Content xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;&gt;
        ///  &lt;Subject&gt;[site] Password Retrive&lt;/Subject&gt;
        ///    &lt;Value&gt; &lt;![CDATA[
        ///   &lt;p&gt; Dear [name],
        ///
        ///   &lt;p&gt; Please click following emial and reset you password again.
        ///
        ///    &lt;p&gt;[Url]
        ///
        ///
        ///    &lt;p&gt;[site] administrators group
        /// ]]&gt;&lt;/Value&gt;
        ///&lt;/Content&gt; 的本地化字符串。
        /// </summary>
        public static string forgetPassword {
            get {
                return ResourceManager.GetString("forgetPassword", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
        ///&lt;Content xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;&gt;
        ///  &lt;Subject&gt;[site] 密碼重置&lt;/Subject&gt;
        ///    &lt;Value&gt; &lt;![CDATA[
        ///    &lt;p&gt;[Name]
        ///	
        ///	 &lt;p&gt;  您好，請點擊以下鏈接進行重置密碼操作
        ///    
        ///
        ///  &lt;p&gt;  [Url]
        ///
        /// &lt;p&gt;   [site]管理員團隊
        /// ]]&gt;&lt;/Value&gt;
        ///&lt;/Content&gt; 的本地化字符串。
        /// </summary>
        public static string forgetPassword_zh {
            get {
                return ResourceManager.GetString("forgetPassword_zh", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
        ///&lt;Content xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;&gt;
        ///  &lt;Subject&gt;[site] 密码重置&lt;/Subject&gt;
        ///    &lt;Value&gt; &lt;![CDATA[
        ///  &lt;p&gt;  [name]
        ///	
        ///	 &lt;p&gt;  您好，请点击下面url进行密码重置
        ///    
        ///
        /// &lt;p&gt;   [url]
        ///
        /// &lt;p&gt;   [site]管理团队
        /// ]]&gt;&lt;/Value&gt;
        ///&lt;/Content&gt; 的本地化字符串。
        /// </summary>
        public static string forgetPassword_zh_CN {
            get {
                return ResourceManager.GetString("forgetPassword_zh_CN", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Confirm can&apos;t be blank. 的本地化字符串。
        /// </summary>
        public static string input_password_again {
            get {
                return ResourceManager.GetString("input_password_again", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Approved 的本地化字符串。
        /// </summary>
        public static string IsApproved {
            get {
                return ResourceManager.GetString("IsApproved", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Lockout 的本地化字符串。
        /// </summary>
        public static string IsLockout {
            get {
                return ResourceManager.GetString("IsLockout", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Account Or Email 的本地化字符串。
        /// </summary>
        public static string label_AccountOrEmail {
            get {
                return ResourceManager.GetString("label_AccountOrEmail", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Language 的本地化字符串。
        /// </summary>
        public static string Language {
            get {
                return ResourceManager.GetString("Language", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Last activity time 的本地化字符串。
        /// </summary>
        public static string LastActivityTime {
            get {
                return ResourceManager.GetString("LastActivityTime", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 LastUserLockedTime 的本地化字符串。
        /// </summary>
        public static string LastLockTime {
            get {
                return ResourceManager.GetString("LastLockTime", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Last login time 的本地化字符串。
        /// </summary>
        public static string LastLoginTime {
            get {
                return ResourceManager.GetString("LastLoginTime", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Last password changed time 的本地化字符串。
        /// </summary>
        public static string LastPasswordChangedTime {
            get {
                return ResourceManager.GetString("LastPasswordChangedTime", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Last update time 的本地化字符串。
        /// </summary>
        public static string LastUpdateTime {
            get {
                return ResourceManager.GetString("LastUpdateTime", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Login Id 的本地化字符串。
        /// </summary>
        public static string LoginId {
            get {
                return ResourceManager.GetString("LoginId", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Name 的本地化字符串。
        /// </summary>
        public static string Name {
            get {
                return ResourceManager.GetString("Name", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 New Password 的本地化字符串。
        /// </summary>
        public static string NewPassword {
            get {
                return ResourceManager.GetString("NewPassword", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Operators 的本地化字符串。
        /// </summary>
        public static string Operator {
            get {
                return ResourceManager.GetString("Operator", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Organization 的本地化字符串。
        /// </summary>
        public static string Org {
            get {
                return ResourceManager.GetString("Org", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Child Org&apos;s Count 的本地化字符串。
        /// </summary>
        public static string Org_OrgCount_Child_Org_s_Count {
            get {
                return ResourceManager.GetString("Org_OrgCount_Child_Org_s_Count", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Password 的本地化字符串。
        /// </summary>
        public static string Password {
            get {
                return ResourceManager.GetString("Password", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Password answer 的本地化字符串。
        /// </summary>
        public static string PasswordAnswer {
            get {
                return ResourceManager.GetString("PasswordAnswer", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Password question  的本地化字符串。
        /// </summary>
        public static string PasswordQuestion {
            get {
                return ResourceManager.GetString("PasswordQuestion", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Permission 的本地化字符串。
        /// </summary>
        public static string Permission {
            get {
                return ResourceManager.GetString("Permission", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Permission Name 的本地化字符串。
        /// </summary>
        public static string PermissionName {
            get {
                return ResourceManager.GetString("PermissionName", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Phone 的本地化字符串。
        /// </summary>
        public static string Phone {
            get {
                return ResourceManager.GetString("Phone", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 &lt;?xml version=&quot;1.0&quot; encoding=&quot;x-cp20936&quot;?&gt;
        ///&lt;Content xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;&gt;
        ///  &lt;Subject&gt;��ע���û�&lt;/Subject&gt;
        ///    &lt;Value&gt;
        ///      &lt;![CDATA[�װ���[name]�û�:
        ///      
        ///  &lt;p&gt;  ���Ѿ���XXXϵͳ�ɹ�ע����һ�����˺ţ�Ϊ�����������������֤��
        ///
        ///  &lt;p&gt;  [url]
        ///
        ///
        ///    &lt;p&gt;�˺���Ϣ
        ///   &lt;p&gt; ��¼Id:[loginId]  
        ///    
        ///
        ///   &lt;p&gt; ����Ա
        /// ]]&gt;&lt;/Value&gt;
        ///&lt;/Content&gt; 的本地化字符串。
        /// </summary>
        public static string registAccount {
            get {
                return ResourceManager.GetString("registAccount", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
        ///&lt;Content xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;&gt;
        ///  &lt;Subject&gt;新注册用户&lt;/Subject&gt;
        ///    &lt;Value&gt; &lt;![CDATA[
        ///   &lt;p&gt; 亲爱的[name]用户:
        ///
        ///   &lt;p&gt; 你已经在XXX系统成功注册了一个新账号，为了请点击下面的连接验证。
        ///
        ///  &lt;p&gt;  [url]
        ///
        ///
        ///  &lt;p&gt;  账号信息
        ///  &lt;p&gt;  登录Id:[loginId]
        ///
        ///  &lt;p&gt;  管理员
        /// ]]&gt;&lt;/Value&gt;
        ///&lt;/Content&gt; 的本地化字符串。
        /// </summary>
        public static string registAccount_zh {
            get {
                return ResourceManager.GetString("registAccount_zh", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
        ///&lt;Content xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;&gt;
        ///  &lt;Subject&gt;新注册用户&lt;/Subject&gt;
        ///    &lt;Value&gt; &lt;![CDATA[
        ///  &lt;p&gt;  亲爱的[name]用户:
        ///
        /// &lt;p&gt;   你已经在XXX系统成功注册了一个新账号，为了请点击下面的连接验证。
        ///
        /// &lt;p&gt;   [url]
        ///
        ///
        ///   &lt;p&gt; 账号信息
        ///  &lt;p&gt;  登录Id:[loginId]   
        ///
        ///  &lt;p&gt;  管理员
        /// ]]&gt;&lt;/Value&gt;
        ///&lt;/Content&gt; 的本地化字符串。
        /// </summary>
        public static string registAccount_zh_CN {
            get {
                return ResourceManager.GetString("registAccount_zh_CN", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Registry time 的本地化字符串。
        /// </summary>
        public static string RegistryTime {
            get {
                return ResourceManager.GetString("RegistryTime", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Remark 的本地化字符串。
        /// </summary>
        public static string Remark {
            get {
                return ResourceManager.GetString("Remark", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Remember me 的本地化字符串。
        /// </summary>
        public static string RememberMe {
            get {
                return ResourceManager.GetString("RememberMe", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Role 的本地化字符串。
        /// </summary>
        public static string Role {
            get {
                return ResourceManager.GetString("Role", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 User 的本地化字符串。
        /// </summary>
        public static string User {
            get {
                return ResourceManager.GetString("User", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 User Group 的本地化字符串。
        /// </summary>
        public static string UserGroup {
            get {
                return ResourceManager.GetString("UserGroup", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Verify Code 的本地化字符串。
        /// </summary>
        public static string VerifyCode {
            get {
                return ResourceManager.GetString("VerifyCode", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 Verify Email if changed 的本地化字符串。
        /// </summary>
        public static string VerifyEmail {
            get {
                return ResourceManager.GetString("VerifyEmail", resourceCulture);
            }
        }
    }
}
