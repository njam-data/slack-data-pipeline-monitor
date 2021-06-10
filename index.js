import fetch from 'isomorphic-unfetch'

export class DataPipelineMonitor {
  constructor (config = {}) {
    this.url = config.url
  }

  async request (data) {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const text = await response.text()
    return text
  }

  async dataDownloaded (options = {}) {
    const { description, dataUrl, sourceUrl } = options
    const blocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '✅ Data downloaded',
          emoji: true
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Description:*\n${description}`
          },
          {
            type: 'mrkdwn',
            text: `*URL:*\n${dataUrl}`
          }
        ]
      }
    ]

    if (sourceUrl) {
      blocks.push({
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Source:*\n${sourceUrl}`
          }
        ]
      })
    }

    return this.request({ blocks })
  }

  async info (options = {}) {
    const { url, text } = options

    const blocks = [
      {
        type: 'header',
        text: {
          type: 'mrkdwn',
          text,
          emoji: true
        }
      }
    ]

    if (url) {
      blocks.push({
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: url
          }
        ]
      })
    }

    return this.request({ blocks })
  }

  async warning (options = {}) {
    const { url, text } = options

    const blocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '⚠️ Warning',
          emoji: true
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Error message:*\n${text}`
        }
      }
    ]

    if (url) {
      blocks.push({
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: url
          }
        ]
      })
    }

    return this.request({ blocks })
  }

  async error (options = {}) {
    const { url, text, mention = '@here' } = options

    const blocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🚨 Error!',
          emoji: true
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: mention
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Error message:*\n${text}`
        }
      }
    ]

    if (url) {
      blocks.push({
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: url
          }
        ]
      })
    }

    return this.request({ blocks })
  }
}
