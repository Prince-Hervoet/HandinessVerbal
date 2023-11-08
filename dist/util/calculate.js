import { nanoid } from "../../node_modules/nanoid/index.js";
/**
 * 获取一个部件随机id
 * @returns
 */
export function getWidgetId() {
    return Date.now() + "_" + nanoid();
}
