const contentCards = document.getElementById('content-cards')

function getLocation() {
    let xhr = new XMLHttpRequest
    let url = 'http://worldtimeapi.org/api/ip'

    xhr.open('GET', url, true)

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
        let ipJSON = JSON.parse(xhr.responseText)
        
        contHora(ipJSON.datetime, ipJSON.client_ip, ipJSON.timezone)

        contentCards.innerHTML +=
        `<li id="ip">
        </li>`
        }
    }
    xhr.send()
}

function contHora(dadosData, ip,localizacao) {
    let ano = dadosData.substring(0,4)
    let mes = dadosData.substring(5,7)
    let dia = dadosData.substring(8,10)

    let hora = dadosData.substring(11,13)
    let min = dadosData.substring(14, 16)
    let segundo = dadosData.substring(17,19)
    let utc = dadosData.substring(26,32)

    let dataC = new Date(ano, mes, dia, hora, min, segundo)
    
    setInterval(function(){

        let aux = dataC.getSeconds()
        dataC.setSeconds(aux + 1)

        document.getElementById(`ip`).innerHTML =
        `<a class="cards">
            <h3>${localizacao}</h3>
            <p>${dataC.getDate()}/${dataC.getMonth()}/${dataC.getFullYear()}</p>
            <p>${dataC.getHours()}:${dataC.getMinutes()}:${dataC.getSeconds()}</p>
            <p>${utc}</p>
            <p>${ip}</p>
        </a>`
    }, 1000)
    
}

getLocation()