import * as core from '@actions/core'
import { run } from 'csdnsynchexo'

const output = core.getInput('output') || process.cwd()
const issue_url = core.getInput('issue_url')

const reg = /\/(\w+)\/(\w+)\/issues(\/?)$/
const user = issue_url.match(reg)?.[1] || ''
const repo = issue_url.match(reg)?.[2] || ''

;(async() => {
  try {
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
