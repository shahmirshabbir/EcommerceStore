const fs = require('fs');

exports.delImg = (path)=>{
    // path = ;
    fs.unlink(path, (err) => {
  if (err) {
    console.error('Failed to delete file:', err);
    return;
  }
  console.log('File deleted successfully');
});
}