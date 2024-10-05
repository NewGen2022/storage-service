const { getDirById } = require('../../db/queries.js');

const buildBreadCrumb = async (currentDir) => {
    const breadCrumb = [];
    let dir = currentDir;

    breadCrumb.unshift({ id: dir.id, name: dir.name });

    let parentId = dir.parentId;

    while (parentId) {
        dir = await getDirById(parentId);

        if (!dir) {
            console.error(`Directory with ID ${parentId} not found.`);
            break;
        }
        breadCrumb.unshift({ id: dir.id, name: dir.name });
        parentId = dir.parentId;
    }

    return breadCrumb;
};

const buildBreadCrumbForFile = async (file) => {
    const currentDir = await getDirById(file.directoryId);

    const breadCrumb = await buildBreadCrumb(currentDir);

    // adding file to breadcrumb
    breadCrumb.push({ id: file.id, name: file.name });

    return breadCrumb;
};

module.exports = { buildBreadCrumb, buildBreadCrumbForFile };
