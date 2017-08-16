var runsize=2;
var Mergesort=require('./mergeSort')
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var Heap = require('heap');
var instream = fs.createReadStream('input.txt');
var outstream = new stream;
var index=0;   
var heap=new Heap(function(a, b) {
    return a.data - b.data;
})
/*reading input stream and splitting it into an array.and passing it to a merge sort function to performing a mergesort and saving that slice into
 a new indexed file ,the larger the original input  file the more the number of indexed files with sorted data*/
instream.on('data',function(data){
      var array=data.toString('utf-8').split(' ');
      fs.writeFileSync('index_'+index+'.txt',Mergesort.sort(array).join(''));
      index++;
})
instream.on('end',function(){
    var bufferArray=[];
     var buffer = new Buffer(2);
      var dataarray=[];
     loopOverFilesOneItemAtATime(index,0);
    /*
    Now we have n number of files with sorted data, we need to merge them into one file without reading all content into memory
    first we read the first character from each file and push it onto a min heap, the min heap would pop the one with the mimimum number from the numbers being added
    we then push the next element from that particular file onto the heap and do a pop again, if the same file returns minimum we read from same file and push again
    otherwise we read from the file that gave us the minimum number and push the next one from there.The minimum number that is popped out is saved into output.txt file
    */ 
  function loopOverFilesOneItemAtATime(index,current_index,data){
      if(index==current_index){
          dataarray.push(data)
         dataarray.forEach(function(data){
                heap.push(data)
        })
           return  nextSteps(heap.pop())
      }
      if(data){
          dataarray.push(data);
      }
      
      readNextLineFromFile(index,current_index,'index_'+current_index+'.txt',buffer,loopOverFilesOneItemAtATime)

  }

  function readNextLineFromFile(index,current_index,filename,buffer,callback){
      console.log("filename"+filename)
       fs.open(filename, "r", function(error, fd) { 
                fs.read(fd,buffer, 0, buffer.length, null,function(error, bytesRead, buffer){
                        callback(index,current_index+1,{data:parseInt(buffer.toString("utf8")),fd:fd,position:1});

                })

       });



        
    }
     
function nextSteps(data_pop){
   /*the function used to write the data that is popped out into the output file, the data_pop.data would be the samllest value
   from all the current indexes of the file */
 
    fs.appendFileSync('output.txt',data_pop.data)
    readNextItemInfile(data_pop.fd,data_pop.position)
  
}
 /** This function is used to read the next item from the file, we pass to it the file descriptor so it knows which file to read from */
function readNextItemInfile(fd,position){
    var buffer = new Buffer(2);
    fs.read(fd,buffer, 0, buffer.length, position+1,function(error, bytesRead, buffer){
                        heap.push({data:parseInt(buffer.toString("utf8")),fd:fd,position:position+2})
                        
                         
                                nextSteps(heap.pop())
                            //the heap pop function returns the minimum number on the heap
                        
                        

                })

}

})




