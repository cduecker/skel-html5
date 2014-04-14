var url = require('url');

function makeData(){
	var response = [];
	for(var i=0;i<50;i++){
		response.push({
			title : "Location "+i,
			value : Math.floor(Math.random()*1000)
		})
	}
	return response;
}

module.exports = function(req,res,next){
	//catch calls to /api
	var urlpath = url.parse(req.url,true);
	if(urlpath.pathname.indexOf("/api") !== -1){
		console.log("API request");
		setTimeout(function(){
			res.setHeader('Content-Type','application/json');
			res.end(JSON.stringify(makeData()),'utf-8');
		},100); //we can slow this down, make sure you dont' have weird behavior when running against slow stuff
	}else{
		return next();
	}
};