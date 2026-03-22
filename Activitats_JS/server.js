const express = require("express");
const convert = require("xml-js");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// Act 1: Majúscules (Prova)
app.post("/convert", (req, res) => {
    res.json({ result: req.body.data.toUpperCase() });
});

// Act 1: XML Manual 
app.post("/jsonToXml", (req, res) => {
    const d = req.body;
    let xml = `<usuari>\n  <id>${d.id}</id>\n  <nom>${d.nom}</nom>\n  <edat>${d.edat}</edat>\n  <curs>${d.curs}</curs>\n</usuari>`;
    res.send(xml);
});

// Act 2: JSON a XML 
app.post("/jsonToXmlLib", (req, res) => {
    res.send(convert.json2xml(req.body, { compact: true, spaces: 2 }));
});

// Act 2: XML a JSON 
app.post("/xmlToJsonLib", (req, res) => {
    const result = convert.xml2json(req.body.data, { compact: true, spaces: 2 });
    res.json({ result: JSON.parse(result) });
});

// Act 3: PokeAPI (Retorna XML + Dades per la imatge)
app.post("/getPokemonData", async (req, res) => {
    const name = req.body.name.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        const xml = convert.json2xml(data, { compact: true, spaces: 2 });
        res.json({ xml, original: data });
});

app.listen(PORT, () => console.log(`Servidor a http://localhost:${PORT}`));