import { MongoClient } from 'mongodb';

// MongoDB connection
let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio',
  );
  await client.connect();
  cachedClient = client;
  return client;
}

export default defineEventHandler(async (event) => {
  try {
    const token = getRouterParam(event, 'token');

    if (!token) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Token is required',
      });
    }

    // Connect to database
    const client = await connectToDatabase();
    const db = client.db('portfolio');
    const collection = db.collection('download_tokens');

    // Find and validate token
    const tokenDoc = await collection.findOne({ token });

    if (!tokenDoc) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Invalid or expired download link',
      });
    }

    // Check if token is expired
    if (new Date() > tokenDoc.expiresAt) {
      throw createError({
        statusCode: 410,
        statusMessage: 'Download link has expired',
      });
    }

    // Check if token has been used
    if (tokenDoc.used) {
      throw createError({
        statusCode: 410,
        statusMessage: 'Download link has already been used',
      });
    }

    // Mark token as used
    await collection.updateOne(
      { token },
      {
        $set: {
          used: true,
          usedAt: new Date(),
          usedIpAddress: getClientIP(event),
        },
      },
    );

    // Get materials for the video
    const materials = getMaterialsForVideo(tokenDoc.videoId);

    if (!materials) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Materials not found for this video',
      });
    }

    // Return download information
    return {
      success: true,
      videoId: tokenDoc.videoId,
      videoTitle: tokenDoc.videoTitle,
      email: tokenDoc.email,
      materials: materials,
      downloadedAt: new Date(),
    };
  } catch (error) {
    console.error('Error in download:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
});

// Mock function to get materials for a video
function getMaterialsForVideo(videoId: string) {
  // In production, this would fetch from your materials storage
  const materialsList = {
    'react-hooks-masterclass': {
      title: 'React Hooks Masterclass Materials',
      files: [
        {
          name: 'source-code.zip',
          size: '2.3 MB',
          type: 'Source Code',
          url: '/api/materials/files/react-hooks-source.zip',
        },
        {
          name: 'project-assets.zip',
          size: '1.8 MB',
          type: 'Assets',
          url: '/api/materials/files/react-hooks-assets.zip',
        },
        {
          name: 'setup-guide.pdf',
          size: '0.5 MB',
          type: 'Documentation',
          url: '/api/materials/files/react-hooks-setup.pdf',
        },
      ],
      additionalResources: [
        {
          title: 'React Documentation',
          url: 'https://react.dev',
        },
        {
          title: 'TypeScript Handbook',
          url: 'https://www.typescriptlang.org/docs/',
        },
      ],
    },
    'nextjs-fullstack-app': {
      title: 'Next.js Full-Stack App Materials',
      files: [
        {
          name: 'complete-project.zip',
          size: '5.2 MB',
          type: 'Complete Project',
          url: '/api/materials/files/nextjs-complete.zip',
        },
        {
          name: 'database-schema.sql',
          size: '0.1 MB',
          type: 'Database',
          url: '/api/materials/files/nextjs-schema.sql',
        },
      ],
      additionalResources: [
        {
          title: 'Next.js Documentation',
          url: 'https://nextjs.org/docs',
        },
      ],
    },
  };

  return materialsList[videoId] || null;
}
