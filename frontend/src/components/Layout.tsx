import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {
    return (
        <div className="max-w-[1124px] h-screen mx-auto gap-28 grid md:grid-cols-2 items-center py-10 px-4">
            {children}
        </div>
    );
}