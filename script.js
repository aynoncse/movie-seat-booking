const container = document.querySelector('.container')
const seats     = document.querySelectorAll('.row .seat:not(.accoupied)')

const count = document.getElementById('count')
const total = document.getElementById('total')

const movieSelect = document.getElementById('movie')

populateUI();

let ticketPrice = +movieSelect.value

// Set Selected Movie and Price
function setMovieData(index, price) {
    localStorage.setItem('selectedMovieIndex', index);
    localStorage.setItem('selectedMoviePrice', price);
}


// Get data from local storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if(selectedMovieIndex){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie Select Event
movieSelect.addEventListener('change', e=>{
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
})

// Seat Click Event
container.addEventListener('click', e=> {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
        updateSelectedCount()
    }
})

//Update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length

    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount*ticketPrice
}


// Initial count and total set
updateSelectedCount()










