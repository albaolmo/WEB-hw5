var express = require('express');
var app = express();
var fs = require("fs");
var crypto = require("crypto");
var functions = require('./functions.js'); 


app.get('/publishers', function (req, res) {
   fs.readFile( __dirname + "/" + "customers.json", 'utf8', function (err, data) {
        
       var data = JSON.parse( data ); // Actual data
       var etag = functions.computeWeakEtag(data); // Actual ETag according to the actual data
        
        /*The request doesn't have the header "If-None-Match" */
        if(req.headers['If-None-Match']==null){ 
            //The server must send the ETag and also show the data
            res.setHeader('ETag',etag);
            console.log( data );
            res.end( data );
            
        /*The request does have the header "If-None-Match" */
        }else{
            /*the content hasn't changed*/
            if(etag==req.headers['If-None-Match']){ 
                //The server must send the same ETag and a "Not modified" message    
                res.status(304); 
                res.setHeader('ETag',etag);
                res.end("Not modified");
            /*The content has changed*/
            }else{ 
                //The server must send the new ETag and the content 
                res.setHeader('ETag',etag);
                console.log( data );
                res.end( data );
                
            }

        }
    });
})




var server = app.listen(8085, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})