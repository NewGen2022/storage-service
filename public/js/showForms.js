import { getFullBaseUrl } from './getBaseUrl.js';

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

const showEditDirForm = () => {
    const editDirForm = document.getElementById('editDirForm');
    const editDirBtn = document.getElementById('editDirBtn');
    const cancelEditDirBtn = document.getElementById('cancelEditDirBtn');

    editDirBtn.addEventListener('click', () => {
        editDirForm.style.display = 'flex';
    });

    cancelEditDirBtn.addEventListener('click', () => {
        editDirForm.style.display = 'none';
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

const showEditFileForm = () => {
    const editFileForm = document.getElementById('editFileForm');
    const editFileBtn = document.getElementById('editFileBtn');
    const cancelEditFileBtn = document.getElementById('cancelEditFileBtn');

    editFileBtn.addEventListener('click', () => {
        editFileForm.style.display = 'flex';
    });

    cancelEditFileBtn.addEventListener('click', () => {
        editFileForm.style.display = 'none';
    });
};

// Loading form when UPLOAD FILE
const showLoadingForm = () => {
    const uploadForm = document.getElementById('uploadForm');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const createFileBtn = document.getElementById('createFileBtn');

    uploadForm.addEventListener('submit', function () {
        loadingSpinner.style.display = 'flex';
        uploadForm.style.display = 'none';

        createFileBtn.disabled = true;
    });
};

// Loading form when DELETE DIRECTORY
const showDeleteDirLoading = () => {
    const deleteDirForm = document.getElementById('deleteDirFormElement');
    const loadingSpinnerDeleteDir = document.getElementById(
        'loadingSpinnerDeleteDir'
    );
    const deleteBtn = document.getElementById('formDeleteDirBtn');

    deleteDirForm.addEventListener('submit', function () {
        loadingSpinnerDeleteDir.style.display = 'flex';
        deleteDirForm.style.display = 'none';

        deleteBtn.disabled = true;
    });
};

// Loading form when EDIT FILE
const showEditFileLoading = () => {
    const editFileForm = document.getElementById('editFileFormElement');
    const loadingSpinnerEditFile = document.getElementById(
        'loadingSpinnerEditFile'
    );
    const editFileBtn = document.getElementById('formEditFileBtn');

    editFileForm.addEventListener('submit', function () {
        loadingSpinnerEditFile.style.display = 'flex';
        editFileForm.style.display = 'none';

        editFileBtn.disabled = true;
    });
};

// Loading form when DELETE FILE
const showDeleteFileLoading = () => {
    const deleteFileForm = document.getElementById('deleteFileFormElement');
    const loadingSpinnerDeleteFile = document.getElementById(
        'loadingSpinnerDeleteFile'
    );
    const deleteFileBtn = document.getElementById('formDeleteFileBtn');

    deleteFileForm.addEventListener('submit', function () {
        loadingSpinnerDeleteFile.style.display = 'flex';
        deleteFileBtn.style.display = 'none';

        deleteFileForm.disabled = true;
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

const changeChosenFileName = () => {
    const fileUploadBtn = document.getElementById('fileUpload');
    const fileNameContainer = document.getElementById('fileName');

    fileUploadBtn.addEventListener('change', function () {
        const fileName = this.files[0] ? this.files[0].name : 'No file chosen';
        fileNameContainer.textContent = fileName;

        if (fileName !== 'No file chosen') {
            fileNameContainer.style.color = '#ffffff';
            fileNameContainer.style.fontWeight = 'bold';
        }
    });
};

const submitDownloadFileForm = () => {
    const downloadBtn = document.getElementById('downloadFileBtn');

    downloadBtn.addEventListener('click', function () {
        const downloadForm = document.getElementById('downloadFileFormElement');

        downloadForm.submit();
    });
};

const submitDownloadSharedFileForm = () => {
    const downloadBtn = document.getElementById('downloadFileBtn');

    downloadBtn.addEventListener('click', () => {
        const downloadForm = document.getElementById('downloadSharedFileForm');

        downloadForm.submit();
    });
};

const showShareDirForm = () => {
    const shareDirContainer = document.getElementById('shareDirContainer');
    const generatedLinkContainer = document.getElementById(
        'generatedLinkContainer'
    );
    const shareDirBtn = document.getElementById('shareDirBtn');
    const shareDirForm = document.getElementById('shareDirForm');
    const cancelDeleteDirBtn = document.getElementById('cancelShareDirBtn');

    // Show the share directory form when the share button is clicked
    shareDirBtn.addEventListener('click', () => {
        shareDirContainer.style.display = 'flex';
    });

    shareDirForm.addEventListener('submit', async (e) => {
        // Hide the share directory form and show the generated link form
        shareDirContainer.style.display = 'none';
        generatedLinkContainer.style.display = 'flex';

        e.preventDefault();

        const dirId = document.getElementById('dirId').value;
        const duration = document.querySelector(
            'input[name="duration"]:checked'
        ).value;

        try {
            const response = await fetch(`/share/directory/${dirId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ duration }),
            });

            if (!response.ok) throw new Error('Failed to generate link');

            // Get the response JSON (assuming the server sends a JSON with the generated link)
            const result = await response.json();

            const fullBaseUrl = getFullBaseUrl();

            // Update the generated link input with the received value
            const linkInput = document.getElementById(
                'generated-link-dir-input'
            );
            linkInput.value =
                fullBaseUrl + '/share/directory/' + result.directoryId;
        } catch (error) {
            console.error('Error generating the share link:', error);
        }
    });

    // Cancel button handler for the share directory form
    cancelDeleteDirBtn.addEventListener('click', () => {
        shareDirContainer.style.display = 'none';
    });
};

const generatedLinkDirForm = () => {
    const generatedLinkContainer = document.getElementById(
        'generatedLinkContainer'
    );
    const generatedLinkDirCopyBtn = document.getElementById(
        'generatedLinkDirCopyBtn'
    );
    const cancelDeleteDirBtn = document.getElementById(
        'cancelGeneratedLinkDirBtn'
    );

    generatedLinkDirCopyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const linkInput = document.getElementById('generated-link-dir-input');
        const copySharedDirLinkBtn = document.getElementById(
            'generatedLinkDirCopyBtn'
        );

        linkInput.classList.add('generatedLink');
        copySharedDirLinkBtn.classList.add('copied-btn');
        linkInput.select();
        document.execCommand('copy');
        copySharedDirLinkBtn.textContent = 'Copied!';
        setTimeout(() => {
            linkInput.classList.remove('generatedLink');
            copySharedDirLinkBtn.classList.remove('copied-btn');
            copySharedDirLinkBtn.textContent = 'Copy';
        }, 5000);
    });

    cancelDeleteDirBtn.addEventListener('click', () => {
        generatedLinkContainer.style.display = 'none';
    });
};

const showShareFileForm = () => {
    const shareFileContainer = document.getElementById('shareFileContainer');
    const generatedFileLinkContainer = document.getElementById(
        'generatedFileLinkContainer'
    );
    const shareFileBtn = document.getElementById('shareFileBtn');
    const shareFileForm = document.getElementById('shareFileForm');
    const cancelShareFileBtn = document.getElementById('cancelShareFileBtn');

    // Show the share directory form when the share button is clicked
    shareFileBtn.addEventListener('click', () => {
        shareFileContainer.style.display = 'flex';
    });

    shareFileForm.addEventListener('submit', async (e) => {
        // Hide the share directory form and show the generated link form
        shareFileContainer.style.display = 'none';
        generatedFileLinkContainer.style.display = 'flex';

        e.preventDefault();

        const fileId = document.getElementById('fileId').value;
        const duration = document.querySelector(
            'input[name="duration"]:checked'
        ).value;

        try {
            const response = await fetch(`/share/file/${fileId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ duration }),
            });

            if (!response.ok) throw new Error('Failed to generate link');

            // Get the response JSON (assuming the server sends a JSON with the generated link)
            const result = await response.json();

            const fullBaseUrl = getFullBaseUrl();

            // Update the generated link input with the received value
            const linkInput = document.getElementById(
                'generated-link-file-input'
            );
            linkInput.value = fullBaseUrl + '/share/file/' + result.fileId;
        } catch (error) {
            console.error('Error generating the share link for file:', error);
        }
    });

    // Cancel button handler for the share file form
    cancelShareFileBtn.addEventListener('click', () => {
        shareFileContainer.style.display = 'none';
    });
};

const generatedLinkFileForm = () => {
    const generatedFileLinkContainer = document.getElementById(
        'generatedFileLinkContainer'
    );
    const copySharedFileLinkBtn = document.getElementById(
        'generatedLinkFileCopyBtn'
    );
    const cancelDeleteFileBtn = document.getElementById(
        'cancelGeneratedLinkFileBtn'
    );

    copySharedFileLinkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const linkInput = document.getElementById('generated-link-file-input');
        const copySharedFileLinkBtn = document.getElementById(
            'generatedLinkFileCopyBtn'
        );

        linkInput.classList.add('generatedLink');
        copySharedFileLinkBtn.classList.add('copied-btn');
        linkInput.select();
        document.execCommand('copy');
        copySharedFileLinkBtn.textContent = 'Copied!';
        setTimeout(() => {
            linkInput.classList.remove('generatedLink');
            copySharedFileLinkBtn.classList.remove('copied-btn');
            copySharedFileLinkBtn.textContent = 'Copy';
        }, 5000);
    });

    cancelDeleteFileBtn.addEventListener('click', () => {
        generatedFileLinkContainer.style.display = 'none';
    });
};

export {
    showSuccessMsg,
    showAddDirForm,
    showEditDirForm,
    showAddFileForm,
    showEditFileForm,
    showLoadingForm,
    showDeleteDirLoading,
    showEditFileLoading,
    showDeleteFileLoading,
    showDeleteFileForm,
    showDeleteDirForm,
    changeChosenFileName,
    submitDownloadFileForm,
    submitDownloadSharedFileForm,
    showShareDirForm,
    showShareFileForm,
    generatedLinkDirForm,
    generatedLinkFileForm,
};
