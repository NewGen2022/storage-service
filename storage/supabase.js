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
    const { data, err } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([filePath]);

    if (err) {
        console.error('Error deleting file:', err);
        throw err;
    }

    return data;
};

module.exports = { uploadFileSB, deleteFileSB };
