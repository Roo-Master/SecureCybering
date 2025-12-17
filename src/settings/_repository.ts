import { Repository } from "../repository";
import type { RawSetting } from "./_dao";
import { SettingDAO } from "./_dao";
import type { Setting } from "./setting";

class SettingsRepository extends Repository<RawSetting, RawSetting, SettingDAO> {
    constructor () { super(SettingDAO) }
}

export { SettingsRepository }
