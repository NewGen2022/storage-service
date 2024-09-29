const showSuccessMsg = () => {
    const successContainer = document.getElementById('success-container');
    const successMsg = document.getElementById('success-msg');

    if (successMsg.innerHTML) {
        successContainer.style.display = 'flex';

        setTimeout(() => {
            successContainer.style.display = 'none';
        }, 3000);
    }
};

const showAddDirForm = () => {
    const addDirForm = document.getElementById('addDirForm');
    const addDirBtn = document.getElementById('addDirBtn');
    const cancelDirBtn = document.getElementById('cancelDirBtn');

    addDirBtn.addEventListener('click', () => {
        addDirForm.style.display = 'flex';
    });

    cancelDirBtn.addEventListener('click', () => {
        addDirForm.style.display = 'none';
    });
};

const showAddFileForm = () => {
    const addFileForm = document.getElementById('addFileForm');
    const addFileBtn = document.getElementById('addFileBtn');
    const cancelFileBtn = document.getElementById('cancelFileBtn');

    addFileBtn.addEventListener('click', () => {
        addFileForm.style.display = 'flex';
    });

    cancelFileBtn.addEventListener('click', () => {
        addFileForm.style.display = 'none';
    });
};

const showDeleteFileForm = () => {
    const deleteFileForm = document.getElementById('deleteFileForm');
    const deleteFileBtn = document.getElementById('deleteFileBtn');
    const cancelDeleteFileBtn = document.getElementById('cancelDeleteFileBtn');

    deleteFileBtn.addEventListener('click', () => {
        deleteFileForm.style.display = 'flex';
    });

    cancelDeleteFileBtn.addEventListener('click', () => {
        deleteFileForm.style.display = 'none';
    });
};

const showDeleteDirForm = () => {
    const deleteDirForm = document.getElementById('deleteDirForm');
    const deleteDirBtn = document.getElementById('deleteDirBtn');
    const cancelDeleteDirBtn = document.getElementById('cancelDeleteDirBtn');

    deleteDirBtn.addEventListener('click', () => {
        deleteDirForm.style.display = 'flex';
    });

    cancelDeleteDirBtn.addEventListener('click', () => {
        deleteDirForm.style.display = 'none';
    });
};

export {
    showSuccessMsg,
    showAddDirForm,
    showAddFileForm,
    showDeleteFileForm,
    showDeleteDirForm,
};
