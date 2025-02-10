var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config()
const upload = multer({ dest: 'uploads/' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// (1) You should provide your own project, no tthe example URL.
// (2) You can submit a form that includes a file upload.
// (3) The form file input field has the name attribute set to upfile.
// (4) When you submit a file, you receive the file name, type, and size in bytes within the JSON response.
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
	console.log(req.file);
	console.log(req.body);
	res.json({
		name: req.file.originalname,
		type: req.file.mimetype,
		size: req.file.size
	});
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
