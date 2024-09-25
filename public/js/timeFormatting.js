const options = {
    year: 'numeric',
    day: 'numeric',
    month: 'long',
    // hour: 'numeric',
    // minute: 'numeric',
    hour12: false,
};

const formatDate = (date) => {
    return date.toLocaleString('en-GB', options);
};

module.exports = { formatDate };
