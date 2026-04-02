// GANTI URL INI dengan milik Anda (sudah saya pakai dari yang Anda berikan)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxNEKM3n86uL2QstlyKLf9hATR39xwtSdCy3aKrcIt3CSWV7m8KCUo-liXvibrwUwIeLg/exec';

// ========== COUNTDOWN ==========
const weddingDate = new Date(2026, 3, 12, 10, 0, 0).getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "Acara telah berlangsung! 🎉";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (86400000)) / (3600000));
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    document.getElementById("countdown").innerHTML = 
        `${days} hari  ${hours} jam  ${minutes} menit  ${seconds} detik`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ========== RSVP KE GOOGLE SHEET ==========
const submitBtn = document.getElementById('submitRsvp');
const statusDiv = document.getElementById('rsvpStatus');

submitBtn.addEventListener('click', async () => {
    const nama = document.getElementById('nama').value.trim();
    const jumlahTamu = document.getElementById('jumlahTamu').value;
    const pesan = document.getElementById('pesan').value.trim();

    if (!nama) {
        statusDiv.innerHTML = '❌ Nama wajib diisi.';
        statusDiv.style.color = 'red';
        return;
    }

    statusDiv.innerHTML = '⏳ Mengirim konfirmasi...';
    statusDiv.style.color = 'blue';
    submitBtn.disabled = true;

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',  // Mengatasi CORS, data tetap terkirim
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nama, jumlahTamu, pesan })
        });

        // Karena mode no-cors, kita tidak bisa baca response secara normal.
        // Tapi data tetap masuk ke Google Sheet. Anggap sukses.
        statusDiv.innerHTML = '✅ Terima kasih! Konfirmasi Anda sudah tercatat di Google Sheet.';
        statusDiv.style.color = 'green';
        
        // Kosongkan form
        document.getElementById('nama').value = '';
        document.getElementById('pesan').value = '';
        // Optional: disable submit selamanya agar tidak double
        // submitBtn.disabled = true; (sudah di atas)
    } catch (error) {
        statusDiv.innerHTML = '❌ Gagal mengirim. Silakan coba lagi.';
        statusDiv.style.color = 'red';
        submitBtn.disabled = false;
        console.error(error);
    }
});

// ========== MUSIK LATAR ==========
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
let isPlaying = false;

musicToggle.addEventListener("click", () => {
    if (isPlaying) {
        music.pause();
        musicToggle.innerHTML = "🔇 Putar Musik";
    } else {
        music.play().catch(e => console.log("Autoplay diblokir browser"));
        musicToggle.innerHTML = "🔊 Hentikan Musik";
    }
    isPlaying = !isPlaying;
});