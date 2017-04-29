//express module
app = require('express')()
session = require('express-session')
bodyParser = require('body-parser')
multer = require('multer')

//other module
hogan = require('hogan-express')
otpAuth = require('otpauth')
geoip = require('maxmind')
redis = require('redis')
redisStore = require('connect-redis')(session)
path = require('path')
fs = require('fs')
_ = require('lodash')
