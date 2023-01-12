import {loadScript} from "@paypal/paypal-js";
import {onMount} from "solid-js";

const PaypalProvider = ({children}) => {
    onMount(() => {
        loadScript({
            "client-id": "AcMiLaKIlC1ZUxfyb1P-No-UCoDu6DiWmpbBkzJRtBmQp7XO6cE9hgHNvis7aOyWgS2lTgTXeA6u4ayQ",
            "disable-funding": "card"
        })
            .then((paypal) => {
                window.paypal = paypal;
            })
            .catch((err) => {
                console.error("failed to load the PayPal JS SDK script", err);
            });
    });

    return children;
};

export default PaypalProvider;