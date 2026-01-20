type Setting<T> = {
    id: string,
    name?: string,
    defaultValue: T,
    encoder?: (value: T) => string,
    parser?: (value: string) => T
}

function setting<T>(setting: Setting<T>): Setting<T> { return setting }

export type { Setting }
export { setting }
