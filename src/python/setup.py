from setuptools import setup
from version import VERSION


setup(
    name='HALchemy',
    version=VERSION,
    description='Toolkit for creating clients of HAL based Hypermedia APIs.',
    long_description=open('./README.md').read(),
    long_description_content_type='text/markdown',
    license='MIT',
    classifiers=[
        'Development Status :: 1 - Planning',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3',
        'Operating System :: OS Independent',
        'Intended Audience :: Developers',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Utilities'
    ],
    url='https://github.com/pointw-dev/HALchemy',
    author='Michael Ottoson',
    author_email='michael@pointw.com',
    packages=['halchemy'],
    include_package_data=True,
    install_requires=[
        'requests'
    ],
    zip_safe=False
)
