function verificaDOM(){
     if (JSON.parse(localStorage.getItem('carrito')).length==0){
          const productosDesc=document.querySelector('.productosDesc')
          const h2=document.createElement('h2');
          h2.innerHTML=`UPS! Su carrito se encuentra vacío <i class="far fa-meh"></i>`
          productosDesc.appendChild(h2);
     }
}

function muestraCliente(ventas){
     let productosDesc=document.querySelector('.productosDesc');
     ventas.forEach(element => {
          let divProductos=document.createElement('div');
          divProductos.className="producto";
          divProductos.innerHTML=`
          <img src="${element.imagen}" width=100>
          <p class="name">${element.titulo}</p>
          <p>$${element.precio}</p>
          <button class="deleteItem"> x </button>
          `
          productosDesc.appendChild(divProductos);
     });
}
function actualizarLS(nombre){
     ventas=JSON.parse(localStorage.getItem('carrito'));
     const ventasActualizadas=[];
     ventas.forEach(element => {
          if (element.titulo != nombre){
               ventasActualizadas.push(element)
          }
     });
     localStorage.setItem('carrito',JSON.stringify(ventasActualizadas));
}
//(1) se recibe como parametro el NOMBRE del articulo seleccionado (unProducto / string)
//(2) se recibe todos los productos mostrados en el dom (listaProductos / HTML collections)
function borrarItem(unProducto,listaProductos){
     listaProductos.forEach(element => {
          // como se recibe el botón, se busca al padre y del padre, el contenido del nombre
          if (unProducto == element.parentNode.querySelector('.name').textContent){
               // se borra la tarjeta
               element.parentNode.remove();
          }
     });
     actualizarLS(unProducto);
     verificaDOM();
}
document.onreadystatechange = () => {
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

if (localStorage.getItem("carrito")!=null && JSON.parse(localStorage.getItem('carrito')).length!=0){
     arrayVentas=JSON.parse(localStorage.getItem('carrito'));
     console.log(JSON.parse(localStorage.getItem('carrito')).length);
     muestraCliente(arrayVentas);
} else {
     verificaDOM();
}

// formulario de carrito
function verificaEmail (correo){
     if (JSON.parse(localStorage.getItem('carrito')).length!=0){
          let arroba=correo.indexOf('@');
          let dotcom=correo.indexOf('.');
          if (arroba!=-1 && dotcom!=-1) {
               console.log('Producto enviado');
               swal("compra cargada, direccionando...", {
                    button: false,
                    timer: 3000,
                  });
                  window.location.href = "./p404.html";
               // swal({
               //      title: "La compra a sido cargada",
               //      text: "Gracias por su compra",
               //      icon: "success",
               //      buttons: false,
               //      timer: 3000,
               // });
               // borrar LS
          } else {
               swal({
                    title: "Error",
                    text: "Ingrese un email válido",
                    icon: "error",
               });
          }
     } else {
          swal({
               title: "Ojo!",
               text: "Su carrito de compras está vacío",
               icon: "warning",
          });
     }

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
          swal({
               title: "Error",
               text: "Complete los campos requeridos",
               icon: "error",
          });
     }
}
enviar.addEventListener('click',validacion)
     function validacion(e) {
          e.preventDefault();
          validacionDatos();
     }
