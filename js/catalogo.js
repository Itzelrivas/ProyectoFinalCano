//Class constructora de mi catálogo
class Producto{
    constructor(producto, categoria, marca, precio, talla, codigo, imagen){
        this.producto = producto,
        this.categoria = categoria,
        this.marca = marca,
        this.precio = precio,
        this.talla = talla,
        this.codigo = codigo, 
        this.imagen = imagen
    }
}

//Aplicamos nuestra API local de los productos iniciales del catálogo
const apiProductos = async () =>{
    const resp = await fetch("catalogo.json")
    const data = await resp.json()
    data.forEach(articulo => {
        let productoApi = new Producto(articulo.producto, articulo.categoria, articulo.marca, articulo.precio, articulo.talla, articulo.codigo, articulo.imagen)
        catalogoProductos.push(productoApi)
    })
    localStorage.setItem("catalogoProductos", JSON.stringify(catalogoProductos)) 
}

//Creamos nuestro catálogo y le agregamos los productos de la API local
let catalogoProductos = [] 
if(localStorage.getItem("catalogoProductos")){
  catalogoProductos = JSON.parse(localStorage.getItem("catalogoProductos"))
}else{
  apiProductos() 
}


//Parte del DOM (inicial)
let productosDiv = document.getElementById("catProductos")
let catalogoCards = document.getElementById("botonesPri__cda--catalogo")
let oculCatalogoBtn = document.getElementById("oculCatalogo")
let filtroCatalogo = document.getElementById("filtroProductos")
let productosAgotados = document.getElementById("productosAgotados")
let presupuesto = document.getElementById("presupuesto")


//Función para mostrar los elementos de un array (nuesto catálogo) en cards
function mostrarCatalogo(array){
    productosDiv.innerHTML = ``
    for(let i=0; i<array.length; i++){
        let productoNuevoDiv = document.createElement("div")
        productoNuevoDiv.className = "col-12 col-xl-3 cardProducto"
        productoNuevoDiv.innerHTML = `<div id="${array[i].codigo}" class="card" style="width: 18rem;">
        <img class="card-img-top img-fluid" style="height: 200px;" src="imagenes/${array[i].imagen}" alt="${array[i].producto} de ${array[i].marca}">
        <div class="card-body"> 
          <h7 class="card-title">${array[i].producto}</h7>
          <p class="card-marca">MARCA: ${array[i].marca}</p>
          <p class="card-precio">PRECIO: $${array[i].precio}</p>
          <p class="card-talla">TALLA O DIMENSIONES: ${array[i].talla}</p>
          <button id="agregarPro${array[i].codigo}" class="btn btn-outline-success">Agregar al carrito</button>
          <p>Código: ${array[i].codigo}</p>
          </div>
      </div>`

      productosDiv.appendChild(productoNuevoDiv)

      let agregarPro = document.getElementById(`agregarPro${array[i].codigo}`)
      agregarPro.addEventListener("click", () => {
        agregarAlCarrito(array[i])
      })
    }
  }

  //Función que oculta el cátalogo, y todos los botones relacionados a él
  function ocultarCatalogoBoton(){
    let ocultarCatalogoBtn = document.createElement("div")
    ocultarCatalogoBtn.className = "oculCataBtn"
    ocultarCatalogoBtn.innerHTML = `<div class="oculDiv">
    <button class="btnOculDiv" id="btnOcul">Ocultar catálogo</button>
    </div>`
    oculCatalogoBtn.appendChild(ocultarCatalogoBtn)
    let botonOculCat = document.getElementById("btnOcul")
    botonOculCat.addEventListener("click", () => {
      productosDiv.innerHTML = ``
      oculCatalogoBtn.innerText = ``
      filtroCatalogo.innerText = ``
      productosAgotados.innerText = ``
      presupuesto.innerText = ``
    })
  }

 //Funcionamiento del botón catálogo al darle click
catalogoCards.addEventListener("click", ()=>{
    descuentoSeccion.innerText = ``
    aeProductosSeccion.innerText = ``
    modalBodyCarrito.innerText = ``
    carritoTotal.innerText = ``
    btnFinalizar.innerText = ``
    localStorage.setItem("catalogoProductos", JSON.stringify(catalogoProductos))
    filtrarPor()
    mostrarCatalogo(catalogoProductos)
    ocultarCatalogoBoton()
 })