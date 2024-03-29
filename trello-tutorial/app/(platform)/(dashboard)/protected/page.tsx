"use client"

import { UserButton } from "@clerk/nextjs"

export default function (){
    return (
        <div>
            Protected page.
            <UserButton
                afterSignOutUrl="/"
                ></UserButton>
            <UserButton
                afterSignOutUrl="/"
                ></UserButton>
            <UserButton
                afterSignOutUrl="/"
                ></UserButton>
            <UserButton
                afterSignOutUrl="/"
                ></UserButton>
            <UserButton
                afterSignOutUrl="/"
                ></UserButton>
            <UserButton
                afterSignOutUrl="/"
                ></UserButton>
        </div>
    )
}