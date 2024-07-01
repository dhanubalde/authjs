"use client"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation"
import { Button } from "../ui/button";

const Social = () => {
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get('callBackUrl');

  const onClick = (provider: "google" | "github") => { 
    signIn(provider, {
      callbackUrl: callBackUrl || DEFAULT_LOGIN_REDIRECT, // redirect to the original page if no callBackUrl is provided
    })
  }

  return (
    <div className=" flex items-center w-full gap-x-2 mt-4">
      <Button
        size="lg"
        className="w-full rounded-lg "
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className=" h-5 w-8" />
      </Button>
      <Button
        size="lg"
        className="w-full rounded-lg"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className=" h-5 w-8" />
      </Button>
    </div>
  )
}

export default Social