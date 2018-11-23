;
(function () {
    "use strict";
    const sampleImages = [
        'https://images.unsplash.com/photo-1542321508-2160d24e6c7f?ixlib=rb-0.3.5&s=4e9b33feddd941353695c724225600ae&auto=format&fit=crop&w=500&q=60',

        'https://images.unsplash.com/photo-1517144447511-aebb25bbc5fa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ebaf48b9e8ef9286ec96a668568c945b&auto=format&fit=crop&w=500&q=60',

        'https://images.unsplash.com/photo-1468956398224-6d6f66e22c35?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5d2e4d45d037053be722233b79bd0510&auto=format&fit=crop&w=500&q=60',

        'https://images.unsplash.com/photo-1427847907429-d1ba99bf013d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7804dc2b7874f061cb17c175eb738084&auto=format&fit=crop&w=500&q=60',

        'https://images.unsplash.com/photo-1467987506553-8f3916508521?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f07ed120eeba6a2720aeb6422f566f74&auto=format&fit=crop&w=500&q=60',

        'https://images.unsplash.com/photo-1538102894545-170c37b51c3d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e8118f51819521b487bd264308d18667&auto=format&fit=crop&w=500&q=60'
    ];
    const borderRange = document.getElementById('spacing');

    const inputs = document.querySelectorAll('.ba-filters input, #base, #spacing');

    //Add for each input listener for change range or value

    inputs.forEach(function (element) {
        element.addEventListener('change', handleUpdate);
        element.addEventListener('input', handleUpdate);
    })

    function handleUpdate() {
        // this == range slider that is changed
        const sufix = this.dataset.sufix || "";
        const varValue = this.value + sufix;
        const varName = this.name;

        setCssVar(varName, varValue); // varValue=varVal
        setTextVar(varName, varValue);
    }

    function setCssVar(varName, varVal) {
        document.documentElement.style.setProperty('--' + varName, varVal);
    }

    function setTextVar(varName, varVal) {
        //Change filter label text value
        const textVal = document.getElementById(varName + "-val");

        if (textVal) {
            textVal.textContent = varVal;
        }
    }

    //Clear to default values
    const clearBtn = document.querySelector('[data-clear]');

    clearBtn.addEventListener('click', clearAll);

    function clearAll() {

        inputs.forEach(function (element) {
            const defaultVal = element.getAttribute('value');

            element.value = defaultVal;

            const sufix = element.dataset.sufix || "";
            const varValue = element.value + sufix;
            const varName = element.name;

            setCssVar(varName, varValue);
            setTextVar(varName, varValue);
        });
    }

    // Show random image when click on main image

    function getRandomImage() {
        let randomIndex = Math.random() * sampleImages.length;
        randomIndex = Math.floor(randomIndex);

        return sampleImages[randomIndex];
    }

    const filteredImg = document.querySelector('.ba-filtered-img');

    filteredImg.addEventListener('click', function () {
        this.src = getRandomImage();
    });

    //Filters

    let filters = {
        1977: {
            sepia: "50%",
            hue: "30deg",
            saturate: "140%"
        },
        amaro: {
            contrast: "110%",
            brightness: "120%",
            saturate: "130%",
            sepia: "35%"
        },
        lofi: {
            contrast: "140%",
            sepia: "35%"
        },
        xpro: {
            contrast: "125%",
            sepia: "45%",
            hue: "5deg",
            brightness: "175%",
            saturate: "130%"
        }
    };

    const option = document.getElementById('filters');

    option.addEventListener('change', useFilter);


    function useFilter() {

        clearAll();

        let filterName = this.value;
        let newFilters = filters[filterName];

        for (const cssVar in newFilters) {
            const cssVarValue = newFilters[cssVar],
                rangeInput = document.getElementById(cssVar),
                rangeValue = cssVarValue.replace(/\D/g, "");

            setCssVar(cssVar, cssVarValue);
            rangeInput.value = rangeValue;

            const textVal = document.getElementById(cssVar + "-val");

                if (textVal) {
                    textVal.textContent = cssVarValue;
                }
        }
    }


})();