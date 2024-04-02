from setuptools import setup, find_packages
from version import VERSION


setup(
    name='halchemy',
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
    url='https://github.com/pointw-dev/halchemy',
    author='Michael Ottoson',
    author_email='michael@pointw.com',
    package_dir={'halchemy': 'halchemy/lib'},
    # packages=find_packages(where='halchemy/lib'),
    packages=['halchemy'],
    include_package_data=True,
    install_requires=[
        'requests',
        'uritemplate'
    ],
    zip_safe=False
)
