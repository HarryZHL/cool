const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')

const questions = [{
  type: 'input',
  name: 'name',
  message: '请输入需要创建的文件名'
}, {
  type: 'input',
  name: 'length',
  message: '请输入需要创建随机数组的长度'
}]

const outputDir = path.resolve('./data')

function createRandomArray (length) {
  const arr = []
  for (let i = 0; i < length; i++) {
    const num = Math.random() * 1000
    arr.push(num.toFixed(2))
  }
  return JSON.stringify(arr)
}

inquirer.prompt([
  {
    type: 'list',
    name: 'type',
    message: '选择需要创建的类型',
    choices: ['Array', 'Object', 'String']
  }
]).then(a1 => {
  const { type } = a1
  const subDir = path.resolve(outputDir, type.toLowerCase())
  if (!fs.existsSync(subDir)) {
    fs.mkdirSync(subDir)
  }
  console.log('文件夹路径：', subDir)
  inquirer.prompt(questions).then(answers => {
    const { name, length } = answers
    if (+length > 0) {
      const output = path.resolve(subDir, name + '.json')
      fs.writeFileSync(output, createRandomArray(+length))
    } else {
      console.log(chalk.red('输入错误，请重新输入'))
    }
  })
})
