from halchemy import Api


def main():
    api = Api('http://localhost:2112')
    root = api.get()
    
    project = {
        'name': 'Sample project',
        'description': 'A project to create sample tasks for'
    }
    
    api.post_to_rel(root, 'projects', project)
    


if __name__ == '__main__':
    main()
