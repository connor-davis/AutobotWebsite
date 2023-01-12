import useState from "../../hooks/state";
import {useNavigate} from "@solidjs/router";

const Profile = () => {
    const navigate = useNavigate();

    const [userState, updateUserState, clearUserState] = useState("userState");
    const [authState, updateAuthState, clearAuthState] = useState("authState");

    const logout = () => {
        clearAuthState();
        clearUserState();

        window.location.href = "/";
    }

    return (
        <div class="flex flex-col w-full animate-fade-in py-10 space-y-10">
            <div class="text-neutral-200 text-xl font-bold">Your Profile</div>

            <div class="flex flex-col w-full h-auto space-y-5">
                <div class="flex flex-col space-y-2">
                    <div class="text-emerald-400">Discord Username</div>
                    <div class="border-l border-t border-r border-b border-neutral-700 bg-neutral-800 text-neutral-200 p-3">{userState.discordUsername}</div>
                </div>
                <div class="flex flex-col space-y-2">
                    <div class="text-emerald-400">Email Address</div>
                    <div class="border-l border-t border-r border-b border-neutral-700 bg-neutral-800 text-neutral-200 p-3">{userState.email}</div>
                </div>
                <div class="flex flex-col space-y-2">
                    <div class="text-emerald-400">Paid</div>
                    <div class="border-l border-t border-r border-b border-neutral-700 bg-neutral-800 text-neutral-200 p-3">{userState.paid ? "Yes" : "No"}</div>
                </div>
                <div class="flex flex-col space-y-2">
                    <div class="text-emerald-400">HWID</div>
                    <div class="border-l border-t border-r border-b border-neutral-700 bg-neutral-800 text-neutral-200 p-3">{userState.hwid || "None"}</div>
                </div>

                <div class="border-l border-t border-r border-b border-neutral-800 bg-neutral-900 text-white hover:bg-red-600 transition-all duration-300 ease-in-out cursor-pointer text-center p-2 rounded-md" onClick={() => logout()}>Logout</div>
            </div>
        </div>
    );
};

export default Profile;