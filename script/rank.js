const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')

const arraySrc = path.resolve('./data/array')
const outputDir = path.resolve('./output')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}

function askCreate () {
  inquirer.prompt([{
    type: 'confirm',
    message: '无可用文件，是否创建文件?',
    name: 'ok'
  }]).then(answers => {
    if (answers.ok) {
      require('./create')
    }
  }).catch()
}

function pop (arr) {
  const array = arr
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) {
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
    }
  }
  return array
}

if (!fs.existsSync(arraySrc)) {
  askCreate()
} else {
  const files = fs.readdirSync(arraySrc)
  if (!files || !files.length) {
    askCreate()
  } else {
    const questions = [{
      type: 'list',
      name: 'fileName',
      message: '选择需要使用的文件',
      choices: files
    }, {
      type: 'list',
      name: 'method',
      message: '选择需要使用的方法',
      choices: [{
        name: '冒泡',
        value: 'pop'
      }, {
        name: '快速',
        value: 'fast'
      }]
    }]
    inquirer.prompt(questions).then(answers => {
      const usePath = path.resolve(arraySrc, answers.fileName)
      const fileContent = fs.readFileSync(usePath)
      const originArr = JSON.parse(fileContent)
      const startTime = Date.now()
      let result
      if (answers.method === 'pop') {
        result = pop(originArr)
      }
      const rankpath = path.resolve(outputDir, 'poprank_' + Date.now() + '.json')
      fs.writeFileSync(rankpath, JSON.stringify(result))
      console.log('结果已输出到：', rankpath)
      console.log('耗时：', Date.now() - startTime + 'ms')
    })
  }
}

// inquirer.prompt([{
//   type: 'input',
//   name: 'name',
//   message: '请输入需要创建的文件名'
// }])
// const content = path
