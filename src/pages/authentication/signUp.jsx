import logo from "../../assets/logo-nobg.png";
import {createSignal} from "solid-js";
import {useNavigate} from "@solidjs/router";
import useState from "../../hooks/state";
import axios from "axios";
import apiUrl from "../../apiUrl";

const signUp = () => {
    const navigate = useNavigate();

    const [authState, updateAuthState] = useState("authState");
    const [userState, updateUserState] = useState("userState");

    const [discordUsername, setDiscordUsername] = createSignal("");
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [confirmPassword, setConfirmPassword] = createSignal("");

    const [message, setMessage] = createSignal({});

    const login = () => {
        axios.post(apiUrl + "/auth/local/register", {
            username: discordUsername().split("#")[0],
            discordUsername: discordUsername(),
            email: email(),
            password: password()
        }).then((response) => {
            setMessage({
                content: "You have been registered.",
                type: "success",
            });

            updateAuthState({token: response.data.jwt});
            updateUserState({...response.data.user});

            setTimeout(() => {
                navigate("/signIn", {replace: true});
            }, 1500);
        }).catch((error) => {
            setMessage({
                content: error.response.data.error.message.replace(
                    "identifier",
                    "email"
                ),
                type: "error",
            });
        });
    }

    return (
        <div class="flex flex-col w-full h-full items-center py-10 animate-fade-in">
            <div
                class="flex flex-col space-y-10 w-auto h-auto border-l border-t border-r border-b border-neutral-700 bg-neutral-800 p-5 rounded-lg">
                <div class="flex flex-col space-y-5 items-center">
                    <div class="flex flex-col w-16 rounded-full px-2 py-3 bg-emerald-400">
                        <img src={logo} class="w-12"/>
                    </div>
                    <div class="text-neutral-300 font-bold text-xl">Login In</div>

                    {message().content && (
                        <div class="flex flex-col items-center justify-center w-full h-auto">
                            <div
                                class={`${
                                    message().type === "success"
                                        ? "text-emerald-400"
                                        : "text-rose-500"
                                }`}
                            >
                                {message().content}
                            </div>
                        </div>
                    )}
                </div>
                <div class="flex flex-col space-y-3 shrink">
                    <input type="text"
                           placeholder="Your discord username, e.g. user#0000"
                           value={discordUsername()}
                           onChange={(event) => setDiscordUsername(event.target.value)}
                           class="text-white w-80 border-l border-t border-r border-b border-neutral-700 bg-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-0 focus:border-emerald-500"/>
                    <input type="email"
                           placeholder="Your email"
                           value={email()}
                           onChange={(event) => setEmail(event.target.value)}
                           class="text-white w-80 border-l border-t border-r border-b border-neutral-700 bg-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-0 focus:border-emerald-500"/>
                    <input type="password"
                           placeholder="Your password"
                           value={password()}
                           onChange={(event) => setPassword(event.target.value)}
                           class="text-white w-80 border-l border-t border-r border-b border-neutral-700 bg-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-0 focus:border-emerald-500"/>
                    <input type="password"
                           placeholder="Confirm your password"
                           value={confirmPassword()}
                           onChange={(event) => setConfirmPassword(event.target.value)}
                           class="text-white w-80 border-l border-t border-r border-b border-neutral-700 bg-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-0 focus:border-emerald-500"/>
                </div>
                <div
                    class="border-l border-t border-r border-b border-neutral-800 bg-neutral-900 text-white hover:bg-emerald-400 transition-all duration-300 ease-in-out cursor-pointer text-center p-2 rounded-md"
                    onClick={() => {
                        if (discordUsername() !== "" && email() !== "" && password() !== "" && password() === confirmPassword()) {
                            login();
                        }
                    }}
                >
                    Register
                </div>
            </div>
        </div>
    );
};

export default signUp;