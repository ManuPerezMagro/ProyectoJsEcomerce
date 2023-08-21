
// login

let account = "Manolete97"
let password = 1234

let login = () =>{
    let ingresar = false
    for(let i = 3; i > 0; i--){
        let cuentaIngresada = prompt(`Ingrese su nombre de usuario`)
        let passIngresada = +(prompt(`Ingrese su contraseña. ${i} intentos restantes`))
        if(cuentaIngresada === account && passIngresada === password){
            alert(`Login exitoso ¡Bienvenido ${account}!`)
            ingresar = true
            break
        } else {
            alert(`usuario y/o contraseña incorrectos`)
        }
    }
    return ingresar
}

const carrito = []

const productos = [
    { id: 2234, nombre: "polera susan velvet azul acero", categoria: "remeras", talle: "m", precio: 13990 },
    { id: 4523, nombre: "remeron killer gothic blanco", categoria: "remeras", talle: "l", precio: 8590 },
    { id: 1881, nombre: "parka moira", categoria: "abrigos", talle: "xl", precio: 19990 },
    { id: 2900, nombre: "saco primavera", categoria: "abrigos", talle: "m", precio: 18990 },
    { id: 1601, nombre: "pantalon sastrero azul marino", categoria: "pantalones", talle: "l", precio: 9990 },
    { id: 1114, nombre: "jean azul corte clasico", categoria: "pantalones", talle: "xl", precio: 13290 },
    { id: 2577, nombre: "piluso dd", categoria: "accesorios", talle: "m", precio: 2690 }
]
console.log(productos)

let opcion
do {
    opcion = +(prompt(`¡Bienvenido a nuestra Tienda Vintage!\n¿En que podemos ayudarte?\n1- Listar Stock\n2- Filtrar Ropa\n3- Comprar\n4- Ver carrito\n0- Salir.`))
    if (opcion === 1) {
        alert(listar(productos))
    } else if (opcion === 2) {
        let buscarProducto = prompt("¿Que producto o categoria estas buscando?")
        let productosFiltrados = productos.filter(producto => producto.nombre.includes(buscarProducto.toLowerCase()) || producto.categoria.includes(buscarProducto.toLowerCase()))
        alert(listar(productosFiltrados)) 
    } else if (opcion === 3) {
        let idIngresado = +(prompt(`Ingrese el ID del producto deseado:\n` + listar(productos)))
        detallesDelProducto(idIngresado)
        let agregar = confirm("¿quieres agregar este producto al carrito?")
        if (agregar) {
            agregarAlCarrito(carrito, idIngresado)
        }
    } else if (opcion === 4) {
        let totalCarrito = carrito.reduce((acum, producto) => acum + producto.precio, 0)
        alert(`el total de su compra es de: $${totalCarrito}`)
        alert("¡Muchas gracias por su compra!")
        break
    }
} while (opcion != 0);

// map
function listar(productos) {
    let listaProductos = productos.map(producto => `ID: ${producto.id} - Nombre: ${producto.nombre}`).join("\n")
    return listaProductos
}
// find
function detallesDelProducto(idIngresado) {
    let productoBuscado = productos.find(producto => producto.id === idIngresado)
    alert(`Nombre: ${productoBuscado.nombre}\nCategoria: ${productoBuscado.categoria}\nTalle: ${productoBuscado.talle}\nPrecio: $${productoBuscado.precio}`)
}
// push a carrito
function agregarAlCarrito(carrito, idIngresado) {
    let productoBuscado = productos.find(producto => producto.id === idIngresado)
    let productoEnCarrito = carrito.find(producto => producto.id === idIngresado)
    if (productoEnCarrito){
        alert("Este producto ya esta en el carrito.")
    } else {
    carrito.push(productoBuscado)
    alert("agregado con exito")
    }
    console.log(carrito)
}
