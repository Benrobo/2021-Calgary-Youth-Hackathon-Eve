

const $ = (elm) => {
    return document.querySelector(elm)
}

const $all = (elm) => {
    return document.querySelectorAll(elm)
}




// Get started
const GET_STARTED = () => {
    let getStartedBtn = $(".startBtn")
    let mentalOvl = $(".mental-ovl");
    let closeMentalOvl = $(".close-metal-ovl");

    getStartedBtn.onclick = () => {
        mentalOvl.style.display = "flex"
    }
    closeMentalOvl.onclick = () => {
        mentalOvl.style.display = "none"
    }
}


// JOKES PAGE
const JOKES_PAGE_INIT = () => {
    let jokeOvl = $(".jokes-main-cont");
    let memesOvl = $(".memes-main-cont");
    let jokecloseBtn = $(".jokes-close-btn")
    let memesCloseBtn = $(".memes-close-btn");
    let jokeBtn = $(".jokes-btn");
    let memesBtn = $(".memes-btn");
    let jokeGenerateBtn = $(".jokeGenBtn");
    let memesGenerateBtn = $(".memesGenBtn");
    let jokeScreen = $(".jokes-screen")
    let memesScreen = $(".memes-screen");
    let backPage = $(".page-joke-back")
    let loading = false;


    backPage.onclick = () => {
        history.back()
    }

    // open both joke and memes ovl when clied
    jokeBtn.onclick = () => {
        jokeOvl.style.display = "flex"
    }

    memesBtn.onclick = () => {
        memesOvl.style.display = "flex"
    }

    // close ovl
    jokecloseBtn.onclick = () => {
        jokeOvl.style.display = "none"
    }

    memesCloseBtn.onclick = () => {
        memesOvl.style.display = "none"
    }

    // generate random jokes

    jokeGenerateBtn.onclick = async () => {
        loading = true;
        jokeGenerateBtn.innerHTML = "Loading..."
        let joke = await generate("http://localhost:3000/jokes/random");

        loading = false;
        jokeGenerateBtn.innerHTML = "Next Joke"
        jokeScreen.innerHTML = joke.joke
    }

    memesGenerateBtn.onclick = async () => {
        loading = true;
        memesGenerateBtn.innerHTML = "Loading..."
        let memes = await generate("http://localhost:3000/memes/random");

        loading = false;
        memesGenerateBtn.innerHTML = "Next Memes"

        const style = `
            background-size:cover;
            background-position: center;
            background:url(${loading === true ? "https://i.some-random-api.ml/nvvDKGHtDi.png" : memes.image});
            background-repeat: no-repeat;
        `
        memesScreen.innerHTML = `
            <div class="memes-img" style="${style}""></div>
        `
    }

    const generate = async (url) => {
        let res = await fetch(url);
        let data = await res.json();

        return data;
    }
}





const MEDITATION = () => {
    let animeImg = $(".medi-grow-img");
    let startBtn = $(".start-meditation-btn");
    let instruction = $(".instruction-txt");
    let isStarted = false;
    let totaltime = 7500;
    let breatheTime = (totaltime / 5) * 2;

    startBtn.onclick = () => {

        isStarted = true;

        instruction.innerHTML = ""

        let startInterval = setInterval(() => {
            startMeditation();
        }, totaltime);



    }



    function startMeditation() {
        setTimeout(() => {
            instruction.innerHTML = `
            <p>Breathe In<p>`;

            setTimeout(() => {
                instruction.innerHTML = `
                <p>Breathe Out<p>`;
            }, breatheTime);
        }, breatheTime)
    }
}



