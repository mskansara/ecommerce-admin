import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/MainNav";
import Switcher from "@/components/StoreSwitcher";
import { redirect } from "next/navigation";
import prismdb from "@/lib/prismadb";

const Navbar = async () => {
    const { userId } = auth();

    if(!userId) {
        redirect("/sign-in")
    }

    const stores = await prismdb.store.findMany({
        where: {
            userId
        }, 
    });

    return ( 
        <div className="border-b">
            <div className="flex h-16  items-center px-4">
                <Switcher items={stores}/>
                <MainNav className="mx-6"/>
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/"/>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;
