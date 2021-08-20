//<script src="https://cdn.bootcdn.net/ajax/libs/xlsx/0.16.4/xlsx.full.min.js"></script>
function readWorkbookFromLocalFile(file, callback) {
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {type: 'binary'});
        if(callback) callback(workbook);
    };
    reader.readAsBinaryString(file);
}

readWorkbookFromLocalFile('./cclayer.xlsx',function(workbook){
    console.log(workbook);
})
