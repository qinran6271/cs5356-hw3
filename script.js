fetch('https://finalspaceapi.com/api/v0/episode/')
  .then(response => response.json())
  .then(chapters => {
    const container = document.getElementById('episode-details');
    container.innerHTML = '';

    let contentHTML = '';

    chapters.forEach(chapter => {
        const ulId = `${chapter.id}`; // Generate a unique ul id for each chapter.
        contentHTML += `
            <div class="chapter-card">
            <h2>${chapter.name}</h2>
            <p>Air Date: ${chapter.air_date}</p>
            <p>Director: ${chapter.director}</p>
            <p>Writer: ${chapter.writer}</p>
            <div class="img-container">
                <img src="${chapter.img_url}" alt="${chapter.name}" width="150" class = "episode-img">
            </div>
            <details>
                <summary>Characters</summary>
                <ul id="${ulId}">
                    <li>Loading characters...</li>
                </ul>
            </details>
            </div>
        `;
    });

    container.innerHTML += contentHTML;

    // Iterate through each chapter, then fetch data for each chapter's characters.
    chapters.forEach(chapter => {
        const ulId = `${chapter.id}`;
        const ulElement = document.getElementById(ulId);
        ulElement.innerHTML = '';

        chapter.characters.forEach(link => {
            fetch(link)
            .then(response => response.json())
            .then(character => {
                const li = document.createElement('li');
                li.innerHTML = `
                <p>${character.name}</p>
                <img src="${character.img_url}" alt="${character.name}" width="50">
                `;
                ulElement.appendChild(li);
            })
            .catch(err => {console.error('Error fetching character:', err);});
        });
    });
  })
  .catch(error => console.error('Error fetching data:', error));

  
// mouse events
const profile_header = document.getElementById('profile-header');

profile_header.addEventListener('mouseover', function() {
profile_header.style.backgroundColor = 'lightyellow';
});

profile_header.addEventListener('mouseout', function() {
profile_header.style.backgroundColor = 'lightblue';
});