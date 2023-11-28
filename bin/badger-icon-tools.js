#!/usr/bin/env node
import { runCommand } from '../lib/index.js'

await runCommand(
  config => console.log(`config: `, config)
)
