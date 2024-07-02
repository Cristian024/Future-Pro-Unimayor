import { executeInsert } from "@/services/api"

export const validateSession = async (type) => {
    let validSession = {
        valid: false,
        user_id: null
    }

    await executeInsert(`validateSession${type.charAt(0).toUpperCase() + type.slice(1)}`, null).then(
        function (value) {
            validSession.valid = true;
            validSession.user_id = value.data.user_id;
        },
        function (error) {
            validSession.valid = false;
            validSession.user_id = null;
        }
    )
    return validSession
}

export const validateSessionCookie = () => {
    const cookies = document.cookie

    const cookieExists = cookies.split(';').some((cookie) => {
        return cookie.trim().startsWith('session' + '=');
    });

    return cookieExists;
}
