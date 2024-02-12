const halchemy = require('halchemy')

const api = new halchemy.Api('http://localhost:2112')
api.get().then((root) => {
    console.log(root)    
})


