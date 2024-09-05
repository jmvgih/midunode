const fs =require ('node:fs');

const stat = fs.statSync("./archivo.txt");

console.log(
    stat.isFile(),
    stat.isDirectory(),
    stat.isSymbolicLink(),
    stat.size,
);
