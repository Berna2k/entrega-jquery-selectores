let clientes = []


class Cliente{
    constructor(id, nombre, email, direccion, numTelefono) {
        this.id = id
        this.nombre = nombre;
        this.email = email;
        this.direccion = direccion;
        this.numTelefono = numTelefono;
    }
    
}

//función para crear id unica

function crearId() {
    const cabecera = Date.now().toString(30)
    const cuerpo = Math.random().toString(30).substring(15)
    return cabecera + cuerpo
}

// formulario para que el usuario genere los clientes

$('#formCliente').submit((e) => {
    e.preventDefault()
    
    let formDatos = new FormData(e.target)
    console.log(e.target)
    console.log(formDatos.get("nombre"))
    console.log(formDatos.get("email"))
    console.log(formDatos.get("direccion"))
    console.log(formDatos.get("numTelefono"))

    const cliente = new Cliente(crearId(), formDatos.get("nombre"), formDatos.get("email"), formDatos.get("direccion"), formDatos.get("numTelefono"))
    console.log(cliente)
    clientes.push(cliente)
    localStorage.setItem('clientes',JSON.stringify(clientes))
    $('#formCliente').trigger('reset')
})

// boton para mostrar las cards

$('#botonMostrarClientes').click(() => {
    let clientesParseados = JSON.parse(localStorage.getItem('clientes'))
    clientesParseados.forEach((cliente) => {
        $('#divClientes').append( `
        <div class="card" style="width: 18rem;" id="cliente${cliente.id}">
            <div class="card-body">
                <h5 class="card-title">Cliente ID:${cliente.id}</h5>
                <p>Nombre: ${cliente.nombre}</p>
                <p>Email: ${cliente.email}</p>
                <p>direccion: ${cliente.direccion}</p>
                <p>Telefono: ${cliente.numTelefono}</p>
                <button type="button" class="btn btn-danger" id="boton${cliente.id}">Eliminar</button>
            </div>
        </div>
    `)
    })
    

// boton para eliminar las cards

clientesParseados.forEach((cliente) => {
        $(`#boton${cliente.id}`).click(() => {
            $(`#cliente${cliente.id}`).remove()
            let indice = clientes.findIndex(clienteBuscar => clienteBuscar.id == cliente.id)
            clientes.splice(indice,1)
        })
        console.log(clientesParseados)
        console.log(`Cliente ${cliente.nombre} eliminado` )
        localStorage.setItem('clientes', JSON.stringify(clientesParseados))
    })
})


// input para generar un nombre de usuario
$(`#inputUsuario`).change(() => {
    let parrafo1 = document.getElementById("parrafoUsuario")
    parrafo1.innerText = "¡Usuario valido!"
}) 