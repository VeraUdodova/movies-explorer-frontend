export function catchError(err) {
    return err.then(function (data) {
        console.log(`${data.statusCode} ${data.error}: ${data.message}`);
        return data;
    })
}
