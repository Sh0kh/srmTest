import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import '../Style/Contract_q.css';
import axios from 'axios';
import CONFIG from '../Service/config';
import html2canvas from 'html2canvas';
/* eslint-disable-next-line */
import jsPDF from 'jspdf';

function Contract1() {
    const { id } = useParams();
    const [html, setHtml] = useState('');
    const divRef = React.useRef();
    const [tentder, setTender] = useState([])
    const [data, setData] = useState([])
    useEffect(() => {
        const getContract = async () => {
            try {
                const response = await axios.get(`/contract/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data)
                const parser = new DOMParser();
                const doc = parser.parseFromString(response.data.html, 'text/html');
                const bodyContent = doc.body.innerHTML;
                setTender(response.data.category_contract.name)
                setData(response.data)
                setHtml(bodyContent);
            } catch (error) {
                console.error('Ошибка при загрузке контракта:', error);
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

    return (
        <div className='Contract1'>
  
            <Header />
            <div className='contract1__main'>
                {tentder === "Тендер"  ? (
               <div className='Tender__wrapper'>
                <div className='Tender__img'>
                    <img src={data.image ? CONFIG.API_URL + data.image : defaultImageUrl}  alt="" />
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
                ):(
                    <div>
                    <button className='con__btn' onClick={downloadPDF}>Скачать PDF</button>
                    <div
                        ref={divRef}
                        className='contract1__content'
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
                )}
            </div>
        </div>
    );
}

export default Contract1;
