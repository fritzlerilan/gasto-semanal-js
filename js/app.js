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
        this.calcularRestante();
    }

    calcularRestante() {
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
        console.log(this.restante);
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        // Extrayendo valores
        const { presupuesto, restante } = cantidad;
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
        }, 3000)
    }

    agregarGastoListado(gastos) {
        ui.limpiarGastos();
        gastos.forEach(gasto => {
            const { cantidad, descripcionGasto, id } = gasto;

            // Crear un LI
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            // Agregar el HTML del gasto
            nuevoGasto.innerHTML = `${descripcionGasto} <span class="badge badge-primary badge-pill"> $${cantidad} </span>`;

            // Boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times'
            nuevoGasto.appendChild(btnBorrar);

            // Agregar al HTML
            listaGastos.appendChild(nuevoGasto);
        });
    }
    actualizarRestante(restante) {
        const elemRestante = document.querySelector('#restante');
        elemRestante.textContent = restante;

        const divRestante = document.querySelector('div .restante');
        let porcentaje = (restante / presupuesto.presupuesto) * 100;

        if (porcentaje <= 25) {
            divRestante.classList.remove('alert-success');
            divRestante.classList.add('alert-danger');
        } else if (porcentaje <= 50) {
            divRestante.classList.remove('alert-success');
            divRestante.classList.add('alert-warning');
        }
    }
    limpiarGastos() {
        while (listaGastos.hasChildNodes()) {
            listaGastos.firstChild.remove()
        }
    }
    limpiarMensajes() {
        while (mensajes.hasChildNodes()) {
            mensajes.firstChild.remove();
        }
    }
}



// Instanciar
const ui = new UI();
let presupuesto; //Instanciado al momento de cargar el DOM y ser un valor valido.

// Funciones

function preguntarPresupuesto() {
    let presupuestoUsuario;
    do {
        presupuestoUsuario = prompt('Cual es tu presupuesto');
    } while (isNaN(presupuestoUsuario) || presupuestoUsuario <= 0);

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
    if (descripcionGasto === '' || cantidad === '') {
        ui.imprimirAlerta('Ambios campos son obligatorios', ERROR);
        return;
    } else if (isNaN(cantidad) || cantidad <= 0) {
        ui.imprimirAlerta('Cantidad no válida', ERROR);
        return;
    }

    // Agregar Gasto   
    const gasto = { descripcionGasto, cantidad, id: Date.now() };
    presupuesto.nuevoGasto(gasto);
    ui.imprimirAlerta('Gasto agregado correctamente', SUCCESS);

    // Imprimir los gastos
    const { gastos, restante } = presupuesto;
    ui.agregarGastoListado(gastos);
    ui.actualizarRestante(restante);
    formulario.reset();
}