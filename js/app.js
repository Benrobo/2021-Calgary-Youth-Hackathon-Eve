

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
    let startBtn = $(".start-meditation-btn");
    let resetBtn = $(".reset-meditation");
    let instruction = $(".instruction-txt");
    let isStarted = false;
    let totaltime = 4500;
    let breatheTime = (totaltime / 5) * 2;
    let audio = new Audio()
    audio.src = "../epic.mp3"

    startBtn.onclick = () => {

        isStarted = true;
        
        instruction.innerHTML = "Hold On"

        let startInterval = setInterval(() => {
            startMeditation();
        }, totaltime);
    }

    resetBtn.onclick = ()=>{
        location.reload()
    }

    function startMeditation() {
        setTimeout(() => {
            audio.play()
            startBtn.style.display = "none";

            instruction.innerHTML = `
            <p>Breathe In<p>`;

            setTimeout(() => {
                instruction.innerHTML = `
                <p>Breathe Out<p>`;
            }, breatheTime);
        }, breatheTime)
    }
}



// MOOD CALMER
const MOOD = () => {
    let moodBoxes = $all(".mood-bx");
    let getMoodMedia = $(".getMood");
    let musicBody = $(".music-body");
    let moodType = ""
    let loading = false;

    for (let i = 0; i < moodBoxes.length; i++) {
        moodBoxes[i].onclick = (e) => {
            let className = "mood-active"
            if (e.target.classList.contains(className)) {
                e.target.classList.remove(className)
                return
            }
            e.target.classList.add(className)

            moodType = e.target.getAttribute("data-type");

        }
    }

    getMoodMedia.onclick = async () => {
        if (moodType === "") {
            alert("please select your emotion")
            return;
        }
        loading = true;
        musicBody.innerHTML = `
        <p>Getting media based on your mood, this may take some time.....</p>
         `
        let req = await fetch(`http://localhost:3000/music/search/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ mood: moodType })
        });

        let { songs } = await req.json();
        // console.log(songs)
        loading = false;
        musicBody.innerHTML = ""

        for (let i = 0; i < songs.length; i++) {
            let url = `https://www.youtube.com/watch?v=${songs[i].videoId}`;

            musicBody.innerHTML += `
            <div class="music-card" style="background:url('${songs[i].thumbnails}'); background-size:cover; background-repeat:no-repeat; background-position:center;">
            <div class="play-cont">
                <a href="${url}" target="_blank">
                    <ion-icon name="play"></ion-icon>
                </a>
                <span class="title">${songs[i].name}</span>
            </div>
        </div>
            `
        }

    }
}