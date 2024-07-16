import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import '../Style/Contract_q.css';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Contract1() {
    const { id } = useParams();
    const [html, setHtml] = useState('');
    const divRef = React.useRef();

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

                setHtml(bodyContent);
            } catch (error) {
                console.error('Ошибка при загрузке контракта:', error);
            }
        };

        getContract();
    }, [id]);

    const downloadPDF = () => {
        html2canvas(divRef.current, {
            scale: 2, // Поддерживайте масштаб для качества
            useCORS: true,
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4'); // Формат A4
    
            // Увеличьте максимальную ширину изображения
            const imgWidth = 210; // Ширина A4
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
            // Установите максимальную высоту, чтобы она помещалась на странице
            const maxHeight = pdf.internal.pageSize.height - 30; // Оставьте отступ
    
            // Отрегулируйте высоту изображения для сохранения пропорций
            const adjustedHeight = imgHeight > maxHeight ? maxHeight : imgHeight;
    
            // Вычислите ширину на основе отрегулированной высоты
            const adjustedWidth = (canvas.width * adjustedHeight) / canvas.height;
    
            // Вычислите позицию X для центрирования изображения
            const xPosition = (pdf.internal.pageSize.width - adjustedWidth) / 2;
    
            pdf.addImage(imgData, 'PNG', xPosition, 10, adjustedWidth, adjustedHeight); // Добавьте отступ
            pdf.save('Contract.pdf');
        });
    };
    
    
    return (
        <div className='Contract1'>
            <Header />
            <div className='contract1__main'>
                <button className='con__btn' onClick={downloadPDF}>Скачать PDF</button>
                <div
                    ref={divRef}
                    className='contract1__content'
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </div>
    );
}

export default Contract1;
