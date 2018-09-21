const app = require('express')()
const multer = require('multer')
const logger = require('morgan')

app.use(logger('dev'))

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// cb(null, './public/uploads')
		cb(null, '/mydatadisk/images')
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
	}
})
const upload = multer({ storage })

//设置跨域
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header('Access-Control-Allow-Methods', 'POST, OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token')
	next()
})

/* 上传单个图片 */
app.post('/uploadImg', upload.single('file'), function (req, res, next) {
	if (!req.file) {
		res.json({ code: 1, msg: '图片为空' })
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