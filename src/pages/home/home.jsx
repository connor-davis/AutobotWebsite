import autobotWindow from "../../assets/autobot-window.png";

const Home = () => {
    return (
        <div class="flex flex-col w-full animate-fade-in py-10">
            <div class="flex space-x-10">
                <div class="flex flex-col space-y-10">
                    <div class="text-emerald-400 text-xl font-bold">Welcome to Autobot Macros!</div>
                    <div class="text-lg text-neutral-200">You might be wondering what exactly Autobot Macros is. Well to
                        put it simply. It is an
                        application that works like Logitech G Hub for example, that sends key strokes to the system.
                        However,
                        it works for any mouse and keyboard.
                    </div>
                </div>
                <img src={autobotWindow}/>
            </div>
            <div class="flex space-x-10">
                <div class="flex flex-col space-y-10">
                    <div class="text-emerald-400 text-xl font-bold">How To Gain Access To Autobot?</div>
                    <div class="text-lg text-neutral-200">In order to be able to use Autobot you will need to pay for
                        it. You can pay for it after creating a ticket on the <a class="text-emerald-400">Autobot
                            Discord</a> server. The pricing will be listed there. You can also check out our reseller
                        partner, <a class="text-emerald-400">Cyclone Services</a>.
                    </div>
                </div>
            </div>
            <div class="flex flex-col space-y-10">
                <div class="text-emerald-400 text-xl font-bold">Features</div>
                <div class="grid gap-8 grid-cols-3">
                    <div class="border-l border-t border-r border-b border-neutral-800 p-5 text-white">
                        Silent Shot Macro.
                    </div>
                    <div class="border-l border-t border-r border-b border-neutral-800 p-5 text-white">
                        Slide Cancel Macro.
                    </div>
                    <div class="border-l border-t border-r border-b border-neutral-800 p-5 text-white">
                        Custom timings.
                    </div>
                    <div class="border-l border-t border-r border-b border-neutral-800 p-5 text-white">
                        Custom keybinds.
                    </div>
                    <div class="border-l border-t border-r border-b border-neutral-800 p-5 text-white">
                        Game chooser.
                    </div>
                    <div class="border-l border-t border-r border-b border-neutral-800 p-5 text-white">
                        Theme chooser.
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;