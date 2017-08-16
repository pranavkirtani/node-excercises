var fs=require('fs');
for(var i=0;i<100000;i++){
        min = Math.ceil(00);
        max = Math.floor(99);
        var data=pad2(Math.floor(Math.random() * (max - min) + min));
        fs.appendFileSync('input.txt',' '+data)
}
function pad2(number) {
   
     return (number < 10 ? '0' : '') + number
   
}