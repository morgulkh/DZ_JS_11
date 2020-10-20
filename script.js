'use strict';

let currentVideoIndex = 0;

const searchInput = document.getElementById('input-term');
searchInput.addEventListener('change', () => {
    fetch('https://itunes.apple.com/search?limit=10&entity=musicVideo&term=' + searchInput.value)
        .then(response => response.json())
        .then(json => {
            applyVideosHtml(json);
            attachEvents();
            currentVideoIndex = 0;
            const container = document.getElementById('videos-container');
            const videos = container.getElementsByTagName('video');
            const videoCurrent = videos[0];
            videoCurrent.play();
        });
});

function applyJsonInfo(json)
{
    let html = `<video class="video-fluid" loop width="500px" height="400px">
          <source src="${json.previewUrl}" type="video/mp4" />
        </video>`;
    return html;
}

function applyVideosHtml(json)
{
    const container = document.getElementById('videos-container');
    container.innerHTML = '';

    const resultCount = json.resultCount;
    if (resultCount == 0) {
        console.log('no results found');
        return;
    }

    const results = json.results;
    for (let videoJson of results) {
        container.innerHTML += applyJsonInfo(videoJson);
    }
}

function attachEvents()
{
    document.getElementById('prev').addEventListener('click', () => {
        let container = document.getElementById('videos-container');
        const videos = container.getElementsByTagName('video');
        const videoCurrent = videos[currentVideoIndex];
        videoCurrent.pause();
        let left = parseInt(container.offsetLeft);
        left += 500;
        currentVideoIndex--;
        if (left >= 0) {
            left = 0;
            currentVideoIndex = 0;
        }
        container.style.left = left + 'px';
        const videoNext = videos[currentVideoIndex];
        videoNext.play();
    });

    document.getElementById('next').addEventListener('click', () => {
        let container = document.getElementById('videos-container');
        const videos = container.getElementsByTagName('video');
        const videoCurrent = videos[currentVideoIndex];
        videoCurrent.pause();
        let left = parseInt(container.offsetLeft);
        left -= 500;
        currentVideoIndex++;
        if (left <= -(parseInt(container.offsetWidth) - 500)) {
            left = -(parseInt(container.offsetWidth) - 500);
            currentVideoIndex--;
        }
        container.style.left = left + 'px';
        const videoNext = videos[currentVideoIndex];
        videoNext.play();
    });
}
