async function filter() {
    await fetch("http://localhost:3000/filter")
      .then((response) => response.text())
      .then((result) => {
        data = JSON.parse(result);
})

    var liColor = document.createElement('li')
    var liSize = document.createElement('li')
    var liRangePrice = document.createElement('li')

    liSize.classList.add('grid')

    data.colors.map((colors => {
        liColor.innerHTML += `
        <label id="label" class="label-checkmark label-color" for="${colors}">
            <input name='checkbox' class="label-color" id="${colors}" type="checkbox">
                ${colors}
            <span class="checkmark"></span>
        </label>
    `;
        document.querySelector('.color').appendChild(liColor)
    }))

    data.size[0].words.map((words => {
        liSize.innerHTML += `
        <label id="label" class="label-checkmark-size label-size" for="${words}">
            <input name='checkbox' class="label-size" id="${words}" type="checkbox">
            <span class="checkmark">${words}</span>
        </label>
        `;
        document.querySelector('.size').appendChild(liSize)
    }))

    data.size[0].numbers.map((numbers => {
        liSize.innerHTML += `
        <label id="label" class="label-checkmark-size label-size" for="${numbers}">
            <input name='checkbox' class="label-size" id="${numbers}" type="checkbox">
            <span class="checkmark">${numbers}</span>
        </label>
        `
        document.querySelector('.size').appendChild(liSize)
    }))

    data.priceRange.map((range => {
        liRangePrice.innerHTML += `
                <label id="label" class="label-checkmark label-range" for="${range.range1[0]}-${range.range1[1]}">
                    <input name='checkbox' class="label-range" id="${range.range1[0]}-${range.range1[1]}" type="checkbox">
                    de R$${range.range1[0]} até R$${range.range1[1]}
                    <span class="checkmark"></span>
                </label>
        `;
        liRangePrice.innerHTML += `
                <label  id="label" class="label-checkmark label-range" for="${range.range2[0]}-${range.range2[1]}">
                    <input name='checkbox' class="label-range" id="${range.range2[0]}-${range.range2[1]}" type="checkbox">
                    de R$${range.range2[0]} até R$${range.range2[1]}
                    <span class="checkmark"></span>
                </label>
        `;
        liRangePrice.innerHTML += `
                <label id="label" class="label-checkmark label-range" for="${range.range3[0]}-${range.range3[1]}">
                    <input name='checkbox' class="label-range" id="${range.range3[0]}-${range.range3[1]}" type="checkbox">
                    de R$${range.range3[0]} até R$${range.range3[1]}
                    <span class="checkmark"></span>
                </label>
        `;
        liRangePrice.innerHTML += `
                <label id="label" class="label-checkmark label-range" for="${range.range4[0]}-${range.range4[1]}">
                    <input name='checkbox' class="label-range" id="${range.range4[0]}-${range.range4[1]}" type="checkbox">
                    de R$${range.range4[0]} até R$${range.range4[1]}
                    <span class="checkmark"></span>
                </label>
        `;
        liRangePrice.innerHTML += `
                <label id="label" class="label-checkmark label-range" for="${range.range5[0]}">
                    <input name='checkbox' class="label-range" id="${range.range5[0]}" type="checkbox">
                    a partir de R$${range.range5[0]}
                    <span class="checkmark"></span>
                </label>
        `;
        liRangePrice.innerHTML += ``;
        document.querySelector('.range-prices').appendChild(liRangePrice)
    }))

    document.querySelectorAll("input[name='checkbox']").forEach(i => {

        function useStateFilter(defaultValue) {
            let value = defaultValue;
            function getValue() {
              return value;
            }
            function setValue(newValue) {
              value = newValue; 
              renderFilter();
            }
            return [getValue, setValue];
        }
        
        const [filter, setFilter] = useStateFilter([])
        
        
        async function loadProducts(color, size, range) {
            const response = await fetch(`http://localhost:3000/products?${color}&${size}`);
            const data = await response.json();
            setFilter(data)
            
        }

        i.addEventListener('change', function() {
            var cunt = 0;
            if(i.checked && i.classList.contains('label-color')) {
                document.querySelectorAll('.card').forEach(i => i.remove())
                console.log(i.id)
                loadProducts(`colors=${i.id}`)
            }
            else{
                document.querySelectorAll('.card').forEach(i => i.remove())
            }
        })
        i.addEventListener('change', function() {
            var cunt = 0;
            if(i.checked && i.classList.contains('label-size')) {
                document.querySelectorAll('.card').forEach(i => i.remove())
                console.log(i.id)
                loadProducts(``, `size=${i.id}`)
            }
            else{
                document.querySelectorAll('.card').forEach(i => i.remove())
            }
        })
        i.addEventListener('change', function() {
            var cunt = 0;
            if(i.checked && i.classList.contains('label-range')) {
                document.querySelectorAll('.card').forEach(i => i.remove())
                console.log(i.id)
                loadProducts(``, ``, ``)
            }
            else{
                document.querySelectorAll('.card').forEach(i => i.remove())
            }
        })
        
        
        renderFilter()
        function renderFilter() {
            filter().map(i => {
                var card = `
                <div class="card">
                    <div class="card-header">
                        <img class="card-img" src="${i.image}" alt="">
                    </div>
                    <div class="card-footer">
                        <p class="card-name">${i.name}</p>
                        <p class="card-price">R$ ${i.price}</p>
                        <p class="card-installments">até ${i.installments[0]} de R$${i.installments[1]}</p>
                        <button class="card-btn">Compara</button>
                    </div>
                </div>
                `
               let cardList =  document.querySelector('.load-more')
        
               cardList.insertAdjacentHTML('beforebegin', card)
            })
        }
    })
}

filter()

