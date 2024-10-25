function mailTemplateContainer(content) {
  return `<body style="background-color:#efeef1;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:580px;margin:30px auto;background-color:#ffffff">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="display:flex;justify-content:center;aling-items:center;padding:30px">
              <tbody>
                <tr>
                  <td><img src="https://jaq5wiq5b2dhdvtn.public.blob.vercel-storage.com/logo-Oq9qFLZVDJe0R5JOZ1N3WUNbgbd562.png" style="display:block;outline:none;border:none;text-decoration:none" width="114" /></td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="width:100%;display:flex">
              <tbody>
                <tr>
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td data-id="__react-email-column" style="border-bottom:1px solid rgb(238,238,238);width:249px"></td>
                          <td data-id="__react-email-column" style="border-bottom:1px solid rgb(232, 114, 60);width:102px"></td>
                          <td data-id="__react-email-column" style="border-bottom:1px solid rgb(238,238,238);width:249px"></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:5px 20px 10px 20px">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:14px;line-height:1.5;margin:16px 0">${content}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:580px;margin:0 auto">
      <tbody>
        <tr>
          <td>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody style="width:100%">
                <tr style="width:100%">
                  <td align="right" data-id="__react-email-column" style="width:50%;padding-right:8px"><a href="https://t.me/Mario0307">
                    <img src="https://api.iconify.design/mdi:telegram.svg" style="display:block;outline:none;border:none;text-decoration:none" />
                    </a></td>
                                    <td align="left" data-id="__react-email-column" style="width:50%;padding-left:8px"><a href="https://t.me/Mario0307" target="_blank">
                    <img src="https://api.iconify.design/mdi:instagram.svg" style="display:block;outline:none;border:none;text-decoration:none" />
                            </a></td>
                                    <td align="left" data-id="__react-email-column" style="width:50%;padding-left:8px"><a
                                href="https://api.whatsapp.com/send?phone=%2B33632088663"
                                target="_blank"
                            >
                    <img src="https://api.iconify.design/mdi:whatsapp.svg" style="display:block;outline:none;border:none;text-decoration:none" />
                            </a></td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody style="width:100%">
                <tr style="width:100%">
                  <p style="font-size:14px;line-height:24px;margin:16px 0;text-align:center;color:#706a7b">© 2024 Ecomplane, All Rights Reserved <br />France</p>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>`;
}

module.exports = {
  mailTemplateContainer,
};
