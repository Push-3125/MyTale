export function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = e => resolve(e.target.result); // data:image/...;base64,xxxx
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
