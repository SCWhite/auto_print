express = require('express')
router = express.Router()

router.all('/', function(req, res){
	res.set({'Content-Type':'text/plain'})
	ip = req.headers['x-real-ip'] || req.connection.remoteAddress
	country = lookup.get(ip).country.names['en']
	res.send(ip + '\n' + country + '\n')
})

router.all('/:key', function(req, res){
	res.set({'Content-Type':'text/plain'})
	push_DB.get(req.params.key, function(err, rep){
		value = ((rep==null) ? '' : rep.toString())
		if(/^(http|https):\/\//.test(value)){
			res.location(value)
			res.status(302)
		}
		res.send(value)
	})
})

module.exports = router
