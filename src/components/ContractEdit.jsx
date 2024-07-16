import '../Style/CotractEdit.css'
import Header from './Header';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import React, { useEffect, useState } from 'react';
import axios from '../Service/axios';
import { useParams } from 'react-router-dom';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";



function ContractEdit() {

 



  const [isActive, setActive] = useState(2)
  const activeCon = (id) => {
    setActive(id)
  }





  const { id } = useParams()

  const [category, setCategory] = useState([])
  const getCategory = () => {
    axios.get('/category-contract', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        setCategory(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }
  // const [selectedFile, setSelectedFile] = useState(null);
  const [editItem, setEditItem] = useState({
    id: '',
    name: '',
    passport_series: '',
    phone_number: '',
    contract_date: '',
    info_bank: '',
    info_address: '',
    image: '',
    inn: '',
    rs: '',
    mfo: '',
    html:'',
    title:'',
    description:''
  })

  const editContract = (e) => {
    e.preventDefault();
  
    const data = {
      name: editItem.name,
      passport_series: editItem.passport_series,
      contract_date: editItem.contract_date,
      info_address: editItem.info_address,
      info_bank: String(editItem.info_bank),
      phone_number: String(editItem.phone_number),
      inn: editItem.inn,
      rs: String(editItem.rs),
      mfo: String(editItem.mfo),
      html: editItem.html,
      title: editItem.title,
      description: editItem.description,
      price_info: editItem.price_info,
      price: editItem.price,
      price_text: editItem.price_text,
      oked: editItem.oked,
      id_one:editItem.id_one,
      id_two:editItem.id_two
    };
  
    axios.put(`/contract/${editItem.id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        Toastify({
          text: "Изменено",
          duration: 3000,
          gravity: "top", 
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
       
      })
      .catch((error) => {
        Toastify({
          text: "Ошибка",
          duration: 3000,
          gravity: "top", 
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
        console.log(error);
      });
  };
  
  // const postFoto = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };
  const [content, setContent] = useState(editItem.html);
  const [content2, setContent2] = useState(editItem.html);
  useEffect(() => {
    getCategory()
    const getContract = () => {
      axios.get(`/contract/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((respons) => {
          setEditItem(respons.data)
          console.log(respons.data);
          setActive(respons.data.category_contract_id);
        })
        .catch((error) => {

        })
    }
    getContract()



    
  }, [id ,])

  const handleModelChange = (newContent) => {
    setContent( newContent);
  };
  
  const handleModelChange2 = (newContent2) => {
    setContent2(newContent2);
  };
  useEffect(() => {
    setContent(`
      <h2 style="text-align: center;">
          Д О Г О В О Р    № ${editItem.id_one} / ${editItem.id_two} Ф
      </h2>
      <p style="text-align: center;">на оценку объекта оценки</p>
      <div style="display:flex;  align-items: center;  justify-content: space-between;">
        <p>  г.Гулистан     </p>
        <p>   	«${editItem.contract_date.split('T')[0]}» </p>
      </div>
       <h3 style="text-align: center;">
          1.   ДОГОВАРИВАЮЩИЕСЯ  СТОРОНЫ 
      </h3>
      <p>
      ООО «SMART CONSULT» именуемый в дальнейшем Исполнитель, в лице директора Назарова А.А. действующего на основании Устава и Лицензии (серии BL 001 реестровый RR-0065, выданной Госкомконкуренцией РУз от 28.11.2016г. страховой полис №Р7/3-7/0008 от 26.01.2024 года выданный АО «ALSKOM» СК) с одной стороны и <span>${editItem.name}</span> именуемый в дальнейшем Заказчик, заключили настоящий договор о нижеследующем:
      </p>
      <h3 style="text-align: center;">
          2.    ПРЕДМЕТ ДОГОВОРА
      </h3>
      <p>
        2.1.По возмездному договору на оценку объекта оценки, Исполнитель обязуется по поручению Заказчика, осуществить консультирование Заказчика по определению стоимости (оценки) имущества (объекта оценки) указанных в п.2.2. настоящего договора, а Заказчик обязуется оплатить оценку или производственные работы (услуги).
        2.2.Наименование объекта оценки: <span>«${editItem.title}»</span>
        2.3.Расположенного по адресу: <span>«${editItem.address}»</span>
        2.4.Цель оценки:   «${editItem.description}»   
        2.5.Вид определяемой стоимости:«${editItem.price_info}»  
        2.6.В случае необходимости дополнительных проработок по комплексу оценочных работ - предмету Договора, внесения изменений и уточнения по инициативе Заказчика или иным объективным причинам, включая изменения и установления дополнительных регламентирующих условий, обуславливаемых нормативными актами, требованиями органов государственного надзора или иных компетентных юридических и физических лиц, составляется Дополнительное соглашение к данному Договору или новый Договор, учитывающие изменение трудоемкости.
      </p>
       <h3 style="text-align: center;">
        3.  ЦЕНА ПРЕДМЕТА ДОГОВОРА И ПОРЯДОК РАСЧЕТОВ
      </h3>
      <p>
        3.1. Подписывая настоящий договор, Исполнитель и Заказчик удостоверяют, что в результате переговоров определен и согласован размер денежного вознаграждения за проведение оценки или производимые работы (услуги), указанные п.2.1. и реализуемые по заключаемому между Сторонами настоящему договору.
        3.2. Заказчик обязуется оплатить за проведение оценки объекта оценки денежное вознаграждение в размере: (без учета НДС) «${editItem.price}» (${editItem.price_text}) сум 00 тийин.
                                /сумма прописью/          
        3.3.Размер денежного вознаграждения за проведение оценки объекта оценки уточняется в случае изменения законодательной минимальной заработной платы по соглашению сторон. Индексации подлежит неоплаченная часть стоимости  работ при предоплате на момент введения новой минимальной заработной платы, а индекс удорожания исчисляется, как отношение новой минимальной заработной платы к  минимальной заработной плате в момент заключения договора. 
        3.4.Заказчик – физическое лицо производит 100% предоплаты в течении 3-х банковских дней со дня подписания договора.
        В случае не оплаты в течение указанного срока, договор считается не состоявшимся и Исполнитель вправе отказаться от исполнения обязательств по настоящему договору.
        3.5.Исполнитель сдает Заказчику один экземпляр письменного отчета по оценке объекта оценки и два экземпляра подписанного акта приема-сдачи выполненных работ. 
        3.6.Заказчик обязуется в течение трех календарных дней подписать и вернуть один экземпляр акта приемки-сдачи (для юридического лица) выполненных работ или вернуть Исполнителю отчет по оценке с письменным мотивированным отказом в приеме работ.
      </p>
       <h3 style="text-align: center;">
       4.  СРОКИ ВЫПОЛНЕНИЯ РАБОТ
      </h3>
         <p>
       4.1. Датой начала выполнения оценки или работ по настоящему договору считается дата поступления на расчетный счет Исполнителя предоплаты (задатка), в соответствии с п.3.4. настоящего договора, датой окончания работ считается дата подписания акта приемки-сдачи выполненных работ. Время, затрачиваемое на оценку объекта оценки, Исполнитель определяет самостоятельно и имеет право выполнить досрочно.
      </p>
         <h3 style="text-align: center;">
      5.  ПРАВА И ОБЯЗАННОСТИ СТОРОН
      </h3>
      <p>
        5.1. Заказчик обязан:
        5.1.1. Оплатить стоимость оценки объекта оценки указанной в п.3.2. настоящего договора, за услуги Исполнителя и принять у него работу в соответствии с пунктами 3.5. и 3.6.
        5.1.2. Обеспечить предоставление информации и необходимых сведений для проведения оценки, обеспечить соответствующие условия для проведения оценки или работ (услуг)
        5.2. Заказчик имеет право:
        5.2.1. Отказаться от поручаемой оценки объекта оценки по настоящему договору по своей инициативе только в тех случаях, когда Исполнитель не приступил к исполнению настоящего договора в согласованные сроки. 

        В случае начала выполнения работ (услуг) по оценки объекта оценки Исполнителем, работа завершается на основании двухстороннего акта на выполненную часть работы
        5.3. Исполнитель обязан: 
        5.3.1. Выполнять оценку объекта оценки в соответствии со стандартами и нормативно-правовыми актами, регламентирующими оценочную деятельность в Республики Узбекистан.
        5.3.2. Сообщить Заказчику о невозможности своего участия в проведении оценки объекта оценки вследствие возникших обстоятельств, препятствующих проведению объективной оценки.
        5.4. Исполнитель имеет право:
        5.4.1.Привлекать по своему усмотрению, за свой счет, самостоятельные экспертные группы для выполнения оценки объекта оценки по настоящему договору.
        5.4.2.Требовать от заказчика: обеспечения доступа к документации; получать разъяснения и дополнительные сведения, необходимые для осуществления оценки объекта оценки, обеспечение соответствующих условий для проведения  оценки объекта оценки.
        5.4.3. Выбирать самостоятельно методы оценки.
        5.4.4.Отказаться от проведения оценки объекта оценки в случаях: если Заказчик нарушил условия договора, не обеспечил предоставление необходимой информации либо не обеспечил, соответствующие условия для работы.
      </p>
        <h3 style="text-align: center;">
           6.  ОТВЕТСТВЕННОСТЬ СТОРОН
      </h3>
      <p>
      6.1. За нарушение сроков выполнения работ Исполнитель уплачивает Заказчику пени в размере 0,5% от стоимости работ за каждый день просрочки, но не более 50% от общей суммы настоящего договора.
      6.2. При не своевременной оплате, Заказчик уплачивает Исполнителю пени в размере 0,5% от суммы просроченного платежа за каждый день просрочки, но не более 50% от общей суммы настоящего договора.
      6.3. Уплата пени не освобождает сторону, нарушившую договорные обязательства от их дальнейшего исполнения и возмещения убытков.
      6.4.Исполнитель не несет ответственность за предоставленную Заказчиком информацию, которая необходима для выполнения  оценки или работ (услуг).
      6.5.Исполнитель не несет ответственность за не выполнение оценки или работ (услуг) по срокам, в случаи не предоставления Заказчиком исходных данных.
      6.6.Вся информация, полученная в ходе выполнения настоящего договора, считается строго конфиденциальной и не подлежит разглашению или передаче третьем лицам, за исключением случаев предусмотренных действующим законодательством.
      </p>
          <h3 style="text-align: center;">
            7. ФОРС-МАЖОР
      </h3>
      <p>
      7.1.Стороны не несут ответственность за не выполнение или не полное выполнение ими своих обязательств, в случае наступления обстоятельств непреодолимой силы, вызванных прямо или косвенно землетрясением, наводнением, пожаром другими стихийными бедствиями, гражданских волнений, вмешательство правительства, оказывающих влияние на выполнение обязательств сторонами по настоящему договору, сроки выполнения этих обязательств соразмерно отодвигаются  на время действия этих обстоятельств.
      </p>
         <h3 style="text-align: center;">
            8.   ПОРЯДОК РАЗРЕШЕНИЯ СПОРОВ
      </h3>
      <p>
        8.1.В случае возникновения споров между Сторонами по вопросам исполнения настоящего договора, Стороны примут все меры к их разрешению путем переговоров. Споры и разногласия, по которым Стороны не достигли договоренности, подлежат рассмотрению в  установленном законодательном порядке.
        8.2.Настоящий договор может быть изменен или прекращен до полного выполнения Сторонами принятых обязательств, только по взаимному соглашению Сторон. Все изменения или дополнения оформляются дополнительными соглашениями в письменной форме к настоящему договору, подписываются Сторонами и составляют его неотъемлемую часть. 
      </p>
           <h3 style="text-align: center;">
            9.    Заключительные положения.
      </h3>
      <p>
      9.1.Отношения возникшие при заключении, исполнении, изменении, расторжении настоящего договора и неоговоренные в нем, регулируются Гражданским  кодексом Р.Уз., Законом Р.Уз."О договорно-правовой базе деятельности хозяйствующих субъектов" и Законом Р.Уз."Об оценочной деятельности".
      9.2.Настоящий договор составлен в двух экземплярах. Оба экземпляра идентичны и имеют одинаковую силу. Один экземпляр находится у Исполнителя, а другой - у Заказчика.
      </p>
           <h3 style="text-align: center;">
            10.   Адреса и банковские реквизиты сторон.
      </h3>
      <div >
        <div style="display:flex;   flex-direction: column; border: 2px solid black; padding: 5px ;" >
            <h4 style="text-align: center;">
                Исполнитель:
            </h4>
            <h4 style="text-align: center;">
                ООО «SMART CONSULT»
            </h4>
            <p>
              Адрес:Сырдарьинская область, г.Гулистан, ул.Хондамир, дом№б/н. 
            </p>
            <p>
             Телефон: 91-775-07-00, 94-919-77-00
            </p>
            <p>
             Р/с: 20208000904316956001
            </p>
            <p>
             в АКИБ «Ипотека банк», г.Гулистан
            МФО: 00364; ИНН: 204901642; ОКОНХ:82100.  
            </p>
            <p>
            М.П.                          ___________ 
            </p>
        </div>
        <div style="display:flex;   flex-direction: column; border: 2px solid black; padding: 5px ;" >
            <h4 style="text-align: center;">
                Заказчик «${editItem.name}»
            </h4>
            <p>
              Адрес:«${editItem.address}»
            </p>
            <p>
             тел.«${editItem.phone_number}»

            </p>
            <p>
            Паспорт: «${editItem.passport_series}»

            </p>
            <p>
             в АКИБ «${editItem.info_bank}», г.Гулистан  <br/>
            </p>
            <p>
            М.П.                          ___________ 
            </p>
        </div>
      </div>
  `);
  setContent2(`
      <h2 style="text-align: center;">
          Д О Г О В О Р   ${editItem.id_one} / ${editItem.id_two}  Ю
      </h2>
      <p style="text-align: center;">   на оценку объекта оценки</p>
      <div style="display:flex;  align-items: center;  justify-content: space-between;">
        <p>  г.Гулистан     </p>
        <p>	«${editItem.contract_date.split('T')[0]}»</p>
      </div>
       <h3 style="text-align: center;">
          1.   ДОГОВАРИВАЮЩИЕСЯ  СТОРОНЫ 
      </h3>
      <p>
    ООО «SMART CONSULT» именуемый в дальнейшем Исполнитель, в лице директора Назарова А.А. действующего на основании Устава и Лицензии (серии BL 001 реестровый RR-0065, выданной Госкомконкуренцией РУз от 28.11.2016г. страховой полис №Р7/3-7/0008 от 26.01.2024 года выданный АО «ALSKOM» СК) с одной стороны и ООО «${editItem.name}» именуемый в дальнейшем Заказчик, в лице Каримов Ш.З. действующего на основании Устава с другой стороны заключили настоящий договор о нижеследующем:

      </p>
      <h3 style="text-align: center;">
          2.    ПРЕДМЕТ ДОГОВОРА
      </h3>
      <p>
         2.1.По возмездному договору на оценку объекта оценки, Исполнитель обязуется по поручению Заказчика, осуществить консультирование Заказчика по определению стоимости (оценки) имущества (объекта оценки) указанных в п.2.2. настоящего договора, а Заказчик обязуется оплатить оценку или производственные работы (услуги).
        2.2.Наименование объекта оценки:  <span>«${editItem.title}»</span>
        2.3.Расположенного по адресу:  <span>«${editItem.address}»</span>
        2.4.Цель оценки: «${editItem.description}» 
        2.5.Вид определяемой стоимости:«${editItem.price_info}»  
        2.6.В случае необходимости дополнительных проработок по комплексу оценочных работ - предмету Договора, внесения изменений и уточнения по инициативе Заказчика или иным объективным причинам, включая изменения и установления дополнительных регламентирующих условий, обуславливаемых нормативными актами, требованиями органов государственного надзора или иных компетентных юридических и физических лиц, составляется Дополнительное соглашение к данному Договору или новый Договор, учитывающие изменение трудоемкости.

      </p>
       <h3 style="text-align: center;">
        3.  ЦЕНА ПРЕДМЕТА ДОГОВОРА И ПОРЯДОК РАСЧЕТОВ
      </h3>
      <p>
        3.1. Подписывая настоящий договор, Исполнитель и Заказчик удостоверяют, что в результате переговоров определен и согласован размер денежного вознаграждения за проведение оценки или производимые работы (услуги), указанные п.2.1. и реализуемые по заключаемому между Сторонами настоящему договору.
        3.2. Заказчик обязуется оплатить за проведение оценки объекта оценки денежное вознаграждение в размере: (без учета НДС) ${editItem.price}» (${editItem.price_text}) сум 00 тийин.
        3.3.Размер денежного вознаграждения за проведение оценки объекта оценки уточняется в случае изменения законодательной минимальной заработной платы по соглашению сторон. Индексации подлежит неоплаченная часть стоимости работ при предоплате на момент введения новой минимальной заработной платы, а индекс удорожания исчисляется, как отношение новой минимальной заработной платы к минимальной заработной плате в момент заключения договора. 
        3.4.Заказчик – юридическое лицо производит 100% предоплаты в течении 3-х банковских дней со дня подписания договора.
        В случае не оплаты в течение указанного срока, договор считается не состоявшимся и Исполнитель вправе отказаться от исполнения обязательств по настоящему договору.
        3.5.Исполнитель сдает Заказчику один экземпляр письменного отчета по оценке объекта оценки и два экземпляра подписанного акта приема-сдачи выполненных работ. 
        3.6.Заказчик обязуется в течение трех календарных дней подписать и вернуть один экземпляр акта приемки-сдачи (для юридического лица) выполненных работ или вернуть Исполнителю отчет по оценке с письменным мотивированным отказом в приеме работ.

      </p>
       <h3 style="text-align: center;">
       4.  СРОКИ ВЫПОЛНЕНИЯ РАБОТ
      </h3>
         <p>
      4.1. Датой начала выполнения оценки или работ по настоящему договору считается дата поступления на расчетный счет Исполнителя предоплаты (задатка), в соответствии с п.3.4. настоящего договора, датой окончания работ считается дата подписания акта приемки-сдачи выполненных работ. Время, затрачиваемое на оценку объекта оценки, Исполнитель определяет самостоятельно и имеет право выполнить досрочно.

      </p>
         <h3 style="text-align: center;">
      5.  ПРАВА И ОБЯЗАННОСТИ СТОРОН
      </h3>
      <p>
       5.1. Заказчик обязан:
      5.1.1. Оплатить стоимость оценки объекта оценки указанной в п.3.2. настоящего договора, за услуги Исполнителя и принять у него работу в соответствии с пунктами 3.5. и 3.6.
      5.1.2. Обеспечить предоставление информации и необходимых сведений для проведения оценки, обеспечить соответствующие условия для проведения оценки или работ (услуг)
      5.2. Заказчик имеет право:
      5.2.1. Отказаться от поручаемой оценки объекта оценки по настоящему договору по своей инициативе только в тех случаях, когда Исполнитель не приступил к исполнению настоящего договора в согласованные сроки. 
      В случае начала выполнения работ (услуг) по оценки объекта оценки Исполнителем, работа завершается на основании двухстороннего акта на выполненную часть работы
      5.3. Исполнитель обязан: 
      5.3.1. Выполнять оценку объекта оценки в соответствии со стандартами и нормативно-правовыми актами, регламентирующими оценочную деятельность в Республики Узбекистан.
      5.3.2. Сообщить Заказчику о невозможности своего участия в проведении оценки объекта оценки вследствие возникших обстоятельств, препятствующих проведению объективной оценки.
      5.4. Исполнитель имеет право:
      5.4.1.Привлекать по своему усмотрению, за свой счет, самостоятельные экспертные группы для выполнения оценки объекта оценки по настоящему договору.
      5.4.2.Требовать от заказчика: обеспечения доступа к документации; получать разъяснения и дополнительные сведения, необходимые для осуществления оценки объекта оценки, обеспечение соответствующих условий для проведения  оценки объекта оценки.
      5.4.3. Выбирать самостоятельно методы оценки.
      5.4.4.Отказаться от проведения оценки объекта оценки в случаях: если Заказчик нарушил условия договора, не обеспечил предоставление необходимой информации либо не обеспечил, соответствующие условия для работы.

      </p>
        <h3 style="text-align: center;">
           6.  ОТВЕТСТВЕННОСТЬ СТОРОН
      </h3>
      <p>
      6.1. За нарушение сроков выполнения работ Исполнитель уплачивает Заказчику пени в размере 0,5% от стоимости работ за каждый день просрочки, но не более 50% от общей суммы настоящего договора.
6.2. При не своевременной оплате, Заказчик уплачивает Исполнителю пени в размере 0,4% от суммы просроченного платежа за каждый день просрочки, но не более 50% от общей суммы настоящего договора.
6.3. Уплата пени не освобождает сторону, нарушившую договорные обязательства от их дальнейшего исполнения и возмещения убытков.
6.4.Исполнитель не несет ответственность за предоставленную Заказчиком информацию, которая необходима для выполнения  оценки или работ (услуг).
6.5.Исполнитель не несет ответственность за не выполнение оценки или работ (услуг) по срокам, в случаи не предоставления Заказчиком исходных данных.
6.6.Вся информация, полученная в ходе выполнения настоящего договора, считается строго конфиденциальной и не подлежит разглашению или передаче третьем лицам, за исключением случаев предусмотренных действующим законодательством.

      </p>
          <h3 style="text-align: center;">
            7. ФОРС-МАЖОР
      </h3>
      <p>
     7.1.Стороны не несут ответственность за не выполнение или не полное выполнение ими своих обязательств, в случае наступления обстоятельств непреодолимой силы, вызванных прямо или косвенно землетрясением, наводнением, пожаром другими стихийными бедствиями, гражданских волнений, вмешательство правительства, оказывающих влияние на выполнение обязательств сторонами по настоящему договору, сроки выполнения этих обязательств соразмерно отодвигаются  на время действия этих обстоятельств.

      </p>
         <h3 style="text-align: center;">
            8.   ПОРЯДОК РАЗРЕШЕНИЯ СПОРОВ
      </h3>
      <p>
      8.1.В случае возникновения споров между Сторонами по вопросам исполнения настоящего договора, Стороны примут все меры к их разрешению путем переговоров. Споры и разногласия, по которым Стороны не достигли договоренности, подлежат рассмотрению в установленном законодательном порядке.
8.2.Настоящий договор может быть изменен или прекращен до полного выполнения Сторонами принятых обязательств, только по взаимному соглашению Сторон. Все изменения или дополнения оформляются дополнительными соглашениями в письменной форме к настоящему договору, подписываются Сторонами и составляют его неотъемлемую часть. 

      </p>
           <h3 style="text-align: center;">
            9.    Заключительные положения.
      </h3>
      <p>
     9.1.Отношения возникшие при заключении, исполнении, изменении, расторжении настоящего договора и неоговоренные в нем, регулируются Гражданским  кодексом Р.Уз., Законом Р.Уз."О договорно-правовой базе деятельности хозяйствующих субъектов" и Законом Р.Уз."Об оценочной деятельности".
9.2.Настоящий договор составлен в двух экземплярах. Оба экземпляра идентичны и имеют одинаковую силу. Один экземпляр находится у Исполнителя, а другой - у Заказчика. 

      </p>
           <h3 style="text-align: center;">
            10.   Адреса и банковские реквизиты сторон.
      </h3>
      <div  ">
        <div style="display:flex;   flex-direction: column; border: 2px solid black; padding: 5px ;" >
            <h4 style="text-align: center;">
                Исполнитель:
            </h4>
            <h4 style="text-align: center;">
                ООО «SMART CONSULT»
            </h4>
            <p>
              Адрес:Сырдарьинская область, г.Гулистан, ул.Хондамир, дом№б/н. 
            </p>
            <p>
             Телефон: 91-775-07-00, 94-919-77-00
            </p>
            <p>
             Р/с: 20208000904316956001
            </p>
            <p>
             в АКИБ «Ипотека банк», г.Гулистан
            МФО: 00364; ИНН: 204901642; ОКОНХ:82100.  
            </p>
            <p>
            М.П.                          ___________ 
            </p>
        </div>
        <div style="display:flex;   flex-direction: column; border: 2px solid black; padding: 5px ;" >
            <h4 style="text-align: center;">
               Заказчик
            </h4>
            <h4 style="text-align: center;">
                ООО «${editItem.name}»
            </h4>
            <p>
            Адрес:«${editItem.address}»
            </p>
            <p>
            тел.«${editItem.phone_number}»
            </p>
            <p>
             Паспорт: «${editItem.passport_series}»

            </p>
            <p>
            банк: «${editItem.info_bank}»
            </p>
            <p>
            МФО: «${editItem.mfo}» <br>
            
            ИНН: «${editItem.inn}»  <br> 
            ОКЭД:«${editItem.oked}»

            </p>
            <p>
           М.П.    ______________ 
            </p>
        </div>
      </div>
  `)
  }, [editItem.title, editItem.address, editItem.phone_number, editItem.passport_series, editItem.info_bank, editItem.name,editItem.contract_date, editItem.description,editItem.price_info, editItem.price, editItem.price_text, editItem.inn, editItem.mfo, editItem.oked, editItem.id_one, editItem.id_two]);
  
  return (
    <div className='ContractEdit'>
      <Header />
      <div className='ContractEdit-content'>
        <div className='CreateContracts2'>
          <div className='CreateContract-saidbar'>
          {category
          .filter((item) => item.id === isActive) // Display only the active category button
          .map((item) => (
            <button
              key={item.id}
              className={isActive === item.id ? 'ConActive' : ''}
              onClick={() => activeCon(item.id)}
            >
              {item.name}
            </button>
          ))}
          </div>
          <form className={`${isActive === 1 ? "yozperson-active" : "dn"}`} onSubmit={editContract}>
            <h2>Изменить Контракт для Физических лиц</h2>
            <label htmlFor="data">
              <h3>Дата контракта</h3>
              <input
              value={editItem.contract_date}
              onChange={(e)=> setEditItem({...editItem, contract_date:e.target.value})}
                type="datetime-local"
                id="meeting-time"
                name="meeting-time"
              />
            </label>
            <label htmlFor="info">
              <h3>Информация (банк)</h3>
              <textarea
              value={editItem.info_bank}
              onChange={(e)=> setEditItem({...editItem, info_bank:e.target.value})}
              name="" id="info"></textarea>
            </label>
            <label htmlFor="title">
              <h3>Наименование обекта</h3>
              <input 
              value={editItem.title}
              onChange={(e)=> setEditItem({...editItem, title:e.target.value})}
              id='title' type="text" />
            </label>
            <label htmlFor="iinfo">
              <h3>Цель оценки</h3>
              <textarea
              value={editItem.description}
              onChange={(e)=> setEditItem({...editItem, description:e.target.value})}
              name="" id="iinfo"></textarea>
            </label>
            <label htmlFor="ppinfo">
              <h3>Вид определяемой стоимости</h3>
              <textarea
              value={editItem.price_info}
              onChange={(e)=>setEditItem({...editItem, price_info:e.target.value})}
              name="" id="ppinfo"></textarea>
            </label>
            <label htmlFor="price">
              <h3>Денежное вознаграждение</h3>
              <input
              value={editItem.price}
              onChange={(e)=>setEditItem({...editItem, price:e.target.value})}
              id='price' type="number" />
            </label>
            <label htmlFor="ppinfo">
              <h3>Денежное вознаграждение (словах)</h3>
              <textarea
              value={editItem.price_text}
              onChange={(e)=>setEditItem({...editItem, price_text:e.target.value})}
              name="" id="ppinfo"></textarea>
            </label>
            <label htmlFor="adres">
              <h3>Информация (Адрес)</h3>
              <textarea
              value={editItem.info_address}
              onChange={(e)=> setEditItem({...editItem, info_address:e.target.value})}
              name="" id="adres"></textarea>
            </label>
            <button type='submit'>Изменить</button>
          </form>
          <form className={`${isActive === 2 ? "yozperson-active" : "dn"}`} onSubmit={editContract}>
            <h2>Создать Контракт для Юридических лиц </h2>
            <label htmlFor="inn">
              <h3>ИНН</h3>
              <input
              value={editItem.inn}
              onChange={(e)=> setEditItem({...editItem,inn:e.target.value})}
              id='inn' type="number" />
            </label>
            <label htmlFor="title">
              <h3>Наименование обекта</h3>
              <input 
              value={editItem.title}
              onChange={(e)=> setEditItem({...editItem, title:e.target.value})}
              id='title' type="text" />
            </label>
            <label htmlFor="iinfo">
              <h3>Цель оценки</h3>
              <textarea
              value={editItem.description}
              onChange={(e)=> setEditItem({...editItem, description:e.target.value})}
              name="" id="iinfo"></textarea>
            </label>
            <label htmlFor="ppinfo">
              <h3>Вид определяемой стоимости</h3>
              <textarea
              value={editItem.price_info}
              onChange={(e)=>setEditItem({...editItem, price_info:e.target.value})}
              name="" id="ppinfo"></textarea>
            </label>
            <label htmlFor="price">
              <h3>Денежное вознаграждение</h3>
              <input
              value={editItem.price}
              onChange={(e)=>setEditItem({...editItem, price:e.target.value})}
              id='price' type="number" />
            </label>
            <label htmlFor="ppinfo">
              <h3>Денежное вознаграждение (словах)</h3>
              <textarea
              value={editItem.price_text}
              onChange={(e)=>setEditItem({...editItem, price_text:e.target.value})}
              name="" id="ppinfo"></textarea>
            </label>
            <label htmlFor="rs">
              <h3>Р/с</h3>
              <input
              value={editItem.rs}
              onChange={(e)=> setEditItem({...editItem, rs:e.target.value})}
              id='rs' type="number" />
            </label>
            <label htmlFor="mfo">
              <h3>МФО</h3>
              <input
              value={editItem.mfo}
              onChange={(e)=> setEditItem({...editItem, mfo:e.target.value})}
              id='mfo' type="number" />
            </label>
            <label htmlFor="data">
              <h3>Дата контракта</h3>
              <input
              value={editItem.contract_date}
              onChange={(e)=> setEditItem({...editItem, contract_date:e.target.value})}
                type="datetime-local"
                id="meeting-time"
                name="meeting-time"
              />
            </label>
            <label htmlFor="info">
              <h3>Информация (банк)</h3>
              <textarea
              value={editItem.info_bank}
              onChange={(e)=> setEditItem({...editItem,info_bank:e.target.value})}
              name="" id="info"></textarea>
            </label>
            <label htmlFor="oked">
              <h3>ОКЭД</h3>
              <input
              value={editItem.oked}
              onChange={(e)=> setEditItem({...editItem,oked:e.target.value})}
              id='oked' type="number" />
            </label>
            <label htmlFor="bank">
              <h3>Информация (адрес)</h3>
              <textarea
              value={editItem.info_address}
              onChange={(e)=>setEditItem({...editItem,info_address:e.target.value})}
              name="" id="bank"></textarea>
            </label>
            <button type='submit'>Создать</button>
          </form>
          <form className={`${isActive === 3 ? "yozperson-active" : "dn"}`}>
            <h2>Аукцион тендер</h2>
            <label htmlFor="data">
              <h3>Дата контракта</h3>
              <input
              value={editItem.contract_date}
              onChange={(e)=> setEditItem({...editItem, contract_date:e.target.value})}
                type="datetime-local"
                id="meeting-time"
                name="meeting-time"
              />
            </label>
            <label htmlFor="info">
              <h3>Информация (банк)</h3>
              <textarea
              value={editItem.info_bank}
              onChange={(e)=> setEditItem({...editItem,info_bank:e.target.value})}
              name="" id="info"></textarea>
            </label>
            <label htmlFor="bank">
              <h3>Информация (адрес)</h3>
              <textarea
              value={editItem.info_address}
              onChange={(e)=>setEditItem({...editItem,info_address:e.target.value})}
              name="" id="bank"></textarea>
            </label>
            <button type='submit'>Создать</button>
          </form>
        </div>
        <div className='CreateContracts-text'>
          <div className={`fizperson ${isActive === 2 ? "fizperson-active" : "dn"}`}>
            <FroalaEditorComponent
              tag='textarea'
              model={content2}
              onModelChange={handleModelChange2}
              config={{
                toolbarButtons: ['align', 'bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
                pluginsEnabled: ['align']
              }}
            />
          </div>
          <div className={`yozperson ${isActive === 1 ? "yozperson-active" : "dn"}`}>
            <FroalaEditorComponent
              tag='textarea'
              model={content}
              onModelChange={handleModelChange}
              config={{
                toolbarButtons: ['align', 'bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
                pluginsEnabled: ['align']
              }}
            />
          </div>
          <div className={`person ${isActive === 3 ? "person-cative" : "dn"}`}>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ContractEdit