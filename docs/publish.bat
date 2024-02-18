@echo off
echo Make sure the jekyll server is not running
pause

copy publish_config.txt _config.yml
rd _site /s/q
start "jekyll halchemy" docker exec -it jekyll-dev bash -c "./run_site HALchemy/jekyll"

echo Stop the jekyll server when the render is complete then continue here
pause

del ..\docs\* /s/q
xcopy _site\* ..\docs /s

copy dev_config.txt _config.yml
