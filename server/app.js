const express = require('express')
const app = express();

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Index routes
const index = require('./routes/index');
app.use("/", index);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running at Port: ' + PORT));
