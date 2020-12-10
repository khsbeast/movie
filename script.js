const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

// Get data from local storage and populate ui

const populateUI = ()=>{
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats != null && selectedSeats.length>0){
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex'); 
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice'); 
    if(selectedMoviePrice!=null)
    {
        ticketPrice = selectedMoviePrice;
    }


    if(selectedMovieIndex!=null)
    {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Updating text

const update = () =>{
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    const seatsIndex = [...selectedSeats].map((seat)=>[...seats].indexOf(seat));

    //storing selected seats in local storage
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount*150;
}

// Checking the local storage

populateUI();
update();

// Storing data in local storage

const setMovieData = (index,price)=>{
    localStorage.setItem('selectedMovieIndex',index);
    localStorage.setItem('selectedMoviePrice',price);
}

//Selecting Movie

movieSelect.addEventListener('change',(e)=>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    update();
})


// Selecting Seats
container.addEventListener('click',(e)=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
    }

    update();
});
