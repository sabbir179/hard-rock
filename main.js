// load data from api

const searchBtn = document.getElementById('lyric-search-btn');
searchBtn.addEventListener('click', function () {
    const lyricSearch = document.getElementById('input-lyric').value;
    fetch(`https://api.lyrics.ovh/suggest/summer`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)

            const lyricName = document.getElementById('lyric').innerText = data.name;
        })
})