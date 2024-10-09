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

const calculateExpireAt = (duration) => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + duration);
    return currentDate.toISOString();
};

module.exports = { formatDate, formatDateDetailed, calculateExpireAt };
