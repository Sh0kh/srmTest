import React, { useState } from 'react';
import '../Style/CreateContracts.css';
import Header from './Header';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/js/froala_editor.pkgd.min.js';


// import axios from '../Service/axios';

function CreateContracts() {
  const [isActive, setActive] = useState(1)
  const activeCon = (a) => {
    setActive(a)
  }

  const initialContent = `
        <h2 style="text-align: center;">
            Д О Г О В О Р    № __ / ___ Ф
        </h2>
        <p style="text-align: center;">на оценку объекта оценки</p>
        <div style="display:flex;  align-items: center;  justify-content: space-between;">
          <p>  г.Гулистан     </p>
          <p>   	« ____» _____2021г.</p>
        </div>
         <h3 style="text-align: center;">
            1.   ДОГОВАРИВАЮЩИЕСЯ  СТОРОНЫ 
        </h3>
        <p>
        ООО «SMART CONSULT» именуемый в дальнейшем Исполнитель, в лице директора Назарова А.А. действующего на основании Устава и Лицензии (серии BL 001 реестровый RR-0065, выданной Госкомконкуренцией РУз от 28.11.2016г. страховой полис №Р7/3-7/0008 от 26.01.2024 года выданный АО «ALSKOM» СК) с одной стороны и ______________________________________ именуемый в дальнейшем Заказчик, заключили настоящий договор о нижеследующем:
        </p>
        <h3 style="text-align: center;">
            2.    ПРЕДМЕТ ДОГОВОРА
        </h3>
        <p>
          2.1.По возмездному договору на оценку объекта оценки, Исполнитель обязуется по поручению Заказчика, осуществить консультирование Заказчика по определению стоимости (оценки) имущества (объекта оценки) указанных в п.2.2. настоящего договора, а Заказчик обязуется оплатить оценку или производственные работы (услуги).
          2.2.Наименование объекта оценки: __________________________________________________________
          2.3.Расположенного по адресу: __________________________________________________________
          2.4.Цель оценки:      
          2.5.Вид определяемой стоимости: рыночная
          2.6.В случае необходимости дополнительных проработок по комплексу оценочных работ - предмету Договора, внесения изменений и уточнения по инициативе Заказчика или иным объективным причинам, включая изменения и установления дополнительных регламентирующих условий, обуславливаемых нормативными актами, требованиями органов государственного надзора или иных компетентных юридических и физических лиц, составляется Дополнительное соглашение к данному Договору или новый Договор, учитывающие изменение трудоемкости.
        </p>
         <h3 style="text-align: center;">
          3.  ЦЕНА ПРЕДМЕТА ДОГОВОРА И ПОРЯДОК РАСЧЕТОВ
        </h3>
        <p>
          3.1. Подписывая настоящий договор, Исполнитель и Заказчик удостоверяют, что в результате переговоров определен и согласован размер денежного вознаграждения за проведение оценки или производимые работы (услуги), указанные п.2.1. и реализуемые по заключаемому между Сторонами настоящему договору.
          3.2. Заказчик обязуется оплатить за проведение оценки объекта оценки денежное вознаграждение в размере: (без учета НДС)  _______ (____________________________________) сум 00 тийин.
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
                  Заказчик
              </h4>
              <p>
                Адрес:______________________________________
              </p>
              <p>
               тел. (____) _____________________

              </p>
              <p>
              Паспорт ____________________________________

              </p>
              <p>
               в АКИБ «Ипотека банк», г.Гулистан
              выдан  _____________________________________ <br/>
              от ______________
              </p>
              <p>
              М.П.                          ___________ 
              </p>
          </div>
        </div>
    `;
  const initialContent2 = `
        <h2 style="text-align: center;">
            Д О Г О В О Р    №01/019  Ю
        </h2>
        <p style="text-align: center;">   на оценку объекта оценки</p>
        <div style="display:flex;  align-items: center;  justify-content: space-between;">
          <p>  г.Гулистан     </p>
          <p>   26 января 2024 г..</p>
        </div>
         <h3 style="text-align: center;">
            1.   ДОГОВАРИВАЮЩИЕСЯ  СТОРОНЫ 
        </h3>
        <p>
      ООО «SMART CONSULT» именуемый в дальнейшем Исполнитель, в лице директора Назарова А.А. действующего на основании Устава и Лицензии (серии BL 001 реестровый RR-0065, выданной Госкомконкуренцией РУз от 28.11.2016г. страховой полис №Р7/3-7/0008 от 26.01.2024 года выданный АО «ALSKOM» СК) с одной стороны и ООО «________________» именуемый в дальнейшем Заказчик, в лице Каримов Ш.З. действующего на основании Устава с другой стороны заключили настоящий договор о нижеследующем:

        </p>
        <h3 style="text-align: center;">
            2.    ПРЕДМЕТ ДОГОВОРА
        </h3>
        <p>
           2.1.По возмездному договору на оценку объекта оценки, Исполнитель обязуется по поручению Заказчика, осуществить консультирование Заказчика по определению стоимости (оценки) имущества (объекта оценки) указанных в п.2.2. настоящего договора, а Заказчик обязуется оплатить оценку или производственные работы (услуги).
          2.2.Наименование объекта оценки: Оценка стоимости ущерба нанесённого оборудованию
          2.3.Расположенного по адресу:  Сырдарьинская обл., г.Янгиер
          2.4.Цель оценки: для консультирования о стоимости ущерба
          2.5.Вид определяемой стоимости: рыночная стоимость
          2.6.В случае необходимости дополнительных проработок по комплексу оценочных работ - предмету Договора, внесения изменений и уточнения по инициативе Заказчика или иным объективным причинам, включая изменения и установления дополнительных регламентирующих условий, обуславливаемых нормативными актами, требованиями органов государственного надзора или иных компетентных юридических и физических лиц, составляется Дополнительное соглашение к данному Договору или новый Договор, учитывающие изменение трудоемкости.

        </p>
         <h3 style="text-align: center;">
          3.  ЦЕНА ПРЕДМЕТА ДОГОВОРА И ПОРЯДОК РАСЧЕТОВ
        </h3>
        <p>
          3.1. Подписывая настоящий договор, Исполнитель и Заказчик удостоверяют, что в результате переговоров определен и согласован размер денежного вознаграждения за проведение оценки или производимые работы (услуги), указанные п.2.1. и реализуемые по заключаемому между Сторонами настоящему договору.
          3.2. Заказчик обязуется оплатить за проведение оценки объекта оценки денежное вознаграждение в размере: (без учета НДС) 1 150 000 (Один миллион сто пятьдесят тысяч) сум 00 тийин.
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
                  ООО «______________»
              </h4>
              <p>
               Адрес: Сырдарьинская область, г.Янгиер

              </p>
              <p>
               тел. (____) _____________________

              </p>
              <p>
              Паспорт ____________________________________

              </p>
              <p>
              банк ___________________________

              </p>
              <p>
              МФО: _______  ИНН: _________ ОКЭД:_______

              </p>
              <p>
             М.П.    ______________ Каримов Ш.З.
              </p>
          </div>
        </div>
    `;

  const [content, setContent] = useState(initialContent);
  const [content2, setContent2] = useState(initialContent2);

  const handleModelChange = (newContent) => {
    setContent(newContent);
  };
  const handleModelChange2 = (newContent2) => {
    setContent2(newContent2);
  };

  return (
    <div className='CreateContracts'>
      <Header />
      <div className='CreateContracts-content'>
        <div className='CreateContracts2'>
          <div className='CreateContract-saidbar'>
            <button className={isActive === 1 ? 'ConActive' : ''}
              onClick={() => activeCon(1)}
            >
              Физическое лицо
            </button>
            <button className={isActive === 2 ? 'ConActive' : ''}
              onClick={() => activeCon(2)} >
              Юридическое лицо
            </button>
            <button className={isActive === 3 ? 'ConActive' : ''}
              onClick={() => activeCon(3)}>
              Аукцион тендер
            </button>
          </div>
          <form className={`${isActive === 1 ? "yozperson-active" : "dn"}`}>
            <h2>Создать Контракт для Физических лиц</h2>
            <label htmlFor="name">
              <h3>Наименование</h3>
              <input id='name' type="text" />
            </label>
            <label htmlFor="pasport">
              <h3>Серия паспорта</h3>
              <input id='pasport' type="text" />
            </label>
            <label htmlFor="tel">
              <h3>Телефон номера</h3>
              <input id='tel' type="number" />
            </label>
            <label htmlFor="data">
              <h3>Дата контракта</h3>
              <input
                type="datetime-local"
                id="meeting-time"
                name="meeting-time"
              />
            </label>
            <label htmlFor="info">
              <h3>Информация (банк)</h3>
              <textarea name="" id="info"></textarea>
            </label>
            <label htmlFor="adres">
              <h3>Информация (Адрес)</h3>
              <textarea name="" id="adres"></textarea>
            </label>
            <div className="modal-foto">
              <h3>Фото</h3>
              <label className="file-input-container" htmlFor="photo">
                <span className='soz'>Фото</span>
                <input id="photo" accept="image/*" type="file" />
              </label>
            </div>
            <button type='submit'>Создать</button>
          </form>
          <form className={`${isActive === 2 ? "yozperson-active" : "dn"}`}>
            <h2>Создать Контракт для Юридических лиц </h2>
            <label htmlFor="name">
              <h3>Наименование</h3>
              <input id='name' type="text" />
            </label>
            <label htmlFor="inn">
              <h3>ИНН</h3>
              <input id='inn' type="number" />
            </label>
            <label htmlFor="tel">
              <h3>Телефон номера</h3>
              <input id='tel' type="number" />
            </label>
            <label htmlFor="rs">
              <h3>Р/с</h3>
              <input id='rs' type="number" />
            </label>
            <label htmlFor="mfo">
              <h3>МФО</h3>
              <input id='mfo' type="number" />
            </label>
            <label htmlFor="data">
              <h3>Дата контракта</h3>
              <input
                type="datetime-local"
                id="meeting-time"
                name="meeting-time"
              />
            </label>
            <label htmlFor="info">
              <h3>Информация (банк)</h3>
              <textarea name="" id="info"></textarea>
            </label>
            <label htmlFor="bank">
              <h3>Информация (адрес)</h3>
              <textarea name="" id="bank"></textarea>
            </label>
            <div className="modal-foto">
              <h3>Фото</h3>
              <label className="file-input-container" htmlFor="photo">
                <span className='soz'>Фото</span>
                <input id="photo" accept="image/*" type="file" />
              </label>
            </div>
            <button type='submit'>Создать</button>
          </form>
          <form className={`${isActive === 3 ? "yozperson-active" : "dn"}`}>
            <h2>Аукцион тендер</h2>
            <label htmlFor="name">
              <h3>Наименование</h3>
              <input id='name' type="text" />
            </label>
            <label htmlFor="nmkon">
              <h3>Номер контракта</h3>
              <input id='nmkon' type="number" />
            </label>
            <label htmlFor="data">
              <h3>Дата контракта</h3>
              <input
                type="datetime-local"
                id="meeting-time"
                name="meeting-time"
              />
            </label>
            <label htmlFor="inn">
              <h3>ИНН</h3>
              <input id='inn' type="number" />
            </label>
            <label htmlFor="tel">
              <h3>Телефон номера</h3>
              <input id='tel' type="number" />
            </label>
            <label htmlFor="bank">
              <h3>Банк</h3>
              <input id='bank' type="text" />
            </label>
            <label htmlFor="rs">
              <h3>Р/с</h3>
              <input id='rs' type="number" />
            </label>
            <label htmlFor="mfo">
              <h3>МФО</h3>
              <input id='mfo' type="number" />
            </label>
            <label htmlFor="info">
              <h3>Адрес</h3>
              <textarea name="" id="info"></textarea>
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
          <div className={`person ${isActive === 3 ? "fizperson-active" : "dn"}`}>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateContracts;
