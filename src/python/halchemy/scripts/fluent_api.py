from halchemy import Api

API = Api('http://localhost:2112')
ROOT = API.get('/')


def main():
    a = (
      API.follow(ROOT).to('notifications')
        .with_headers({'X-MPO':'foobar'})
        .with_headers({'Authorization':'Bearer token'})
        .with_template({'id':'123'})
        .get()
    )

if __name__ == '__main__':
    main()
