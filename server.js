const express = require('express');
const dotenv = require('dotenv')
const connectDB = require('./config/db');
const path = require('path');



dotenv.config();
connectDB();
const app = express();


app.use(express.json())
// app.use(helmet())
// app.use(xss())
// app.use(mongoSanitize())


// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// app.get('/',(req, res)=>res.send('API running'))

app.use(express.static(path.join(__dirname, './frontend/build')))

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))

