
const materias = [
    {nombre: "Formación integral I", semestre: 1, area: "institucional", creditos: 1},
    {nombre: "Formación integral II", semestre: 2, area: "institucional", creditos: 1, prerequisitos: ["Formación integral I"]},
    {nombre: "Deporte formativo", semestre: 1, area: "institucional", creditos: 2},
    {nombre: "Introducción al programa", semestre: 1, area: "institucional", creditos: 2},
    {nombre: "Química general", semestre: 1, area: "exactas", creditos: 3},
    {nombre: "Bioquímica I", semestre: 2, area: "exactas", creditos: 2, prerequisitos: ["Química general"]},
    {nombre: "Bioquímica II", semestre: 3, area: "exactas", creditos: 2, prerequisitos: ["Bioquímica I"]},
    {nombre: "Biología celular y molecular", semestre: 1, area: "exactas", creditos: 3},
    {nombre: "Morfología", semestre: 2, area: "basicas", creditos: 8, prerequisitos: ["Biología celular y molecular"]},
    {nombre: "Histología", semestre: 2, area: "basicas", creditos: 4, prerequisitos: ["Biología celular y molecular"]},
    {nombre: "Física", semestre: 1, area: "exactas", creditos: 3},
    {nombre: "Fisiología", semestre: 3, area: "basicas", creditos: 8, prerequisitos: ["Física", "Bioquímica I", "Morfología"]},
    {nombre: "Embriología", semestre: 3, area: "basicas", creditos: 3, prerequisitos: ["Histología"]},
    {nombre: "Inmunología", semestre: 3, area: "basicas", creditos: 1, prerequisitos: ["Histología"]},
    {nombre: "Microbiología", semestre: 4, area: "basicas", creditos: 2, prerequisitos: ["Fisiología"]},
    {nombre: "Patología", semestre: 4, area: "basicas", creditos: 4, prerequisitos: ["Fisiología"]},
    {nombre: "Parasitología", semestre: 4, area: "basicas", creditos: 2, prerequisitos: ["Fisiología"]},
    {nombre: "Farmacología", semestre: 5, area: "basicas", creditos: 4, prerequisitos: ["Microbiología", "Patología", "Parasitología"]},
    {nombre: "Genética", semestre: 5, area: "basicas", creditos: 2, prerequisitos: ["Embriología", "Microbiología"]},
];

const container = document.getElementById("malla-container");

function isApproved(nombre) {
    const el = document.querySelector(`[data-nombre="{nombre}"]`.replace("{nombre}", nombre));
    return el && el.classList.contains("aprobada");
}

function createMateriaElement(m) {
    const matDiv = document.createElement("div");
    matDiv.className = `materia {area}`.replace("{area}", m.area);
    matDiv.setAttribute("data-nombre", m.nombre);
    matDiv.innerHTML = `<span>{nombre}</span><span>{creditos} créditos</span>`
        .replace("{nombre}", m.nombre)
        .replace("{creditos}", m.creditos);

    const updateStatus = () => {
        if (matDiv.classList.contains("aprobada")) {
            matDiv.innerHTML = `<span>{nombre} ✅</span><span>{creditos} créditos</span>`
                .replace("{nombre}", m.nombre)
                .replace("{creditos}", m.creditos);
        } else {
            matDiv.innerHTML = `<span>{nombre}</span><span>{creditos} créditos</span>`
                .replace("{nombre}", m.nombre)
                .replace("{creditos}", m.creditos);
        }
    };

    matDiv.onclick = () => {
        if (m.prerequisitos && !m.prerequisitos.every(isApproved)) {
            alert("Debes aprobar primero: " + m.prerequisitos.filter(p => !isApproved(p)).join(", "));
            return;
        }
        matDiv.classList.toggle("aprobada");
        updateStatus();
    };

    if (m.prerequisitos) {
        matDiv.classList.add("bloqueada");
    }

    return matDiv;
}

const semestres = [...new Set(materias.map(m => m.semestre))];

semestres.forEach(s => {
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";
    const title = document.createElement("h2");
    title.textContent = `Semestre ${s}`;
    semDiv.appendChild(title);

    materias.filter(m => m.semestre === s).forEach(m => {
        const matEl = createMateriaElement(m);
        semDiv.appendChild(matEl);
    });

    container.appendChild(semDiv);
});
