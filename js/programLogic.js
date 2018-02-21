function Range(){
  // function constructor
  this.arr =[];
  this.isValid = "VALID";
}
//Difference between two arrays
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};
//Cleaning up the blank spaces or blank values in an array
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
// add function 
Range.prototype.add = function(val){

    if(this.arr.length === 0){
      this.arr.push(val);
      return;
    }else{
      var flattenedRangeArray = [], flattenedArray  = flatten(this.arr).sort(function(a, b){return a - b}),
            toBeAddedArray = findTheRangeOfNumbers(val[0], val[1]);
       for (var i = 0; i < this.arr.length; i++) {
           let innerRangeArray = findTheRangeOfNumbers(this.arr[i][0], this.arr[i][1]);
            flattenedRangeArray = flattenedRangeArray.concat(innerRangeArray);
        } 
      if((val[0] > flattenedArray[flattenedArray.length-1]) || (!val.some(r=> flattenedRangeArray.includes(r)))){
         newFlattenedArray = flattenedArray.concat(val);
         this.arr = buildArrayOfArrays(newFlattenedArray.sort(function(a, b){return a - b}), 2);
         return;
      } else {
        if(val.diff(flattenedArray).length === 0){
            if(isOdd(flattenedArray.indexOf(val[0])) === 1 && isOdd(flattenedArray.indexOf(val[1])) === 0){
              newFlattenedArray  = flattenedArray.diff(flattenedArray.slice(flattenedArray.indexOf(val[0]), flattenedArray.indexOf(val[1])+1))
              
              this.arr = buildArrayOfArrays(newFlattenedArray.sort(function(a, b){return a - b}), 2);
            } else {
              this.isValid = "NOT A VALID INPUT";
            }
        } else if(val.some(r=> flattenedRangeArray.includes(r))){
            let totalArray = flattenedRangeArray.concat(toBeAddedArray).sort(function(a, b){return a - b});
            let nonDuplicateSortedArray = totalArray.filter(function(item, pos) {
                              return totalArray.indexOf(item) == pos;
                          });
            this.arr = formTheSequence(nonDuplicateSortedArray)
        } else {
          console.log("here");
          this.isValid = "NOT A VALID INPUT";
        }
        return;
      }
  }
}
//remove function
Range.prototype.remove = function(val){
    if(this.arr.length === 0){
      // do nothing
      return;
    }else{
      var flattenedArray  = flatten(this.arr).sort(function(a, b){return a - b}),
          toBeRemovedArray = findTheRangeOfNumbers(val[0], val[1]), flattenedRangeArray = [], overallDiffArray = [];
        for (var i = 0; i < this.arr.length; i++) {
           let innerRangeArray = findTheRangeOfNumbers(this.arr[i][0], this.arr[i][1]);
            flattenedRangeArray = flattenedRangeArray.concat(innerRangeArray);
        } 
        // move forward if the array trying to remove is subset of existing array
        if(toBeRemovedArray.every(val => flattenedRangeArray.indexOf(val) >= 0)){

                if(flattenedArray[flattenedArray.length-1] >= val[1] && flattenedArray[0] <= val[0]) {
                  if(flattenedArray.indexOf(val[0])>-1 && flattenedArray.indexOf(val[1])>-1 ){
                      var rangeArray = findTheRangeOfNumbers(val[0], val[1]);
                      newFlattenedArray = flattenedArray.diff(rangeArray);
                      newFlattenedArray.sort(function(a, b){return a - b});
                      this.arr = buildArrayOfArrays(newFlattenedArray, 2);
                  } else {
                    if(flattenedArray.indexOf(val[0])>-1){
                        flattenedArray.splice(flattenedArray.indexOf(val[0]), 1, val[1]);
                        this.arr = buildArrayOfArrays(flattenedArray, 2);
                    } else if(flattenedArray.indexOf(val[1])>-1){
                      flattenedArray.splice(flattenedArray.indexOf(val[1]), 1, val[0]);
                      this.arr = buildArrayOfArrays(flattenedArray, 2);
                    } else {
                      var toBeRemovedArray = findTheRangeOfNumbers(val[0], val[1]);
                      var flattenedRangeArray = [];
                        for (var i = 0; i < this.arr.length; i++) {
                           let innerRangeArray = findTheRangeOfNumbers(this.arr[i][0], this.arr[i][1]);
                            flattenedRangeArray = flattenedRangeArray.concat(innerRangeArray);
                        } 
                        var rangeArray = findTheRangeOfNumbers(val[0], val[1]);
                        diffArray = flattenedArray.diff(rangeArray);
                        newFlattenedArray = diffArray.concat(val)
                        this.arr = buildArrayOfArrays(newFlattenedArray.sort(function(a, b){return a - b}), 2);
                    }
                  }
                  
                } else {
                  this.isValid = "NOT A VALID INPUT";
                }
        } else {
                  this.isValid = "NOT A VALID INPUT";
         }
    }
  
    
  };
//flattening the array
var flatten = function(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}
//build the array from flattened array
var buildArrayOfArrays = function(flatArray, size){
    var groups = [], i;
    for (i = 0; i < flatArray.length; i += size) {
        groups.push(flatArray.slice(i, i + size));
    }
    return groups;
}
var isOdd = function(num) { 
  return num % 2;
}
var findTheRangeOfNumbers = function(low, high){
    var list = []; 
    for (let i = low; i <= high; i++) {
      list.push(i);
    }
    return list;
}
var formTheSequence = function(flatArray){
  var startIndex = flatArray[0], result = [];
  for(var i = 0; i < flatArray.length; i++) {
    if(flatArray[i+1] - flatArray[i] != 1) {
      var temp = [];
      temp.push(startIndex);
      startIndex = flatArray[i+1];
      temp.push(flatArray[i]);
      result.push(temp);
    }
  }
  return result;
}















