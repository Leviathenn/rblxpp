/**
 * @author Leviathenn
 */


import axios from "axios";
import express, {type Express, type Request, type Response} from "express";
import fs, { existsSync, mkdir, mkdirSync, statSync, writeFileSync, type PathLike, type WatchEventType } from "node:fs"
import { exit } from "node:process";
import { time, timeEnd } from "node:console";
import { userInfo } from "node:os";
import child_process, { execSync, spawn, spawnSync } from "node:child_process";
import os from "node:os"
import dotenv, { type DotenvParseOutput } from "dotenv";
import path from "node:path";
let write_path: PathLike = `${userInfo().homedir}/AppData/Local/rblxpp`;

time();
if(existsSync(`${userInfo().homedir}/AppData/Local/rblxpp`)){
    console.log("[INFO]: Hey! Our Folder Exist!");
    let env = dotenv.parse(fs.readFileSync(`${write_path}/Defualts/config.env`));
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
    
   

    
     
    async function make_defualts(){
    
        
       
    
    
    }
    
    
    
    function check_defualts(){
   
    }
    
    
    async function start_api(){
    
        let PORT = process.env.PORT || 8318;
    
        axios.request({
            url: "https://friends.roblox.com/v1/users/1072357894/friends",
            method: "GET",
            headers: {
                Accept: "application/json", 
                Cookies:`.ROBLOSECURITY=${env.ROBLOSECURITY}`
            }
        }).then((req)=>{
            //console.log(req.data);
        });
    
        let api: Express = express();
    
    
    
        api.get("/",(req: Request, res: Response)=>{
            res.send(401);
        })
        
        
        
        
        api.get("/getFriends",(req: Request, res)=>{
         
        })
        
        api.listen(PORT, ()=>{
            
            console.log("API Has started, minimizing window.");
            timeEnd();
        })
      
    }
    
    start_api();
}
