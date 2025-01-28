
import express from 'express' ;
import cors from 'cors' ;
import router from './app/routes';

const app = express() ;

app.use(express.json()) ;
app.use(cors()) ;

// app.use('/api' , router) ;

app.get('/' , (req , res) => {
    res.json({success : true , message : "The server is running !"}) ;
})

export default app ;
