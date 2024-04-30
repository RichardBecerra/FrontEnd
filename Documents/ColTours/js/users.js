
window.addEventListener("load", (event) => {
    allData();
});

document.getElementById("form").addEventListener('submit', (event) => {
    event.preventDefault();
    var contra = document.getElementById('contra').value;
    var repetirContra = document.getElementById('contra_repetir').value;

    if (contra !== repetirContra || (contra == "" || repetirContra == "")) {
        alert("Las contraseñas no son iguales, intentelo nuevamente");
        return false;
    }
    bookList = JSON.parse(localStorage.getItem('users')) ?? []
    var idUser = parseInt(document.getElementById('id').value);
    var id
    bookList.length != 0 ? bookList.findLast((item) => id = item.id) : id = 0
    id = id + 1;
    if (idUser) {
        id = idUser
        document.getElementById('id').value = ''
        bookList.forEach(value => {
            if(idUser === value.id){
                value.usuario = document.getElementById('usuario').value;
                value.correo = document.getElementById('correo').value;
                value.contra = document.getElementById('contra').value;
                value.rol = document.getElementById('rol').value
            }
        });
    } else {
        var item= {
            id : id,
            usuario : document.getElementById('usuario').value,
            correo : document.getElementById('correo').value,
            contra : document.getElementById('contra').value,
            rol : document.getElementById('rol').value,
        }
        bookList.push(item)
    }
    localStorage.setItem('users', JSON.stringify(bookList))

    document.getElementById('form').reset()
    allData();
});

function allData(){

    bookList = JSON.parse(localStorage.getItem('users')) ?? []
    var tableBody = document.getElementById('tableBody')
    tableBody.innerHTML = ''
    bookList.forEach(function (value, i){
        var trClass = i % 2 !== 0 ? 'table-info' : '';
        tableBody.innerHTML += `
                <tr class="${trClass}">
                    <td>${value.usuario}</td>
                    <td>${value.correo}</td>
                    <td><a href="#" onclick="fillFormFields(${value.id})">Editar</a> - <a href="#" onclick="remove(${value.id})">Eliminar</a></td>
                </tr> 
        `
    })

}

function getUserById (id) {
    var bookList = JSON.parse(localStorage.getItem('users')) ?? []
    var returnValue = [];
    bookList.forEach(value => {
        if(id === value.id){
            returnValue = value;
        }
    });
    return returnValue;
}

function fillFormFields(id) {
    var user = getUserById(id);
    if (user) {
        document.getElementById('usuario').value = user.usuario;
        document.getElementById('correo').value = user.correo;
        document.getElementById('rol').value = user.rol;
        document.getElementById('contra').value = user.contra;
        document.getElementById('contra_repetir').value = user.contra;
        document.getElementById('id').value = user.id;
    }
}

function remove(id){
    bookList = JSON.parse(localStorage.getItem('users')) ?? []
    bookList = bookList.filter(function(value){
        return value.id != id;
    });
    localStorage.setItem('users', JSON.stringify(bookList))
    allData()
}