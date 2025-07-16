import path from 'path'
import fs from 'fs'

export default defineEventHandler(async (event) => {
  try {
    const filePath = getRouterParam(event, 'path')
    
    if (!filePath) {
      throw createError({
        statusCode: 400,
        statusMessage: 'File path is required'
      })
    }

    // Security: Prevent directory traversal
    const safePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '')
    const fullPath = path.join(process.cwd(), 'storage', 'materials', safePath)

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'File not found'
      })
    }

    // Get file stats
    const stats = fs.statSync(fullPath)
    const fileExtension = path.extname(fullPath).toLowerCase()

    // Set appropriate content type
    const contentTypes = {
      '.zip': 'application/zip',
      '.pdf': 'application/pdf',
      '.txt': 'text/plain',
      '.md': 'text/markdown',
      '.sql': 'application/sql'
    }

    const contentType = contentTypes[fileExtension] || 'application/octet-stream'

    // Set headers for download
    setHeader(event, 'Content-Type', contentType)
    setHeader(event, 'Content-Length', stats.size.toString())
    setHeader(event, 'Content-Disposition', `attachment; filename="${path.basename(fullPath)}"`)
    setHeader(event, 'Cache-Control', 'no-cache, no-store, must-revalidate')

    // Stream the file
    const fileStream = fs.createReadStream(fullPath)
    return sendStream(event, fileStream)

  } catch (error) {
    console.error('Error serving file:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Error serving file'
    })
  }
})