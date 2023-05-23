var fs = require('fs');
var PdfPrinter = require('pdfmake');
let { DateTime } = require('luxon')
const uniqid = require('uniqid')

exports.finalprint = ({ filename }) => {
  let aPromise = new Promise((resolve, reject) => {
    var fonts = {
      Roboto: {
        normal: 'report/fonts/Roboto-Regular.ttf',
        bold: 'report/fonts/Roboto-Medium.ttf',
        italics: 'report/fonts/Roboto-Italic.ttf',
        bolditalics: 'report/fonts/Roboto-MediumItalic.ttf'
      }
    };

    var printer = new PdfPrinter(fonts);

    let photo = {
      margin: [40, 50, 0, 0],
      table: {
        headerRows: 1,
        body: [
          [
            {
              image:`report/downloads/${filename}`,
              width: 150,
              height: 160,
            },

          ],
        ],
      }
    }


    let dd = {
      footer: {

        columns: [
          { text: `Date:${DateTime.now().setZone('Asia/Calcutta').toLocaleString(DateTime.DATE_MED)} ${DateTime.now().setZone('Asia/Calcutta').toLocaleString(DateTime.TIME_SIMPLE)}`, alignment: 'left', margin: [20, 10, 40, 0], fontSize: 8 }
        ]
      },

      background: function (currentPage, pageSize) {            //border
        return {

          canvas: [
            {
              type: 'rect',
              x: 0,
              y: 0,
              w: 575,
              h: 820,
              r: 2,
              lineColor: 'black',
              text: 'date',

            },

          ],

          margin: 10
        }
      },

      content: [
        photo,
      ] //content end

    } // dd end


    var options = { format: 'A4', header: { "height": "5mm" }, footer: { "height": "5mm" }, border: { top: '30px', bottom: '30px', left: '10px' } }
    let document = `report/downloads/final-print-${uniqid()}.pdf`
    // let document = 'document.pdf'
    try {
      let pdfDoc = printer.createPdfKitDocument(dd, options);
      let writeStream = fs.createWriteStream(document)
      pdfDoc.pipe(writeStream);
      pdfDoc.end();
      writeStream.on('finish', () => {
        resolve(document)
        console.log("finalprint ready")
      })
    } catch (e) {
      reject(e)
    }
  })

  return aPromise;
}