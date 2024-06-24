import { executeInsert } from "@/services/api"

export const validateLogin = async () => {
    let validSession = {
        valid: false,
        user_id: null
    }

    await executeInsert('validateSession', null).then(
        (value) => {
            validSession.valid = true;
            validSession.user_id = value.data.user_id;
        },
    )
    return validSession
}