// e-comerce de ropa de segunda mano

/*
    *login
    *compra
    *carrito
*/
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

// compra con carrito incluido
if(login()){
    let carrito = 0
    let pantalon = 7000
    let camisa = 4000
    let tapado = 12000
    let botas = 14000
    let option = prompt(`Somos Style Vintage, y este es nuestro stock:
                        \n 1- Pantalon Cargo Verde: $7000
                        \n 2- Camisa Reptil Vintage: $4000
                        \n 3- Tapado Simil Piel Blanco: $12000
                        \n 4- Botas Cuero Gastado Negras: $14000
                        \n Escribe "salir" para cancelar compra.`).toLowerCase()
    while(option != "salir"){
        switch(option){
            case "1":
                pantalon = pantalon * 1.21
                carrito += pantalon
                alert(`Agregado al Carrito! Monto actual: $${carrito} (IVA incluido)`)
                break
            case "2":
                camisa = camisa * 1.21
                carrito += camisa
                alert(`Agregado al Carrito! Monto actual: $${carrito} (IVA incluido)`)
                break
            case "3":
                tapado = tapado * 1.21
                carrito += tapado
                alert(`Agregado al Carrito! Monto actual: $${carrito} (IVA incluido)`)
                break
            case "4":
                botas = botas * 1.21
                carrito += botas
                alert(`Agregado al Carrito! Monto actual: $${carrito} (IVA incluido)`)
                break
            default:
                alert("opcion invalida")
                break
        }
        option = prompt(`Somos Style Vintage, y este es nuestro stock:
                        \n 1- Pantalon Cargo Verde: $7000
                        \n 2- Camisa Reptil Vintage: $4000
                        \n 3- Tapado Simil Piel Blanco: $12000
                        \n 4- Botas Cuero Gastado Negras: $14000
                        \n Escribe "salir" para cancelar compra.`).toLowerCase()
    }
}else{
    console.log("No quedan mas intentos, prueba mas tarde.")
}
