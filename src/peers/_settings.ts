import { setting } from "../settings";

const PeerSettings = {
    inactiveWindow: setting<number>({
        id: "peers.inactiveWindowMillis",
        defaultValue: 3600 * 24 * 1000,
        parser: (value: string) => parseInt(value),
        encoder: (value: number) => value.toString()
    })
}

export { PeerSettings }
