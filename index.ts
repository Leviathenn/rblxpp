/**
 * @author Leviathenn
 */


import axios, { AxiosError, type AxiosResponse } from "axios";
import express, {type Express, type Request, type Response} from "express";
import fs, { existsSync, mkdir, mkdirSync, readFileSync, statSync, writeFile, writeFileSync, type PathLike, type WatchEventType } from "node:fs"
import { exit } from "node:process";
import { time, timeEnd } from "node:console";
import { userInfo } from "node:os";
import child_process, { execSync, spawn, spawnSync } from "node:child_process";
import os from "node:os"
import dotenv, { type DotenvParseOutput } from "dotenv";
import path from "node:path";
import type { IFriend } from "./Interfaces/IFriend.ts"
import type { IUser } from "./Interfaces/IUser.ts";
let write_path: PathLike = `${userInfo().homedir}/AppData/Local/rblxpp`;

time();
if(existsSync(`${userInfo().homedir}/AppData/Local/rblxpp`)){
    console.log("[INFO]: Hey! Our Folder Exist!");
    let env = dotenv.parse(fs.readFileSync(`${write_path}/Defualts/config.env`));
    program(env);
}else{
    mkdirSync(write_path);
    mkdirSync(`${write_path}/Cache`); // Used for storing temparary data
    mkdirSync(`${write_path}/Profile`); // Used for if the user is using multiple users
    mkdirSync(`${write_path}/Assets`); // Used for the storing of icons, and user icons
    mkdirSync(`${write_path}/Defualts`); // Used for configurations like our .env
    await axios.get("https://raw.githubusercontent.com/Leviathenn/rblxpp/main/default.env").then((req)=>{
        writeFileSync(`${write_path}/Defualts/config.env`,req.data);
    })
    let p = open(`${write_path}/Defualts/config.env`);
    setTimeout(()=>{ 
        fs.watch(`${write_path}/Defualts/config.env`,(e: WatchEventType)=>{
        if(e == "change"){
            p.kill(0);
            console.clear();
            console.log("RELUNCH ME! (when i exit)");
            setTimeout(()=>{
                exit(0);
            },3000)
        }else{

        }
        
    });},500)
    
    console.log("[INFO]: Hey, Our folder does not exist.");
    
}
function open(path: PathLike) {
    var cmd = ``;
    if(statSync(path).isFile()){
        switch (require(`os`).platform().toLowerCase().replace(/[0-9]/g, ``).replace(`darwin`, `macos`)) {
            case `win`:
                path = path || '=';
                cmd = `notepad`;
                break;
            case `linux`:
                console.log("Platform Not Supported.");
                exit(1);
                break;
            case `macos`:
                console.log("Platform Not Supported.");
                exit(1);
                break;
        }
    }else if(statSync(path).isDirectory()){
        switch (require(`os`).platform().toLowerCase().replace(/[0-9]/g, ``).replace(`darwin`, `macos`)) {
            case `win`:
                path = path || '=';
                cmd = `explorer`;
                break;
            case `linux`:
                console.log("Platform Not Supported.");
                exit(1);
                break;
            case `macos`:
                console.log("Platform Not Supported.");
                exit(1);
                break;
        }
       
    }
      
    let p = spawn(cmd,[path.toString()],{detached: true,stdio:"ignore"})
    return p;
}
function program(env: DotenvParseOutput){
    if(!env.ROBLOSECURITY){
        console.log("[FATAL] No ROBLOSECURITY Specified see guide.");
        setTimeout(()=>{
            exit(1);
        },8000)
    }
    
   

    
     
   
    function getUser(): IUser {
        let User: IUser = {id: 0, displayName: "Roblox", name: "Roblox"};
        axios.get("https://www.roblox.com/mobileapi/userinfo",{
            headers:{
                "Cookie":`.ROBLOSECURITY=${env["ROBLOSECURITY"]}`
            }
        }).then((res: AxiosResponse)=>{
        try {
            JSON.parse(JSON.stringify(res.data));
            let user: IUser = res.data;
            User = user;
        } catch (error) {
            console.log(`[ERROR]: You Need to Update Your ROBLOSECURITY In The Env File. Pass the argument "--env" to open up your environment file.`)
        }
     
          

        }).catch((err: AxiosError)=>{
            console.log("Could not fetch user. See error log for detail");
            writeFileSync("errorLog.log",err.cause?.message || "Could not fetch message");
        })
        return User;
        
    }

    function find_users(username: String): IUser{
        let User: IUser = {id: 0, name: "Roblox", displayName: "Roblox"};
        axios.request({
            url: "https://users.roblox.com/v1/usernames/users",
            method: "GET",

            headers: {
                Accept: "application/json",
                Cookies: `.ROBLOSECURITY=${env["ROBLOSECURITY"]}`,
                
            },
            data:{
                "":[
                    username
                ],
                "excludeBannedUsers": true
            }
            
            
        }).then((req)=>{
            let data = req.data;
            User = {
                id: data["id"],
                name: data["name"],
                displayName: data["displayName"],
            }
        })

        return User;
    }

    
    async function start_api(){
   
        let PORT:number = parseInt(env.PORT);
        let friends: any;
       
            if(existsSync(`${write_path}/Profile/${getUser().name}/Friends.json`)){
                /**
                 * Load that into memory
                 */

                
            }else{
                axios.request({
                    url: "https://friends.roblox.com/v1/users/1072357894/friends",
                    method: "GET",
                    headers: {
                        Accept: "application/json", 
                        Cookies:`.ROBLOSECURITY=${env.ROBLOSECURITY};`
                    }
                    
                }).then((req)=>{
                    if(existsSync(`${write_path}/Profile/${getUser().name}`)){
                        let newFriends: any = {};
                        req.data["data"].forEach((frid: IFriend) => {
                            newFriends[frid.name] = frid;
                            newFriends[frid.id] = frid;
                        });
                        writeFileSync(`${write_path}/Profile/${getUser().name}/Friends.json`,JSON.stringify(newFriends));
                    }else{
                        let newFriends:any = {};
                        mkdirSync(`${write_path}/Profile/${getUser().name}`);    
                        req.data["data"].forEach((frid: IFriend) => {
                            newFriends[frid.name] = frid;
                            newFriends[frid.id] = frid;
                        });
                        writeFileSync(`${write_path}/Profile/${getUser().name}/Friends.json`,JSON.stringify(newFriends));
                    }
                });
            }
    
        let api: Express = express();
    
    
    
        api.get("/",(req: Request, res: Response)=>{
            res.send(401);
        })
        
        
        
        
       
        
        api.listen(PORT, ()=>{
            
            console.log("API Has started, minimizing window.");
            timeEnd();
        })
      
    }
    start_api();
}
