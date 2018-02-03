import { PromiseReadable } from '../lib/promise-readable'

import { createReadStream } from 'fs'

type Chunk = Buffer | undefined

async function main () {
  const rstream = new PromiseReadable(createReadStream(process.argv[2] || '/etc/hosts'))

  let total = 0

  for (let chunk: Chunk; (chunk = await rstream.read());) {
    console.info(`Read ${chunk.length} bytes chunk`)
    total += chunk.length
  }

  console.info(`Read ${total} bytes in total`)

  rstream.destroy()
}

main().catch(console.error)
