const { User } = require('../models');

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id, { attributes: ['id','username','email','display_name','role','created_at'] });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (parseInt(req.user.id) !== parseInt(id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const { display_name } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.display_name = display_name || user.display_name;
    await user.save();
    res.json({ message: 'Updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUser, updateUser };
