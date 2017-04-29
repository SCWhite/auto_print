express = require('express')
router = express.Router()

router.all('/', upload.any(), function(req, res){
	var from_curl = ((req.get('user-agent').indexOf('curl') > -1) ? true : false)
	if(!req.files || req.files.length == 0){
		res.locals = {'link': false}
		if(from_curl){
			res.send('curl url.com -F path=[path_to_upload_to] -F file=[file_path_to_upoad]\n')
		}else{
			res.render('pack.html')
		}
	}else{
		key = Math.random().toString(36).substr(2, 5)
		filename = req.files[0].filename
		link = 'http://140.134.25.193/' + key
		res.locals = {'show': true,'key': key, 'link': link, 'filename': filename}
		push_DB.set(key, 'http://140.134.25.193/pack/'+filename, function(err, rep){
			dqueue.rpush('pics', 'http://140.134.25.193/pack/'+filename, function(err, rep){
				if(from_curl){
					res.send(filename + ' uploaded\n' + link + '\n')
				}else{
					res.render('pack.html')
				}
			})
		})
	}
})

router.get('/:file', function(req, res){
	res.sendFile('/tmp/' + req.params.file)
})

module.exports = router
