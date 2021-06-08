import dotenv from 'dotenv'

import { DataPipelineMonitor } from './index.js'

dotenv.config()

const monitor = new DataPipelineMonitor({
  url: process.env.SLACK_WEBHOOK_URL_MONITORING
})

async function main () {
  // await monitor.info({
  //   text: 'test'
  // })

  // await monitor.info({
  //   text: 'test',
  //   url: 'https://example.com'
  // })

  // await monitor.dataDownloaded({
  //   text: 'test',
  //   dataUrl: 'http://example.com',
  //   sourceUrl: 'http://example.com'
  // })

  // const res = await monitor.warning({
  //   text: 'test',
  //   url: 'http://example.com'
  // })

  const res = await monitor.error({
    text: 'test',
    url: 'http://example.com'
  })

  console.log('res', res)
}

main()
