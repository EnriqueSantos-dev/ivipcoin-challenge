import cors from 'cors'
import express from 'express'

import { env } from '@/config/env'

const app = express()

app.use(express.json())
app.use(cors({ origin: ['http://localhost', env.clientUrl] }))

export { app }
