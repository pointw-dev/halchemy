@echo off
echo restarting jekyll-dev container
docker stop jekyll-dev > nul
docker start jekyll-dev > nul

copy /Y publish_config.txt _config.yml  > nul
rd _site /s/q > nul
start "jekyll halchemy" docker exec -it jekyll-dev bash -c "./run_site halchemy/jekyll"

echo Stop the jekyll server when the render is complete then continue here
pause

del ..\docs\* /s/q
xcopy _site\* ..\docs /s

copy /Y develop_config.txt _config.yml > nul
