// 中信书院 epub 导出
// h5.yunpub.cn/assets/h5-lib.34e36fde.js

/**
* 說明：
*
*  1、創建副本, 修改方法 (Chrome -> DevTools -> Sources -> Overrides)
*
*    h5-lib.34e36fde.js -> Archive.open(e, t)
*
*  2、自動點擊, 逐個下載 (Chrome -> DevTools -> Console)

(function autoClick() {
    var links = document.querySelectorAll('#downloadListContainer a');
    var index = 0;
    console.log(links.length);

    var interval = setInterval(function() {
        if (index >= links.length) {
            clearInterval(interval);
            return;
        }
        links[index].click();
        index++;
    }, 1000);
})();

*/


class Archive {

    open(e, t) {
        return this.zip.loadAsync(e, { base64: t }).then(zip => {
            const downloadListContainer = document.createElement("div");
            downloadListContainer.id = "downloadListContainer";
            downloadListContainer.style.position = 'fixed';
            downloadListContainer.style.top = '0';
            downloadListContainer.style.left = '0';
            downloadListContainer.style.width = '100%';
            downloadListContainer.style.backgroundColor = 'white';
            downloadListContainer.style.zIndex = '1000';
            downloadListContainer.style.padding = '10px';
            downloadListContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            downloadListContainer.style.overflow = 'auto';
            downloadListContainer.style.maxHeight = '100px';
            document.body.appendChild(downloadListContainer);

            const closeButton = document.createElement("button");
            closeButton.textContent = 'Close';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '10px';
            closeButton.style.right = '15px';
            closeButton.style.backgroundColor = '#f44336';
            closeButton.style.color = 'white';
            closeButton.style.border = 'none';
            closeButton.style.padding = '5px 10px';
            closeButton.style.cursor = 'pointer';
            downloadListContainer.appendChild(closeButton);

            closeButton.onclick = function() {
                document.body.removeChild(downloadListContainer);
            };

            zip.forEach((relativePath, zipEntry) => {
                zipEntry.async("base64").then(val => {
                    console.log(relativePath);
                    const contentType = mime.lookup(relativePath);

                    const binaryString = atob(val);
                    const byteArray = new Uint8Array([...binaryString].map(char => char.charCodeAt(0)));
                    const blob = new Blob([byteArray], { type: contentType });

                    const downloadLink = document.createElement("a");
                    downloadLink.href = URL.createObjectURL(blob);
                    downloadLink.download = relativePath;
                    downloadLink.textContent = relativePath;
                    downloadLink.target = "_blank";
                    downloadLink.style.display = 'block';
                    downloadLink.style.margin = '5px 0';
                    downloadLink.style.textDecoration = 'none';
                    downloadLink.style.color = 'blue';
                    downloadListContainer.appendChild(downloadLink);
                });
            });
        });
    }

}
