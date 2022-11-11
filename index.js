const express = require('express')
const bodyParser = require('body-parser')
const bodyParserErrorHandler = require('express-body-parser-error-handler')
var cors = require('cors');
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParserErrorHandler());
const mongoose = require('mongoose')
const userRouter = require('./routers/userRouter.js')
const chatRouter = require('./routers/chatRoutes.js')
app.use(
  cors({origin: ['http://localhost:3000', 'http://127.0.0.1:5000']})
);
app.use('/',userRouter)
app.use('/',chatRouter)


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}
const PORT =process.env.PORT || 5000
LOCAL_ADDRESS='0.0.0.0'
mongoose.connect('mongodb+srv://manichand:root@cluster0.oll6q.mongodb.net/chatWithMe?retryWrites=true&w=majority').
then(()=>{
  app.listen(PORT,LOCAL_ADDRESS,()=>{
     console.log(`server is running on ${PORT}`)

  })
})
