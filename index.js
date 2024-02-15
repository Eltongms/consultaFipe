import express from "express"
import ejs from "ejs"
import axios from "axios";

const app = express()
const port = 3000

let marcas;

app.get('/', async (req, res) => {

    const result = await axios.get("https://parallelum.com.br/fipe/api/v1/carros/marcas");
    marcas = result;

    res.render("index.ejs", { marcas: result.data })
})


app.get('/modelos', (req, res) => {


    console.log(req.body.marca)


    //const result = await axios.get("https://parallelum.com.br/fipe/api/v1/carros/marcas/"+);

    //res.render("index.ejs", {marcas: result.data})
})



app.listen(port, () => {
    console.log(`Runnig and listning on port ${port}`)
})


