import express from "express"
import ejs from "ejs"
import axios from "axios"
import bodyParser from "body-parser"

const app = express()
const port = 3000
let marcas


app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');


app.get('/', async (req, res) => {

    let result = null;
    try {
        result = await axios.get("https://parallelum.com.br/fipe/api/v1/carros/marcas")
        marcas = result.data
        res.render("index.ejs", { marcas: marcas })
    } catch (error) {
        res.send("Erro ao buscar marcas " + error.response)
    }
})


app.get('/modelos', async (req, res) => {

    // let saida = marcas
    let codigoModelo = 0;

    if (marcas) {
        let marcaSelecionada = req.query.marca
        codigoModelo = marcas.find((e) => e.nome === marcaSelecionada).codigo
    } else {
       res.redirect("/")
        return
    }
    try {
        const result = await axios.get("https://parallelum.com.br/fipe/api/v1/carros/marcas/" + codigoModelo + "/modelos");
        let modelos = [];
        console.log(result.data)
        result.data.modelos.forEach(element => {
            // modelos.push(element.nome)
            modelos.push(element.nome)
        });
        res.send(modelos);
    } catch (error) {
        if (error.response) {
            res.send("Erro ao buscar modelos: " + error.response.statusText)
        } else {
            res.send("Erro ao buscar modelos: " + error.request)
        }
    }

    // res.render("index.ejs",)


    //res.render("index.ejs", {marcas: result.data})
})



app.listen(port, () => {
    console.log(`Runnig and listning on port ${port}`)
})


