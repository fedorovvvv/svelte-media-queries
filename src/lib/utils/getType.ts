import { Types } from "$lib/components/MediaQuery.types"

export const getType = (value:any):Types => {
    if (value instanceof Object && typeof value.addListener === 'function' && typeof value.removeListener === 'function') {
        return Types.mediaQueryList
    } else if (Array.isArray(value)) {
        return Types.array
    } else if (value instanceof Object) {
        return Types.object
    }
    return Types.string
}