// Constantes
const ERROR = 'error';
const SUCCESS = 'success';

// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const listaGastos = document.querySelector('#gastos ul');
const mensajes = document.querySelector('#mensajes');

// Eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);
}

// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = presupuesto;
        this.restante = presupuesto;
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        console.log(this.gastos);
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

    imprimirAlerta(mensaje, tipo) {
        // Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        divMensaje.classList.add((tipo === ERROR ? 'alert-danger' : 'alert-success'));
        
        // Mensaje
        divMensaje.textContent = mensaje;
        // Limpiar mensajes e insertar en HTML

        mensajes.appendChild(divMensaje);
        setTimeout(() => {
            divMensaje.remove();
        },3000)
    }

    limpiarMensajes() {
        while(mensajes.hasChildNodes()) {
            mensajes.firstChild.remove();
        }
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

function agregarGasto(e) {
    e.preventDefault();

    // Leer los datos del formulario
    const descripcionGasto = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    // Validar
    if(descripcionGasto === '' || cantidad === '') {
        ui.imprimirAlerta('Ambios campos son obligatorios', ERROR);
        return;
    } else if (isNaN(cantidad) || cantidad <= 0) {
        ui.imprimirAlerta('Cantidad no válida', ERROR);
        return;
    }

    // Agregar Gasto   
    const gasto = {descripcionGasto, cantidad, id: Date.now() };
    presupuesto.nuevoGasto(gasto);
    ui.imprimirAlerta('Gasto agregado correctamente', SUCCESS);
    formulario.reset();
}