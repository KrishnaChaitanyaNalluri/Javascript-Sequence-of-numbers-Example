function showDiv(){    
  //using papaParse to read the csv data
    $('#csvFileInput').parse({
        config: {
            delimiter: "auto",
            complete: prepareTheTextFile,
        }
    });
}
var prepareTheTextFile = function(results){
    var data = results.data.clean(""), textOutputArray = [];
    //Iterating through CSV Results
    var range1 = new Range();
    rangeArray = [];
    for(i=0;i<data.length;i++){
      var rangeLocalAttribute = {};
        if(data[i].length > 0){
            let sequenceArray = data[i][0].split(',');
            var methodName = sequenceArray[0], params = [Number(sequenceArray[1]), Number(sequenceArray[2])]
            if(methodName == "add"){
                range1.add(params);
            } else if(methodName == "remove"){
                range1.remove(params);
            } else {
                console.log("no action found");
            }
            var test = range1.arr;
            rangeArray.push(test);
        } 
    }

  outputTextFileDownload(rangeArray, "output_text_file.txt");
}
// code to output the text file
var outputTextFileDownload = function (objArray, file_Name, target) {
  console.log(objArray);
     var str = '', line = "" ; 
      for (var i = 0; i < objArray.length; i++) {
        // for(var j=0; j<objArray[i]; ++j){
            str += JSON.stringify(objArray[i])+'\r\n';
      }
      if (navigator.msSaveBlob) { // For IE10
          return navigator.msSaveBlob(new Blob([str], {type: 'application/txt'}), file_Name);
      }
      else if (window.env != 'test') {
          target = document.createElement("a");
          target.href = 'data:application/txt;charset=utf-8,\uFEFF' + encodeURIComponent(str);
          target.download = file_Name;
          document.body.appendChild(target);
          return target.click();
      }
  }