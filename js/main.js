
function principal(productosBD) {
    let inputBuscador = document.getElementById("buscador")
    let botonBuscar = document.getElementById("botonBuscador")
    botonBuscar.addEventListener("click", () => filtrar(productosBD, inputBuscador, "nombre"))


    let filtrosCategoria = document.getElementsByClassName("filtroCategoria")
    for (const filtroCategoria of filtrosCategoria) {
        filtroCategoria.addEventListener("click", () => filtrar(productosBD, filtroCategoria, "categoria"))
    }

    let botonComprar = document.getElementById("botonComprar")
    botonComprar.addEventListener("click", finalizarCompra)

    renderizarCarrito()
    renderizarTarjetas(productosBD)

}

function finalizarCompra() {
    let carrito = recuperarCarrito()
    if (carrito.length > 0) {
        localStorage.removeItem("carrito")
        renderizarCarrito()
        lanzarAlerta("Compra finalizada", "¡Muchas Gracias!", "success", null, "center", null, true)
    } else {
        lanzarAlerta("El Carrito esta vacio.", null, "warning", 1000, "center", "20em", false)
    }
}

function filtrar(productos, input, propiedad) {
    let productosFiltrados = productos.filter(producto => producto[propiedad].includes(input.value))
    renderizarTarjetas(productosFiltrados)
}

function renderizarTarjetas(productos) {
    let contenedor = document.getElementById("productos")
    contenedor.innerHTML = ""
    productos.forEach(({nombre, precio, id, rutaImagen}) => {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.classList.add("tarjetaProducto")
        tarjetaProducto.innerHTML = `
        <h3>${nombre}</h3>
        <div>
            <img class=image src="./img/${rutaImagen}">
        </div>
        <p>$${precio}</p>
        <button id=${id}>Agregar al Carrito</button>
        `
        contenedor.appendChild(tarjetaProducto)
        let botonAgregar = document.getElementById(id)
        botonAgregar.addEventListener("click", (e) => agregarAlCarrito(productos, e))
    })
}

function agregarAlCarrito(productos, e) {
    let carrito = recuperarCarrito()
    let productoBuscado = productos.find(producto => producto.id === +(e.target.id))
    let productoEnCarrito = carrito.find(producto => producto.id === productoBuscado.id)
    if (productoEnCarrito) {
        lanzarAlerta(`${productoBuscado.nombre} ya se encuentra en el carrito`, null, "error", 1500, "top-end", "25em", true)
    } else {
        carrito.push({
            id: productoBuscado.id,
            nombre: productoBuscado.nombre,
            precio: productoBuscado.precio
        })
        lanzarAlerta("Producto Agregado", null, "success", 1000, "top-end", "20em", false)
    }
    guardarCarritoEnStorage(carrito)
    renderizarCarrito()
}

function guardarCarritoEnStorage(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito))
} 

function recuperarCarrito() {
    return localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : []
}

function renderizarCarrito(){
    let total = 0
    let contenedor = document.getElementById("carrito")
    contenedor.innerHTML = ""
    let carrito = recuperarCarrito()
    carrito.forEach(({nombre, precio, id}) => {
        total += precio
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.innerHTML = `
        <div>
            <p>${nombre}</p>
            <span>
                <p>$${precio}</p>
                <button type=button id=quitar-${id} class=botonQuitar>Quitar</button>
            </span>
        </div>    
        `
        contenedor.appendChild(tarjetaProducto)
        let botonQuitar = document.getElementById(`quitar-${id}`)
        botonQuitar.addEventListener("click", () => confirmarAlerta(id, carrito))
    })
    let mostrarTotal = document.createElement("div")
    mostrarTotal.classList.add("totalCarrito")
    mostrarTotal.innerHTML = `<h4>Total: $${total}</h4>`
    contenedor.appendChild(mostrarTotal)
}

function quitarDelCarrito(productoId, carrito) {
    let nuevoCarrito = carrito.filter(producto => producto.id !== productoId)
    guardarCarritoEnStorage(nuevoCarrito)
    renderizarCarrito()
    return nuevoCarrito
}

function lanzarAlerta(title, text, icon, timer, position, width, showConfirmButton){
    Swal.fire({
        title,
        text,
        icon,
        timer,
        position,
        width,
        showConfirmButton, 
    })
}

function confirmarAlerta(productoId, carrito) {
    Swal.fire({
        title: '¿Estas seguro de quitar esto del carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, Quitar!'
      }).then((result) => {
        if (result.isConfirmed) {
            quitarDelCarrito(productoId, carrito)
          Swal.fire(
            'Listo',
            'Eliminaste el producto del carrito',
            'success'
          )
        }
      })
}

fetch('./data.json')
    .then(respuesta => respuesta.json())
    .then(productos => principal(productos))
    .catch(error => console.log(error))