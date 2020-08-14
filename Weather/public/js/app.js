console.log('Client side javascript ')


const weatherForm = document.querySelector('.GetLocation')
const search = document.querySelector('input')
const ErrorMessage = document.querySelector('#Error-Message-Display')
const WeatherMessage = document.querySelector('#Weather-Message-Display')

/* ErrorMessage.textContent = 'Loading.:-)</br><br/><\br><br\>\n/n' */

weatherForm.addEventListener('submit', (event) => {
    
    event.preventDefault()
 
    ErrorMessage.textContent = 'Loading...:-)'
    WeatherMessage.textContent = ""
 
    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                ErrorMessage.textContent = data.error
            } else {
                ErrorMessage.textContent = "Searched results for :- " + data.SearchFor
               /* WeatherMessage.textContent =  data.latitude
               
               this is not working for breaking the lines*/
                let FinalResult = "Entered location in :- " + data.SearchLocation
                + "::::Latitude:- " + data.latitude
                + "::::longitude:- " + data.longitude
                + "::::TimeZone of locatation:- " + data.Timezone
                + "::::::::Overall result:- "+ data.Result
                + "::::::::Week Summary:- "+ data.WeekSummary

                FinalResult = FinalResult.split('::::')

                for ( let i = 0; i < FinalResult.length; i++ )
                FinalResult[i] =  FinalResult[i] + "</br>";

                FinalResult = FinalResult.join('')
                document.getElementById("Weather-Message-Display").innerHTML = FinalResult
                search.value = ""
            }
        })
    }) 
    
})