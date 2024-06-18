const express = require('express')
const client = require('../database/User_Tables')
const ProductRoute = express.Router()

ProductRoute.post('/', (req, res)=>{
    let Product = req.body

    let insertQuery = `insert into "Product"."T1_Product_Information" ("ProductID","SellerID","Date_of_Creation","Available_Quantity",
    "Out_of_Stock","Active","Name","Unit_Price","Type","Material","Discount","Description","CategoryID")
    values ('${Product.ProductID}','${Product.SellerID}','${Product.Date_of_Creation}','${Product.avl_qty}','${Product.out_of_stock}',
    '${Product.active}','${Product.name}','${Product.unit_price}','${Product.type}','${Product.material}','${Product.discount}'
    ,'${Product.description}','${Product.categoryID}')`

    client.query(insertQuery,(err,result)=>{
        if(err) res.sendStatus(403).json({err});

        res.sendStatus(200).json(Product)
    })
})

ProductRoute.get('/', (req, res)=>{
    let Product = req.body

    let selectQuery = `select * from "Product"."T1_Product_Information" where "ProductID" = '${Product.ProductID}',
    "SellerID" = '${Product.SellerID}', "Date_of_Creation" = '${Product.Date_of_Creation}',"Available_Quantity" = '${Product.avl_qty}',
    "Out_of_Stock" = '${Product.out_of_stock}',"Active" = '${Product.active}',"Name" = '${Product.name}',"Unit_Price" = '${Product.unit_price}',
    "Type" = '${Product.type}',"Material" = '${Product.material}',"Discount" = '${Product.discount}',"Description" = '${Product.description}',
    "CategoryID" = '${Product.categoryID}' `

    client.query(selectQuery,(err,result)=>{
        if(err) res.sendStatus(403).json({err});

        res.sendStatus(200).json(Product)
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


// Need to set this up yet
ProductRoute.put('/', (req, res)=>{
    let Product = req.body

    let insertQuery = `insert into "Product"."T1_Product_Information" ("ProductID","SellerID","Date_of_Creation","Available_Quantity",
    "Out_of_Stock","Active","Name","Unit_Price","Type","Material","Discount","Description","CategoryID")
    values ('${Product.ProductID}','${Product.SellerID}','${Product.Date_of_Creation}','${Product.avl_qty}','${Product.out_of_stock}',
    '${Product.active}','${Product.name}','${Product.unit_price}','${Product.type}','${Product.material}','${Product.discount}'
    ,'${Product.description}','${Product.categoryID}')`

    client.query(insertQuery,(err,result)=>{
        if(err) res.sendStatus(403).json({err});

        res.sendStatus(200).json(Product)
    })
})

module.exports = ProductRoute