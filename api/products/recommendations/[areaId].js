// Vercel serverless function for product recommendations by area
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { areaId } = req.query;

  const allProducts = [
    {
      id: 'loreal-revitalift-serum',
      name: 'L\'Oréal Revitalift Anti-Aging Serum',
      brand: 'L\'Oréal',
      price: 24.99,
      rating: 4.5,
      description: 'Advanced anti-aging serum with Pro-Retinol and Centella Asiatica',
      ingredients: ['Pro-Retinol', 'Centella Asiatica', 'Hyaluronic Acid'],
      imageUrl: 'https://via.placeholder.com/200x200?text=L%27Oreal+Serum',
      targetAreas: ['wrinkles_fine_lines', 'surface_spots']
    },
    {
      id: 'loreal-hydragenist-moisturizer',
      name: 'L\'Oréal Hydragenist Daily Moisturizer',
      brand: 'L\'Oréal',
      price: 19.99,
      rating: 4.3,
      description: 'Lightweight daily moisturizer for hydrated, smooth skin',
      ingredients: ['Hyaluronic Acid', 'Glycerin', 'Ceramides'],
      imageUrl: 'https://via.placeholder.com/200x200?text=L%27Oreal+Moisturizer',
      targetAreas: ['enlarged_pores', 'texture']
    },
    {
      id: 'loreal-brightening-cream',
      name: 'L\'Oréal Bright Reveal Brightening Cream',
      brand: 'L\'Oréal',
      price: 22.99,
      rating: 4.4,
      description: 'Brightening cream with Vitamin C and Niacinamide',
      ingredients: ['Vitamin C', 'Niacinamide', 'Glycolic Acid'],
      imageUrl: 'https://via.placeholder.com/200x200?text=L%27Oreal+Brightening',
      targetAreas: ['surface_spots', 'uv_damage', 'dark_circles']
    },
    {
      id: 'loreal-texture-refining-toner',
      name: 'L\'Oréal Texture Refining Toner',
      brand: 'L\'Oréal',
      price: 16.99,
      rating: 4.2,
      description: 'Exfoliating toner with AHA/BHA for smooth skin texture',
      ingredients: ['Salicylic Acid', 'Glycolic Acid', 'Niacinamide'],
      imageUrl: 'https://via.placeholder.com/200x200?text=L%27Oreal+Toner',
      targetAreas: ['texture', 'clogged_pores', 'enlarged_pores']
    },
    {
      id: 'loreal-pore-minimizing-serum',
      name: 'L\'Oréal Pore Minimizing Serum',
      brand: 'L\'Oréal',
      price: 28.99,
      rating: 4.6,
      description: 'Advanced serum to minimize pore appearance',
      ingredients: ['Niacinamide', 'Zinc PCA', 'Salicylic Acid'],
      imageUrl: 'https://via.placeholder.com/200x200?text=L%27Oreal+Pore+Serum',
      targetAreas: ['enlarged_pores', 'clogged_pores']
    },
    {
      id: 'loreal-eye-cream',
      name: 'L\'Oréal Age Perfect Eye Cream',
      brand: 'L\'Oréal',
      price: 21.99,
      rating: 4.3,
      description: 'Firming eye cream for dark circles and puffiness',
      ingredients: ['Caffeine', 'Hyaluronic Acid', 'Peptides'],
      imageUrl: 'https://via.placeholder.com/200x200?text=L%27Oreal+Eye+Cream',
      targetAreas: ['dark_circles', 'under_eye_bags']
    },
    {
      id: 'loreal-spot-corrector',
      name: 'L\'Oréal Dark Spot Corrector',
      brand: 'L\'Oréal',
      price: 26.99,
      rating: 4.4,
      description: 'Targeted treatment for dark spots and discoloration',
      ingredients: ['Kojic Acid', 'Vitamin C', 'Arbutin'],
      imageUrl: 'https://via.placeholder.com/200x200?text=L%27Oreal+Spot+Corrector',
      targetAreas: ['surface_spots', 'emerging_dark_spots', 'uv_damage']
    }
  ];

  // Filter products by area
  const recommendedProducts = allProducts.filter(product => 
    product.targetAreas.includes(areaId)
  );

  const response = {
    success: true,
    areaId,
    products: recommendedProducts
  };

  res.status(200).json(response);
}