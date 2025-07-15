const express = require("express");
const router = express.Router();
const JournalEntry = require("../models/JournalEntry");

// POST /api/journal
router.post("/", async (req, res) => {
  const { userId, content, mood } = req.body;
  console.log("📥 POST /api/journal - New entry:", { userId, mood });

  if (!userId || !content || !mood) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newEntry = new JournalEntry({ userId, content, mood });
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    console.error("❌ Error saving journal entry:", err.message);
    res.status(500).json({ error: "Failed to save entry" });
  }
});

// GET /api/journal/:userId
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(`📥 GET /api/journal/${userId}`);

  try {
    const entries = await JournalEntry.find({ userId }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    console.error("❌ Error fetching entries:", err.message);
    res.status(500).json({ error: "Failed to fetch entries" });
  }
});

// ✅ NEW: GET /api/journal/:userId/summary
router.get("/:userId/summary", async (req, res) => {
  const { userId } = req.params;
  console.log(`📥 GET /api/journal/${userId}/summary - Fetching mood summary`);

  try {
    const entries = await JournalEntry.find({ userId }).sort({ createdAt: -1 });

    if (!entries.length) {
      return res.json({
        totalEntries: 0,
        currentStreak: 0,
        latestMood: null,
      });
    }

    const totalEntries = entries.length;
    const latestMood = entries[0].mood;

    // Calculate streak of consecutive days
    let streak = 1;
    for (let i = 1; i < entries.length; i++) {
      const prev = new Date(entries[i - 1].createdAt);
      const curr = new Date(entries[i].createdAt);

      const diff = Math.floor((prev - curr) / (1000 * 60 * 60 * 24));
      if (diff === 1) {
        streak++;
      } else if (diff > 1) {
        break;
      }
    }

    res.json({
      totalEntries,
      currentStreak: streak,
      latestMood,
    });
  } catch (err) {
    console.error("❌ Error in summary route:", err.message);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});

module.exports = router;
