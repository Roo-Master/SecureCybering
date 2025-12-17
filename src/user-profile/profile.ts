type Profile = {
    name: string, 
    email: string
}

type ProfileUpdate = Partial<Profile> & {
    password: string
}

export type { Profile, ProfileUpdate }
