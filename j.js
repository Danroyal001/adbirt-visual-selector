(() => {
    const successpage = document.querySelector("#campaign_success_url");
    const selectorBtn = document.querySelector("#adbirt-get-selector");
    const selectorInput = document.querySelector("#adbirt-selector");
    const loader = document.querySelector("#adbirt-loader");

    selectorBtn.onclick = (event) => {
        event.preventDefault();
        console.log(CssSelectorGenerator.getCssSelector(event.currentTarget));
        try {
            loader.innerHTML = "Rendering, please wait...";

            if (
                successpage.value.indexOf("https://") != 0 &&
                successpage.value.indexOf("http://") != 0
            ) {
                successpage.value = "https://" + successpage.value;
            }

            const html = await (
                await fetch(
                    /* `https://us-central1-adbirt-e0cd0.cloudfunctions.net/ssr?url=${encodeURIComponent(
                      successpage.value
                    )}&noCacheToken=${Math.random()}`, */
                    `http://localhost:5001/adbirt-e0cd0/us-central1/ssr?url=${
        encodeURIComponent(successpage.value)
      }&noCacheToken=${Math.random()}`, {
                        mode: "cors",
                    }
                )
            ).text();
            console.log(encodeURIComponent(successpage.value))
            loader.innerHTML = "";

            const win = window.open(
                "",
                "Adbirt - Click on the element you want us to track",
                "width=2000,height=2000,scrollbars=1,center=1"
            );

            win.alert("Wait for the page to load, then click on the element");

            win.document.querySelector("html").innerHTML = html;
            const script = win.document.createElement("script");
            win.document.body.appendChild(script);
            script.src = "./js/index.js";
            Array.from(win.document.getElementsByTagName("*")).forEach((el) => {
                el.addEventListener("click", (event) => {
                    event.preventDefault();
                    const selectorStr = CssSelectorGenerator.getCssSelector(
                        event.target
                    );
                    console.log(selectorStr);
                    selectorInput.value = selectorStr.toString();

                    return win.close();
                });
            });

            window.focus();
            window.document.body.style.cursor = "pointer !important";
        } catch (error) {
            console.error(error);
            loader.innerHTML = "";
            alert(`Network error, unable to fetch\n ${error.message}`);
        }
    };
})();