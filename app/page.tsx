import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" h-full flex flex-col items-center justify-center gap-y-4 ">
      <div className="bg-white p-3 rounded-md">
      <Image
        src="./next.svg"
        alt="My cool logo"
        width={100}
        height={100}
      />
      </div>
      <div className=" flex space-x-4 ">
      <h1 className="text-4xl font-extrabold">Authentication Crash </h1>
      <span className="text-4xl">👋</span>
      </div>
      <p>This is an example of an authentication crash.</p>
      <Link href="/auth/register">
        <Button className=" bg-gradient-to-tr from-blue-400 via-purple-400 to-green-500 shadow-lg text-black font-bold">
          Get Started !
        </Button>
      </Link>
   </div> 
  );
}
