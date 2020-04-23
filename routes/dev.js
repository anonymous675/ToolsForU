const express =require('express');
const router = express.Router();

router.get('/code-manipulation/editors', (req, res) => {
  res.send('editors');
});

module.exports = router;
