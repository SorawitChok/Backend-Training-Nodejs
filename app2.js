const express = require('express');
const db = require('./db.config.js')

const Sequelize = require('sequelize');
const address = require('./model/address.js');
const Op = Sequelize.Op
const User = db.User
const Address = db.Address

const app = express()

app.use(express.json())

app.get('/user/id/:id', async function (req,res){

    let id = req.params.id

    let user = await User.findOne({
        attributes: ['id','name'],
        where:{
            id: id
        }
    })

    res.status(200).send(user)
})

app.get('/user2/id/:id', async function (req,res){

    let id = req.params.id

    let user = await User.findByPk(id,{
        attributes:["id","name"]
    })

    res.status(200).send(user)
})

app.put('/user/add', async function (req,res){

    let name = req.body.name
    let email = req.body.email

    let user = await User.findOne({
        where:{
            name: name
        }
    })

    if(user==null){
        let response = await User.create({
            name: name,
            email: email
        })
    
        res.status(200).send(response)
    }
    else{
        res.status(200).send({
            "status":"Name is already exist"
        })
    }

})

app.post('/user/update/id/:id', async function (req,res){

    let id = req.params.id
    let name = req.body.name
    let email = req.body.email

    let response = await User.update({
        name:name,
        email:email},{
        where:{
            id: id
        }
    })

    let user = await User.findByPk(id,{
        attributes:["id","name"]
    })
    
    res.status(200).send(user)
})

app.delete('/user/delete/id/:id', async function (req,res){
    
    let id = req.params.id

    let response = await User.destroy({
        where:{
            id:id
        }
    })

    res.status(200).send({
        'response':response
    })

})

app.put('/user/add/addr', async function (req,res){

    let name = req.body.name
    let email = req.body.email
    let address = req.body.address

    let user = await User.findOne({
        where:{
            name: name
        }
    })

    if(user==null){
        let response = await User.create({
            name: name,
            email: email
        })

        for(const item of address){
            await Address.create({
                address : item.address,
                user_id: response.id
             })}
    
        res.status(200).send(response)
    }
    else{
        res.status(200).send({
            "status":"Name is already exist"
        })
    }

})

app.get('/user', async function (req,res){

    let name = req.query.name

    if(name==undefined){
        let user = await User.findAll({
            attributes: ['id','name'],
            order: [['name', 'ASC']],
            limit: 1
        })
        res.status(200).send(user)
    }
    else{
        let user = await User.findAll({
            attributes: ['id','name'],
            where:{
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        })
        res.status(200).send(user)
    }

})

app.get('/useraddr', async function (req,res){

    let name = req.query.name
    let address = req.query.address

    if(name==undefined){
        let user = await User.findAll({
            attributes: ['id','name'],
            include:[{
                model:Address,
                attributes:["address"],
                where:{
                    address:{
                        [Op.like]:`%${address}%`
                    }
                }
            }]
        })
        res.status(200).send(user)
    }
    else{
        let user = await User.findAll({
            attributes: ['id','name'],
            where:{
                name: {
                    [Op.like]: `%${name}%`
                }
            },
            include:[{
                model:Address,
                attributes:["address"],
                where:{
                    address:{
                        [Op.like]:`%${address}%`
                    }
                }
            }]
        })
        res.status(200).send(user)
    }

})


app.listen(3000)