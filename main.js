const express = require('express');
const app = express();
const axios = require('axios');
const mysql = require('mysql');



const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin@123',
    database: 'products'
})

conn.connect(()=>{
    console.log('database connected')
})

app.use(express.urlencoded({extended:false}));
app.use(express.json());



app.get('/getUserData', (req, res)=>{
    
    let sql = "select * from users"
    conn.query(sql, (err, result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })

    
})


app.post('/insertUserdata',  (req, res)=>{

    
    
        let userFirstname = req.body.userFirstname;
        let userLastname = req.body.userLastname;
        let userEmail = req.body.userEmail;
        let userPhone = req.body.userPhone;
   
    let sql = "insert into users(userFirstname, userLastname, userEmail, userPhone) values('"+userFirstname+"', '"+userLastname+"', '"+userEmail+"', '"+userPhone+"')"

   conn.query(sql, (err, result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })

})




app.get('/axiosGetData',  (req, res)=>{
    
 
    axios.get('http://localhost:5000/getUserdata').then((results)=>{
        res.send(results.data)
        // console.log(results.data)
    }).catch((err)=>{
        res.send(err)
        // console.log('error')
    })
    
})




app.post('/axiosPostData', (req, res)=>{


    let userFirstname = req.body.userFirstname;
    let userLastname = req.body.userLastname;
    let userEmail = req.body.userEmail;
    let userPhone = req.body.userPhone;

    axios.post('http://localhost:5000/insertUserdata', {userFirstname, userLastname, userEmail, userPhone}).then((results)=>{
        res.send(results.data)
        // console.log(results.data)
    }).catch((err)=>{
        res.send(err)
        // console.log('error')
    })
    


})




app.listen(5000, ()=>{
    console.log('server connected')
})

