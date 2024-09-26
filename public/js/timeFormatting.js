const options = {
    year: 'numeric',
    day: 'numeric',
    month: 'numeric',
    hour12: false,
};

const optionsDetailed = {
    year: 'numeric',
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
};

const formatDate = (date) => {
    return date.toLocaleString('en-GB', options);
};

const formatDateDetailed = (date) => {
    return date.toLocaleString('en-GB', optionsDetailed);
};

module.exports = { formatDate, formatDateDetailed };
