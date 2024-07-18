const express = require('express')
const fs = require('fs')


function log (){
    return (req, res, next)=>{
        fs.writeFile('../logFile.txt',`${Date.now()} , ${req.path} , ${req.method}\n`,(err,data)=>{
            if(data) next();
        })
    }
}
