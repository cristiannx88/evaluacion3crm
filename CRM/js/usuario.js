function agregarUsuario() {
    var id_usuario = document.getElementById("txt_id_usuario").value;
    var dv = document.getElementById("txt_dv").value;
    var nombres = document.getElementById("txt_nombres").value;
    var apellidos = document.getElementById("txt_apellidos").value;
    var email = document.getElementById("txt_email").value;
    var celular = document.getElementById("txt_celular").value;
    var username = document.getElementById("txt_username").value;
    var password = document.getElementById("txt_password").value;

    if (id_usuario === '' || dv === '' || nombres === '' || apellidos === '' || email === '' || celular === '' || username === '' || password === '') {
        document.getElementById("alertErrorNone").classList.remove("d-none");
        return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fechaActual = obtenerFechaHora();

    const raw = JSON.stringify({
        "id_usuario": parseInt(id_usuario),
        "dv": dv,
        "nombres": nombres,
        "apellidos": apellidos,
        "email": email,
        "celular": parseInt(celular),
        "username": username,
        "password": password,
        "fecha_registro": fechaActual
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
        .then(response => {
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

function listarUsuario() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
        .then(response => response.json())
        .then(json => {
            json.forEach(completarFilaUsuario);
            $('#tbl_usuario').DataTable();
        })
        .then(result => console.log(result))
        .catch(error => console.error(error));
}

function completarFilaUsuario(element, index, arr) {
    fechaFormateada = formatearFechaHora(element.fecha_registro);
    arr[index] = document.querySelector("#tbl_usuario tbody").innerHTML +=
        `<tr>
            <td>${element.id_usuario}</td>
            <td>${element.dv}</td>
            <td>${element.nombres}</td>
            <td>${element.apellidos}</td>
            <td>${element.email}</td>
            <td>${element.celular}</td>
            <td>${element.username}</td>
            <td>${element.password}</td>
            <td>${fechaFormateada}</td>
            <td>
                <a href='actualizar.html?id=${element.id_usuario}' class='btn btn-warning btn-sm'>Actualizar</a>
                <a href='eliminar.html?id=${element.id_usuario}' class='btn btn-danger btn-sm'>Eliminar</a> 
            </td>
        </tr>`;
}

function obtenerIdActualizacion(){
    const queryString       = window.location.search;
    const parametros        = new URLSearchParams(queryString);
    const p_id_usuario = parametros.get('id');
    g_id_usuario = p_id_usuario;
  
    obtenerDatosActualizacion(p_id_usuario);
  }
  function obtenerIdEliminacion(){
    const queryString       = window.location.search;
    const parametros        = new URLSearchParams(queryString);
    const p_id_usuario = parametros.get('id');
    g_id_usuario = p_id_usuario;
  
    obtenerDatosEliminacion(p_id_usuario);
  }
  function obtenerDatosEliminacion(id_usuario) {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/usuario/"+id_usuario, requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completarEtiquetaEliminar))
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
  function obtenerDatosActualizacion(id_usuario) {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/usuario/"+id_usuario, requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completarFormularioActualizar))
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
  function completarEtiquetaEliminar(element,index,arr){ 
    var id_usuario = element.id_usuario;
    var nombres = element.nombres;
    var apellidos = element.apellidos;
    document.getElementById('lbl_eliminar').innerHTML = `
    <b>¿Desea eliminar este usuario?</b><br>
    <b>ID:</b> ${id_usuario}, <b>Nombres:</b> ${nombres}, <b>Apellidos:</b> ${apellidos}
  `;
     }
  
     function completarFormularioActualizar(usuario) { 
      document.getElementById('txt_id_usuario').value = usuario.id_usuario;
      document.getElementById('txt_dv').value = usuario.dv;
      document.getElementById('txt_nombres').value = usuario.nombres;
      document.getElementById('txt_apellidos').value = usuario.apellidos;
      document.getElementById('txt_email').value = usuario.email;
      document.getElementById('txt_celular').value = usuario.celular;
      document.getElementById('txt_username').value = usuario.username;
      document.getElementById('txt_password').value = usuario.password;
    }
    
  function actualizarUsuario(){ 
    var id_usuario = document.getElementById("txt_id_usuario").value;
    var dv = document.getElementById("txt_dv").value;
    var nombres = document.getElementById("txt_nombres").value;
    var apellidos = document.getElementById("txt_apellidos").value;
    var email = document.getElementById("txt_email").value;
    var celular = document.getElementById("txt_celular").value;
    var username = document.getElementById("txt_username").value;
    var password = document.getElementById("txt_password").value;
  

    if (id_usuario === '' || dv === '' || nombres === '' || apellidos === '' || email === '' || celular === ''|| username === ''|| password === '') {
      document.getElementById("alertErrorNone").classList.remove("d-none");
      return;
    }
  
  
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "id_usuario": parseInt(id_usuario), 
    "dv": dv,
    "nombres": nombres,
    "apellidos": apellidos,
    "email": email,
    "celular": parseInt(celular),
    "username": username,
    "password": password
  });
  
  const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+g_id_usuario, requestOptions)
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
  
  function eliminarUsuario(){
  
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  
  redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+g_id_usuario, requestOptions)
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