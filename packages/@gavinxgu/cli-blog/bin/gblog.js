#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const pkg = require('../package')
const logger = {
  error: (...args) => console.log(chalk.bgRed.bold('ERROR'), ...args),
  info: (...args) => console.log(chalk.bgGreen.bold('INFO'), ...args),
}

program
  .version(pkg.version)
  .option('-b, --blog [slug]', '添加一个新博文')
  .option('-p, --page [slug]', '添加一个新页面')
  .option('-t, --template [slug]', '添加一个新模板')
  .parse(process.argv)

if (
  [program.blog, program.page, program.template].filter(
    o => typeof o === 'string'
  ).length !== 1
) {
  logger.error('参数不正确')
  process.exit(1)
}

const fs = require('fs')
const nodePath = require('path')
const mkdirp = require('mkdirp')
const Mustache = require('mustache')
const projectRoot = process.cwd()
const now = new Date().toISOString()
const resolve = (...args) => nodePath.resolve(projectRoot, ...args)

function isBlogExists(path, newBlogName) {
  const files = fs.readdirSync(path)
  return !!files
    .map(file => {
      const stat = fs.statSync(resolve(path, file))
      if (stat.isDirectory()) {
        const blogName = file.split('-').pop()
        if (blogName === newBlogName) {
          return true
        } else {
          return isBlogExists(resolve(path, file), newBlogName)
        }
      }
    })
    .filter(Boolean).length
}

if (program.blog) {
  const splits = program.blog.split('/')
  const name = splits[splits.length - 1]
  splits.pop()
  const newSlug = `${splits.join('/')}/${now}-${name}`

  if (fs.existsSync(resolve('content/blog'))) {
    if (isBlogExists(resolve('content/blog'), name)) {
      logger.error(`"${name}"博文已存在`)
      process.exit(1)
    }
  }

  mkdirp(resolve('content/blog', newSlug), error => {
    if (error) {
      logger.error(error)
      process.exit(1)
    } else logger.info(`"${name}"博文创建成功`)
    fs.writeFileSync(
      resolve('content/blog', newSlug, 'index.md'),
      Mustache.render(
        fs
          .readFileSync(resolve(__dirname, '../lib/blogTemplate.mustache'))
          .toString(),
        { title: name, date: now, tags: JSON.stringify(splits) }
      )
    )
  })
}
