//configs
lookup = geoip.openSync('./depends/GeoLite2-City.mmdb')

push_DB = redis.createClient({db:1})
session_DB = redis.createClient({db:2})
dqueue = redis.createClient({db:3})

storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, '/tmp')
	},
	filename: function(req, file, cb){
		cb(null, file.originalname)
	}
})
upload = multer({
	storage: storage
})

//app settings
app.disable('etag')
app.disable('x-powered-by');
app.set('view engine', 'html')
app.engine('html', hogan)
app.use(session({
	name: 'SSID',
	unset: 'keep',
	secret: 'EnCryPtc4t',
	resave: true,
	saveUninitialized: false,
	store: new redisStore({
		client: session_DB
	}),
	cookie: {
		maxAge: 300000,
		secure: false,
		httpOnly: false
	}
}))
app.use(bodyParser.urlencoded({
	extended: false
}))
