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
  const coverBox = document.getElementById("coverBox");
  const coverContent = document.getElementById("coverContent");

  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      coverBox.style.backgroundImage = `url(${e.target.result})`;
      coverBox.style.backgroundSize = "cover";
      coverBox.style.backgroundPosition = "center";
      coverContent.innerHTML = ""; // Remove placeholder text
    };
    reader.readAsDataURL(file);
  } else {
    alert("File yang dipilih bukan gambar yang valid.");
  }
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
