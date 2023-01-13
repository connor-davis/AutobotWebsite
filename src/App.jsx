import {Link, Route, Routes, useNavigate} from "@solidjs/router";
import Home from "./pages/home/home";
import PaypalProvider from "./providers/paypalProvider";
import Purchase from "./pages/purchase/purchase";
import useState from "./hooks/state";
import SignIn from "./pages/authentication/signIn";
import {onMount} from "solid-js";
import apiUrl from "./apiUrl";
import axios from "axios";
import Download from "./pages/download/download";
import SignUp from "./pages/authentication/signUp";
import EmailConfirmation from "./pages/emailConfirmation/emailConfirmation";
import Profile from "./pages/profile/profile";

function App() {
    const navigate = useNavigate();

    const [authState, updateAuthState, clearAuthState] = useState("authState");
    const [userState, updateUserState, clearUserState] = useState("userState");

    onMount(() => {
        setTimeout(() => {
            axios.get(apiUrl + "/users/me", {
                headers: {
                    Authorization: "Bearer " + authState.token
                }
            }).then((response) => {
                updateUserState(response.data);
            }).catch((error) => {
                clearAuthState();
                clearUserState();
            });
        }, 1000);
    });

    return (
        <div class="flex flex-col w-screen h-screen bg-neutral-900 select-none">
            <div class="flex justify-between w-full h-auto p-5 border-b border-neutral-800 px-96">
                <div class="flex items-center space-x-2">
                    <div class="text-2xl font-bold text-emerald-400">Autobot</div>
                </div>

                <div class="flex items-center space-x-5">
                    <Link href="/"
                          class="text-gray-200 hover:text-emerald-400 transition-all duration-300 ease-in-out">Home</Link>
                    {authState.token && (
                        <>
                            <Link href="/download"
                                  class="text-gray-200 hover:text-emerald-400 transition-all duration-300 ease-in-out">Download</Link>
                            <Link href="/profile"
                                  class="text-gray-200 hover:text-emerald-400 transition-all duration-300 ease-in-out">{userState.username}</Link>
                        </>
                    )}
                    {!authState.token && (
                        <>
                            <Link href="/signIn"
                                  class="text-gray-200 hover:text-emerald-400 transition-all duration-300 ease-in-out">Login</Link>
                            <Link href="/signUp"
                                  class="text-gray-200 hover:text-emerald-400 transition-all duration-300 ease-in-out">Register</Link>
                        </>
                    )}
                </div>
            </div>

            <div class="flex flex-col w-full h-full overflow-y-auto px-96">
                <PaypalProvider>
                    <Routes>
                        <Route path="/" element={Home}/>
                        <Route path="/download" element={Download}/>
                        <Route path="/purchase" element={Purchase}/>
                        <Route path="/signIn" element={SignIn}/>
                        <Route path="/signUp" element={SignUp}/>
                        <Route path="/email-confirmed" element={EmailConfirmation}/>
                        <Route path="/profile" element={Profile}/>
                    </Routes>
                </PaypalProvider>
            </div>

            <div class="flex justify-center w-full h-auto p-5 border-t border-neutral-800 px-96">
                <div class="flex items-center space-x-2">
                    <div class="text-sm font-bold text-neutral-200">Developed by LoneWolf Software</div>
                </div>
            </div>
        </div>
    );
}

export default App;
