// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const listaGastos = document.querySelector('#gastos ul');

console.log('formulario:', formulario)
console.log('listaGastos:', listaGastos)

// Eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}

// Clases


// Funciones

function preguntarPresupuesto(){
    let presupuestoUsuario;
    do {
        presupuestoUsuario = prompt('Cual es tu presupuesto');
        console.log('Presupuesto Usuario:', presupuestoUsuario);
    } while(isNaN(presupuestoUsuario) || presupuestoUsuario <= 0);

}

