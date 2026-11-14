// CLASE PARA ESTRUCTURAS LOS DATOS DEL ROLLO AUDITADO
class RolloAuditado {

constructor (idRollo,mtsTotales,mtsDefecto){
this.idRollo= idRollo;
this.mtsTotales = parseFloat (mtsTotales);
this.mtsDefecto = parseFloat (mtsDefecto);
this.porcentajeMerma = ((this.mtsDefecto/this.mtsTotales)*100).toFixed(2);
this.estado=this.calcularEstado();
}

calcularEstado (){

if (this.porcentajeMerma > 10){
    return "Rechazado / Alerta";
} else {
    return "Aprobado";
     }
   }
}


const inputIdRollo = document.getElementById ("idRollo");
const inputMtsTotales = document.getElementById ("mtsTotales");
const inputMtsDefecto = document.getElementById ("mtsDefecto");
const btnAuditar = document.getElementById ("btnAuditar");
const tablaMermas = document.getElementById ("tablaMermas");

mostrarAuditorias();

btnAuditar.addEventListener("click", () => {
const idRollo = inputIdRollo.value.trim();
const mtsTotales = inputMtsTotales.value;
const mtsDefecto = inputMtsDefecto.value;

//validaciones preventivas

if (!idRollo || !mtsTotales || !mtsDefecto){
alert ("Por favor, completa todos los campos.");
return;
}

if (parseFloat (mtsDefecto) > parseFloat(mtsTotales)){

    alert ("Error: Los metros con defecto no pueden ser mayores a los metros totales.");
    return;
}

//crear nuevo objeto y guardar
const nuevoRollo = new RolloAuditado (idRollo,mtsTotales,mtsDefecto);
guardarEnLocalStorage (nuevoRollo);


//limpiar campos y actualizar tabla

inputIdRollo.value = "";
inputMtsTotales.value = "";
inputMtsDefecto.value = "";
mostrarAuditorias();

});


function guardarEnLocalStorage (rollo) {
let rollos = JSON.parse (localStorage.getItem ("mermasRolos")) || [];
rollos.push (rollo);
localStorage.setItem ("mermasRolos", JSON.stringify (rollos));
}

function mostrarAuditorias (){
    tablaMermas.innerHTML = "";
    let rollos = JSON.parse (localStorage.getItem ("mermasRolos")) || [];

    rollos.forEach (rollo =>{
        let fila = document.createElement ("tr");
        let badgeClass = rollo.estado === "Aprobado" ? "bg-success" : "bg-danger";

        fila.innerHTML = `
        <td>${rollo.idRollo}</td>
        <td>${rollo.mtsTotales} m</td>
        <td>${rollo.porcentajeMerma}%</td>
        <td><span class="badge ${badgeClass}">${rollo.estado}</span></td>
        `;

        tablaMermas.appendChild (fila);

    });
}
