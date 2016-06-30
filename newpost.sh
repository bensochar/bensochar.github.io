#!/bin/bash

# creates a new post
# format as _posts/YYYY/YYYY-MM-DD-slug.md

echo "Creating new post"
# get template
read -p "Enter slug, i.e. new-post-slug: " SLUG

COPY_FILE=_posts/template.md

# create file
POST_FILE=_posts/$(date "+%Y-%m-%d")-$SLUG.md

# echo new post:
echo $POST_FILE
cp $COPY_FILE $POST_FILE
# open it
mate $POST_FILE