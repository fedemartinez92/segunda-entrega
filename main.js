class producto {
    constructor (id, marca, tipo, precio, imagen){
        this.id = id
        this.marca = marca
        this.tipo = tipo
        this.precio = precio
        this.imagen = imagen
    }
    verData(){
        console.log(`el suplemento es ${this.tipo}, de la marca ${this.marca} y su precio es ${this.precio}.`)
    }
}

const producto1 = new producto(1,"StarNutrition","Creatina", 900, "creatina.jpg")

const producto2 = new producto(2,"MyProtein","Creatina", 1200, "creatinamy.jfif")

const producto3 = new producto(3,"StarNutrition", "Proteina", 3000, "proteina.jpg")

const producto4 = new producto(4,"MyProtein","Proteina", 3500, "proteinamy.jfif")

const producto5 = new producto(5,"StarNutrition", "Quemador", 2200, "quemador.jpg")

const producto6 = new producto(6,"MyProtein", "Quemador", 2900, "quemadormy.jfif")


let tienda =[]
let productosEnCarrito = []

//STORAGE
if(localStorage.getItem("tienda")){
    tienda = JSON.parse(localStorage.getItem("tienda"))
}
else{
    tienda.push(producto1, producto2, producto3, producto4, producto5, producto6)
    localStorage.setItem("tienda", JSON.stringify(tienda))
}


let divProductos = document.getElementById("productos")

//FUNCION PARA VER LOS PRODUCTOS
function verProductos (array){
    divProductos.innerHTML = ""
    array.forEach((producto) => {
        let nuevoProducto = document.createElement("div")
        nuevoProducto.innerHTML =   
                            `<div id="${producto.id}" class="card" style="width: 16rem;">
                                <img class="card-img-top" style="height: 200px;" src="./assets/${producto.imagen}" alt="${producto.tipo} de ${producto.marca}">
                                <div class="card-body text-center">
                                    <h4 class="card-title">${producto.tipo}</h4>
                                    <p>Marca: ${producto.marca}</p>
                                    <p class="">Precio: $${producto.precio}</p>
                                    <button id=btnCompra${producto.id} class="btn btn-success btnComprar">Agregar al carrito</button>
                                </div>
                            </div>`
        divProductos.append(nuevoProducto)

        let btnCompra = document.getElementById(`btnCompra${producto.id}`)
        btnCompra.addEventListener("click", ()=>{
            agregarAlCarrito(producto)
            localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
        })
    })
}

let btnMostrar = document.getElementById("btnMostrar")
btnMostrar.addEventListener("click", ()=>{
    verProductos(tienda)
})

//FUNCION AGREGAR PRODUCTOS AL CARRITO
function agregarAlCarrito(producto){
    productosEnCarrito.push(producto)
}

//DOM CARRITO
let btnCarrito = document.getElementById("btnCarrito")
let modalBody = document.getElementById("modalBody")
let btnFinalizarCompra = document.getElementById("btnFinalizarCompra")
let pSumaCarrito = document.getElementById('pSumaCarrito')

function cargarProductosCarrito(array){
    modalBody.innerHTML = ""
    array.forEach((produ) => {
    modalBody.innerHTML +=  `<div class="card border-primary mb-3 cardCarrito" id ="productoCarrito${produ.id}" style="max-width: 200px;">
                                <div class=d-flex>
                                    <img class="card-img-top" src="assets/${produ.imagen}" alt="${produ.tipo}">
                                
                                    <div class="card-body ms-3">
                                        <h4 class="card-title">${produ.tipo}</h4>
                                        <p class="card-text">${produ.marca}</p> 
                                        <p class="card-text">$${produ.precio}</p> 
                                        <button id="btnEliminar${produ.id}" class="btn btn-danger" ><i class="fas fa-trash-alt"></i></button>
                                    </div>
                                </div>    
                            </div>`
        })
    compraTotal(array)
}

btnCarrito.addEventListener("click", ()=>{
    let productosStorage = JSON.parse(localStorage.getItem("productosEnCarrito"))
    if (productosStorage) {
        productosEnCarrito = productosStorage
        cargarProductosCarrito(productosEnCarrito)
    }else{
        pSumaCarrito.innerHTML = "<p>NO HAY PRODUCTOS EN EL CARRITO</p>"
    }
    //cargarProductosCarrito(productosEnCarrito)
})

//FUNCION SUMAR TOTAL CARRITO
function compraTotal(array){
    let acumulador = 0

    acumulador = array.reduce((acumulador, produ)=>{
        return acumulador + produ.precio
    },0)
    if (acumulador == 0){
        //pSumaCarrito.innerHTML = "<p>NO HAY PRODUCTOS EN EL CARRITO</p>"
}   else{
        pSumaCarrito.innerHTML = `EL TOTAL DE SU COMPRA ES $${acumulador}`
    }
}

//FUNCION PARA AGREGAR PRODUCTOS
function crearProducto(array){
    let inputMarca = document.getElementById("inputMarca")
    let inputTipo = document.getElementById("inputTipo")
    let inputPrecio = document.getElementById("inputPrecio")
    let nuevoProd = new producto(array.length+1, inputMarca.value, inputTipo.value, inputPrecio.value, "images.jfif")
    array.push(nuevoProd)
    localStorage.setItem("tienda", JSON.stringify(array))
    inputMarca.value = ""
    inputTipo.value = ""
    inputPrecio.value = ""
    verProductos(array)
}

let btnGuardar = document.getElementById("btnAgregar")
btnGuardar.addEventListener("click", ()=>{
    crearProducto(tienda)
})


//FUNCION OCULTAR PRODUCTOS

function ocultarProductos(){
    divProductos.innerHTML = ""
}

let btnOcultar = document.getElementById("btnOcultar")
btnOcultar.addEventListener("click", ()=>{
    ocultarProductos()
})

//FUNCION PARA BUSQUEDA DE PRODUCTOS

let h2Busqueda = document.getElementById("h2Busqueda")
function busquedaFiltrada (){
        let buscarProducto = document.getElementById("inputBuscar")
        let busqueda = tienda.filter((producto)=> producto.marca.toLowerCase().includes(buscarProducto.value.toLowerCase())
        || producto.tipo.toLowerCase().includes(buscarProducto.value.toLowerCase()) )
        if(busqueda.length == 0){
            h2Busqueda.innerHTML = "SU PRODUCTO NO FUE ENCONTRADO, REVISE NUETRO CATALOGO..."
            verProductos(tienda)
        }else{
            for(let productosEncotrados of busqueda){
                h2Busqueda.innerHTML = ""
                verProductos(busqueda)
            }
        }
    }

    btnBuscar = document.getElementById("btnBuscar")
    btnBuscar.addEventListener("click", ()=>{
        busquedaFiltrada(tienda)
    })



verProductos(tienda)