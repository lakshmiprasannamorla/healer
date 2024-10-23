const tracks = {
    money: [
        { title: "Money Coming To Me", artist: "LP", src: "Money Coming To Me.mp3", cover: "img.jpeg" },
        { title: "Billionaire Dreams", artist: "LP", src: "Billionaire Dreams.mp3", cover: "img.jpeg" },
        { title: "10 Million Delight", artist: "LP", src: "10 Million Delight.mp3", cover: "img.jpeg" },
        { title: "Money Magnet", artist: "LP", src: "Money Magnet.mp3", cover: "cover2.jpg" },
        { title: "Make It Happen Girl", artist: "LP", src: "Make It Happen Girl.mp3", cover: "img.jpeg" },
        { title: "Golden Girl: Unstoppable", artist: "LP", src: "Golden Girl_ Unstoppable.mp3", cover: "img.jpeg" },
        { title: "Excited in South Korea", artist: "LP", src: "Excited in South Korea.mp3", cover: "img.jpeg" },
        { title: "Globetrotting Dreams", artist: "LP", src: "Globetrotting Dreams.mp3", cover: "img.jpeg" }
    ],
    health: [
        { title: "Healing Sounds", artist: "LP", src: "Healing Sounds.mp3", cover: "img.jpeg" },
        { title: "Peaceful Mind", artist: "LP", src: "Peaceful Mind.mp3", cover: "img.jpeg" },
        { title: "Meditation Music", artist: "LP", src: "Meditation Music.mp3", cover: "img.jpeg" },
        { title: "Nature's Melody", artist: "LP", src: "Nature's Melody.mp3", cover: "img.jpeg" },
        { title: "Flow of Abundance", artist: "LP", src: "Flow of Abundance.mp3", cover: "img.jpeg" }
    ],
    success: [
        { title: "Unleash Your Power", artist: "LP", src: "Unleash Your Power.mp3", cover: "img.jpeg" },
        { title: "Believe in the Dream", artist: "LP", src: "Believe in the Dream.mp3", cover: "img.jpeg" },
        { title: "Golden Girl", artist: "LP", src: "Golden Girl.mp3", cover: "img.jpeg" },
        { title: "Good Vibes Only", artist: "LP", src: "Good Vibes Only.mp3", cover: "img.jpeg" },
        { title: "Million Dreams", artist: "LP", src: "Million Dreams.mp3", cover: "img.jpeg" },
        { title: "Unstoppable Aura", artist: "LP", src: "Unstoppable Aura.mp3", cover: "img.jpeg" }
    ],
    happiness: [
        { title: "Feel Good", artist: "LP", src: "Feel Good.mp3", cover: "img.jpeg" },
        { title: "Everyday is a New Day", artist: "LP", src: "Everyday is a New Day.mp3", cover: "img.jpeg" },
        { title: "Let's Celebrate", artist: "LP", src: "Let's Celebrate.mp3", cover: "img.jpeg" },
        { title: "Happy Life", artist: "LP", src: "Happy Life.mp3", cover: "cover2.jpg" },
        { title: "Good Morning Sunshine", artist: "LP", src: "Good Morning Sunshine.mp3", cover: "img.jpeg" }
    ],
    healing: [
        { title: "희망의 빛", artist: "LP", src: "희망의 빛.mp3", cover: "img.jpeg" },
        { title: "Google Dreams", artist: "LP", src: "Google Dreams.mp3", cover: "img.jpeg" },
        { title: "Universe of Dreams", artist: "LP", src: "Universe of Dreams.mp3", cover: "img.jpeg" },
        { title: "Flow of Abundance", artist: "LP", src: "Flow of Abundance.mp3", cover: "img.jpeg" },
        { title: "Golden Girl: Unstoppable", artist: "LP", src: "Golden Girl_ Unstoppable.mp3", cover: "img.jpeg" },
        { title: "Excited in South Korea", artist: "LP", src: "Excited in South Korea.mp3", cover: "img.jpeg" },
        { title: "Offer Day", artist: "LP", src: "Offer Day.mp3", cover: "cover2.jpg" }
    ]
};
const trackListElement = document.getElementById('track-list');
const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');
const trackTitleElement = document.getElementById('track-title');
const trackArtistElement = document.getElementById('track-artist');
const playButton = document.getElementById('play-btn');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const repeatButton = document.getElementById('repeat-btn');
const genreSelect = document.getElementById('genre-select');
let currentTrackIndex = 0;
let currentGenre = "money";
let repeatMode = false; // Variable to track repeat mode
let isPlaying = false; // Variable to track if the audio is playing

const loadTrack = (track) => {
    audioSource.src = track.src;
    trackTitleElement.innerText = track.title;
    trackArtistElement.innerText = track.artist;
    document.getElementById('cover-image').src = track.cover;
    audioPlayer.load();
};

const playTrack = () => {
    if (!isPlaying) {
        audioPlayer.play();
        isPlaying = true; // Update playing status
        playButton.innerText = '❚❚'; // Pause icon
    } else {
        audioPlayer.pause();
        isPlaying = false; // Update playing status
        playButton.innerText = '▶️'; // Play icon
    }
};

const nextTrack = () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks[currentGenre].length;
    loadTrack(tracks[currentGenre][currentTrackIndex]);
    audioPlayer.play();
    isPlaying = true; // Update playing status
    playButton.innerText = '❚❚'; // Pause icon
};

const prevTrack = () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks[currentGenre].length) % tracks[currentGenre].length;
    loadTrack(tracks[currentGenre][currentTrackIndex]);
    audioPlayer.play();
    isPlaying = true; // Update playing status
    playButton.innerText = '❚❚'; // Pause icon
};

// Change the genre and load the first track of that genre
genreSelect.addEventListener('change', (event) => {
    currentGenre = event.target.value;
    currentTrackIndex = 0;
    loadTrack(tracks[currentGenre][currentTrackIndex]);
    updateTrackList();
    playTrack(); // Autoplay on genre change
});

// Update track list based on the selected genre
const updateTrackList = () => {
    trackListElement.innerHTML = '';
    tracks[currentGenre].forEach((track, index) => {
        const li = document.createElement('li');
        li.innerText = track.title;
        li.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(track);
            playTrack();
        });
        trackListElement.appendChild(li);
    });
};

// Add an event listener for when the track ends
audioPlayer.addEventListener('ended', () => {
    if (repeatMode) {
        audioPlayer.currentTime = 0; // Restart the current track
        audioPlayer.play(); // Play it again
    } else {
        nextTrack(); // Go to the next track
    }
});

// Load the initial track
loadTrack(tracks[currentGenre][currentTrackIndex]);
updateTrackList();
playTrack(); // Autoplay on load

playButton.addEventListener('click', playTrack);
nextButton.addEventListener('click', nextTrack);
prevButton.addEventListener('click', prevTrack);

// Toggle repeat mode
repeatButton.addEventListener('click', () => {
    repeatMode = !repeatMode; // Toggle repeat mode
    repeatButton.innerText = repeatMode ? '🔁 (On)' : '🔁 (Off)'; // Update button text
});

// Auto-play on genre change
playTrack();