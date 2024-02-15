import express from "express"
import ejs from "ejs"
import axios from "axios"
import bodyParser from "body-parser"

const app = express()
const port = 3000
let marcas
let marcaEscolhida
let modelos
let modeloEscolhido


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
        // let marcaSelecionada = req.query.marca
        marcaEscolhida = marcas.find((e) => e.nome === req.query.marca)
    } else {
        res.redirect("/")
        return
    }
    try {
        // console.log(marcaEscolhida)
        const result = await axios.get("https://parallelum.com.br/fipe/api/v1/carros/marcas/" + marcaEscolhida.codigo + "/modelos");
        modelos = result.data
        // console.log(modelos.modelos)

        let modelosNomes = [];
        modelos.modelos.forEach(element => {
            modelosNomes.push(element.nome)
        });
        // console.log(modelosNomes)

        res.render("index.ejs", { marcas: marcas, modelos: modelosNomes })

        //  res.send(modelos);
    } catch (error) {
        if (error.response) {
            res.send("Erro de resposta ao buscar modelos: " + error.response.statusText)
        } else {
            res.send("Erro de request buscar modelos: " + error)
        }
    }
})

app.get('/anos',  (req, res) => {

    // req.query.modelo

    modeloEscolhido = modelos.find((e) => e.nome === req.query.modelo);

    let anos = [200, 255, 20];

    console.log("saida " + anos);

    res.render("index.ejs", { marcas: marcas, modelos: modelosNomes, anos: anos } )

    // const result = await axios.get("")
})

app.listen(port, () => {
    console.log(`Runnig and listning on port ${port}`)
})


