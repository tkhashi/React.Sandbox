import { ClerkProvider } from "@clerk/nextjs"

const PlatformLayout = ({
    children
}: {
    children: React.ReactNode;
}) =>{
    return(
        <ClerkProvider>
        <div> Platform Layout </div>
            {children}
        </ClerkProvider>
    )
}

export default PlatformLayout