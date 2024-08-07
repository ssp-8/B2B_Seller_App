const express = require('express')
const client = require('../../connection')
const ProductRoute = express.Router()
const {v4:uuidv4} = require('uuid')


ProductRoute.get('/:productID', (req,res)=>{


    console.log(req.params)
    let selectQuery =  `select * from "Product"."T1_Product_Information" where "ProductID" = '${req.params.productID}'`;

    client.query(selectQuery, (err, result)=>{
        if(err) res.sendStatus(404)
        
        console.log(result.rows)
        res.json(result.rows)
    })
})

ProductRoute.put('/:productID', (req, res) => {
    let query = req.query
    let keys = Object.keys(query)

    let editQuery = 'update "Product"."T1_Product_Information" Set';

    for(i = 0; i<keys.length ;i++){
        editQuery+=` "${keys[i]}" = '${query[keys[i]]}'`
        if(i != keys.length-1) editQuery+=','
    }
    editQuery+=` where "ProductID" = '${req.params.productID}'`

    console.log(editQuery)
    client.query(editQuery,(err, result) => {
        console.log(err)
        if(err) res.status(505)
        
        else res.json(result.rows)

        res.end()
    })

})




ProductRoute.post('/', (req, res)=>{

    let Product = req.body

    let ProductID = uuidv4()

    if(!Product.SellerID || !Product.DateOfCreation || !Product.Qty || !Product.Name || !Product.UnitPrice 
        || !Product.Type || !Product.CategoryID) {
            res.sendStatus(500)
        }
    else {
        if(!Product.Description) Product.Description = ""
        if(!Product.OutOfStock) Product.OutOfStock = "No"
        if(!Product.Active) Product.Active = "Yes"
        if(!Product.Discount) Product.Discount = "0.0"
        if(!Product.Material) Product.Material = ""


    let insertQuery = `insert into "Product"."T1_Product_Information" ("ProductID","SellerID","DateOfCreation","Qty",
    "OutOfStock","Active","Name","UnitPrice","Type","Material","Discount","Description","CategoryID","Blocked")
    values ('${ProductID}','${Product.SellerID}','${Product.DateOfCreation}','${Product.Qty}','${Product.OutOfStock}',
    '${Product.Active}','${Product.Name}','${Product.UnitPrice}','${Product.Type}','${Product.Material}','${Product.Discount}'
    ,'${Product.Description}','${Product.CategoryID}','false')`


    

    client.query(insertQuery,(err,result)=>{

        if(err) { 
            console.log(err);
            res.status(500);
            res.send(err);
            
        }
        else {
            res.json({ProductID,Product})
        }
    })
    }
})

ProductRoute.get('/', (req, res)=>{
    let params = req.params  
    let selectQuery = '';

    
    if(params != {}) selectQuery = `select * from "Product"."T1_Product_Information"`
    else {

    }
    
    client.query(selectQuery,(err,result)=>{
        
        if(err) res.sendStatus(403).json({err});

        res.json(result.rows)
    })
})

ProductRoute.delete('/', (req, res)=>{
    let Product = req.body

    let deleteQuery = `delete from "Product"."T1_Product_Information" ("ProductID","SellerID","Date_of_Creation","Available_Quantity",
    "Out_of_Stock","Active","Name","Unit_Price","Type","Material","Discount","Description","CategoryID")
    values ('${Product.ProductID}','${Product.SellerID}','${Product.Date_of_Creation}','${Product.avl_qty}','${Product.out_of_stock}',
    '${Product.active}','${Product.name}','${Product.unit_price}','${Product.type}','${Product.material}','${Product.discount}'
    ,'${Product.description}','${Product.categoryID}')`

    client.query(deleteQuery,(err,result)=>{
        if(err) res.sendStatus(403).json({err});

        res.sendStatus(200).json(Product)
    })
})

module.exports = ProductRoute