const addDirForm = () => {
    const addDirForm = document.getElementById('addDirForm');
    const addDirBtn = document.getElementById('addDirBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    addDirBtn.addEventListener('click', () => {
        addDirForm.style.display = 'flex';
    });

    cancelBtn.addEventListener('click', () => {
        addDirForm.style.display = 'none';
    });
};

export { addDirForm };
