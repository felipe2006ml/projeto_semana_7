const contentCards = document.getElementById('content-cards')

function getCont() {
    let xhr = new XMLHttpRequest

    let url = 'http://worldtimeapi.org/api/timezone/'

    xhr.open('GET', url, true)

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            
            let contJSON = JSON.parse(xhr.responseText)
            for(i=0; i<12; i++) {
                var al = Math.floor(Math.random() * contJSON.length)

                getLocation(contJSON[al], i)
            }
        }
    }
    xhr.send()
}

function getLocation(local, i) {
    let iAux = i
    let xhr = new XMLHttpRequest
    let url = 'http://worldtimeapi.org/api/timezone/' + local

    xhr.open('GET', url, true)

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
        let localJSON = JSON.parse(xhr.responseText)
        
        contHora(localJSON.datetime, localJSON.timezone, iAux)

        contentCards.innerHTML +=
        `<li id="card-${i}">
            <a id="cards-${i}"></a>
        </li>`
        }

        var corRandom = '#'+Math.floor(Math.random()*16777215).toString(16);
        document.getElementById(`cards-${i}`).style.background = corRandom
    }
    xhr.send()
}

getCont()

function contHora(dadosData, localizacao,i) {
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

        document.getElementById(`cards-${i}`).innerHTML =
        `
            <h3>${localizacao}</h3>
            <p>${dataC.getDate()}/${dataC.getMonth()}/${dataC.getFullYear()}</p>
            <p>${dataC.getHours()}:${dataC.getMinutes()}:${dataC.getSeconds()}</p>
            <p>${utc}</p>
        `
    }, 1000)
    
}
