const express = require('express')
const client = require('../../../connection')
const {v4:uuidv4} = require('uuid')

// A header will be there with X-delete_product: boolean value- T - delete all the products also, F - only category should be deleted.

// Category - Image, SubCategory(s)
const route = express.Router()

route.get('/',(req,res)=>{

    let categoryQuery = `Select * from "Product"."T2_CategoryTable"`

    client.query(categoryQuery,(err, result)=>{
        if(err) res.sendStatus(403)
        
        else res.json(result.rows)
    })
})

route.post('/',(req, res)=>{

    let category = req.body
    let categoryID = uuidv4()

    if(!category.SubCategories) category.SubCategories=""

    let categoryQuery = `insert into "Product"."T2_CategoryTable" ("CategoryID","CategoryName","SubCategories","Blocked")
    values ('${categoryID}','${category.CategoryName}','${category.SubCategories}','false')`

    client.query(categoryQuery,(err, result)=>{
        if(err) res.sendStatus(403)
        
        else res.json({categoryID,category})
    })
})

route.put('/',(req, res)=>{

    let category = req.body
    keys = Object.keys(category)
    let editQuery = `Update "Product"."T2_CategoryTable "`
    for(i = 0; i< keys.length();i++){
        
    }

})

route.delete('/',(req, res)=>{

    let categoryQuery = `delete from "Product"."T2_CategoryTable" where "CategoryID" = '${req.body.categoryID}'`

    client.query(categoryQuery,(err, result)=>{
        if(err) res.sendStatus(403)
        
        else res.json({"Message":"Deletion done"})
    })

})
module.exports = route