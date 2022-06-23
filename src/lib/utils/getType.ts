import { Types } from "$lib/components/MediaQuery.types"

export const getType = (value:any):Types => {
    if (Array.isArray(value)) {
        return Types.array
    } else if (value instanceof Object) {
        return Types.object
    }
    return Types.string
}