principal()

function principal() {
    let productosOriginal = [
        { id: 101, nombre: "campera anorak red wings", categoria: "camperas", talle: "xl", precio: 59900, rutaImagen: "anorak_red_wings.jpg"},
        { id: 102, nombre: "buzo en v champions", categoria: "buzos", talle: "l", precio: 19900, rutaImagen: "buzo_en_v_champions.jpg"},
        { id: 103, nombre: "buzo fresno state", categoria: "buzos", talle: "xl", precio: 22900, rutaImagen: "buzo_fresno_state.jpg"},
        { id: 104, nombre: "campera de jean fv", categoria: "camperas", talle: "l", precio: 35900, rutaImagen: "campera_jean_fv.jpg"},
        { id: 105, nombre: "campera nike reversible", categoria: "camperas", talle: "xl", precio: 29900, rutaImagen: "campera_nike_reversible.jpg"},
        { id: 106, nombre: "campera reebook tricolor", categoria: "camperas", talle: "l", precio: 26900, rutaImagen: "campera_reebook_tricolor.jpg"},
        { id: 107, nombre: "campera swingster", categoria: "camperas", talle: "xl", precio: 46900, rutaImagen: "campera_swingster.jpg"},
        { id: 108, nombre: "campera syracuse", categoria: "camperas", talle: "xl", precio: 37900, rutaImagen: "campera_syracuse.jpg"},
        { id: 109, nombre: "casaca broncos", categoria: "remeras", talle: "xl", precio: 8900, rutaImagen: "casaca_broncos.jpeg"},
        { id: 110, nombre: "gafas new york", categoria: "accesorios", talle: "", precio: 2690, rutaImagen: "gafas_new_york.jpeg"},
        { id: 111, nombre: "gorra rivera maya", categoria: "accesorios", talle: "", precio: 3290, rutaImagen: "gorra_rivera_maya.jpg"},
        { id: 112, nombre: "gorra vintage club", categoria: "accesorios", talle: "", precio: 2990, rutaImagen: "gorra_vintageclub.jpg"},
        { id: 113, nombre: "pantalon adidas fucsia", categoria: "pantalones", talle: "xl", precio: 12900, rutaImagen: "pantalon_adidas_fucsia.jpg"},
        { id: 114, nombre: "pantalon adidas blue", categoria: "pantalones", talle: "l", precio: 15900, rutaImagen: "pantalon_blue_adidas.jpg"},
        { id: 115, nombre: "pantalon jean levis", categoria: "pantalones", talle: "l", precio: 21900, rutaImagen: "pantalon_jean_levis.jpg"},
        { id: 116, nombre: "pantalon jean pierre balmain", categoria: "pantalones", talle: "xl", precio: 23900, rutaImagen: "pantalon_jean_pierre_balmain.jpg"},
        { id: 117, nombre: "pantalon tactico cargo", categoria: "pantalones", talle: "l", precio: 18900, rutaImagen: "pantalon_tactico_cargo.jpg"},
        { id: 118, nombre: "remera browns nfl", categoria: "remeras", talle: "xl", precio: 7900, rutaImagen: "remera_browns_nfl.jpeg"},
        { id: 119, nombre: "remera national champions", categoria: "remeras", talle: "l", precio: 6900, rutaImagen: "remera_national_champions.jpeg"},
        { id: 120, nombre: "remera steelers", categoria: "remeras", talle: "xl", precio: 9900, rutaImagen: "remera_steelers.jpg"},
        { id: 121, nombre: "riñonera marlboro", categoria: "accesorios", talle: "", precio: 12900, rutaImagen: "rinonera_marlboro.jpg"}
    ]

    let inputBuscador = document.getElementById("buscador")
    let botonBuscar = document.getElementById("botonBuscador")
    // inputBuscador.addEventListener("input", () => filtrar(productosOriginal, inputBuscador, "nombre"))
    botonBuscar.addEventListener("click", () => filtrar(productosOriginal, inputBuscador, "nombre"))

    let filtrosCategoria = document.getElementsByClassName("filtroCategoria")
    for (const filtroCategoria of filtrosCategoria) {
        filtroCategoria.addEventListener("click", () => filtrar(productosOriginal, filtroCategoria, "categoria"))
    }

    let botonComprar = document.getElementById("botonComprar")
    botonComprar.addEventListener("click", finalizarCompra)

    renderizarCarrito()
    renderizarTarjetas(productosOriginal)
}

function finalizarCompra() {
    let carrito = recuperarCarrito()
    if (carrito.length > 0) {
        localStorage.removeItem("carrito")
        renderizarCarrito()
        lanzarAlerta("Compra finalizada", "¡Muchas Gracias!", "success", null, "center", null, true)
    } else {
        alert("El carrito de compras esta vacio.")
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
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito()
}

function recuperarCarrito() {
    return localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : []
}

function renderizarCarrito(){
    let contenedor = document.getElementById("carrito")
    contenedor.innerHTML = ""
    let carrito = recuperarCarrito()
    carrito.forEach(producto => {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.innerHTML = `
        <p>${producto.nombre}</p>
        <p>$${producto.precio}</p>
        `
        contenedor.appendChild(tarjetaProducto)
    })
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

