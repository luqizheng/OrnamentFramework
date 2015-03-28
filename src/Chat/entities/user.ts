/**
 * Created by leo-home on 2015/3/23.
 */
/// <reference path='../typings/node/node.d.ts' />
/// <reference path='../typings/socket.io/socket.io.d.ts' />

    export class user {
        name:string;
        loginId:string;
        status:userStatus;
    }

    export enum userStatus {online, busy, offline}    ;

    export class onlineUser {
        socket:SocketIO.Socket;
        user:user;
        publicKey:string;
    }
