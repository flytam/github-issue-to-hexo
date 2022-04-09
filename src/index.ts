import * as core from '@actions/core'
import { run } from 'csdnsynchexo'
import { removeSync } from 'fs-extra'

const output = core.getInput('output') || 'source/_posts'
const issue_url = core.getInput('issue_url')
const replace = core.getInput('replace')
const reg = /\/(\w+)\/(\w+)\/issues(\/?)$/
const user = issue_url.match(reg)?.[1] || ''
const repo = issue_url.match(reg)?.[2] || ''

;(async() => {
  try {
    if (replace)
      removeSync(output)

    await run({
      type: 'github',
      userId: user,
      repo,
      output,
    }, false)
  }
  catch (e) {
    core.setFailed(e as Error)
  }
})()
