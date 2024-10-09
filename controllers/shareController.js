const shareFile = async (req, res) => {};

const shareDir = async (req, res) => {
    const dirId = req.params.dirId;
    const userId = req.user.id;
    const duration = req.body.duration;
};

module.exports = { shareFile, shareDir };
