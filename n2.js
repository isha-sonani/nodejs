//this is a replace and very first node js file...

const fs = require('fs');
let text=fs.readFileSync("file.txt","utf-8");
text = text.replace("postman","topic:postman");

console.log(text);
console.log("new file processing....");
fs.writeFileSync("newfile.txt",text);