var original_dist=56287;

function convertOdometer(original_dist){
    var digits=original_dist.toString().split('').reverse();
    var multiple=1;
    var sum=0;
    var new_digits=digits.map(function(digit){
        if(digit>4){
            digit=digit-1;
            return digit
        }
        else{
            return digit;
        }
       

    });
    var newest_digit=new_digits.reverse().join('');
    var actual=parseInt(newest_digit,9)
 return actual;
}

var actual_dist=convertOdometer(original_dist)
console.log(actual_dist)