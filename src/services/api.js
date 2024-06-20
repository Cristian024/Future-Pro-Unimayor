const url = 'http://localhost/uniApi/api/Index.php';

export const executeConsult = async (route, id) =>{
    return new Promise(async function (resolve, reject){
        var data;
        var consultUrl = url;

        if (id !== null) consultUrl += `${id}`

        consultUrl += `?route=${route}`;

        try {
            const response = await fetch(consultUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            })

            data = response.text()
            const data_json = await data.then(res => {
                return JSON.parse(res);
            })

            if (data_json.status != null) {
                reject(data_json)
            }

            resolve(data_json);
        } catch (error) {
            reject('')
        }
    })
}