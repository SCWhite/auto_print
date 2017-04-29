//modules
require('./import')

//configs
require('./config')

//routes
require('./routes/route')

//app start
if(process.env.NODE_ENV === 'production'){
	//reserve proxy
	app.listen(1080, '127.0.0.1')
}else{
	//developing
	app.listen(8080)
}
