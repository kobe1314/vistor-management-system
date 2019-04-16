export const showErrMsg = (msg) => {
    const innerDiv = `<div style="border-radius:5px;padding:12px 25px;font-size:14px;line-height:24px;color:#fff;align-self:center;background:rgba(0,0,0,0.6);">${msg}</div>`;
    const divContainer = document.createElement('div');
    divContainer.style = 'width:100%;height:100%;position:absolute;top:0;left:0;display:flex;justify-content:center;flex-direction:column;';
    divContainer.id = 'errMsgContainer';
    divContainer.innerHTML = innerDiv;
    window.document.body.append(divContainer);
    setTimeout(()=>{
        const errMsgContainer = document.getElementById('errMsgContainer');
        document.body.removeChild(errMsgContainer);
    },2000);
};