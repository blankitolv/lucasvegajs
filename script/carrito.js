document.onreadystatechange = () => {
     eventBorrar();
     eventInputCantidad();
     enviar.addEventListener('click',validacion)
}

//si el LS no está vacío ni su tamaño es igual a 0
if (localStorage!=null && localStorage.length!=0){
     console.log(localStorage.length);
     let arrayVentas=JSON.parse(localStorage.getItem('carrito'));
     //muestra las ventas
     muestraCliente(arrayVentas);
} else {
     verificaDOM();
}

// si no hay elementos en el carrito, se muestra una leyenda "ups, su carrito se encuentra vacío"
function verificaDOM(){
     if (JSON.parse(localStorage.getItem('carrito'))==null || JSON.parse(localStorage.getItem('carrito'))==false || JSON.parse(localStorage.getItem('carrito')).length==0){
          const productosDesc=document.querySelector('.productosDesc')
          const h2=document.createElement('h2');
          h2.innerHTML=`UPS! Su carrito se encuentra vacío <i class="far fa-meh"></i>`
          productosDesc.appendChild(h2);
          localStorage.clear();
     }
}

// se reciben las venta y se muestran
function muestraCliente(ventas){
     let productosDesc=document.querySelector('.productosDesc');
     ventas.forEach(element => {
          let divProductos=document.createElement('div');
          divProductos.className="producto";
          divProductos.innerHTML=`
          <img src="${element.imagen}" width=100>
          <p class="name">${element.titulo}</p>
          <p>$${element.precio}</p>
          <input type="number" class="cantidad" name="cant" min="0" max="999" value="${element.cant}">
          <button class="deleteItem"> X </button>
          `
          productosDesc.appendChild(divProductos);
     });
     actualizaMonto();
}

//cuando elimina un producto, arma otro array salteando ese articulo y lo cologa en LS
function actualizarLS(nombre){
     ventas=JSON.parse(localStorage.getItem('carrito'));
     const ventasActualizadas=[];
     ventas.forEach(element => {
          if (element.titulo != nombre){
               ventasActualizadas.push(element)
          }
     });
     localStorage.setItem('carrito',JSON.stringify(ventasActualizadas));
     //actualiza el monto
     actualizaMonto();
}

//(1) se recibe como parametro el NOMBRE del articulo seleccionado (unProducto / string)
//(2) se recibe todos los productos mostrados en el dom (listaProductos / HTML collections)
function borrarItem(unProducto,listaProductos){
     listaProductos.forEach(element => {
          // como recibe el [botón], se compara el nombre del padre.
          if (unProducto == element.parentNode.querySelector('.name').textContent){
               element.parentNode.remove();
          }
     });
     actualizarLS(unProducto);
     verificaDOM();
}

//evento de borrar/eliminar articulo
function eventBorrar(){
     if (document.readyState === 'complete') {
          let deleteItem=document.querySelectorAll('.deleteItem');
          deleteItem.forEach(element => {
               element.addEventListener('click',nombreItemBorrar)
               function nombreItemBorrar(e){
                    e.preventDefault();
                    let nombreBorrar=(e.target.parentNode).querySelector('.name').textContent;
                    borrarItem((e.target.parentNode).querySelector('.name').textContent,deleteItem)
               }               
          });
     }
}

//crea evento de un input de cantidad y toma el valor
function eventInputCantidad(){
     let inputcantidad=document.querySelectorAll('.producto input')
     inputcantidad.forEach(element => {
          element.addEventListener('change',cantidad)
          function cantidad(e){
               e.preventDefault();
               //ubica el nombre del producto
               let nombreCantidad=(element.parentElement.querySelector('.name').innerHTML);
               enviarCantidad(Number (this.value),nombreCantidad)
          }
     });
}

// con el nombre (param) ubica el producto y modifica la cantidad de ese producto.
function enviarCantidad(cantidad, nombre){
     ventas=JSON.parse(localStorage.getItem('carrito'));
     ventas.forEach(element => {
          if (element.titulo==nombre){
               element.cant=cantidad;
          }
     });
     localStorage.setItem('carrito',JSON.stringify(ventas));
     actualizaMonto();
}

//monto de los articulos comprados
function actualizaMonto(){
     ventas=JSON.parse(localStorage.getItem('carrito'));
     let aux=0;
     ventas.forEach(element => {
          aux+=element.precio*element.cant;
     });
     const etiquetaPrecio=document.querySelector('#precio');
     etiquetaPrecio.innerHTML=`$${aux}`;
     etiquetaPrecio.setAttribute("style","font-size:20px");
}

// formulario del carrito
function verificaEmail (correo){
     if (JSON.parse(localStorage.getItem('carrito'))){
          let arroba=correo.indexOf('@');
          let dotcom=correo.indexOf('.');
          if (arroba!=-1 && dotcom!=-1) {
               // compra finalizada correctamente
               Swal.fire("compra cargada, direccionando...", {
                    icon: "success",
                    button: false,
                    timer: 3000,
                    backdrop: `rgba(253, 255, 150, 0.100)`,
               },2000);
                    window.location.href = "./success.html";
                    //una vez finalizada exitosamente la venta, limpia el LS
                    localStorage.clear();
          } else {
               //error alerta por email válido
               Swal.fire({
                    title: "Error",
                    backdrop: 'rgba(253, 255, 150, 0.9)',
                    text: "Ingrese un email válido",
                    icon: "error",
               });
          }
     } else {
          //error alerta por carrito vacío
          Swal.fire({
               title: "Ojo!",
               text: "Su carrito de compras está vacío",
               icon: "warning",
               backdrop: `rgba(253, 255, 150, 0.100)`,
               footer: '<a href="./productos.html#cant-articulos">VER PRODUCTOS DISPONIBLES</a>',

          });
     }

}

// crea el evento del botón [realizar compra]
function validacion(e) {
     e.preventDefault();
     validacionDatos();
}
const nombreCompleto=document.querySelector('#nombreCompleto');
const empresa=document.querySelector('#empresa');
const telefono=document.querySelector('#telefono');
const correo=document.querySelector('#correo');
const localidad=document.querySelector('#localidad');
const direccion=document.querySelector('#direccion');
const notas=document.querySelector('#notas');
const enviar=document.querySelector('#enviar');
function validacionDatos(){
     if (nombreCompleto.value!='' && empresa.value!='' && telefono.value!='' && correo.value!='' && localidad.placeholder.value!='Localidad' && direccion.value!='') {
          verificaEmail(correo.value);
     } else {
          // si no están todos los campos "completos" muestra error
          swal({
               title: "Error",
               text: "Complete los campos requeridos",
               icon: "error",
          });
     }
}

// animación jquery botón [enviar]
$(()=>{
     	// mouseleave
     $('#enviar').on( "mouseenter", function(){
          $(this).css({
               'transition':'1s',
               'background-color':"rgba(50, 70, 94, 0.65)"
          })
     })
     $('#enviar').on( "mouseleave", function(){
          $(this).css({
               'transition':'0.5s',
               'background-color':"rgba(48, 131, 48, 0.856)"
          })
     });
})