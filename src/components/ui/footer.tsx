import { Card } from "./card"
import Link from "next/link";

const Footer = () => {
    return (
        <Card className="mt-10 p-5">
            <h1>Copyright (C) 2023-2024 <Link href={"https://github.com/Fernand0cruz"} className="font-bold">Fernand0W</Link></h1>
        </Card>
    );
}

export default Footer;