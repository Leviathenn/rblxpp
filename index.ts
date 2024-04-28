/**
 * @author Leviathenn
 */


import axios from "axios";
import { env } from "bun";
import express, {type Express, type Request, type Response} from "express";
import fs, { existsSync, mkdir, mkdirSync, statSync, type PathLike } from "node:fs"
import { exit } from "node:process";
import { time, timeEnd } from "node:console";
import { userInfo } from "node:os";
import { spawnSync } from "node:child_process";
import os from "node:os"
import dotenv from "dotenv";

check_defualts();
time();

if(fs.existsSync("./.env")){
    console.log("Enviornment File Exist.");
}else{
    console.log("Enviornment File DOES NOT Exist. Creating one now.")
    fs.writeFileSync("./.env","PORT=8318");
    console.log("Enviornment File Successfully created.");
}

let PORT = process.env.PORT || 8318;

if(!env.ROBLOSECURITY){
    console.log("[FATAL] No ROBLOSECURITY Specified see guide.");
    setTimeout(()=>{
        exit(1);
    },8000)
}

function open(path: PathLike)
{
    if(statSync(path).isFile()){
        spawnSync(`${process.env.MAINDRIVE}:/Windows/system32/notepad.exe ${path}`)
    }else if(statSync(path).isDirectory()){
        spawnSync(`${process.env.MAINDRIVE}:/Windows/system32/explorer.exe ${path}`);
    }
}

function make_defualts(){
    let write_path: PathLike = `${userInfo().homedir}/AppData/Local.rblxpp`;
    mkdirSync(write_path);
    mkdirSync(`${write_path}/Cache`); // Used for storing temparary data
    mkdirSync(`${write_path}/Profile`); // Used for if the user is using multiple users
    mkdirSync(`${write_path}/Assets`); // Used for the storing of icons, and user icons
    mkdirSync(`${write_path}/Defualts`); // Used for configurations like our .env
    axios.get("https://raw.githubusercontent.com/Leviathenn/rblxpp/main/default.env")
    open(`${write_path}/Defuats/config.env`);
    exit(0);
}


function check_defualts(){
    if(existsSync(`${userInfo().homedir}/AppData/Local/rblxpp`)){
        console.log("[INFO]: Hey! Our Folder Exist!");
    }else{
        console.log("[INFO]: Hey, Our folder does not exist.");
        
    }
}


async function start_api(){



    axios.request({
        url: "https://friends.roblox.com/v1/users/1072357894/friends",
        method: "GET",
        headers: {
            Accept: "application/json", 
            Cookies:`.ROBLOSECURITY=${process.env.ROBLOSECURITY}`
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