const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"

var input = document.getElementById("input")
var button = document.querySelector("button")

var nounname = document.getElementById("nounname")
var nounmean = document.getElementById("nounmean")
var nouneg = document.getElementById("nouneg")
var nounref = document.getElementById("nounref")

var verbname = document.getElementById("verbname")
var verbmean = document.getElementById("verbmean")
var verbeg = document.getElementById("verbeg")
var verbref = document.getElementById("verbref")
var sound = document.getElementById("sound")
var soundBtn=document.getElementById("soundBtn")


async function dict(name) {
    const response = await fetch(apiUrl + name)
    const data = await response.json()
    console.log(data);

    if (response.status == 404) {
        document.querySelector(".small").className='small error'
    }

    else {
      
        // nounname.innerHTML=data[0].word
        nounname.innerHTML = `<p id="nounname">${data[0].word} <span class="badge bg-light text-dark">1 of 2</span><span>Noun</span></p>`
        nounmean.innerHTML = "1. " + data[0].meanings[0].definitions[0].definition
        // console.log('nouneg.innerHTML::',nouneg.innerHTML);
        // console.log('nouneg.innerHTML.length::',nouneg.innerHTML.length);
        // console.log('verbeg.innerHTML::',verbeg.innerHTML);
        // console.log('verneg.innerHTML.length::',verbeg.innerHTML.length);
        // console.log('data::',data[0].meanings[0].definitions[0].example);
        let nounExample;
        let verbExample;
        console.log('nounexample::',nounExample);
        console.log('data[0].meanings[0].definitions[0].length::',data[0].meanings[0].definitions[0]);
        /*for (let index = 0; index < data[0].meanings[0].definitions[0].length; index++) {
            if(data[0].meanings[0].definitions[index].example != undefined && nounExample != null){
                nounExample = data[0].meanings[0].definitions[0].example;
                }
        }*/
        data[0].meanings[0].definitions.forEach(definition => {
            console.log('noun example::',definition.example);
            if(definition.example != undefined && nounExample == undefined){
                console.log('inside assign');
                nounExample = definition.example;
                }
        });
        data[0].meanings[1].definitions.forEach(definition => {
            console.log('noun verb::',definition.example);
            if(definition.example != undefined && verbExample == undefined){
                console.log('inside assign');
                verbExample = definition.example;
                }
        });
        if (nounExample != undefined) {
            nouneg.innerHTML = "Eg: " + nounExample;                                             
        }
        else{
            nouneg.innerHTML = `"No example for ${data[0].word} "`
        }
        // nounref.innerHTML="Reference-Url's" + `<a href="${data[0].sourceUrls[0]}"></a>`
        nounref.innerHTML = "Reference-Url's: " + data[0].sourceUrls[0]

        verbname.innerHTML = `<p id="nounname">${data[0].word} <span class="badge bg-light text-dark">2 of 2</span><span>Verb</span></p>`
        verbmean.innerHTML = "1. " + data[0].meanings[1].definitions[0].definition
        // verbeg.innerHTML = "Eg: " + data[0].meanings[1].definitions[0].example
        if (verbExample != undefined) {
            verbeg.innerHTML = "Eg: " + verbExample;            
        }
        else{
            verbeg.innerHTML = `"No example for ${data[0].word} "`
        }
        verbref.innerHTML = "Reference-Url's: " + data[0].sourceUrls[0]
        sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`)
        console.log(sound);
        document.querySelector(".mainContainer").className="mainContainer success"
        document.querySelector(".small").style.display = "none"
       
    }


}

button.addEventListener("click", () => {
    dict(input.value)
    if (input.value == "") {
        alert("Enter the word or phrase to find meaning")
    }
    else {
        input.value = ""
    }
    console.log(input.value);
    // sound.play()
  
})
function playSound() {
    sound.play()
}

