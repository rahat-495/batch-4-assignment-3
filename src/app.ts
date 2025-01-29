
import express from 'express' ;
import cors from 'cors' ;
import globalErrorHandler from './app/modules/middleware/globalErrorHandler';
import notFound from './app/modules/middleware/notFound';

const app = express() ;

app.use(express.json()) ;
app.use(cors()) ;

// app.use('/api' , router) ;

app.get('/' , (req , res) => {
    res.json({success : true , message : "The server is running !"}) ;
})

app.use(notFound) ;
app.use(globalErrorHandler) ;

export default app ;
