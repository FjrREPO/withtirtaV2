import Link from "next/link";
import ProjectComponent from "./_components/ProjectComponent";
import { Button } from "@/components/ui/button";

export default function Page() {
    return (
        <div className="container mx-auto p-4 space-y-8">
            <Link href="/">
                <Button>Back to Home</Button>
            </Link>
            <ProjectComponent />
        </div>
    )
}