import express from "express"
import { ProductManager } from "./ProductManager.js"

const port = 8081
const app = express()
app.listen(port,() => console.log(`El servidor esta escuchando en el puerto ${port}`))

const productService = new ProductManager("./productos.json")

app.get("/productos",async(req,res)=>{
    try {
        const limit = req.query.limit
        const getProducts = await productService.getProducts()
        const slice1 = getProducts.slice(0,limit)
        limit == undefined ? res.send(getProducts) : res.send(slice1)
    } catch (error) {
        res.send(error.message)
    }
})

app.get("/productos/:productId",async(req,res)=>{
    try {
        const productId = parseInt(req.params.productId)
        const getProductById = await productService.getProductById(productId)
        getProductById ? res.send(getProductById) : res.send("El producto buscado no fue encontrado")
    } catch (error) {
        res.send(error.message)
    }
})