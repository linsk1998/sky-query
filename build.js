var fs=require("fs");
var out=[];
out.push(fs.readFileSync(__dirname+'/../skyjs/sky.js', 'utf-8'));
out.push(fs.readFileSync(__dirname+'/../url-polyfill/url-read.js', 'utf-8'));
out.push(fs.readFileSync(__dirname+'/batch.js', 'utf-8'));
out.push(fs.readFileSync(__dirname+'/config.js', 'utf-8'));
fs.writeFileSync(__dirname+'/sky-query.js', out.join("\n"), 'utf-8');