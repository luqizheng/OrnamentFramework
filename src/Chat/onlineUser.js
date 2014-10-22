var user={};

exports.get=function(loginid){
  return user[loginid];
}

exports.count=function(){
  return user.length;
}

exports.addUser=function(loginid,socket){
  user[loginid]={socket:socket}
}
