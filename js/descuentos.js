//Adquirimos acceso a algunas secciones del HTML 
let descuentosBtn = document.getElementById("botonesPri__cda--descuentos")
let descuentoSeccion = document.getElementById("descuentosSeccion")

//Array del correo de los clientes
let clientes = []
let codigosDescuento = []

//Botón de descuentos 
descuentosBtn.addEventListener("click", () => {

    //Seteamos el array de correos de clientes
    if(localStorage.getItem("clientes")){
        clientes = JSON.parse(localStorage.getItem("clientes"))
    }else{
        for(let i=0; i<clientes.length; i++){
            clientes.push(clientes[i])
        }
        localStorage.setItem("clientes", JSON.stringify(clientes))
    }

    //Reseteamos todo para que no se encimen
    productosDiv.innerHTML = ``
    productosAgotados.innerText = ``
    presupuesto.innerText = ``
    oculCatalogoBtn.innerText = ``
    filtroCatalogo.innerText = ``
    aeProductosSeccion.innerText = ``
    modalBodyCarrito.innerText = ``
    carritoTotal.innerText = ``
    btnFinalizar.innerText = ``
    
    //Alert inicial de la sección de descuentos
    Swal.fire({
        title: 'Registrate para obtener un 10% en tu primera compra :)',
        width: 350,
        padding: '3em',
        background: '#fffdf5',
        confirmButtonColor: 'black',
        showClass: {
            popup: 'animate__animated animate__fadeInLeft'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutRight'
        },
        backdrop: `
          rgba(255, 240, 212, 0.731)
          url("imagenes/descuento.gif")
          right top
          no-repeat
          `
      })
    
    //Formulario para obtener un código de descuento
    let descuentoSeccionDiv = document.createElement("div")
    descuentoSeccionDiv.className = "descuentoSeccionBtns"
    descuentoSeccionDiv.innerHTML = `<div>
    <label class="descuentoLabel">Ingresa tu correo electrónico: <input id="descuentoUsuario" type="text"></label><br>
    <button id="botonDescuento" class="descuentoLabel descuentoBtn">Obtener código :)</button>
    </div>`
    descuentoSeccion.appendChild(descuentoSeccionDiv)

    let btnDescuento = document.getElementById("botonDescuento")
    btnDescuento.addEventListener("click", () => {
        let correoUsuario = document.getElementById("descuentoUsuario").value
        let a=0
        for(let i=0; i < clientes.length; i++)
        {
            //Ese correo ya esta registrado y NO se brinda un código de descuento
            if(clientes[i] == correoUsuario)
            {
                Swal.fire({
                    icon: 'warning',
                    iconColor: "rgb(139, 10, 10)",
                    title: 'Lo sentimos, ya has tramitado tu código de descuento por primera compra antes.',
                    confirmButtonText: "Continuar :(",
                    confirmButtonColor: "rgb(139, 10, 10)"
                })
                a++
                break
            }
        }
        //Ese correo no esta registrado, se brinda un código de descuento y se pushea al array de clientes
        if(a==0){
            if(localStorage.getItem("codigosDescuento")){
                codigosDescuento = JSON.parse(localStorage.getItem("codigosDescuento"))
            }else{
                codigosDescuento.forEach(objeto =>{
                    codigosDescuento.push(objeto)
                })
                localStorage.setItem("codigosDescuento", JSON.stringify(codigosDescuento)) 
            }
            
            Swal.fire({
                icon: 'success',
                iconColor: "rgb(183, 152, 116)",
                title: `Tu código de descuento es <strong>primCompra${clientes.length + 1}</strong>`,
                text: 'Usalo en tu primera compra para obtener un 10% de descuento. Recuerda que solamente puedes utilizar tu código una vez :)',
                footer: '<h5 class="footerDescuento">¡Muchas gracias por interesarte en nuestros productos!</h5>',
                confirmButtonText: "Muy bien",
                confirmButtonColor: "rgb(183, 152, 116)",
                backdrop: `rgba(189, 206, 248, 0.605)`
            })
            //Se pushea el código y el usuario a sus arrays correspondientes
            clientes.push(correoUsuario)
            localStorage.setItem("clientes", JSON.stringify(clientes))
            let codigo = `primCompra${clientes.length}`
            codigosDescuento.push(codigo)
            localStorage.setItem("codigosDescuento", JSON.stringify(codigosDescuento))
        }
    })
})