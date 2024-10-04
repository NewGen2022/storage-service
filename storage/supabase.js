const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const BUCKET_NAME = 'odin-storage-service-files';

const uploadFileSB = async (filePath, file) => {
    const fileBuffer = file.buffer;

    const { data, err } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, fileBuffer, {
            contentType: file.mimetype,
        });

    if (err) {
        console.error('Error uploading file:', err);
        throw err;
    }

    return data;
};

const deleteFileSB = async (filePath) => {
    try {
        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .remove([filePath]);

        if (error) {
            console.error('Error deleting file from Supabase:', error.message);
            throw new Error('Supabase file deletion failed');
        }
    } catch (err) {
        console.error('Error during Supabase file deletion:', err);
        throw err;
    }
};

const downloadFileSB = async (filePath) => {
    try {
        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .download(filePath);

        if (error) {
            console.error('Error downloading file from Supabase:', error);
            throw new Error('Supabase file downloading failed');
        }

        return data;
    } catch (err) {
        console.error('Error during Supabase file downloading:', err);
        throw err;
    }
};

const updateFileNameSB = async (oldFilePath, newFilePath) => {
    const fileData = await downloadFileSB(oldFilePath);

    // Upload the file with the new name
    await deleteFileSB(oldFilePath);

    const arrayBuffer = await fileData.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const file = {
        buffer: fileBuffer,
        mimetype: fileData.type,
    };

    const updatedFile = await uploadFileSB(newFilePath, file);

    return updatedFile;
};

module.exports = {
    uploadFileSB,
    deleteFileSB,
    downloadFileSB,
    updateFileNameSB,
};
