#!/bin/bash

rm -rf .vitepress/dist
npm run docs:build
rm -rf ../../docs
mkdir ../../docs
cp -ruvT .vitepress/dist/ ../../docs
