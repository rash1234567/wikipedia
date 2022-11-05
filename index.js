const page_url = 'href=http://en.wikipedia.org/?curid=${pageid}';

const wiki_url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=searchValue';

const resultDisplay = document.querySelector('#results');
const form = document.querySelector('#form');
const inputField = document.querySelector('#SearchField')

form.addEventListener('submit', fetchData)

function fetchData (e) {
    e.preventDefault();
    const value = inputField.value.toUpperCase();
    if (!value || value=='') {
       resultDisplay.innerHTML = `<p class='text-white'>Please input a valid search </p>`
    }
    {
        DisplayData(value)
    }
  
}

 async function DisplayData (searchWords) {
    resultDisplay.innerHTML = `<p class='text-2xl text-white'>Loading......</p>`
    const response = await fetch(`${wiki_url}${searchWords}`)
    const data = await response.json()
    const result = data.query.search
    console.log(result);

    result.length < 1 && resultDisplay.innerHTML == `<p class='text-white text-xl'>Not Found</p>`

    resultDisplay.innerHTML = result.map((items) => {
        return `
        <div class='text-center w-full bg-white mt-2 md:w-3/12 p-4 max-h-56 md:mr-2 r'>
        <h1 class='text-xl font-black cursor-pointer'><a href=http://en.wikipedia.org/?curid=${items.pageid} target="_blank">${items.title}</a></h1>
         <p ${items.snippet}</p>
     </div>`
    } )
}

