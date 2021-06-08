# slack-data-pipeline-monitor

> A slack app for sending messages about our data pipeline processes to a slack channel.

### Install

Install with npm:

```
npm install @njam-data/slack-data-pipeline-monitor
```

### Usage

```js
import { DataPipelineMonitor } from '@njam-data/slack-data-pipeline-monitor'

const monitor = new DataPipelineMonitor({
  url: 'your slack incoming webhook url'
})

// Send a basic message
await monitor.info({
  text: 'test',
  url: 'https://example.com'
})

// Announce a successful data download
await monitor.dataDownloaded({
  text: 'test',
  dataUrl: 'http://example.com',
  sourceUrl: 'http://example.com'
})

// Send a warning message
await monitor.warning({
  text: 'test',
  url: 'http://example.com'
})

// Send an error message, which notifies @here in the channel
await monitor.error({
  text: 'test',
  url: 'http://example.com'
})
```
