import { executeInsert } from "@/services/api"

export const validateLogin = async () => {
    let validSession = {
        valid: false,
        user_id: null
    }

    await executeInsert('validateSession', null).then(
        function (value) {
            validSession.valid = true;
            validSession.user_id = value.data.user_id;
        },
        function (error){
            validSession.valid = false;
            validSession.user_id = null;
        }
    )
    return validSession
}