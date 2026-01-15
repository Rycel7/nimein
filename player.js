document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const animeId = params.get('id');
    const iframe = document.getElementById('mainPlayer');
    const titleHeader = document.getElementById('videoTitle');
    const epList = document.getElementById('episodeList');

    const res = await fetch('data.json');
    const data = await res.json();
    const anime = data.find(a => a.id === animeId);

    if (anime) {
        titleHeader.innerText = anime.title;
        anime.episodes.forEach((ep, i) => {
            const item = document.createElement('div');
            item.className = 'ep-item';
            item.innerHTML = `<span>${ep.no}</span><p>Episode ${ep.no}</p>`;
            item.onclick = () => {
                iframe.src = ep.url;
                document.querySelectorAll('.ep-item').forEach((el, idx) => el.classList.toggle('active', idx === i));
            };
            epList.appendChild(item);
        });
        iframe.src = anime.episodes[0].url;
        epList.firstChild.classList.add('active');
    } else {
        titleHeader.innerText = "Anime tidak ditemukan";
    }
});
