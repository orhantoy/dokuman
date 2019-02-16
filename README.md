# Doküman

Doküman is a web server that can convert your Markdown into PDF files
&mdash; useful for producing decent looking API docs and more.

## API

`POST /api/pdf` converts Markdown to a PDF file.

### Parameters

- `markdown` (required): the Markdown content.
- `title` (optional): title of HTML page.

## Run

A Vagrantfile is included in this repo and probably provides the easiest way to get the server up and running.
Start server from Vagrant box:

    vagrant up
    vagrant ssh
    cd /vagrant
    nvm install
    npm install
    node app.js

Now we are ready to use the server:

    # From your local machine
    curl --data-urlencode "markdown@./README.md" \
      http://localhost:8080/api/pdf > README.pdf
