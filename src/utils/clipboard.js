export async function copy2clipboard(content) {
    await window.navigator.clipboard.writeText(content);
}