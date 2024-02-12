const halchemy = require('halchemy')


async function main() {
    const api = new halchemy.Api('http://localhost:2112')
    const root = await api.get()
    
    const project = {
        name: 'Sample project',
        description: 'A project to create sample tasks for'
    }
    
    const relSpec = {
        resource: root,
        rel: 'projects'
    }
    await api.postToRel(relSpec, project)
}

main()


