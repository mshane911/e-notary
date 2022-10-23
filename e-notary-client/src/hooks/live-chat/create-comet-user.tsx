import { CometChat } from "@cometchat-pro/chat";
import { CometUser } from "../../common/types/CometUser";

export function createCometUser(data: CometUser){
    let user = new CometChat.User(data.username);
    user.setName(data.name);
    user.setRole(data.role);

    CometChat.createUser(user, data.password).then(
        (user) => {
            console.log("comet user created", user);
        },
        
        (error) => {
            console.log("error", error);
        }
    );
};