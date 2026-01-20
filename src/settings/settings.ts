import { SettingsRepository } from "./_repository"
import type { Setting } from "./setting"

const repository = new SettingsRepository()

class Settings {

    async get<T>(setting: Setting<T>): Promise<T> {
        const rawSetting = await repository.find({ id: setting.id })
        
        if (!rawSetting) return setting.defaultValue

        const parser = setting.parser || JSON.parse

        return parser(rawSetting.value)
    }

    async set<T>(setting: Setting<T>, value: T): Promise<void> {
        const rawSetting = await repository.find({ id: setting.id })
        if (!rawSetting) {
            await repository.create({
                id: setting.id,
                name: setting.name || null,
                value: JSON.stringify(value)
            })
        }

        const encoder = setting.encoder || JSON.stringify
        const updateCount = await repository.update({ id: setting.id }, {
            value: encoder(value)
        })

        if (updateCount <= 0) throw new Error("Failed to update setting")
    }

}

const settings = new Settings()

export { settings as Settings }
