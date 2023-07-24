//Accedemos al boton menú de mi index, el cual resetea todo y solo deja los tres botones principales: catálogo, descuento, agregar y eliminar productos
let btnMenu = document.getElementById("inicioBtnID")
btnMenu.addEventListener("click", () => {
   productosDiv.innerHTML = ``
   productosAgotados.innerText = ``
   presupuesto.innerText = ``
   oculCatalogoBtn.innerText = ``
   filtroCatalogo.innerText = ``
   descuentoSeccion.innerText = ``
   aeProductosSeccion.innerText = ``
   modalBodyCarrito.innerText = ``
   carritoTotal.innerText = ``
   btnFinalizar.innerText = ``
   
})

//Botón carrito
let productosEnCarrito 
if(localStorage.getItem("carrito")){
   productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
}else{
   //No esta en el storage
   productosEnCarrito = []
   localStorage.setItem("carrito", productosEnCarrito)
}

//Agregamos productos a nuestro array del carrito
function agregarAlCarrito(producto){
    let productoAgregado = productosEnCarrito.find((elem)=>elem.codigo == producto.codigo) 
    if(productoAgregado == undefined){
       //Sumamos al carrito el producto
       productosEnCarrito.push(producto)
       localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
 
       //Alert que indica que ya se agregó el producto seleccionado
       Swal.fire({
          title: `Ha agregado un producto a su carrito.`,
          text:`${producto.producto} ha sido agregado.`,
          confirmButtonColor: "black",
          confirmButtonText : "Gracias",
          imageUrl: `imagenes/${producto.imagen}`,
          imageHeight: 200
 
       })
    }else{
       //El producto seleccionado ya está en el carrito
       Swal.fire({
          title: `${producto.producto} ya existe en el carrito`,
          icon: "info",
          timer: 2000,
          showConfirmButton: false
 
       })
    }
}

//Aparecen cards mostrando los productos del carrito 
let modalBodyCarrito = document.getElementById("carrito")
let carritoTotal = document.getElementById("totalCarritoID")
let btnFinalizar = document.getElementById("finalizarCompra")
function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ``
    array.forEach((productoCarrito)=>{
       modalBodyCarrito.innerHTML += `<div id="productoCarrito${productoCarrito.codigo}" class="col-12 col-xl-3 card cardCarrito" style="width: 18rem;">
        <div class="">
            <img class="card-img-top img-fluid" style="height: 200px;" src="imagenes/${productoCarrito.imagen}" alt="${productoCarrito.imagen}">
            <div class="card-body"> 
                <h4>${productoCarrito.producto}</h4>
                <p>MARCA: ${productoCarrito.marca}</p>
                <p>PRECIO: $${productoCarrito.precio}</p>
                <p>TALLA O DIMENSIONES: ${productoCarrito.talla}</p>
                <button id="botonEliminar${productoCarrito.codigo}" class="btn btn-danger">Eliminar producto</button>
            </div>
        </div>
    </div>`
    })
    //Funcionamiento del botón eliminar producto
    array.forEach((productoCarrito) => {
       document.getElementById(`botonEliminar${productoCarrito.codigo}`).addEventListener("click", () => {
          //Se borra del DOM
          let cardProducto = document.getElementById(`productoCarrito${productoCarrito.codigo}`)
          cardProducto.remove()
          //Se borra del array del carrito
          let productoEliminar = array.find((producto) => producto.codigo == productoCarrito.codigo)
          let posicion = array.indexOf(productoEliminar)
          array.splice(posicion,1)
          //Actualizamos el storage
          localStorage.setItem("carrito", JSON.stringify(array))
 
          //Calculamos el total
          calcularTotal(array)
       })
    })
    calcularTotal(array)
    
    //Botón finalizar compra 
    let totalFinal = productosEnCarrito.reduce((acc, productoCarrito)=> acc + productoCarrito.precio , 0)
    //Solo aparece cuando el total es disntinto a cero
    if(totalFinal != 0){
      btnFinalizar.innerHTML = `<button id="botonFinalizar" class="botonFinalizarClass">Finalizar Compra</button>`

      document.getElementById("botonFinalizar").addEventListener("click", () => {
         if(localStorage.getItem("codigosDescuento")){
            codigosDescuento = JSON.parse(localStorage.getItem("codigosDescuento"))
         }
         else{
            codigosDescuento.forEach(objeto =>{
               codigosDescuento.push(objeto)
            })
            localStorage.setItem("codigosDescuento", JSON.stringify(codigosDescuento)) 
         }
      
         const funFinalizar = async () =>{
            const { value: codDescuento } = await Swal.fire({
            title: 'Estas a punto de finalizar tu compra...',
            input: 'text',
            inputLabel: 'Si tienes un código de descuento vigente, ingresalo aquí para que se aplique. En caso contrario, solo da click en el botón "continuar" :)',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Continuar",
            confirmButtonColor: "rgb(183, 152, 116)",
            cancelButtonColor: "black",
            inputValidator: (value) => {
               //Esto es cuando los usuarios no tienen ningún código de descuento y no escriben nada en el input
               if (!value) {
                  Swal.fire({
                     title: `¡Muchas gracias por comprar en Pancho Ross!. El total a pagar es de <strong>$${totalFinal}</strong>`,
                     html: `<button id="finalizarCarritoSD" class="finalizarBtnClass">Finalizar compra</button>`,
                     showConfirmButton:false
                  })
                  //Cuando hagan click en el botón finalizar compra, se resetea todo el carrito
                  let finalizarSD = document.getElementById("finalizarCarritoSD")
                  finalizarSD.addEventListener("click", () => {
                     //Limpiamos el array del carrito
                     productosEnCarrito = []
                     localStorage.setItem("carrito", productosEnCarrito)
                     //Limpiamos nuestra sección de carrito y eliminamos las cards
                     modalBodyCarrito.innerHTML = ``
                     carritoTotal.innerText = ``
                     cargarProductosCarrito(productosEnCarrito)
                     btnFinalizar.innerText = ``
                  })
               }}
            })
            
            if (codDescuento){
               let a=0
               let b
               for(let i=0; i<codigosDescuento.length; i++){
                  if(codigosDescuento[i] == codDescuento){
                     a++
                     b=i
                     Swal.fire({
                        title: `Tu codigo de descuento fue aplicado exitosamente. El total a pagar es de <strong>$${totalFinal*0.9}</strong>`,
                        html: `<button id="finalizarCarrito" class="finalizarBtnClass">Finalizar compra</button>`,
                        showConfirmButton:false
                     })
                     let finalizarBtn = document.getElementById("finalizarCarrito")
                     finalizarBtn.addEventListener("click", () => {
                        //Eliminamos el código de descuento para que no se pueda aplicar más de una vez
                        codigosDescuento.splice(b,1)
                        localStorage.setItem("codigosDescuento", JSON.stringify(codigosDescuento))
                        //Limpiamos el array del carrito
                        productosEnCarrito = []
                        localStorage.setItem("carrito", productosEnCarrito)
                        //Limpiamos nuestra sección de carrito y eliminamos las cards
                        modalBodyCarrito.innerHTML = ``
                        carritoTotal.innerText = ``
                        cargarProductosCarrito(productosEnCarrito)
                        btnFinalizar.innerText = ``
                     })
                     break
                  }
               }

               //El código de descuento no es válido
               if(a == 0){
                  Swal.fire({
                     title: `¡Oh no! El código de descuento que ingresaste ya no es válido. El total a pagar es de <strong>$${totalFinal}</strong>`,
                     html: `<button id="finalizarCarritoSD" class="finalizarBtnClass">Finalizar compra</button>`,
                     showConfirmButton:false
                  })
                  //Cuando hagan click en el botón finalizar compra, se resetea todo el carrito
                  let finalizarSD = document.getElementById("finalizarCarritoSD")
                  finalizarSD.addEventListener("click", () => {
                     //Limpiamos el array del carrito
                     productosEnCarrito = []
                     localStorage.setItem("carrito", productosEnCarrito)
                     //Limpiamos nuestra sección de carrito y eliminamos las cards
                     modalBodyCarrito.innerHTML = ``
                     carritoTotal.innerText = ``
                     cargarProductosCarrito(productosEnCarrito)
                     btnFinalizar.innerText = ``
                  })
               }
            }
         }
         funFinalizar()
      })
   }
}
 
 //Función para calcular el total de los productos del carrito
 function calcularTotal(array){
    let total = array.reduce((acc, productoCarrito)=> acc + productoCarrito.precio , 0)
    if(total == 0){
      Swal.fire({
         title: `No hay productos en el carrito`,
         icon: "warning",
         timer: 2000,
         showConfirmButton: false
      })
      carritoTotal.innerText = ``
    }
    else{
        carritoTotal.innerHTML = `<div class="totalCarrito">
            <h3>El total es $<strong>${total}</strong></h3>
        </div>`
    }
 }

//El botón del carrito resetea para que solo aparezcan las cards de los productos del carrito y el total
let btnCarrito = document.getElementById("carritoBtnID")
btnCarrito.addEventListener("click", () => {
    productosDiv.innerHTML = ``
    productosAgotados.innerText = ``
    presupuesto.innerText = ``
    oculCatalogoBtn.innerText = ``
    filtroCatalogo.innerText = ``
    descuentoSeccion.innerText = ``
    aeProductosSeccion.innerText = ``
    carritoTotal.innerText = ``
    cargarProductosCarrito(productosEnCarrito)
})