export const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    link.remove();

    // Revoke on next tick to give the browser time to start the download.
    setTimeout(() => URL.revokeObjectURL(url), 0);
};

export const downloadText = (text, filename, mimeType = 'text/plain;charset=utf-8') => {
    const blob = new Blob([text], { type: mimeType });
    downloadBlob(blob, filename);
};

export const downloadBytes = (bytes, filename, mimeType = 'application/octet-stream') => {
    const blob = new Blob([bytes], { type: mimeType });
    downloadBlob(blob, filename);
};
