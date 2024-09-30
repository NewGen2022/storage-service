const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const BUCKET_NAME = 'odin-storage-service-files';

const uploadFile = async (filePath, file) => {
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

    console.log(`File ${file.originalname} uploaded to supabase successfully`);

    return data;
};

module.exports = { uploadFile };
