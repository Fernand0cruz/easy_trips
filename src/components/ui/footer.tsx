import Link from "next/link";

const Footer = () => {
    return (
        <footer className="mt-10 border-t border-border">
            <div className="max-w-screen-xl m-auto px-5 py-8 flex flex-col items-center gap-2 text-center">
                <span className="font-serif text-lg tracking-wide">Easy Trips</span>
                <p className="text-sm text-muted-foreground">
                    Copyright (C) 2024 <Link href={"https://github.com/Fernand0cruz"} className="text-gold hover:underline">Fernand0W</Link>
                </p>
            </div>
        </footer>
    );
}

export default Footer;