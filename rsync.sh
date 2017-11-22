#! /bin/bash
rsync -azv --exclude-from=./exclude.list  --delete ./* root@mkalex.com:/mkalex/rest