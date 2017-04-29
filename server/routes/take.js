express = require('express')
router = express.Router()

router.all('/', function(req, res){
	res.set({'Content-Type':'text/plain'})
	dqueue.lpop('pics', function(err, rep){
		value = ((rep==null) ? '' : rep.toString())
		if(/^(http|https):\/\//.test(value)){
			res.location(value)
			res.status(302)
		}
		res.send(value)
	})
})

module.exports = router
