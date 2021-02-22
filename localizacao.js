const selectRegiao = document.getElementById('select-regiao')
const contentCards = document.getElementById('content-cards')

function getContinente(continente) {

    selectRegiao.innerHTML = ""

    let xhr = new XMLHttpRequest
    let url = ('http://worldtimeapi.org/api/timezone/' + continente)

    xhr.open('GET', url, true)

    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status == 200) {
            let continenteJSON = JSON.parse(xhr.responseText)

            for(i=0; i<continenteJSON.length; i++) {
                let optElement = document.createElement('option')
                
                optElement.setAttribute('value', continenteJSON[i])
                optElement.innerText = continenteJSON[i]

                selectRegiao.appendChild(optElement)
            }

        }
    }
    xhr.send()
}

function getRegiao(regiao) {
    let xhr = new XMLHttpRequest

    let url = ('http://worldtimeapi.org/api/timezone/' + regiao)

    xhr.open('GET', url, true)

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            let regiaoJSON = JSON.parse(xhr.responseText)

            let regiao = document.createElement('li')
            regiao.setAttribute('id', 'regiao')

            contentCards.appendChild(regiao)

            contHora(regiaoJSON.datetime , regiaoJSON.timezone)

            
        }
    }
    xhr.send()
}

function contHora(dadosData,localizacao) {

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

        document.getElementById(`regiao`).innerHTML =
        `<a class="cards">
            <h3>${localizacao}</h3>
            <p>${dataC.getDate()}/${dataC.getMonth()}/${dataC.getFullYear()}</p>
            <p>${dataC.getHours()}:${dataC.getMinutes()}:${dataC.getSeconds()}</p>
            <p>${utc}</p>
        </a>`
    }, 1000)
    
}