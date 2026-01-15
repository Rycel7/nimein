document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('animeGrid');
    const searchInput = document.getElementById('searchInput');
    const genreBtns = document.querySelectorAll('.genre-btn');
    let animeDB = [];
    let selectedGenre = "All";

    const loadData = async () => {
        try {
            const res = await fetch('data.json');
            animeDB = await res.json();
            render();
        } catch (err) { console.error("Error loading JSON"); }
    };

    const render = () => {
        grid.innerHTML = "";
        const term = searchInput.value.toLowerCase();
        const filtered = animeDB.filter(a => 
            a.title.toLowerCase().includes(term) && (selectedGenre === "All" || a.genre.includes(selectedGenre))
        );

        if (filtered.length === 0) {
            grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:50px;"><p style="color:var(--primary); font-size:20px; font-weight:800;">ANIME TIDAK TERSEDIA</p></div>`;
            return;
        }

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'anime-card';
            card.innerHTML = `<div class="card-img"><img src="${item.image}"></div><div class="card-info"><h3>${item.title}</h3></div>`;
            card.onclick = () => window.location.href = `watch.html?id=${item.id}`;
            grid.appendChild(card);
        });
    };

    searchInput.oninput = render;
    genreBtns.forEach(btn => {
        btn.onclick = () => {
            genreBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedGenre = btn.dataset.genre;
            render();
        };
    });
    loadData();
});
