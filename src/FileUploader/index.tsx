import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import './index.css'
import { readFileContent } from '../utils';

const FileUploader: FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [inputContent, setInputContent] = useState<string>('');

    // ファイルの読み込み処理をまとめた関数（async版）
    const loadFile = async (file: File) => {
        try {
            const content = await readFileContent(file);
            setInputContent(content);
        } catch (error) {
            console.error("ファイルの読み込みに失敗:", error);
            setInputContent('');
        }
    };

  // selectedFileが変わったらファイルを読み込む
    useEffect(() => {
        if (selectedFile) {
        loadFile(selectedFile);
        }
    }, [selectedFile]);

    // フォルダ選択時の処理
    const handleFolderSelection = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            const fileArray = Array.from(selectedFiles).filter(file => file.name.endsWith('.txt'));
            setFiles(fileArray);
            if (fileArray.length > 0) {
                setSelectedFile(fileArray[0]);
            }
        }
    };

    // プルダウンの変更処理
    const handleFileChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const fileName = e.target.value;
        const file = files.find(f => f.name === fileName) || null;
        setSelectedFile(file);
    };

    return (
        <div className="folder-selector-container">
        <div className="folder-selector">
            <input
                type="file"
                webkitdirectory=""
                onChange={handleFolderSelection}
            />
            {files.length > 0 && (
            <select value={selectedFile?.name || ''} onChange={handleFileChange}>
                {files.map((file) => (
                    <option key={file.name} value={file.name}>
                        {file.name}
                    </option>
                ))}
            </select>
            )}
        </div>
        <div className="file-display">
            {selectedFile && (
            <div>
                <textarea
                    rows={10}
                    cols={50}
                    value={inputContent}
                    onChange={(e) => setInputContent(e.target.value)}
                />
            </div>
            )}
        </div>
        </div>
    );
};

export default FileUploader;