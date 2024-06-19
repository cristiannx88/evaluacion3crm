function agregarCliente() { 
  var id_cliente = document.getElementById("txt_id_cliente").value;
  var dv = document.getElementById("txt_dv").value;
  var nombres = document.getElementById("txt_nombres").value;
  var apellidos = document.getElementById("txt_apellidos").value;
  var email = document.getElementById("txt_email").value;
  var celular = document.getElementById("txt_celular").value;

  if (id_cliente === '' || dv === '' || nombres === '' || apellidos === '' || email === '' || celular === '') {
    document.getElementById("alertErrorNone").classList.remove("d-none");
    return;
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const fechaActual = obtenerFechaHora();

  const raw = JSON.stringify({
    "id_cliente": parseInt(id_cliente),
    "dv": dv,
    "nombres": nombres,
    "apellidos": apellidos,
    "email": email,
    "celular": parseInt(celular),
    "fecha_registro": fechaActual
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
    .then((response) => {
      if (response.status == 200) {
        document.getElementById("alertSuccess").classList.remove("d-none");
        document.getElementById("alertError").classList.add("d-none");
        document.getElementById("alertErrorNone").classList.add("d-none");
      } else {
        document.getElementById("alertError").classList.remove("d-none");
        document.getElementById("alertSuccess").classList.add("d-none");
        document.getElementById("alertErrorNone").classList.add("d-none");
      }
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("alertError").classList.remove("d-none");
      document.getElementById("alertSuccess").classList.add("d-none");
      document.getElementById("alertErrorNone").classList.add("d-none");
    });
}


function listarCliente(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_cliente').DataTable();
    }
    )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){

var fechaFormateada = formatearFechaHora(element.fecha_registro); 
arr[index] = document.querySelector("#tbl_cliente tbody").innerHTML += 
`<tr>
<td>${element.id_cliente}</td> 
<td>${element.dv}</td>
<td>${element.nombres}</td>
<td>${element.apellidos}</td>
<td>${element.email}</td>
<td>${element.celular}</td>
<td>${fechaFormateada}</td>
<td>
<a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning btn-sm'>Actualizar</a>
<a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger btn-sm'>Eliminar</a> 
</td>
</tr>` 
}
function obtenerIdActualizacion(){
  const queryString       = window.location.search;
  const parametros        = new URLSearchParams(queryString);
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;

  obtenerDatosActualizacion(p_id_cliente);
}
function obtenerIdEliminacion(){
  const queryString       = window.location.search;
  const parametros        = new URLSearchParams(queryString);
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;

  obtenerDatosEliminacion(p_id_cliente);
}
function obtenerDatosEliminacion(id_cliente) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiquetaEliminar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function obtenerDatosActualizacion(id_cliente) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormularioActualizar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarEtiquetaEliminar(element,index,arr){
  var id_cliente = element.id_cliente;
  var nombres = element.nombres;
  var apellidos = element.apellidos;
  document.getElementById('lbl_eliminar').innerHTML = `
  <b>¿Desea eliminar este cliente?</b><br>
  <b>ID:</b> ${id_cliente}, <b>Nombres:</b> ${nombres}, <b>Apellidos:</b> ${apellidos}
`;
   }

   function completarFormularioActualizar(cliente) {
    document.getElementById('txt_id_cliente').value = cliente.id_cliente;
    document.getElementById('txt_dv').value = cliente.dv;
    document.getElementById('txt_nombres').value = cliente.nombres;
    document.getElementById('txt_apellidos').value = cliente.apellidos;
    document.getElementById('txt_email').value = cliente.email;
    document.getElementById('txt_celular').value = cliente.celular;
  }
  
function actualizarCliente(){ 
  var id_cliente = document.getElementById("txt_id_cliente").value;
  var dv = document.getElementById("txt_dv").value;
  var nombres = document.getElementById("txt_nombres").value;
  var apellidos = document.getElementById("txt_apellidos").value;
  var email = document.getElementById("txt_email").value;
  var celular = document.getElementById("txt_celular").value;

 
  if (id_cliente === '' || dv === '' || nombres === '' || apellidos === '' || email === '' || celular === '') {
    document.getElementById("alertErrorNone").classList.remove("d-none");
    return;
  }


const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "id_cliente": parseInt(id_cliente), 
  "dv": dv,
  "nombres": nombres,
  "apellidos": apellidos,
  "email": email,
  "celular": parseInt(celular)
});

const requestOptions = {
method: "PATCH",
headers: myHeaders,
body: raw,
redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/cliente/"+g_id_cliente, requestOptions)
.then((response) => {
if(response.status == 200) {
  document.getElementById("alertSuccess").classList.remove("d-none");
  document.getElementById("alertError").classList.add("d-none");
  document.getElementById("alertErrorNone").classList.add("d-none");
} else {
  document.getElementById("alertError").classList.remove("d-none");
  document.getElementById("alertSuccess").classList.add("d-none");
  document.getElementById("alertError").classList.add("d-none");
}
})
.catch((error) => {
console.error(error);
document.getElementById("alertError").classList.remove("d-none");
document.getElementById("alertSuccess").classList.add("d-none");
document.getElementById("alertError").classList.add("d-none");
});
}

function eliminarCliente(){

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
method: "DELETE",
headers: myHeaders,

redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/cliente/"+g_id_cliente, requestOptions)
.then((response) => {
if(response.status == 200) {
  document.getElementById("alertSuccess").classList.remove("d-none");
  document.getElementById("alertError").classList.add("d-none");
} else {
  document.getElementById("alertError").classList.remove("d-none");
  document.getElementById("alertSuccess").classList.add("d-none");
}
})
.catch((error) => {
console.error(error);
document.getElementById("alertError").classList.remove("d-none");
document.getElementById("alertSuccess").classList.add("d-none");
});
}

function obtenerFechaHora(){
  var fechaHoraActual = new Date();
  var fechaFormateada = fechaHoraActual.toLocaleString('es-ES',{
    hour12:false,
    year:'numeric',
    month:'2-digit', 
    day:'2-digit',
    hour:'2-digit',
    minute:'2-digit', 
    second:'2-digit'
  }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');

 return fechaFormateada;
}


function formatearFechaHora(fecha_registro){
  var fechaHoraActual = new Date (fecha_registro);
  var fechaFormateada = fechaHoraActual.toLocaleString('es-ES', {
      hour12:false,
      year:'numeric',
      month:'2-digit',
      day:'2-digit',
      hour:'2-digit',
      minute:'2-digit',
      second:'2-digit',
      timeZone:'UTC'
  }).replace(/(\d+)\/(\d+)\/(\d+)\, \s*(\d+):(\d+):(\d+)/, '$3-$2-$1 $4:$5');

  return fechaFormateada;
}