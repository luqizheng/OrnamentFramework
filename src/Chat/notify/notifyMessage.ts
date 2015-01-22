/**
 * Created by leo-home on 2015/1/22.
 */


export  class notifyMessage {
    Content:string;
    Owner:string;
    CreateTime:Date;
    IsRead:boolean;
    Subject:string;
    getJSON = function () {
        return {
            Content: this.Content,
            Type: "notify",
            Owner: this.Owner,
            CreateTime: this.CreateTime,
            IsRead: this.IsRead,
            Subject: this.Subject
        }
    }
}