import {Link} from "@solidjs/router";

const EmailConfirmation = () => {
    return (
            <div class="text-neutral-200 py-10">Your email address has been confirmed. You can now <Link href="/signIn" class="text-emerald-400">login</Link>.</div>
    )
};

export default EmailConfirmation;