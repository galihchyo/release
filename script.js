// Toggle dropdown audio track
function toggleDropdown() {
  alert("Fitur pemilihan track belum aktif. Silakan upload audio menggunakan tombol di bawah.");
}

// Trigger hidden audio upload
function triggerUpload() {
  document.getElementById("realUpload").click();
}

// Preview cover art image
function previewCover(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validasi jenis file
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!validTypes.includes(file.type)) {
    alert('Hanya file JPG, JPEG, atau PNG yang diperbolehkan.');
    event.target.value = '';
    return;
  }

  const img = new Image();
  const objectURL = URL.createObjectURL(file);

  img.onload = function () {
    const width = img.width;
    const height = img.height;

    // Validasi dimensi gambar
    if (
      width < 3000 || width > 5000 ||
      height < 3000 || height > 5000 ||
      width !== height
    ) {
      alert('Ukuran gambar harus persegi dengan dimensi antara 3000x3000 hingga 5000x5000 piksel.');
      event.target.value = '';
    } else {
      // Tampilkan preview (jika diinginkan)
      document.getElementById('coverContent').innerHTML = `<img src="${objectURL}" alt="Preview Cover" style="max-width: 100%; border-radius: 12px;">`;
    }

    URL.revokeObjectURL(objectURL);
  };

  img.onerror = function () {
    alert('Gagal membaca gambar. Silakan coba lagi.');
    event.target.value = '';
  };

  img.src = objectURL;
}


// Audio file preview (basic)
document.getElementById("realUpload").addEventListener("change", function (event) {
  const preview = document.getElementById("audioPreview");
  const files = event.target.files;

  preview.innerHTML = ""; // Clear previous previews

  if (files.length > 0) {
    for (const file of files) {
      if (file.type.startsWith("audio/")) {
        const audio = document.createElement("audio");
        audio.controls = true;
        audio.src = URL.createObjectURL(file);
        audio.style.display = "block";
        audio.style.marginBottom = "8px";
        preview.appendChild(audio);
      } else {
        preview.innerHTML += `<p>File bukan audio: ${file.name}</p>`;
      }
    }
  }
});
