document.addEventListener('DOMContentLoaded', () => {
    fetchAllDogs()
    const dogTableBody = document.querySelector("#table-body")
    
    //variables for Edit Dog Form
    const dogFormName = document.querySelector("input[name=name]")
    const dogFormBreed = document.querySelector("input[name=breed]")
    const dogFormSex = document.querySelector("input[name=sex]")
    const submitButton = document.querySelector("#dog-form")

    //fetch all dogs
    function fetchAllDogs() {
        fetch('http://localhost:3000/dogs')
        .then(r => r.json())
        .then(dogs => {
            renderDogs(dogs)
        })
    }

    //render dogs to page
    const renderDogs = dogs => {
        dogTableBody.innerHTML = ""
        dogs.forEach(dog =>{
            const dogRow = document.createElement("tr")
            const name = document.createElement("td")
            const breed = document.createElement("td")
            const sex = document.createElement("td")
            const edit = document.createElement("button")

            name.innerText = dog.name
            breed.innerText = dog.breed
            sex.innerText = dog.sex
            edit.innerText = "Edit Dog"
            edit.id = dog.id

            dogRow.append(name,breed,sex,edit)
            dogTableBody.append(dogRow)
        })
    }
    
    //Prefill fields of Edit Form with clicked dog info
    const addDogToDogForm = dog => {
        dogFormName.value = dog.name
        dogFormBreed.value = dog.breed
        dogFormSex.value = dog.sex
        submitButton.id = dog.id
    }

    
    /* Event Handlers */

    //dog table
    dogTableBody.addEventListener("click", event => {
        if (event.target.innerText === "Edit Dog") {
            //fetch dog that has been selected for edit
            fetch(`http://localhost:3000/dogs/${event.target.id}`)
            .then(r => r.json())
            .then(dog => {
                addDogToDogForm(dog)
            })
        }
    })
    
    //edit form submit button
    submitButton.addEventListener("submit", event => {
        //patch dog
        event.preventDefault()
        const data = {
            "name": dogFormName.value,
            "breed": dogFormBreed.value,
            "sex": dogFormSex.value
        }
        fetch(`http://localhost:3000/dogs/${event.target.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(r => r.json())
        .then(() => {
            fetchAllDogs()
        })        
    })
})