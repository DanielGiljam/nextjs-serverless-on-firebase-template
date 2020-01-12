#!/usr/bin/env bash

rm -rf .next
ASSET_PREFIX=http://localhost:5000 next build
mkdir -p public/_next/static
cp -Rp .next/static/ public/_next/static
firebase serve --only functions,hosting
