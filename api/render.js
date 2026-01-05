// Image proxy to fetch character renders from Blizzard API
const REGION = 'eu';

module.exports = async (req, res) => {
  const { realm, name, type } = req.query;

  if (!realm || !name || !type) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const BLIZZARD_CLIENT_ID = process.env.BLIZZARD_CLIENT_ID;
  const BLIZZARD_CLIENT_SECRET = process.env.BLIZZARD_CLIENT_SECRET;

  if (!BLIZZARD_CLIENT_ID || !BLIZZARD_CLIENT_SECRET) {
    return res.status(500).json({ error: 'API credentials not configured' });
  }

  try {
    // Get access token
    const auth = Buffer.from(`${BLIZZARD_CLIENT_ID}:${BLIZZARD_CLIENT_SECRET}`).toString('base64');
    
    const tokenResponse = await fetch(`https://${REGION}.battle.net/oauth/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    if (!tokenResponse.ok) {
      return res.status(500).json({ error: 'Failed to get access token' });
    }

    const tokenData = await tokenResponse.json();
    const token = tokenData.access_token;

    // Fetch character media
    const realmSlug = realm.toLowerCase().replace(/'/g, '').replace(/ /g, '-');
    const nameSlug = name.toLowerCase();
    
    const mediaUrl = `https://${REGION}.api.blizzard.com/profile/wow/character/${realmSlug}/${nameSlug}/character-media?namespace=profile-${REGION}&locale=en_GB`;
    
    const mediaResponse = await fetch(mediaUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!mediaResponse.ok) {
      console.error(`Failed to fetch media for ${name}: ${mediaResponse.status}`);
      return res.status(404).json({ error: 'Character media not found' });
    }

    const mediaData = await mediaResponse.json();
    
    // Find the requested render type in assets
    let renderUrl = null;
    
    if (type === 'main-raw' || type === 'main') {
      renderUrl = mediaData.assets?.find(asset => asset.key === 'main-raw')?.value 
                  || mediaData.assets?.find(asset => asset.key === 'main')?.value;
    } else if (type === 'inset') {
      renderUrl = mediaData.assets?.find(asset => asset.key === 'inset')?.value;
    } else if (type === 'avatar') {
      renderUrl = mediaData.assets?.find(asset => asset.key === 'avatar')?.value;
    }

    if (!renderUrl) {
      return res.status(404).json({ error: 'Render type not found' });
    }

    // Fetch the actual image
    const imageResponse = await fetch(renderUrl);
    
    if (!imageResponse.ok) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    res.send(Buffer.from(imageBuffer));
    
  } catch (error) {
    console.error('Error fetching render:', error);
    return res.status(500).json({ error: 'Failed to fetch render', details: error.message });
  }
};