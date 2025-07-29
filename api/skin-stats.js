// Vercel serverless function for skin stats
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const skinData = {
    success: true,
    data: {
      userId: 'user123',
      lastUpdated: new Date().toISOString(),
      areas: {
        wrinkles_fine_lines: {
          currentScore: 45,
          goal: 30,
          progress: 35,
          previousScore: 52,
          lastAnalyzed: new Date().toISOString()
        },
        surface_spots: {
          currentScore: 28,
          goal: 20,
          progress: 60,
          previousScore: 35,
          lastAnalyzed: new Date().toISOString()
        },
        red_areas: {
          currentScore: 25,
          goal: 18,
          progress: 45,
          previousScore: 30,
          lastAnalyzed: new Date().toISOString()
        },
        enlarged_pores: {
          currentScore: 55,
          goal: 40,
          progress: 30,
          previousScore: 58,
          lastAnalyzed: new Date().toISOString()
        },
        uv_damage: {
          currentScore: 38,
          goal: 25,
          progress: 45,
          previousScore: 42,
          lastAnalyzed: new Date().toISOString()
        },
        dark_circles: {
          currentScore: 32,
          goal: 22,
          progress: 50,
          previousScore: 38,
          lastAnalyzed: new Date().toISOString()
        },
        under_eye_bags: {
          currentScore: 18,
          goal: 12,
          progress: 70,
          previousScore: 25,
          lastAnalyzed: new Date().toISOString()
        },
        nasolabial_folds: {
          currentScore: 42,
          goal: 30,
          progress: 40,
          previousScore: 48,
          lastAnalyzed: new Date().toISOString()
        },
        texture: {
          currentScore: 35,
          goal: 25,
          progress: 55,
          previousScore: 42,
          lastAnalyzed: new Date().toISOString()
        },
        clogged_pores: {
          currentScore: 22,
          goal: 15,
          progress: 65,
          previousScore: 28,
          lastAnalyzed: new Date().toISOString()
        },
        emerging_dark_spots: {
          currentScore: 18,
          goal: 12,
          progress: 70,
          previousScore: 24,
          lastAnalyzed: new Date().toISOString()
        }
      }
    }
  };

  res.status(200).json(skinData);
}