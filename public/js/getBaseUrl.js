const getFullBaseUrl = () => {
    const baseUrl = `${window.location.protocol}//${window.location.hostname}`;

    // If you're running on localhost and want to include the port if it's not the default (80 for HTTP and 443 for HTTPS)
    const port = window.location.port ? `:${window.location.port}` : '';
    return `${baseUrl}${port}`;
};

export { getFullBaseUrl };
