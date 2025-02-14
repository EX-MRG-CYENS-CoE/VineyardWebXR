const GITHUB_BASE_URL = "https://ex-mrg-cyens-coe.github.io/VineyardWebXR/";

const DROPBOX_BR_FILE = "https://www.dropbox.com/scl/fi/4q8wo4q3po0w03sb7vhx1/VineYard.data.br?rlkey=sia9i799aarrkff63q05wd4a0&st=yfbbpfwz&dl=1";

// Unity WebGL Configuration
const config = {
    dataUrl: DROPBOX_BR_FILE, // Load .br file from Dropbox
    frameworkUrl: `${GITHUB_BASE_URL}VineYard.framework.js.br`,
    codeUrl: `${GITHUB_BASE_URL}VineYard.wasm.br`,
    streamingAssetsUrl: `${GITHUB_BASE_URL}StreamingAssets`,
    companyName: "YourCompany",
    productName: "VineyardWebXR",
    productVersion: "1.0",
};

// Function to initialize Unity instance
function createUnityInstance(canvas, config, progressCallback) {
    return new Promise((resolve, reject) => {
        const loaderUrl = `${GITHUB_BASE_URL}VineYard.loader.js`; // Load loader from GitHub
        const script = document.createElement("script");
        script.src = loaderUrl;
        script.onload = () => {
            if (typeof createUnityInstance !== "undefined") {
                createUnityInstance(canvas, config, progressCallback)
                    .then(resolve)
                    .catch(reject);
            } else {
                reject(new Error("Failed to load Unity loader script."));
            }
        };
        script.onerror = () => reject(new Error("Failed to load " + loaderUrl));
        document.body.appendChild(script);
    });
}

// Initialize Unity WebGL on page load
window.addEventListener("load", function () {
    const canvas = document.querySelector("#unity-canvas");
    createUnityInstance(canvas, config, (progress) => {
        document.querySelector("#loading-bar").style.width = `${progress * 100}%`;
    })
        .then(() => console.log("Unity WebGL Loaded Successfully."))
        .catch((err) => console.error("Unity WebGL Failed to Load:", err));
});
