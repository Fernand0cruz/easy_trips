import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/toggle-theme";

const Navbar = () => {
    return ( 
        <Card className="flex justify-between items-center p-5">
            <span className=" font-bold text-xl">:::: EASY TRIPS ::::</span>
            <div className="flex gap-5">
                <ModeToggle/>
                <Button>Login</Button>
            </div>
        </Card>
     );
}
 
export default Navbar;