export default {
    getCampagnes() {
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/campagne`, {
        method: "GET",
        headers: {
          'Content-type': "application/json"
        },
      }).then(res => res.json())
    },
    getSearchedCampagnes(title) {
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/campagne/search?name=${title}`, {
        method: "GET",
        headers: {
          'Content-type': "application/json"
        },
      }).then(res => res.json())
    },
}