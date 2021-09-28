// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const listaGastos = document.querySelector('#gastos ul');


// Eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}

// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = presupuesto;
        this.restante = presupuesto;
        this.gastos = [];
    }
}

class UI {
    insertarPresupuesto( cantidad ) {
        // Extrayendo valores
        const {presupuesto, restante} = cantidad;
        // Agregando al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
        
    }
}

// Instanciar
const ui = new UI();
let presupuesto; //Instanciado al momento de cargar el DOM y ser un valor valido.

// Funciones

function preguntarPresupuesto(){
    let presupuestoUsuario;
    do {
        presupuestoUsuario = prompt('Cual es tu presupuesto');
    } while(isNaN(presupuestoUsuario) || presupuestoUsuario <= 0);

    const valor = Number(presupuestoUsuario);
    presupuesto = new Presupuesto(valor);

    ui.insertarPresupuesto(presupuesto);
}

