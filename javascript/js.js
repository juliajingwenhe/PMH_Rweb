let navbar = document.querySelector('.navbar')
let menu = document.querySelector('#menu-bar');
let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formClose = document.querySelector('#form-close');


window.onscroll = () => {
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    if(window.scrollY > 100){
        document.querySelector('header').classList.add('active');
    }else{
        document.querySelector('header').classList.remove('active');
    }
}

menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

//search bar//





document.querySelectorAll('.small-image-1').forEach(images =>{
    images.onclick = () =>{
        document.querySelector('.big-image-1').src = images.getAttribute('src');
    }
});

document.querySelectorAll('.small-image-2').forEach(images =>{
    images.onclick = () =>{
        document.querySelector('.big-image-2').src = images.getAttribute('src');
    }
});

document.querySelectorAll('.small-image-3').forEach(images =>{
    images.onclick = () =>{
        document.querySelector('.big-image-3').src = images.getAttribute('src');
    }
});

// <--filter bar-->>

// Event listeners for filter item buttons
document.querySelectorAll('.filter-item-button').forEach(button => {
    button.addEventListener('click', function () {
        let content = this.nextElementSibling;
        let isContentVisible = content.style.display === 'block';
        
        document.querySelectorAll('.filter-content').forEach(fc => {
            fc.style.display = 'none';
        });
    
        content.style.display = isContentVisible ? 'none' : 'block';
    });
});

// Function to filter plant boxes
function filterBoxes() {
    
    let filters = {};
    document.querySelectorAll('.filter-content input[type=checkbox]:checked').forEach(checkbox => {
        if (!filters[checkbox.name]) {
            filters[checkbox.name] = [];
        }
        filters[checkbox.name].push(checkbox.value);
    });

    // Filter boxes based on selected filters
    document.querySelectorAll('.box-container .box').forEach(box => {
        let isBoxVisible = Object.keys(filters).every(filter => {
            if (!filters[filter].length) return true;
            return filters[filter].some(filterValue => box.classList.contains(`${filter}-${filterValue}`));
        });
        box.style.display = isBoxVisible ? '' : 'none';
    });
}

// Attach change event listeners to checkboxes
document.querySelectorAll('.filter-content input[type=checkbox]').forEach(checkbox => {
    checkbox.addEventListener('change', filterBoxes);
});

// Clear filters function
function clearFilters() {
    
    document.querySelectorAll('.filter-content input[type=checkbox]').forEach(checkbox => {
        checkbox.checked = false;
    });
    filterBoxes(); 
}



//favourite sidebar//

// Function to toggle the saved plants sidebar
function toggleSidebar() {
    document.getElementById('saved-plants-sidebar').classList.toggle('open');
}

// Event listener for closing sidebar
document.getElementById('close-sidebar').addEventListener('click', toggleSidebar);

// Event listener for heart icons in plant boxes
document.querySelectorAll('.fas.fa-heart').forEach(icon => {
    icon.addEventListener('click', function(event) {
        event.preventDefault();
        let plantName = this.dataset.plant;
        let savedPlantsList = document.getElementById('saved-plants-list');

        // Check if the plant is already in the list
        if (!savedPlantsList.querySelector(`[data-plant="${plantName}"]`)) {
            // Create a new list item for the plant
            let li = document.createElement('li');
            li.textContent = plantName;
            li.setAttribute('data-plant', plantName);
            savedPlantsList.appendChild(li);
        }

        // Toggle the heart icon class to indicate saved status (e.g., filled heart)
        this.classList.toggle('saved');
        
        // Open the sidebar to show the plant is saved
        toggleSidebar();
    });
});



// Event listener for heart icons in plant boxes
document.querySelectorAll('.fas.fa-heart').forEach(icon => {
    icon.addEventListener('click', function(event) {
        event.preventDefault();
        let plantName = this.dataset.plant;
        let savedPlants = JSON.parse(localStorage.getItem('savedPlants')) || [];

        if (savedPlants.includes(plantName)) {
            // Remove plant from saved
            savedPlants = savedPlants.filter(p => p !== plantName);
            this.classList.remove('saved');
        } else {
            // Add plant to saved
            savedPlants.push(plantName);
            this.classList.add('saved');
        }

        localStorage.setItem('savedPlants', JSON.stringify(savedPlants));
        updateSavedPlantsList();
    });
});


//Removed button//

function loadSavedPlants() {
    let savedPlants = JSON.parse(localStorage.getItem('savedPlants')) || [];
    let savedPlantsList = document.getElementById('saved-plants-list');

    savedPlantsList.innerHTML = ''; // Clear the list

    savedPlants.forEach(plantName => {
        let li = document.createElement('li');
        li.textContent = plantName;

        // Create a remove button for each plant
        let removeBtn = document.createElement('button');
        removeBtn.textContent = '🗑️';
        removeBtn.onclick = function() {
            // Remove plant from local storage and update the list
            removePlant(plantName);
        };

        li.appendChild(removeBtn);
        savedPlantsList.appendChild(li);
    });
}


function removePlant(plantName) {
    // Get the current list of saved plants
    let savedPlants = JSON.parse(localStorage.getItem('savedPlants')) || [];
    
    // Filter out the plant to be removed
    savedPlants = savedPlants.filter(p => p !== plantName);
    
    // Save the updated list back to local storage
    localStorage.setItem('savedPlants', JSON.stringify(savedPlants));
    
    // Update the display list
    loadSavedPlants();
}


document.getElementById('clear-all').addEventListener('click', function() {
    // Clear the local storage
    localStorage.removeItem('savedPlants');
    
    // Update the list
    loadSavedPlants();
});






// Populate sidebar with saved plants on page load
document.addEventListener('DOMContentLoaded', loadSavedPlants);


// Update the heart icons for saved plants
document.querySelectorAll('.fas.fa-heart').forEach(icon => {
    let plantName = icon.dataset.plant;
    let savedPlants = JSON.parse(localStorage.getItem('savedPlants')) || [];

    if (savedPlants.includes(plantName)) {
        icon.classList.add('saved');
    }
});




console.log("PlantMatch Haven");



