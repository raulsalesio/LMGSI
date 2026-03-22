// --- FUNCIONS ---

async function convertirMajuscules() {
    const text = document.getElementById("inputData").value;
    const res = await fetch("/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: text })
    });
    const json = await res.json();
    document.getElementById("result").value = json.result;
}

async function xmlManual() {
    const text = document.getElementById("inputData").value;
    const res = await fetch("/jsonToXml", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: text
    });
    const xml = await res.text();
    document.getElementById("result").value = xml;
}

async function jsonToXmlLib() {
    const text = document.getElementById("inputData").value;
    const res = await fetch("/jsonToXmlLib", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: text
    });
    const xml = await res.text();
    document.getElementById("result").value = xml;
}

async function xmlToJsonLib() {
    const text = document.getElementById("inputData").value;
    const res = await fetch("/xmlToJsonLib", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: text })
    });
    const json = await res.json();
    document.getElementById("result").value = JSON.stringify(json.result, null, 2);
}

async function buscarPokemon() {
    const name = document.getElementById("inputData").value;
    const res = await fetch("/getPokemonData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
    });

    if (res.ok) {
        const data = await res.json();
        document.getElementById("result").value = data.xml;

        // Mostrar Imatge i Habilitats
        const infoDiv = document.getElementById("pokemon-info");
        const habilitats = data.original.abilities.map(a => a.ability.name).join(", ");
        
        infoDiv.innerHTML = `
            <img src="${data.original.sprites.front_default}" style="width:150px">
            <p><strong>Habilitats:</strong> ${habilitats}</p>
        `;
    }
}

document.getElementById("btnMaj").addEventListener("click", convertirMajuscules);
document.getElementById("btnXmlManual").addEventListener("click", xmlManual);
document.getElementById("btnXmlLib").addEventListener("click", jsonToXmlLib);
document.getElementById("btnJsonLib").addEventListener("click", xmlToJsonLib);
document.getElementById("btnPoke").addEventListener("click", buscarPokemon);