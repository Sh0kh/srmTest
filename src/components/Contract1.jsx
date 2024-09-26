import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import '../Style/Contract_q.css';
import axios from 'axios';
import CONFIG from '../Service/config';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "toastify-js/src/toastify.css";
import JSZip from "jszip";
import { saveAs } from "file-saver";
function Contract1() {
    const { id } = useParams();
    const [html, setHtml] = useState('');
    const divRef = React.useRef();
    const [tentder, setTender] = useState([])
    const [data, setData] = useState([])
    const [imageData, setImageData] = useState([])
    const [document, setDocument] = useState([])
    useEffect(() => {
        const getContract = async () => {
            try {
                const response = await axios.get(`/contract/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });

    
                const parser = new DOMParser();
                const doc = parser.parseFromString(response.data.html, 'text/html');
                const bodyContent = doc.body.innerHTML;
    
                setTender(response.data.category_contract.name);
                setData(response.data);
                setHtml(bodyContent);
    
                // Если есть несколько изображений, сохраняем их все
                if (response.data.image && response.data.image.length > 0) {
                    const allImages = response.data.image.map(img => img.image);
                    setImageData(allImages); // Сохраняем массив изображений
                }
    
                // Если есть несколько документов, сохраняем их все
                if (response.data.document && response.data.document.length > 0) {
                    const allDocuments = response.data.document.map(doc => doc.document);
                    setDocument(allDocuments); // Сохраняем массив документов
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }
            }
        };
    
        getContract();
    }, [id]);
    
    

    const downloadPDF = () => {
        html2canvas(divRef.current, {
            scale: 2, // Увеличиваем масштаб для улучшения качества
            useCORS: true, // Если у вас есть внешние изображения, включите это
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4'); // Используем A4 формат
            const imgWidth = 190; // Ширина изображения
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const pageHeight = pdf.internal.pageSize.height;

            let position = 0;

            // Добавляем изображение в PDF
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            position += imgHeight;

            // Проверяем, нужно ли добавлять новую страницу
            while (position >= pageHeight) {
                position -= pageHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            }

            pdf.save('download.pdf');
        });
    };
    const defaultImageUrl = 'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=';

    const downloadFile = async (fileUrl, originalFileName) => {
        try {
            const response = await axios.get(fileUrl, {
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    
            const contentType = response.headers['content-type'];
            let fileExtension = '';
    
            // Определяем расширение файла на основе его MIME-типа
            if (contentType === 'application/pdf') {
                fileExtension = '.pdf';
            } else if (contentType === 'application/msword') {
                fileExtension = '.doc';
            } else if (contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                fileExtension = '.docx';
            } else if (contentType.startsWith('image/')) {
                fileExtension = `.${contentType.split('/')[1]}`; // Например, '.jpg' для 'image/jpeg'
            } else {
                console.error('Unsupported file type:', contentType);
                return { success: false };
            }
    
            // Проверяем, заканчивается ли оригинальное имя файла на предполагаемое расширение
            let fileName = originalFileName;
            if (!originalFileName.endsWith(fileExtension)) {
                fileName += fileExtension;
            }
    
            return { success: true, data: response.data, name: fileName };
        } catch (error) {
            console.error(`Error downloading file: ${originalFileName}`, error);
            return { success: false };
        }
    };
    
      
    const downloadZip = async () => {
        try {
            const zip = new JSZip();
    
            // Скачивание и добавление всех документов
            if (document.length > 0) {
                for (let i = 0; i < document.length; i++) {
                    const documentUrl = `${CONFIG.API_URL}${document[i]}`;
                    const originalFileName = `document_${i + 1}`; // Можете использовать оригинальное имя файла, если оно доступно
                    const downloadedDocument = await downloadFile(documentUrl, originalFileName);
                    if (downloadedDocument.success) {
                        zip.file(downloadedDocument.name, downloadedDocument.data);
                    } else {
                        console.log(`Failed to download document ${i + 1}.`);
                    }
                }
            } else {
                console.log('No documents to download.');
            }
    
            // Скачивание и добавление всех изображений
            if (imageData.length > 0) {
                for (let i = 0; i < imageData.length; i++) {
                    const imageUrl = `${CONFIG.API_URL}${imageData[i]}`;
                    const originalFileName = `image_${i + 1}`; // Можете использовать оригинальное имя файла, если оно доступно
                    const downloadedImage = await downloadFile(imageUrl, originalFileName);
                    if (downloadedImage.success) {
                        zip.file(downloadedImage.name, downloadedImage.data);
                    } else {
                        console.log(`Failed to download image ${i + 1}.`);
                    }
                }
            } else {
                console.log('No images to download.');
            }
    
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            saveAs(zipBlob, 'contract_files.zip');
        } catch (error) {
            console.error('Error generating ZIP file:', error);
        }
    };
    
    
    
      

    return (
        <div className='Contract1'>

            <Header />
            <div className='contract1__main'>
                {tentder === "Тендер" ? (
                    <div className='Tender__wrapper'>
                        <div className='Tender__img'>
                            <img src={data.image ? CONFIG.API_URL + data.image : defaultImageUrl} alt="" />
                        </div>
                        <div className='contract1__content'>
                            <h2>
                                Тендер
                            </h2>
                            <div className='contract1__content__grdi'>
                                <h3>
                                    Наименование:
                                </h3>
                                <span>
                                    {data.client.name}
                                </span>
                            </div>
                            <div className='contract1__content__grdi'>
                                <h3>
                                    Дата создания:
                                </h3>
                                <span>
                                    {data.client.updatedAt.split('T')[0]}
                                </span>
                            </div>
                            <div className='contract1__content__grdi'>
                                <h3>
                                    Серия паспорта:
                                </h3>
                                <span>
                                    {data.passport_series}
                                </span>
                            </div>
                            <div className='contract1__content__grdi'>
                                <h3>
                                    Телефон номер:
                                </h3>
                                <span>
                                    {data.phone_number}
                                </span>
                            </div>
                            <div className='contract1__content__grdi'>
                                <h3>
                                    Адрес:
                                </h3>
                                <span>
                                    {data.info_address}
                                </span>
                            </div>
                            <div className='contract1__content__grdi'>
                                <h3>
                                    Банк:
                                </h3>
                                <span>
                                    {data.info_bank}
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <button className='con__btn' onClick={downloadPDF}>Скачать PDF</button>
                        <div
                            ref={divRef}
                            className='contract1__content'
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    </div>
                )}
                <div className='Customers-content-main end1'>
                    <h2>
                        Скачать загруженый файл
                    </h2>
                    <button  className="file-input-container end1"  onClick={downloadZip}>
                    Скачать файл
                </button>
                </div>
            
            </div>
        </div>
    );
}

export default Contract1;
