const app = require('express')()
const multer = require('multer')
const logger = require('morgan')
const axios = require('axios')

app.use(logger('dev'))

let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// cb(null, './public/uploads')
		cb(null, '/mydatadisk/images')
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
	}
})
let upload = multer({ storage: storage })

//设置跨域
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header('Access-Control-Allow-Methods', 'POST, OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token')
	next()
})

app.get('/getOpenImg', (req, res) => {
	let url = 'http://www.apiopen.top:88/meituApi'
	// let params = {
	// 	pn: req.query.pn || 0,
	// 	rn: req.query.rn || 30,
	// 	tag1: req.query.tag1,
	// 	tag2: req.query.tag2,
	// 	ie: 'utf8',
	// }
	let params = {
		page: req.query.page
	}
	axios.get(url, {params: params}).then(response => {
		console.log(response.data)
		res.json(response.data)
	})
})

/* 上传单个图片 */
app.post('/uploadImg', upload.single('file'), function (req, res, next) {
	if (!req.file) {
		res.json({
			code: 1,
			msg: '图片为空'
		})
		return
	}
	res.json({
		code: 0,
		msg: '上传成功',
		data: req.file.path.slice(18)
	})
})

app.listen(3001, () => {
	console.log('Listen at 3001!')
})