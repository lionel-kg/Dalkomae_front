export default {
    login(body) {
    return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
        'Content-type': "application/json"
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
    },
}