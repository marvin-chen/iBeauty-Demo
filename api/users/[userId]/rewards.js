// Vercel serverless function for user rewards
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { userId } = req.query;

  const rewardsData = {
    success: true,
    data: {
      userId: userId || 'user123',
      currentPoints: 1250,
      membershipLevel: 'Gold',
      nextLevelThreshold: 2000,
      availableRewards: [
        {
          id: 'reward-1',
          name: 'Free L\'Oréal Revitalift Serum',
          pointsCost: 500,
          description: 'Premium anti-aging serum worth $24.99',
          category: 'Products',
          inStock: true
        },
        {
          id: 'reward-2',
          name: 'Virtual Skincare Consultation',
          pointsCost: 800,
          description: '30-minute consultation with L\'Oréal skincare expert',
          category: 'Services',
          inStock: true
        },
        {
          id: 'reward-3',
          name: '20% Off Next Purchase',
          pointsCost: 300,
          description: 'Discount code for your next L\'Oréal purchase',
          category: 'Discounts',
          inStock: true
        }
      ],
      recentActivity: [
        {
          id: 'activity-1',
          type: 'points_earned',
          description: 'Completed daily skin analysis',
          points: 50,
          date: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'activity-2',
          type: 'reward_redeemed',
          description: 'Redeemed travel-size moisturizer',
          points: -200,
          date: new Date(Date.now() - 172800000).toISOString()
        }
      ]
    }
  };

  res.status(200).json(rewardsData);
}