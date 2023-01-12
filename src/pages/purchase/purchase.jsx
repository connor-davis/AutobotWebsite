import {createSignal, onMount} from "solid-js";
import {useNavigate} from "@solidjs/router";
import apiUrl from "../../apiUrl";
import useState from "../../hooks/state";
import axios from "axios";

const Purchase = () => {
    const navigate = useNavigate();

    const [authState] = useState("authState");
    const [userState, updateUserState] = useState("userState");

    const [message, setMessage] = createSignal({});

    onMount(() => {
        setTimeout(() => {
            paypal.Buttons({
                style: {
                    layout: 'vertical',
                    color: 'black',
                    shape: 'rect',
                    label: 'paypal'
                },
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: 10.00
                            }
                        }]
                    })
                },
                onApprove: function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        if (details.status === "COMPLETED") {
                            axios.put(
                                apiUrl + "/users/" + userState.id,
                                {
                                    paid: true
                                },
                                {
                                    headers: {
                                        Authorization: "Bearer " + authState.token
                                    }
                                }).then((response) => {
                                updateUserState({...response.data});

                                setMessage({
                                    type: "success",
                                    content: "You have purchased Autobot! Thank you for supporting the development."
                                })

                                setTimeout(() => navigate("/download"), 3000);
                            }).catch((error) => {
                                setMessage({
                                    type: "error",
                                    content: "Failed to update your account with your purchase. Please contact an admin on discord or email support@auto-bot.co.za"
                                });
                            });
                        }
                    });
                },
            }).render('#paypal-button-container');
        }, 300);
    });

    return <div class="flex flex-col">
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

        {!message().content &&
            <div class="flex w-full space-x-10 text-white p-10 animate-fade-in transition-all duration-300 ease-in-out">
                <div class="flex flex-col space-y-5">
                    <div class="text-emerald-500 font-bold text-xl">Autobot Supporter</div>
                    <div>For just <span class="text-emerald-400">R167,29/m ($10/m)</span> you can have access to Autobot
                        which
                        will
                        help you perform the silent shot and slide cancel, because we know everyone does get lazy
                        eventually.
                    </div>
                </div>
                <div id="paypal-button-container" class="text-white"></div>
            </div>
        }
    </div>
};

export default Purchase;