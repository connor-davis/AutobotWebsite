import {createSignal, onMount} from "solid-js";
import axios from "axios";

const Download = () => {
    const [repoUrl, setRepoUrl] = createSignal("");
    const [downloadUrl, setDownloadUrl] = createSignal("");

    onMount(() => {
        axios.get("https://api.github.com/repos/connor-davis/Autobot/releases/latest").then((response) => {
            setRepoUrl(response.data.html_url);
            setDownloadUrl(response.data.assets[0].browser_download_url)
        });
    });

    return (
        <div class="flex items-center w-full space-x-10 text-white py-10">
            <div class="flex flex-col space-y-5 w-full">
                <div class="text-emerald-500 font-bold text-xl">Autobot Download</div>
                <div>You can download Autobot by clicking on the button to the right or by going to <a
                    class="text-emerald-400"
                    href={repoUrl()}
                    target="_blank">this</a
                > page
                </div>
            </div>
            <a href={downloadUrl()}
               target="_blank"
               class="flex items-center justify-center px-3 py-2 w-64 h-12 border-l border-t border-r border-b border-neutral-800 bg-emerald-500 text-white hover:bg-emerald-400 transition-all duration-300 ease-in-out cursor-pointer rounded-md">
                Download For Windows
            </a>
        </div>
    );
};

export default Download;