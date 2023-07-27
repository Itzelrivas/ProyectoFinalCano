//Accedemos al boton menú de mi index, el cual resetea todo y solo deja los tres botones principales: catálogo, descuento, agregar y eliminar productos. Además, aparece un alert de bienvenida
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
   
   Swal.fire({
      title: `¡Bienvenid@ a Pancho Ross!`,
      text:`Nos hace muy felices que te intereses por nuestros productos, es por eso, que si esta es tu primera vez comprando por la plataforma, ve a la sección de "descuentos" para tramitar tu código de 10% de descuento :)`,
      showConfirmButton: false,
      width: 700,
      imageUrl: `imagenes/inicio.jpeg`,
      imageHeight: 400,
      showClass: {
         popup: 'animate__animated animate__zoomIn'
      },
      hideClass: {
         popup: 'animate__animated animate__zoomOutDown'
      },
      backdrop: `rgba(183, 152, 116, 0.637)`
    })
})

//Botón carrito
let productosEnCarrito 
if(localStorage.getItem("productosEnCarrito")){
   productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito"))
}else{
   //No esta en el storage
   productosEnCarrito = []
   localStorage.setItem("productosEnCarrito", productosEnCarrito)
}

//Agregamos productos a nuestro array del carrito
function agregarAlCarrito(producto){
    let productoAgregado = productosEnCarrito.find((elem)=>elem.codigo == producto.codigo) 
    if(productoAgregado == undefined){
       //Sumamos al carrito el producto
       productosEnCarrito.push(producto)
       localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))
 
       //Alert que indica que ya se agregó el producto seleccionado
       Swal.fire({
         title: `Ha agregado un producto a su carrito.`,
         text:`${producto.producto} ha sido agregado. Para finalizar su compra debe dar click al botón del carrito, que se encuentra en la parte superior.`,
         confirmButtonColor: "black",
         confirmButtonText : "Continuar :)",
         imageUrl: `imagenes/${producto.imagen}`,
         imageHeight: 200,
         showClass: {
            popup: 'animate__animated animate__flipInY'
         },
         backdrop: `rgba(183, 152, 116, 0.637)`
       })
    }else{
       //El producto seleccionado ya está en el carrito
       Swal.fire({
          title: `${producto.producto} ya existe en el carrito`,
          imageUrl: `imagenes/carritoInfo.png`,
          imageHeight: 100,
          timer: 2000,
          showConfirmButton: false,
          backdrop: `
          rgba(139, 10, 10, 0.564)
          url("imagenes/carrito.gif")
          right top
          no-repeat
          `
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
      let modalCarrito = document.createElement("div")
      modalCarrito.className = "col-12 col-xl-3 cardCarrito"
       modalCarrito.innerHTML += `<div id="productoCarrito${productoCarrito.codigo}" class="card" style="width: 18rem;">
         <img class="card-img-top img-fluid" style="height: 200px;" src="imagenes/${productoCarrito.imagen}" alt="${productoCarrito.imagen}">
         <div class="card-body"> 
            <h4>${productoCarrito.producto}</h4>
            <p>MARCA: ${productoCarrito.marca}</p>
            <p>PRECIO: $${productoCarrito.precio}</p>
            <p>TALLA O DIMENSIONES: ${productoCarrito.talla}</p>
            <button id="botonEliminar${productoCarrito.codigo}" class="btn btn-danger">Eliminar producto</button>
         </div>
      </div>`

      modalBodyCarrito.appendChild(modalCarrito)
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
          localStorage.setItem("productosEnCarrito", JSON.stringify(array))
 
          //Calculamos el total
          calcularTotal(array)

          //Si eliminamos todos los productos del carrito, se elimina el botón "finalizar compra"
         if(totalFinal == 0){
            btnFinalizar.innerText = ``
         }
       })
    })
    calcularTotal(array)
    
    //Botón finalizar compra. Solo aparece cuando el total es disntinto a cero
    if(totalFinal != 0){
      //Agregamos un botoncito para finalizar la compra
      btnFinalizar.innerHTML = `<button id="botonFinalizar" class="botonFinalizarClass">Finalizar Compra</button>`

      document.getElementById("botonFinalizar").addEventListener("click", () => {
         //Seteamos nuestro array de los códigos de descuento
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
            //Alert para poner un código de descuento, y que el total se modifique 
            const { value: codDescuento } = await Swal.fire({
            title: 'Estas a punto de finalizar tu compra...',
            input: 'text',
            inputLabel: 'Si tienes un código de descuento vigente, ingresalo aquí para que se aplique. En caso contrario, solo da click en el botón "continuar" :)',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Continuar",
            confirmButtonColor: "rgb(183, 152, 116)",
            cancelButtonColor: "black",
            })
            
            if (codDescuento){
               let a=0
               let b
               for(let i=0; i<codigosDescuento.length; i++){
                  //El código ingresado es válido
                  if(codigosDescuento[i] == codDescuento){
                     a++
                     b=i
                     Swal.fire({
                        imageUrl: `imagenes/logoNegro_PanchoRoss.png`,
                        imageHeight: 100,
                        title: `Tu código de descuento fue aplicado exitosamente. El total a pagar es de <strong>$${totalFinal*0.9}</strong>`,
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
                        localStorage.setItem("productosEnCarrito", productosEnCarrito)
                        //Limpiamos nuestra sección de carrito y eliminamos las cards
                        modalBodyCarrito.innerHTML = ``
                        carritoTotal.innerText = ``
                        cargarProductosCarrito(productosEnCarrito)
                        btnFinalizar.innerText = ``

                        //Aparece una notificación de que la compra fue realizada con éxito
                        setTimeout(() => {
                           Toastify({
                              text:"Tu compra fue realizada exitosamente",
                              duration: 4000,
                              style: {
                                 background: "rgb(139, 10, 10)"
                              }
                           }).showToast();
                        }, 2000)
                     })
                     break
                  }
               }

               //El código de descuento no es válido
               if(a == 0){
                  Swal.fire({
                     imageUrl: `imagenes/logoNegro_PanchoRoss.png`,
                     imageHeight: 100,
                     title: `¡Oh no! El código de descuento que ingresaste ya no es válido. El total a pagar es de <strong>$${totalFinal}</strong>`,
                     html: `<button id="finalizarCarritoSD" class="finalizarBtnClass">Finalizar compra</button>`,
                     showConfirmButton:false
                  })
                  //Cuando hagan click en el botón finalizar compra, se resetea todo el carrito
                  let finalizarSD = document.getElementById("finalizarCarritoSD")
                  finalizarSD.addEventListener("click", () => {
                     //Limpiamos el array del carrito
                     productosEnCarrito = []
                     localStorage.setItem("productosEnCarrito", productosEnCarrito)
                     //Limpiamos nuestra sección de carrito y eliminamos las cards
                     modalBodyCarrito.innerHTML = ``
                     carritoTotal.innerText = ``
                     cargarProductosCarrito(productosEnCarrito)
                     btnFinalizar.innerText = ``

                     //Aparece una notificación de que la compra fue realizada con éxito
                     setTimeout(() => {
                        Toastify({
                           text:"Tu compra fue realizada exitosamente",
                           duration: 4000,
                           style: {
                              background: "rgb(139, 10, 10)"
                           }
                        }).showToast();
                     }, 2000)
                  })
               }
            }
            //El usuario NO ingresa ningún código de descuento
            else{
               Swal.fire({
                     title: `¡Muchas gracias por comprar en Pancho Ross!`,
                     imageUrl: `imagenes/logoNegro_PanchoRoss.png`,
                     imageHeight: 100,
                     html: `<div>
                              <h3>El total a pagar es de <strong>$${totalFinal}</strong></h3>
                           </div>
                           <div>
                              <button id="finalizarCarritoSD" class="finalizarBtnClass">Finalizar compra</button>
                           </div>`,
                     showConfirmButton:false
               })
               //Cuando hagan click en el botón finalizar compra, se resetea todo el carrito
               let finalizarSD = document.getElementById("finalizarCarritoSD")
               finalizarSD.addEventListener("click", () => {
                  //Limpiamos el array del carrito
                  productosEnCarrito = []
                  localStorage.setItem("productosEnCarrito", productosEnCarrito)
                  //Limpiamos nuestra sección de carrito y eliminamos las cards
                  modalBodyCarrito.innerHTML = ``
                  carritoTotal.innerText = ``
                  cargarProductosCarrito(productosEnCarrito)
                  btnFinalizar.innerText = ``

                  //Aparece una notificación de que la compra fue realizada con éxito
                  setTimeout(() => {
                     Toastify({
                        text:"Tu compra fue realizada exitosamente",
                        duration: 4000,
                        style: {
                           background: "rgb(139, 10, 10)"
                        }
                     }).showToast();
                  }, 2000)
               })
            }
         }
         funFinalizar()
      })
   }
}
 
 //Función para calcular el total de los productos del carrito
 let totalFinal = 0
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
    totalFinal = total
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