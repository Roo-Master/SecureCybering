import { UserService } from "../user"
import type { Profile, ProfileUpdate } from "./profile"

class UserProfileManager {

    async getUserProfile(userId: number): Promise<Profile> {
        const user = await UserService.findById(userId)
        if (!user) throw new Error("User not found")

        return {
            email: user.email,
            name: user.name
        }
    }

    async updateUserProfile(userId: number, update: ProfileUpdate): Promise<Profile> {
        const user = await UserService.findById(userId)
        if (!user) throw new Error("User not found")

        const updateCount = await UserService.update({ id: userId }, update)
        if (updateCount <= 0) throw new Error("Update failed")

        return await this.getUserProfile(userId)
    }

}

const profileManager = new UserProfileManager()

export { profileManager as UserProgileManager }
