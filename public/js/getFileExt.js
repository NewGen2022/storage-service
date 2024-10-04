const getFileExtension = (fileName) => {
    const parts = fileName.split('.');
    return parts.length > 1 ? parts.pop() : '';
};

module.exports = { getFileExtension };
