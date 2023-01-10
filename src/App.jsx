import logo from './assets/logo-nobg.png';
import styles from './App.module.css';
import {createSignal, onMount} from "solid-js";

function App() {
    const [days, setDays] = createSignal(0);
    const [hours, setHours] = createSignal(0);
    const [minutes, setMinutes] = createSignal(0);
    const [seconds, setSeconds] = createSignal(0);
    const [isToday, setIsToday] = createSignal(false);

    const [countDownDate, setCountDownDate] = createSignal(new Date("Jan 13, 2023 00:00:01").getTime())

    onMount(() => {
        getCountdown();
    });

    const getCountdown = () => {
        const x = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate() - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setDays(days);
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds)

            if (distance < 0) {
                clearInterval(x);
                setIsToday(true)
            }
        }, 1000)
    }

    return (
        <div class="flex flex-col w-screen h-screen justify-center items-center bg-emerald-400">
            <div class="flex flex-col space-y-20">
                <img src={logo}/>

                <div class="flex flex-col justify-center items-center space-y-5 text-gray-800">
                    <div class="text-2xl font-bold">Autobot Is Public In</div>

                    <div class="w-20 h-1 bg-gray-800" />

                    <div>{days()} days {hours()} hours {minutes()} minutes {seconds()} seconds</div>
                </div>
            </div>
        </div>
    );
}

export default App;
