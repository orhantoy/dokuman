const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.type('html')
  const readmeMarkdownPath = path.join(__dirname, 'README.md')
  const readmeMarkdownContent = fs.readFileSync(readmeMarkdownPath, 'utf8')
  res.send(toHTML({ markdownContent: readmeMarkdownContent, title: 'Doküman' }))
})

app.post('/api/pdf', async (req, res) => {
  if (!req.body.markdown) {
    res.status(400).send('Required markdown parameter is not set.\n')
    return
  }

  const pdfBuffer = await toPDF({
    markdownContent: req.body.markdown,
    title: req.body.title
  })
  const pdfFileName = req.body.pdfFileName || 'markdown.pdf'

  res.type('pdf')
  res.set('Content-Disposition', `attachment; filename=${pdfFileName}`)
  res.send(pdfBuffer)
})

app.listen(port, () => console.log(`Doküman listening on port ${port}!`))

// -----------------------------------------------------------------------------

const md = require('markdown-it')()
const sass = require('node-sass')
const mustache = require('mustache')
const puppeteer = require('puppeteer')

const mustacheTemplate = `<!DOCTYPE HTML>
<html>
<head>
<meta charset="UTF-8">
<title>{{title}}</title>
<style media="all">{{{css}}}</style>
</head>
<body>
<div class="markdown-body">
{{{htmlFragment}}}
</div>
</body>
</html>
`

const sassStylesheet = `
@import 'primer-base/index.scss';
@import 'primer-markdown/index.scss';
@media only screen {
  body {
    margin: 2em 1em;
  }

  .markdown-body {
    max-width: 800px;
    margin: 0 auto;
  }
}
`
const sassRenderResult = sass.renderSync({
  data: sassStylesheet,
  outputStyle: 'compressed',
  includePaths: ['./node_modules']
})

const pdfOptions = {
  printBackground: true,
  margin: {
    top: '2.00 cm',
    left: '1.75 cm',
    right: '1.75 cm',
    bottom: '2.50 cm'
  }
}

async function toPDF ({ markdownContent, title }) {
  const htmlContent = toHTML({ markdownContent, title })
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(htmlContent)
  const pdfBuffer = await page.pdf(pdfOptions)
  await browser.close()

  return pdfBuffer
}

function toHTML ({ markdownContent, title }) {
  const htmlFragment = md.render(markdownContent)
  const html = mustache.render(mustacheTemplate, {
    title: title,
    css: sassRenderResult.css,
    htmlFragment: htmlFragment
  })

  return html
}
