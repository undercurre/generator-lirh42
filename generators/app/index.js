let Generator = require('yeoman-generator')
const figlet = require('figlet')
const { promisify } = require('util')
const libconfig = require('../app/libconfig')
const downloadGitRepo = require('download-git-repo')
const ora = require('ora')

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)

    // Next, add your custom code
    // this.option('babel') // This method adds support for a `--babel` flag
  }
  async prompting() {
    // 输出商标
    console.log(
      '\r\n' +
        figlet.textSync('Matrix', {
          font: 'Ghost',
          horizontalLayout: 'default',
          verticalLayout: 'default',
          width: 80,
          whitespaceBreak: true,
        })
    )
    // 选择模块
    const firstChose = await this.prompt([
      {
        type: 'list',
        name: 'purpose',
        message: 'What do you want ?',
        choices: Object.keys(libconfig).map((item) => {
          return {
            name: item,
            value: item,
            description: item.description,
          }
        }),
      },
    ])
    // 选择分支
    const secondChose = await this.prompt([
      {
        type: 'list',
        name: 'branch',
        message: 'Select your preference !',
        choices: libconfig[firstChose.purpose].children.map((item) => {
          return {
            name: item.key,
            value: item.branch,
            description: item.description,
          }
        }),
      },
    ])
    // 输入项目名
    const config = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname, // Default to current folder name
      },
    ])
    // 配置回答内容
    this.answers = {
      purpose: firstChose.purpose,
      branch: secondChose.branch,
      projectName: config.name,
    }
  }
  async writing() {
    // 输出loading
    const spinner = ora('loading')
    console.log(`已选择${this.answers.purpose}--${this.answers.branch}`)
    const url = `undercurre/${this.answers.purpose}#${this.answers.branch}`
    const path = `./${this.answers.projectName}`
    console.log(url, path)
    try {
      const fetchMethod = promisify(downloadGitRepo)
      spinner.start()
      await fetchMethod(url, path)
      spinner.succeed()
    } catch (e) {
      spinner.fail('Request failed !')
    }
  }
}
