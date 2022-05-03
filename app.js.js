var fs = require('fs');
var http = require('http');
function createAndAppendTimeStamp(){
    fs.appendFile('./txtfiles/'+Math.floor(Date.now() / 1000)+'.txt', Math.floor(Date.now() / 1000).toString(), function (err) {
    if (err) throw err;
      console.log('Successfully created!');
    });    
}

function fetchAllTxtFiles(){
    fs.readdir('./txtfiles', (err, files) => {
        console.log(files)
        if (err)
          console.log(err);
        else {
          console.log("\nCurrent directory filenames:");          
          files.forEach(file => {
            console.log(file)
          })
        }       
      })
}

http.createServer(function (req, res) {
    console.log(req.url)
    switch(req.url){
        case "/":
            res.write(Math.floor(Date.now() / 1000).toString());
            createAndAppendTimeStamp();
            break;
        case "/favicon.ico":
            break;            
        case "/fetchFiles":            
            res.write("Fetched Successfully");
            fetchAllTxtFiles();          
        default:
            //res.write("Page Not Found!!");   
            break; 
    }  
  res.end(); 
}).listen(3001);