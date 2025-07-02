import WasteEntry from "../models/WasteEntry.js";

export const getWasteEntries = async (req, res) => {
  const entries = await WasteEntry.find();
  res.json(entries);
};

export const addWasteEntry = async (req, res) => {
  const { location, weight, category } = req.body;

  const now = new Date();
  const newEntry = await WasteEntry.create({
    location,
    weight,
    category,
    date: now.toLocaleDateString("en-GB"),
    time: now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    user: req.user._id,
  });

  res.status(201).json(newEntry);
};

export const deleteWasteEntry = async (req, res) => {
  try {
    const entry = await WasteEntry.findByIdAndDelete(req.params.id);

    if (entry) {
      res.json({ message: "Entry removed" });
    } else {
      res.status(404).json({ message: "Entry not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateWasteEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { location, weight, category } = req.body;

    const updated = await WasteEntry.findByIdAndUpdate(
      id,
      { location, weight, category },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Waste entry not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update waste entry" });
  }
};
