from halchemy import Api

API = Api('http://localhost:2112')
HEADERS = {'X-foobar':'foobee'}
ROOT = API.get('/', headers=HEADERS)


def main():
    regions = API.get_from_rel(ROOT, 'regions')
    region = regions['_items'][0]
    
    notification = API.post_to_rel(region, 'notifications', {'name': 'posted'})
    notification = API.put_to_rel(notification, 'self', {'name': 'putted'}, headers=HEADERS)
    notification = API.patch_resource(notification, {'name': 'patched'})
    API.delete_resource(notification, headers=HEADERS)


if __name__ == '__main__':
    main()



'''
tests
- create Api() with and without default headers
- get() temporarily overrides/adds to headers 
- get_from_rel() temporarily overrides/adds to headers
- etc.
- after the any of the above, a request without headers uses only whatever headers when API was created

'''