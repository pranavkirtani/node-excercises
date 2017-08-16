var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('./development.log');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);
// map of all action done by  controller, for large files this can be saved and read from disk/database
var controllerMap={}
/** Reading log line by line */
rl.on('line', function(line) {
  // process line here
  if(line.indexOf('Processing by')>-1){
        var split_line=line.split('#');
        var action=split_line[1].split(' ')[0];
        var controller=split_line[0].split(' ')[2]
        if(!controllerMap[controller]){
            controllerMap[controller]={};
            if(!controllerMap[controller][action]){
                controllerMap[controller][action]=1
            }
            else{
                controllerMap[controller][action]=controllerMap[controller][action]+1;
            }
        }else{
            if(!controllerMap[controller][action]){
                controllerMap[controller][action]=1
            }
            else{
                controllerMap[controller][action]=controllerMap[controller][action]+1;
            }
        }
  }
});

rl.on('close', function() {

  for(controller in controllerMap){
      for(action in controllerMap[controller]){
      console.log(controller+"=>"+action+" action ran "+controllerMap[controller][action]+" times");
      }

  }
});