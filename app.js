const express = require('express');
const app = express()
const cal = require('./calculator.js');

app.use(express.json())

var mysql = require('mysql2');
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'hodtraining',
   port: 3306
});

connection.connect();

app.get('/user', function (req, res) {

    let name = req.query.name

    if(name==undefined){
        
        connection.query(`SELECT * FROM User ;`, function(error, results, fields){

            if(error) throw error;

            res.status(200).send(results)
        })
    }
    else{
        connection.query(`SELECT * FROM User WHERE name LIKE '%${name}%';`, function(error, results, fields){

            if(error) throw error;
    
            res.status(200).send(results)
        })
    }
})

app.post('/user/update/id/:id', function (req, res) {

    let name = req.body.name
    let email = req.body.email
    let id = req.params.id

    if(id==undefined){
        res.send({
            "error":"please enter user id"
        })
    }
    else{
        connection.query(`UPDATE User SET name = '${name}', email = '${email}' WHERE UID = ${id};`, function(error, results, fields){

            if(error) throw error;
    
            res.status(200).send(results)
        })
    }
})

app.delete('/user/delete/id/:id', function (req, res) {

    let id = req.params.id

    connection.query(`DELETE FROM User Where UID = ${id};`, function(error, results, fields){

        if(error) throw error;

        if(results.affectedRows == 1){
            res.status(200).send({
                "status":'DONE'
            })
        }
        else{
            res.status(200).send({
                "status":'error'
            })
        }
    })
})

app.put('/user/add', function (req, res) {

    let name = req.body.name
    let email = req.body.email

    connection.query(`INSERT INTO User(name,email) VALUES ('${name}','${email}');`, function(error, results, fields){

        if(error) throw error;

        if(results.affectedRows == 1){
            res.status(200).send({
                "status":'DONE'
            })
        }
        else{
            res.status(200).send({
                "status":'error'
            })
        }
    })
})


app.get('/admin/user/id/:id', function (req, res) {

    console.log('query:',req.query);
    console.log('param:',req.params);
    console.log('body:',req.body);

    let users = [
        {
            'id':1,
            'name':'james',
            'email':'james@mail.com'
        },
        {
            'id':2,
            'name':'john',
            'email':'john@mail.com'
        }
    ]

    let result = users.filter(item => {
        return item.name.includes(req.query.name);
    })
  
    res.status(200).send(result);
  })

  app.get('/calculate/num1/:num1/num2/:num2', function (req, res) {

    let num1 = parseInt(req.params.num1)
    let num2 = parseInt(req.params.num2)

    let result = cal.addNumber(num1,num2)
  
    res.status(200).send({
        'result':result
    });

  })

app.listen(3000)