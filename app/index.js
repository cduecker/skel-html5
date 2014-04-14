var tpl = require('./index.mustache');
var tpl_data = require('./data.mustache');
var data = require('models/mod1');


console.log("template loaded", !_.isEmpty(tpl));
console.log("data template loaded", !_.isEmpty(tpl_data));

$('body').prepend(tpl());

data.done(function(d){
	$('.container').append(tpl_data({data : d}));
});


