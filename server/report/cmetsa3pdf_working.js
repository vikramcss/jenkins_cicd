
var fs = require('fs');
var PdfPrinter = require('pdfmake');
let { DateTime } = require('luxon')
const uniqid = require('uniqid')

var download = function (uri, filename, callback) {
	request.head(uri, function (err, res, body) {	
		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
};

exports.finalprint = ({ application }) => {

  
 
  var fonts = {
    Roboto: {
      normal: 'report/fonts/Roboto-Regular.ttf',
      bold: 'report/fonts/Roboto-Medium.ttf',
      italics: 'report/fonts/Roboto-Italic.ttf',
      bolditalics: 'report/fonts/Roboto-MediumItalic.ttf'
    }
  };
  
//   let uploadsLocation = "https://cmetrsuploads.s3.ap-south-1.amazonaws.com";
//   let photoUrl = application.uploads.photo ? `${uploadsLocation}/${application.uploads.photo}` : null;
//   let signUrl = application.uploads.sign ? `${uploadsLocation}/${application.uploads.sign}` : null;
  var printer = new PdfPrinter(fonts);
  
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
      "harshad"
    

    ] //content end

  } // dd end

  var options = { format: 'A4', header: { "height": "5mm" }, footer: { "height": "5mm" }, border: { top: '30px', bottom: '30px', left: '10px' } }
  // console.log('output', JSON.stringify(dd.content[0].columns, null, 2));
    // let document = `hello.pdf`
  // let document = `report/downloads/final-print-${uniqid()}.pdf`
  let document = 'document.pdf'
  let pdfDoc = printer.createPdfKitDocument(dd, options);
  pdfDoc.pipe(fs.createWriteStream(document));
  pdfDoc.end();
  console.log("finalprint ready",document)
  return document;
}

