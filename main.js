

const searchLyric = document.getElementById('searchLyric'); 
 
const apiUrl = `https://api.lyrics.ovh`;

const searchBtn = document.getElementById('searchBtn'); 
// SEARCH BUTTON (EVENT HANDLER ADD) 
searchBtn.addEventListener('click', ()=>{
    const searchText = searchLyric.value;
    if(searchText ==''){
        alert('Please enter song lyrics or artist name');
    }
    else{
        getSongTittle(searchText)
        searchLyric.value =''
    }
})

//  FIRST API CALL 
getSongTittle=text=>{
    fetch(`${apiUrl}/suggest/${text}`)
    .then(response => response.json())
    .then(data => showData(data))
}

// SHOW TITTLE 
showData=data=>{
    let output = '';
    const secondData = data.data;

    for(let i = 0; i < 10;i++){
        let song = secondData[i];
        artistName(song);
    }


    
    // DISPLAYING SONG'S TITTLE AND AUTHOR NAME 
   function artistName(song){
        output+= ` <p class="author lead d-flex"><strong>${song.title} </strong>&nbsp; Album by &nbsp;<span> ${song.artist.name}</span> <button class="btn btn-success ml-auto" data-artist ="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button></p>`;
    }
    const result = document.getElementById('result');
    result.innerHTML = ` ${output}`;
}



// ARTIST NAME AND TITTLE 
result.addEventListener('click', function(e){
    const lyricsBtn = e.target;
    if(lyricsBtn.tagName ==='BUTTON'){
        const artist = lyricsBtn.getAttribute('data-artist');
        const songTitle = lyricsBtn.getAttribute('data-songtitle');
        getLyrics(artist, songTitle);
    }
})

const lyricsLine = document.getElementById('songLyrics');
// SECOND API CALL
  getLyrics=(artist, songTitle)=>{
    fetch(`${apiUrl}/v1/${artist}/${songTitle}`)
    .then(response =>  response.json())
    .then(data =>  {
        const songLineSeparation = data.lyrics;
        lyricsLine.innerHTML =`<h2 class="text-success mb-4"><strong> ${artist} </strong> - ${songTitle}</h2>
        <pre class="lyric text-white">${songLineSeparation}</pre>`;

    })
}

