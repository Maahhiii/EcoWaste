import WasteEntry from '../models/WasteEntry.js';

export const getDynamicStats = async (req, res) => {
  try {
    // Total waste collected
    const totalWasteAgg = await WasteEntry.aggregate([
      { $group: { _id: null, total: { $sum: "$weight" } } }
    ]);
    const totalWaste = totalWasteAgg[0]?.total || 0;

    // Unique locations
    const uniqueLocations = await WasteEntry.distinct('location');
    const locationCount = uniqueLocations.length;

    // Category-wise waste distribution (for Pie Chart)
    const categoryAgg = await WasteEntry.aggregate([
      { $group: { _id: "$category", total: { $sum: "$weight" } } }
    ]);

    const categoryDistribution = {};
    categoryAgg.forEach(cat => {
      categoryDistribution[cat._id] = cat.total;
    });

    // Date-wise total waste collection (for Bar Chart)
    const dateAgg = await WasteEntry.aggregate([
      { $group: { _id: "$date", total: { $sum: "$weight" } } },
      { $sort: { _id: 1 } } // Sort by date ascending
    ]);

    const dateWiseCollection = {};
    dateAgg.forEach(entry => {
      dateWiseCollection[entry._id] = entry.total;
    });

    // Final Response
    res.json({
      totalWaste,
      locationCount,
      categoryDistribution,
      dateWiseCollection
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch dynamic stats' });
  }
};
