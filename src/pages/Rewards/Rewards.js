import React, { useState, useEffect } from 'react';
import { useDemoUser } from '../../context/DemoUserContext';
import { SKIN_AREAS } from '../../utils/skinAreas';
import './Rewards.css';

function Rewards() {
  const { currentDemoUser, getCurrentUserProfile } = useDemoUser();
  const [userData, setUserData] = useState(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState(1250);
  const [milestones, setMilestones] = useState([]);
  const [availableRewards, setAvailableRewards] = useState([]);
  const [skinGoals, setSkinGoals] = useState([]);

  useEffect(() => {
    // Load user data based on current demo user
    const loadUserData = () => {
      const profile = getCurrentUserProfile();
      if (profile) {
        setUserData({
          name: profile.name,
          memberSince: profile.joinDate,
          totalAnalyses: 12,
          currentStreak: 7,
          membershipTier: profile.membershipLevel
        });
        setLoyaltyPoints(profile.currentPoints);
      } else {
        // Fallback to default
        setUserData({
          name: "Demo User",
          memberSince: "2024-01-15",
          totalAnalyses: 12,
          currentStreak: 7,
          membershipTier: "Gold"
        });
      }
    };

    const generateMilestones = () => {
      const milestoneData = [
        {
          id: 1,
          title: "First Analysis Complete",
          description: "Complete your first skin analysis",
          points: 100,
          progress: 100,
          completed: true,
          completedDate: "2024-01-15",
          discount: "5% off first purchase"
        },
        {
          id: 2,
          title: "Weekly Warrior",
          description: "Complete 7 consecutive daily check-ins",
          points: 200,
          progress: 100,
          completed: true,
          completedDate: "2024-02-01",
          discount: "10% off skincare routine"
        },
        {
          id: 3,
          title: "Skin Improvement Champion",
          description: "Achieve 20% improvement in any skin area",
          points: 300,
          progress: 85,
          completed: false,
          discount: "15% off premium products"
        },
        {
          id: 4,
          title: "Analysis Expert",
          description: "Complete 10 skin analyses",
          points: 250,
          progress: 100,
          completed: true,
          completedDate: "2024-03-10",
          discount: "Free shipping on next order"
        },
        {
          id: 5,
          title: "Goal Crusher",
          description: "Reach target scores in 5 different skin areas",
          points: 500,
          progress: 60,
          completed: false,
          discount: "20% off entire purchase"
        },
        {
          id: 6,
          title: "Consistency Master",
          description: "Maintain routine for 30 consecutive days",
          points: 400,
          progress: 43,
          completed: false,
          discount: "25% off L'Oréal premium line"
        }
      ];
      setMilestones(milestoneData);
    };

    const generateRewards = () => {
      const rewardsData = [
        {
          id: 1,
          title: "5% Skincare Discount",
          pointsCost: 200,
          description: "Get 5% off any skincare product",
          category: "discount",
          validUntil: "2025-12-31",
          available: true
        },
        {
          id: 2,
          title: "Free Shipping",
          pointsCost: 150,
          description: "Free shipping on your next order",
          category: "shipping",
          validUntil: "2025-08-31",
          available: true
        },
        {
          id: 3,
          title: "10% Premium Products",
          pointsCost: 400,
          description: "10% off L'Oréal premium product line",
          category: "discount",
          validUntil: "2025-10-31",
          available: true
        },
        {
          id: 4,
          title: "Exclusive Consultation",
          pointsCost: 800,
          description: "30-minute personalized skincare consultation",
          category: "service",
          validUntil: "2025-09-30",
          available: true
        },
        {
          id: 5,
          title: "Early Access Pass",
          pointsCost: 300,
          description: "Early access to new product launches",
          category: "access",
          validUntil: "2025-12-31",
          available: true
        },
        {
          id: 6,
          title: "Sample Kit",
          pointsCost: 250,
          description: "Curated sample kit based on your skin analysis",
          category: "product",
          validUntil: "2025-11-30",
          available: loyaltyPoints >= 250
        }
      ];
      setAvailableRewards(rewardsData);
    };

    const generateSkinGoals = () => {
      const goalsData = SKIN_AREAS.map((area, index) => ({
        id: area.id,
        name: area.name,
        icon: area.icon,
        color: area.color,
        currentScore: Math.floor(Math.random() * 60) + 20,
        targetScore: area.optimalRange.max,
        baselineScore: Math.floor(Math.random() * 80) + 40,
        improvement: Math.floor(Math.random() * 30),
        goalReached: Math.random() > 0.6,
        pointsEarned: Math.floor(Math.random() * 100) + 50,
        milestoneProgress: Math.floor(Math.random() * 100)
      }));
      setSkinGoals(goalsData);
    };

    loadUserData();
    generateMilestones();
    generateRewards();
    generateSkinGoals();
  }, [loyaltyPoints, getCurrentUserProfile, currentDemoUser]);

  const redeemReward = (rewardId) => {
    const reward = availableRewards.find(r => r.id === rewardId);
    if (reward && loyaltyPoints >= reward.pointsCost) {
      setLoyaltyPoints(prev => prev - reward.pointsCost);
      alert(`Successfully redeemed: ${reward.title}`);
      // Update available rewards
      setAvailableRewards(prev => 
        prev.map(r => 
          r.id === rewardId 
            ? { ...r, available: false }
            : r
        )
      );
    }
  };

  const getTierInfo = (tier) => {
    const tiers = {
      Bronze: { color: '#CD7F32', nextTier: 'Silver', pointsNeeded: 500 },
      Silver: { color: '#C0C0C0', nextTier: 'Gold', pointsNeeded: 1000 },
      Gold: { color: '#FFD700', nextTier: null, pointsNeeded: 0 }
    };
    return tiers[tier] || tiers.Bronze;
  };

  const getTierProgress = (currentTier, currentPoints) => {
    const tierInfo = getTierInfo(currentTier);
    if (!tierInfo.nextTier) {
      return { pointsToNext: 0, progress: 100 };
    }
    
    const pointsToNext = tierInfo.pointsNeeded - currentPoints;
    const progress = Math.min((currentPoints / tierInfo.pointsNeeded) * 100, 100);
    
    return { pointsToNext: Math.max(pointsToNext, 0), progress };
  };

  const tierInfo = getTierInfo(userData?.membershipTier);
  const tierProgress = getTierProgress(userData?.membershipTier, loyaltyPoints);

  return (
    <div className="rewards-page">
      <div className="rewards-hero">
        <div className="hero-content">
          <h1>L'Oréal Rewards</h1>
          <p className="hero-subtitle">
            Track your skin journey and unlock exclusive benefits
          </p>
        </div>
      </div>

      <div className="rewards-content">
        {/* Loyalty Points & Status */}
        <section className="loyalty-section">
          <div className="loyalty-card">
            <div className="loyalty-header">
              <div className="points-display">
                <div className="points-number">{loyaltyPoints.toLocaleString()}</div>
                <div className="points-label">Loyalty Points</div>
              </div>
              <div className="tier-info">
                <div className="tier-badge" style={{ 
                  backgroundColor: tierInfo.color,
                  color: userData?.membershipTier === 'Gold' ? '#000000' : '#FFFFFF'
                }}>
                  {userData?.membershipTier} Member
                </div>
                {tierInfo.nextTier && tierProgress.pointsToNext > 0 && (
                  <div className="tier-progress">
                    <div className="tier-next">
                      {tierProgress.pointsToNext} points to {tierInfo.nextTier}
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${tierProgress.progress}%`,
                          backgroundColor: tierInfo.color 
                        }}
                      ></div>
                    </div>
                  </div>
                )}
                {!tierInfo.nextTier && (
                  <div className="tier-progress">
                    <div className="tier-next premium-status">
                      Maximum Tier Reached
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="loyalty-stats">
              <div className="stat-item">
                <span className="stat-number">{userData?.totalAnalyses}</span>
                <span className="stat-label">Total Analyses</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{userData?.currentStreak}</span>
                <span className="stat-label">Day Streak</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{milestones.filter(m => m.completed).length}</span>
                <span className="stat-label">Milestones</span>
              </div>
            </div>
          </div>
        </section>

        {/* Skin Goals Progress */}
        <section className="goals-section">
          <h2>Skin Goals Progress</h2>
          <div className="goals-grid">
            {skinGoals.map((goal) => (
              <div key={goal.id} className="goal-card">
                <div className="goal-header">
                  <div className="goal-icon" style={{ backgroundColor: goal.color }}>
                    <i className={goal.icon}></i>
                  </div>
                  <div className="goal-info">
                    <h4>{goal.name}</h4>
                    <div className="goal-scores">
                      <span className="current-score">Current: {goal.currentScore}</span>
                      <span className="target-score">Target: ≤{goal.targetScore}</span>
                    </div>
                  </div>
                  {goal.goalReached && (
                    <div className="goal-achieved">
                      <i className="fas fa-trophy"></i>
                    </div>
                  )}
                </div>
                <div className="goal-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${goal.milestoneProgress}%`,
                        backgroundColor: goal.goalReached ? '#28a745' : goal.color
                      }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    {goal.improvement}% improvement • {goal.pointsEarned} points earned
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Milestones */}
        <section className="milestones-section">
          <h2>Achievement Milestones</h2>
          <div className="milestones-grid">
            {milestones.map((milestone) => (
              <div key={milestone.id} className={`milestone-card ${milestone.completed ? 'completed' : ''}`}>
                <div className="milestone-header">
                  <div className="milestone-icon">
                    {milestone.completed ? (
                      <i className="fas fa-check-circle"></i>
                    ) : (
                      <i className="fas fa-target"></i>
                    )}
                  </div>
                  <div className="milestone-info">
                    <h4>{milestone.title}</h4>
                    <p>{milestone.description}</p>
                  </div>
                  <div className="milestone-points">
                    +{milestone.points} pts
                  </div>
                </div>
                <div className="milestone-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${milestone.progress}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">{milestone.progress}% complete</div>
                </div>
                {milestone.discount && (
                  <div className="milestone-reward">
                    <i className="fas fa-gift"></i>
                    <span>Reward: {milestone.discount}</span>
                  </div>
                )}
                {milestone.completed && milestone.completedDate && (
                  <div className="completion-date">
                    Completed on {new Date(milestone.completedDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Available Rewards */}
        <section className="rewards-section">
          <h2>Redeem Rewards</h2>
          <div className="rewards-grid">
            {availableRewards.map((reward) => (
              <div key={reward.id} className={`reward-card ${!reward.available ? 'unavailable' : ''}`}>
                <div className="reward-header">
                  <div className="reward-icon">
                    {reward.category === 'discount' && <i className="fas fa-percent"></i>}
                    {reward.category === 'shipping' && <i className="fas fa-shipping-fast"></i>}
                    {reward.category === 'service' && <i className="fas fa-user-md"></i>}
                    {reward.category === 'access' && <i className="fas fa-star"></i>}
                    {reward.category === 'product' && <i className="fas fa-box"></i>}
                  </div>
                  <div className="reward-cost">
                    {reward.pointsCost} pts
                  </div>
                </div>
                <div className="reward-content">
                  <h4>{reward.title}</h4>
                  <p>{reward.description}</p>
                  <div className="reward-validity">
                    Valid until: {new Date(reward.validUntil).toLocaleDateString()}
                  </div>
                </div>
                <button 
                  className={`redeem-btn ${!reward.available || loyaltyPoints < reward.pointsCost ? 'disabled' : ''}`}
                  onClick={() => redeemReward(reward.id)}
                  disabled={!reward.available || loyaltyPoints < reward.pointsCost}
                >
                  {!reward.available ? 'Redeemed' : 
                   loyaltyPoints < reward.pointsCost ? 'Insufficient Points' : 'Redeem Now'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* How to Earn Points */}
        <section className="earn-points-section">
          <h2>How to Earn Points</h2>
          <div className="earn-points-grid">
            <div className="earn-card">
              <div className="earn-icon">
                <i className="fas fa-camera"></i>
              </div>
              <h4>Complete Analysis</h4>
              <p>Earn 50 points for each skin analysis</p>
            </div>
            <div className="earn-card">
              <div className="earn-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <h4>Daily Check-in</h4>
              <p>Get 10 points for daily app usage</p>
            </div>
            <div className="earn-card">
              <div className="earn-icon">
                <i className="fas fa-bullseye"></i>
              </div>
              <h4>Reach Goals</h4>
              <p>Bonus 100+ points for achieving skin goals</p>
            </div>
            <div className="earn-card">
              <div className="earn-icon">
                <i className="fas fa-share-alt"></i>
              </div>
              <h4>Share Progress</h4>
              <p>Earn 25 points for sharing achievements</p>
            </div>
          </div>
        </section>

        {/* Membership Tiers Explanation */}
        <section className="tier-explanation">
          <h2>Membership Tiers</h2>
          <div className="tier-cards">
            <div className="tier-card">
              <div className="tier-badge bronze">Bronze</div>
              <p>Starting tier • 0-499 points</p>
              <span>5% discount on products</span>
            </div>
            <div className="tier-card">
              <div className="tier-badge silver">Silver</div>
              <p>Growing tier • 500-999 points</p>
              <span>10% discount + priority support</span>
            </div>
            <div className="tier-card">
              <div className="tier-badge gold">Gold</div>
              <p>Premium tier • 1000+ points</p>
              <span>15% discount + exclusive products + personal consultant</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Rewards;
