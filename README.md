## github-issue-to-hexo

This action can convert a github issue to hexo source post

#### Usage

[example](https://github.com/flytam/blog/issues/27)

```yml
name: 部署博客

env:
  # hexo源文件仓库
  BLOG_SOURCE: flytam/blog-source
  # issue链接
  ISSUE_URL: https://github.com/flytam/blog/issues
  # blog部署的页面
  BLOG: flytam/blog
  # ${{ github.event.issue.user.login }}

on:
  issues:
    types: [opened, edited]
jobs:
  build:
    runs-on: ubuntu-latest
    # 仓库作者才才能触发
    if: ${{ github.actor == github.repository_owner }}
    steps:
      - name: 拉取hexo源文件
        uses: actions/checkout@v3
        with:
          persist-credentials: 'false'
          repository: ${{ env.BLOG_SOURCE }}
          ref: 'main'
          token: ${{ secrets.token }}
      - name: issue生成 hexo文章
        uses: flytam/github-issue-to-hexo@main
        with:
          issue_url: ${{ env.ISSUE_URL }}
          output: 'source/_posts'
          replace: true
      - name: commit hexo源文件
        run: |
          echo $(date) > update.md
          git add .
          git config user.name "issue-to-hexo bot"
          git config user.email "test@github.com"
          git commit -m "Add a post"
      - name: 推送hexo源文件
        uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.token }}
          repository: ${{ env.BLOG_SOURCE }}
```

#### Action params

- output string

The directory of the hexo source. Default `source/_posts`

- issue_url string

The github issue url. Like `https://github.com/flytam/blog/issues`

- replace boolean

Whether to replace the contents of the original directory. Default `false`
