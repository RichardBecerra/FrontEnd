function getUserByEmailAndPass (email, pass) {
    var bookList = JSON.parse(localStorage.getItem('users')) ?? []
    var returnValue = [];
    bookList.forEach(value => {
        if(email === value.correo && pass === value.contra){
            returnValue = value;
        }
    });
    return returnValue;
}

function authenticate(event) {
    event.preventDefault();
    var usuario = document.getElementById('usuario').value;
    var contra = document.getElementById('contra').value;
    var isAuth = getUserByEmailAndPass(usuario, contra);
    if (Object.keys(isAuth).length === 0) {
        alert("Nombre de usuario o contraseña incorrecto, intentelo nuevamente");
        return false;
    }
    window.location.href = 'gestion-usuarios.html';
}
