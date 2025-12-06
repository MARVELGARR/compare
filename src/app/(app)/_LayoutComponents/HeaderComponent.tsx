

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/src/providers/authContext"
export const HeaderContainer = () =>{
    return (
        <div className="">


        </div>
    )
}


export const HeaderProfile = async() =>{

    const {User} = useAuth()

    return (
        <div className="">
            <Avatar>
                <AvatarImage src={userSession.prefs[""]} alt="@user profile pic" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}