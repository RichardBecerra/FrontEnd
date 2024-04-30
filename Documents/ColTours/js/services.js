
window.addEventListener("load", (event) => {
    allData();
});

document.getElementById("form").addEventListener('submit', (event) => {
    event.preventDefault();

    bookList = JSON.parse(localStorage.getItem('services')) ?? []
    var idService = parseInt(document.getElementById('id').value);
    var id;
    var servicio = document.getElementById('servicio').value;
    var vehiculo = document.getElementById('vehiculo').value;
    var capacidad = document.getElementById('capacidad').value;
    var origen = document.getElementById('origen').value;
    var destino = document.getElementById('destino').value;

    bookList.length != 0 ? bookList.findLast((item) => id = item.id) : id = 0
    id = id + 1;
    if (idService) {
        id = idService
        document.getElementById('id').value = ''
        bookList.forEach(value => {
            if(idService === value.id){
                value.servicio = servicio;
                value.vehiculo = vehiculo;
                value.capacidad = capacidad;
                value.origen = origen;
                value.destino = destino;
            }
        });
    } else {
        var item= {
            id : id,
            servicio : servicio,
            vehiculo : vehiculo,
            capacidad : capacidad,
            origen : origen,
            destino : destino
        }
        bookList.push(item)
    }
    localStorage.setItem('services', JSON.stringify(bookList))

    document.getElementById('form').reset()
    allData();
});

function allData(){

    bookList = JSON.parse(localStorage.getItem('services')) ?? []
    var tableBody = document.getElementById('tableBody')
    tableBody.innerHTML = ''
    bookList.forEach(function (value, i){
        var trClass = i % 2 !== 0 ? 'table-info' : '';
        tableBody.innerHTML += `
                <tr class="${trClass}">
                    <td>${value.servicio}</td>
                    <td>${value.vehiculo}</td>
                    <td>${value.capacidad}</td>
                    <td>${value.origen} - ${value.destino}</td>
                    <td><a href="#" onclick="fillFormFields(${value.id})">Editar</a> - <a href="#" onclick="remove(${value.id})">Eliminar</a></td>
                </tr> 
        `
    })

}

function getServiceById (id) {
    var bookList = JSON.parse(localStorage.getItem('services')) ?? []
    var returnValue = [];
    bookList.forEach(value => {
        if(id === value.id){
            returnValue = value;
        }
    });
    return returnValue;
}

function fillFormFields(id) {
    var service = getServiceById(id);
    if (service) {
        document.getElementById('servicio').value = service.servicio;
        document.getElementById('vehiculo').value = service.vehiculo;
        document.getElementById('capacidad').value = service.capacidad;
        document.getElementById('origen').value = service.origen;
        document.getElementById('destino').value = service.destino;
        document.getElementById('id').value = service.id;
    }
}

function remove(id){
    bookList = JSON.parse(localStorage.getItem('services')) ?? []
    bookList = bookList.filter(function(value){
        return value.id != id;
    });
    localStorage.setItem('services', JSON.stringify(bookList))
    allData()
}