/**
 * Created by leo-home on 2015/3/23.
 */
/* msg={
 Content:"content",
 LoginIds=[] //接受者
 Token:publicKey,
 GlobalVariable={}, tempalte data,
 UserData=[{dictionary}],
 IsTemplate:false or not defined,
 Org=org,
 CreateDate,
 */
    export class notifyMsg {
        content:string;//内容
        title:string;//标题
        loginIds:string[];
        globalVariable = {};
        userData:Object[];
        isTemplate:boolean;
        org:string;
    }

