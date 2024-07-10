// 中信书院 epub 导出
// h5.yunpub.cn/assets/h5-lib.34e36fde.js

/**
* 說明：
*
*  修改方法
*    h5-lib.34e36fde.js -> Archive.open(e, t)
*  啟用路徑
*    Chrome -> DevTools -> Replace
*/


class Archive {

    open(e, t) {
        return this.zip.loadAsync(e, { base64: t }).then(zip => {
            const dli = document.createElement("div");
            dli.id = "dli";
            document.body.appendChild(dli);

            dli.style.position = 'fixed';
            dli.style.top = '0';
            dli.style.left = '0';
            dli.style.width = '100%';
            dli.style.backgroundColor = 'white';
            dli.style.zIndex = '1000';
            dli.style.padding = '10px';
            dli.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            dli.style.overflow = 'auto';
            dli.style.maxHeight = '200px';

            zip.forEach((relativePath, zipEntry) => {
                zipEntry.async("base64").then(val => {
                    console.log(relativePath);
                    const contentType = mime.lookup(relativePath);

                    const binaryString = atob(val);
                    const byteArray = new Uint8Array([...binaryString].map(char => char.charCodeAt(0)));
                    const blob = new Blob([byteArray], { type: contentType });

                    const dl = document.createElement("a");
                    dl.href = URL.createObjectURL(blob);
                    dl.download = relativePath;
                    dl.textContent = relativePath;
                    dli.appendChild(dl);
                    dl.target = "_blank";

                    dl.style.display = 'block';
                    dl.style.margin = '5px 0';
                    dl.style.textDecoration = 'none';
                    dl.style.color = 'blue';
                });
            });
        });
    }

}
