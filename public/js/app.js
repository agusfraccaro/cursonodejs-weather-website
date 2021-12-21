const form = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#m1')
const messageTwo = document.querySelector('#m2')
const messageThree = document.querySelector('#m3')
const messageFour = document.querySelector('#m4')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = 'Description: ' + data.forecast.description
                messageThree.textContent = 'Temperature: ' + data.forecast.temperature
                messageFour.textContent = 'It feels like: ' + data.forecast.feelslike + ' degrees'
            }
        })  
    })
})

