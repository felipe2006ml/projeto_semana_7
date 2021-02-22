const selectRegiao = document.getElementById('select-regiao')
const contentCards = document.getElementById('content-cards')
const liElement = document.createElement('li')
const aElement = document.createElement('a')

var teste = 0

function getContinente(continente) {

    selectRegiao.innerHTML = ""
    contentCards.innerHTML = ""

    let xhr = new XMLHttpRequest
    let url = ('https://worldtimeapi.org/api/timezone/' + continente)

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

    let url = ('https://worldtimeapi.org/api/timezone/' + regiao)

    xhr.open('GET', url, true)

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            let regiaoJSON = JSON.parse(xhr.responseText)

            liElement.setAttribute('id', 'regiao')
            contentCards.appendChild(liElement)

            clearInterval(teste)

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

    aElement.setAttribute('class', 'cards')
    liElement.appendChild(aElement)

    aElement.innerHTML = ""
    
    teste = setInterval(function(){

        let aux = dataC.getSeconds()
        dataC.setSeconds(aux + 1)

        aElement.innerHTML =
        `
            <h3>${localizacao}</h3>
            <p>${dataC.getDate()}/${dataC.getMonth()}/${dataC.getFullYear()}</p>
            <p>${dataC.getHours()}:${dataC.getMinutes()}:${dataC.getSeconds()}</p>
            <p>${utc}</p>
        `
    }, 1000)
    
}