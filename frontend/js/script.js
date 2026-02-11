let isPreview = false;
const btn = document.getElementById("btn");
const input = document.getElementById("text");
const status = document.getElementById("status");
const img = document.getElementById("img");
const link = document.getElementById("link");
const formatToggle = document.getElementById("formatToggle");
const hint = document.getElementById("hint");
const clearBtn = document.getElementById("clearBtn");
const previewNote = document.getElementById("previewNote");


input.addEventListener("input", () => {
    const value = input.value.trim();

    if (!value) {
        img.style.display = "none";
        previewNote.textContent = "";
        return;
    }

    isPreview = true;

    img.style.display = "block";
    img.classList.add("preview-blur");

    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(value)}`;

    previewNote.textContent = "Preview only — click Generate for final QR";
});


btn.onclick = async (e) => {
    
    e.preventDefault(); 
    isPreview = false;


    status.textContent = "Working...";
    
    
    
    
    img.style.display = "none";
    link.style.display = "none";

    const res = await fetch("hhttps://as-qr-generator.onrender.com", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ 
            text: input.value,
            format: formatToggle.checked ? "svg" : "png"
        })

    });

    const data = await res.json();

    if (data.status === "success") {
        // cache-busting so no flash
        const url = `https://as-qr-generator.onrender.com/${data.file}?t=${Date.now()}`;

        img.onload = () => {
            if (!isPreview) {
                img.classList.remove("preview-blur");
                previewNote.textContent = "";
                img.style.display = "block";
                link.style.display = "inline";
                status.textContent = "Done";
            }
        };


        img.src = url;
        link.href = url;
        link.download = formatToggle.checked ? "qrcode.svg" : "qrcode.png";
        link.textContent = "Download QR";

    } else {
        status.textContent = "Error";
    }
};
clearBtn.onclick = () => {
    console.log("Generate clicked");

    input.value = "";
    hint.textContent = "";
    status.textContent = "";
    img.style.display = "none";
    img.src = "";
    link.style.display = "none";
};
