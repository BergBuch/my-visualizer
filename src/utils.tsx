// readerを使ってファイルを読み込む関数を定義する
// const text = await readFileContent(file); のように使用する
export const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            resolve(content);
        };
        reader.onerror = (e) => {
            reject(e);
        };
        reader.readAsText(file);
    });
};