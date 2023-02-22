export default {
    getRessources() {
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/ressource`, {
        method: "GET",
        headers: {
          'Content-type': "application/json"
        },
      }).then(res => res.json())
    },
    getRessourcesByDate() {
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/ressource/expiration-date`, {
        method: "GET",
        headers: {
          'Content-type': "application/json"
        },
      }).then(res => res.json())
    },
    getSearchedRessources(title) {
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/ressource/search?file=${title}`, {
        method: "GET",
        headers: {
          'Content-type': "application/json"
        },
      }).then(res => res.json())
    },
    getExpiredRessources() {
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/ressource/expired`, {
        method: "GET",
        headers: {
          'Content-type': "application/json"
        },
      }).then(res => res.json())
    },
    getSoonExpiredRessources() {
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/ressource/soon-expired`, {
        method: "GET",
        headers: {
          'Content-type': "application/json"
        },
      }).then(res => res.json())
    },
    createRessource(body){
      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/ressource`, {
        method: "POST",
        headers: {
          'Content-type': "application/json"
        },
        body: JSON.stringify(body)
      }).then(res => res.json())
    }
}