const textarea = document.getElementById('loadquery');
const button = document.getElementById('submitbutton');

button.addEventListener("click", () => {
    const savecode = textarea.value.trim();
    if (!savecode) return;

    try {
        const musicMap = JSON.parse(savecode);

        chrome.storage.local.set({ musicMap }, () => {
            if (chrome.runtime.lastError) {
                console.error("Failed to save:", chrome.runtime.lastError);
                textarea.value = "Failed to save music map!";
                textarea.style.color = "red";
            } else {
                console.log("Music map saved:", musicMap);
                textarea.value = "New music map saved!";
                textarea.style.color = "green";
            }

            textarea.disabled = true;
            setTimeout(() => {
                textarea.value = "";
                textarea.style.color = "";
                textarea.disabled = false;
            }, 1500);
        });

    } catch (err) {
        textarea.value = "Invalid JSON input, check your format or contact Builders.";
        textarea.style.color = "red";
        textarea.disabled = true;

        setTimeout(() => {
            textarea.value = "";
            textarea.style.color = "";
            textarea.disabled = false;
        }, 1500);

        console.error("Invalid JSON:", err);
    }
});
