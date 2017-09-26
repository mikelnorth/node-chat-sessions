const express = require('express');
const bodyParser = require('body-parser');
const mc = require( `${__dirname}/controllers/messages_controller` );
const session = require('express-session')
const createInitialSession = require('./middlewares/session')
const filter = require('./middlewares/filter.js')



const app = express();

app.use( bodyParser.json() );
app.use( express.static( `${__dirname}/../public/build` ) );



app.use(function( req, res, next){
    if(req.method === 'PUT' || req.method === 'POST'){
        filter(req, res, next)
    } 
    else{
        next();
    }
})

app.use( session({
  secret: 'this is a big secret!',
  resave: false, //whether to re-save the cookie/overwrite every contact
  saveUninitialized: false, // add a cookie even if node thinks we don't need one
  cookie: { expires: 259200000 } // how long until cookie expires
}));

app.use( createInitialSession);

const messagesBaseUrl = "/api/messages";
app.post( messagesBaseUrl, mc.create );
app.get( messagesBaseUrl, mc.read );
app.get(`${messagesBaseUrl}/history`, mc.history)
app.put( `${messagesBaseUrl}`, mc.update );
app.delete( `${messagesBaseUrl}`, mc.delete );

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );