import sharp from "sharp";
import filestream from "fs";

export const UploadFile = async(body, docx, pdf) => {
    let data;
    let fileName = body.name;
    
    data = Buffer.from(body.fbolb);
      
    if(pdf)
      uploadPdf(fileName, data);
    else if(docx)
      uploadDocx(fileName, data);
    else
      uploadImage(fileName, data);
  }
const uploadPdf = (name, data) => {
  filestream.writeFile(
    `dcuFileSys/${name}.pdf`, data, (err) => {
    if (err)
      throw err;
    console.log('pdfが作成されました');
  })
}
const uploadDocx = (name, data) => {
  filestream.writeFile(
    `dcuFileSys/${name}`, data, (err) => {
    if (err)
      throw err;
    console.log('docxが作成されました');
  })
}
const uploadImage = (name, data) => {
  filestream.writeFile(
    `dcuFileSys/${name}.jpg`, data, (err) => {
    if (err)
      throw err;
    sharp(data)
    .resize(315)
    .toFile(`dcuFileSys/${name}512.jpg`, (err, info) => {
      if(err)
        throw err
      console.log(info);
    })
    console.log('jpgが作成されました');
  })
}