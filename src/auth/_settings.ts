import { setting } from "../settings";

const AuthSettings ={
    tokenValidity: setting<number>({
        id: "auth.tokenValidity",
        name: "Token Validity",
        defaultValue: 3600
    })
}

export { AuthSettings }
